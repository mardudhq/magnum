import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CompanyRegistry } from './schemas/company-registry.schema';
import { Model } from 'mongoose';
import { fetchSymbols } from 'tadawul-symbol';
import { CreateCompanyRegistryDto } from './dto/create-company-registry.dto';

@Injectable()
export class CompanyRegistryService {
  private readonly logger = new Logger(CompanyRegistryService.name);

  constructor(
    @InjectModel(CompanyRegistry.name)
    private readonly companyRegisteryModel: Model<CompanyRegistry>,
  ) {}

  findAll(projection?: Record<string, 0 | 1>) {
    return this.companyRegisteryModel.find({}, projection).exec();
  }

  findBySymbol(symbol: string) {
    return this.companyRegisteryModel.findOne({ symbol }).exec();
  }

  async create(
    createCompanyRegistryDto: CreateCompanyRegistryDto,
  ): Promise<CompanyRegistry> {
    try {
      const createCompanyRegistry = new this.companyRegisteryModel(
        createCompanyRegistryDto,
      );
      const companyRegistry = await createCompanyRegistry.save();
      return companyRegistry;
    } catch (error) {
      console.log(error.code);
      if (error.code === 11000) {
        throw new ConflictException(
          `A company with the given symbol [${createCompanyRegistryDto.symbol}] already exists.`,
        );
      }
      throw error;
    }
  }

  async performCompanyRegistryInsertion() {
    try {
      // Fetch symbols concurrently
      const [tasiCompanies, nomucCompanies] = await Promise.all([
        fetchSymbols('TASI'),
        fetchSymbols('NOMUC'),
      ]);

      const companies = [...tasiCompanies, ...nomucCompanies];

      // Process company insertion
      const insertionPromises = companies.map(async (company) => {
        try {
          const result = await this.create(company);
          this.logger.log(`Successfully inserted: ${result.symbol}`);
        } catch (error: unknown) {
          if (error instanceof ConflictException) {
            this.logger.warn(error.message);
          } else {
            this.logger.error(
              `Error inserting company ${company.symbol}: ${error instanceof Error ? error.message : error}`,
            );
          }
        }
      });

      await Promise.all(insertionPromises);
      this.logger.log(`Company Registry insertion completed`);
    } catch (error) {
      this.logger.error(
        `Error while executing ${this.performCompanyRegistryInsertion.name}: ${error instanceof Error ? error.message : error}`,
      );
    }
  }

  async performCompanyRegistryDeactivation() {
    try {
      // Fetch symbols concurrently
      const [tasiCompanies, nomucCompanies] = await Promise.all([
        fetchSymbols('TASI'),
        fetchSymbols('NOMUC'),
      ]);

      const companies = [...tasiCompanies, ...nomucCompanies];

      // Perform company dectivation
      //
      // Check whether there are companies in the database
      // that is not presented in the latest fetched companies.
      // If yes, update isActive to false

      const allLatestCompanies = await this.findAll();
      const dectivationPromises = allLatestCompanies
        .filter((company) => company.isActive === true)
        .map(async (company) => {
          try {
            const isExist = companies.findIndex(
              (el) => el.symbol === company.symbol,
            );

            if (isExist === -1) {
              // Does not exist, turn isActive OFF
              this.logger.log(
                `Found a company (${company.symbol}) that is not included in the latest fetch.`,
              );
              return await this.companyRegisteryModel
                .findByIdAndUpdate(company._id, {
                  isActive: false,
                })
                .exec();
            }
          } catch (error) {
            this.logger.error(
              `Error while check for active company ${company.symbol}: ${error instanceof Error ? error.message : error}`,
            );
          }
        });

      await Promise.all(dectivationPromises);
      this.logger.log(`Company Registry activation/dectivation completed`);
    } catch (error) {
      this.logger.error(
        `Error while executing ${this.performCompanyRegistryDeactivation.name}: ${error instanceof Error ? error.message : error}`,
      );
    }
  }
}
