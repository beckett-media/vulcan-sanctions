import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import configuration from 'src/config/configuration';
import { DetailedLogger } from 'src/logger/detailed';
import { SanctionResponse } from 'src/sanction/dtos/sanction.dto';

@Injectable()
export class ComplyadvantageService {
  private readonly logger = new DetailedLogger('ComplyadvantageService', {
    timestamp: true,
  });

  constructor(private httpService: HttpService) {}

  async search(
    fullName: string,
    yearOfBirth: number,
  ): Promise<SanctionResponse> {
    const searchTerm = fullName;
    const config = configuration()[process.env.runtime]['complyadvantage'];
    const url = `${config['base_url']}/searches`;
    const apiKey = config['api_key'];
    const requestConfig = {
      headers: {
        Authorization: `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
    };

    // create the search query
    var data = {
      search_term: searchTerm,
      fuzziness: config['fuzziness'],
      filters: {
        types: config['sanction_types'],
      },
    };
    if (yearOfBirth > 0) {
      data['filters']['birth_year'] = yearOfBirth.toString();
    }

    const response = await lastValueFrom(
      this.httpService.post(url, data, requestConfig).pipe(
        map((response) => {
          return response.data;
        }),
      ),
    );
    this.logger.log(JSON.stringify(response));

    var hits: any;
    try {
      hits = response['content']['data']['hits'];
    } catch (e) {
      return new SanctionResponse({});
    }

    var highMatch: any;
    for (let i = 0; i < hits.length; i++) {
      if (highMatch == undefined || hits[i].score > highMatch.score) {
        highMatch = hits[i];
      }
    }

    if (hits.length > 0) {
      return new SanctionResponse({
        ref: response['content']['data']['ref'],
        name: highMatch['doc']['name'],
        score: highMatch['score'],
        length: highMatch['doc']['types'].length,
        types: highMatch['doc']['types'].toString(),
      });
    } else {
      return new SanctionResponse({});
    }
  }
}
