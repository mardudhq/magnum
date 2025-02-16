import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model, Types } from 'mongoose';
import { Ticker } from '../schemas/ticker.schema';

@Injectable()
export class TickerProcessorScheduler {
  private readonly logger = new Logger(TickerProcessorScheduler.name);

  constructor(
    @InjectModel(Ticker.name)
    private readonly tickerModel: Model<Ticker>,
  ) {}

  /**
   * Cleanup aggregation pipeline
   *
   * Cleanup duplicate documents from `tickers` collection
   * because the external source feed the system with already
   * registered trade.
   *
   * Find duplicates based on grouping `time` and `symbol`
   * fields then counting its occurances and push the `_id`
   * of the fields into `ids` object.
   */

  @Cron(CronExpression.EVERY_HOUR)
  async cleanUpDuplicates() {
    this.logger.log(`Clean up aggregation pipeline started`);

    try {
      const duplicateDocs = await this.tickerModel.aggregate<{
        _id: { symbol: string; time: Date };
        ids: Types.ObjectId[];
      }>([
        {
          $group: {
            _id: { symbol: '$symbol', time: '$time' },
            count: { $sum: 1 },
            ids: {
              $push: '$_id',
            },
          },
        },
        {
          $match: {
            count: { $gt: 1 },
          },
        },
      ]);

      const idsToDelete: Types.ObjectId[] = [];

      duplicateDocs.forEach((doc) => {
        const [, ...ids] = doc.ids;
        if (ids.length > 0) {
          idsToDelete.push(...ids);
        }
      });

      const { deletedCount } = await this.tickerModel.deleteMany({
        _id: { $in: idsToDelete },
      });

      this.logger.log(
        `Clean up aggregation pipeline finished: removed ${deletedCount} duplicates`,
      );
    } catch (error) {
      this.logger.error(
        `Error occured while runnning the scheduled cleanup: ${error instanceof Error ? error.message : error}`,
      );
    }
  }
}
