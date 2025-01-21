import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import chalk from 'chalk';
import { Model } from 'mongoose';
import { ITicker } from 'src/common/interfaces/ticker.interface';
import { CompanyRegistryService } from 'src/company-registry/company-registry.service';
import { ICompany } from 'src/company-registry/interfaces/company.interface';
import { Ticker } from './schemas/ticker.schema';

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

  async append(ticker: ITicker) {
    return this.tickerModel.create(ticker);
  }

  printTicker(ticker: ITicker) {
    const symbol = ticker.id.slice(0, ticker.id.indexOf('.'));
    const company = this.companies.find((company) => company.symbol === symbol);
    if (!company) console.error(`Symbol ${symbol} not found`);

    const companyName = chalk.yellow(
      company.tradingNameAr.padEnd(this.nameMaxLength),
    );
    const change =
      ticker.change > 0
        ? chalk.greenBright(ticker.change.toFixed(2))
        : chalk.redBright(ticker.change.toFixed(2));

    const changePercent =
      ticker.changePercent > 0
        ? chalk.greenBright(ticker.changePercent.toFixed(2), '%')
        : chalk.redBright(ticker.changePercent.toFixed(2), '%');

    const market = company.marketType == 'TASI' ? 'تاسي' : 'نمو';
    const sector = chalk.bold(company.sectorAr.padEnd(this.sectorMaxLength));

    const time = chalk.gray(`${ticker.time.toLocaleTimeString([])}`);

    console.log(
      ` ${chalk.bold(chalk.blue(market))}\t[${chalk.blue(company.symbol)}]\t${chalk.bold(companyName)}\t${ticker.price.toFixed(2)}\t${change}\t${changePercent}\t${sector}\t[${time}]`,
    );
  }
}
