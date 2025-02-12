import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import chalk from 'chalk';
import { Model } from 'mongoose';
import { toDecimal128 } from 'src/common/helpers/to-mongo-decimal.helper';
import { ITicker } from 'src/common/interfaces/ticker.interface';
import { CompanyRegistryService } from 'src/company-registry/company-registry.service';
import { ICompany } from 'src/company-registry/interfaces/company.interface';
import { Ticker } from './schemas/ticker.schema';

/**
 * Nothing fancy in here.
 * All the codes inside `OnModuleInit` are used
 * for printing the received tickers onto the console.
 */

@Injectable()
export class TickerProcessorService implements OnModuleInit {
  private readonly logger = new Logger(TickerProcessorService.name);
  private companies: ICompany[] = [];
  private nameMaxLength = 0;
  private sectorMaxLength = 0;

  constructor(
    @InjectModel(Ticker.name)
    private readonly tickerModel: Model<Ticker>,
    private readonly companyRegistryService: CompanyRegistryService,
  ) {}

  async onModuleInit() {
    const companies = await this.companyRegistryService.findAll();
    // TODO: Type the repository returns methods
    this.companies = companies as ICompany[];

    // find the string length of the longest company name
    // to create a padding when printing
    this.nameMaxLength = this.companies
      .map((c) => c.tradingNameAr.length)
      .reduce((prev, curr) => {
        if (curr > prev) return curr;
        return prev;
      }, 0);

    // Same as above, find the longest sector name
    this.sectorMaxLength = this.companies
      .map((c) => c.sectorAr.length)
      .reduce((prev, curr) => {
        if (curr > prev) return curr;
        return prev;
      }, 0);
  }

  /**
   * Save the ticker into a time-series
   * collection.
   */
  async saveTicker(ticker: ITicker) {
    return this.tickerModel.create(ticker);
  }

  /**
   * Print the received formatted ticker
   * onto the console.
   */
  printTicker(ticker: ITicker) {
    const { symbol } = ticker;
    const company = this.companies.find((company) => company.symbol === symbol);
    if (!company) {
      console.error(`Symbol ${symbol} not found`);
      return;
    }

    const companyName = chalk.yellow(
      company.tradingNameAr.padEnd(this.nameMaxLength),
    );

    const change =
      ticker.change > toDecimal128(0)
        ? chalk.greenBright(ticker.change)
        : chalk.redBright(ticker.change);

    const changePercent =
      ticker.changePercent > toDecimal128(0)
        ? chalk.greenBright(ticker.changePercent, '%')
        : chalk.redBright(ticker.changePercent, '%');

    const market = company.marketType == 'TASI' ? 'تاسي' : 'نمو';
    const sector = chalk.bold(company.sectorAr.padEnd(this.sectorMaxLength));
    const time = chalk.gray(`${ticker.time.toLocaleTimeString([])}`);

    console.log(
      ` ${chalk.bold(chalk.blue(market))}\t[${chalk.blue(company.symbol)}]\t${chalk.bold(companyName)}\t${ticker.price}\t${change}\t${changePercent}\t${sector}\t[${time}]`,
    );
  }
}
