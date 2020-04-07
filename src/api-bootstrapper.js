import ApiKeyRepository from './repositories/api-key-repository';
import ApiModelRepository from './repositories/api-model-repsository';

const apiList = [
  'https://api.apis.guru/v2/specs/apis.guru/2.0.1/swagger.yaml',
  'https://api.swaggerhub.com/apis/davidmunkacsi93/petstore/1.0.0/swagger.json',
  'https://api.swaggerhub.com/apis/davidmunkacsi93/home-iot-api/1.0.0/swagger.json',
  'https://api.apis.guru/v2/specs/omdbapi.com/1/swagger.yaml',
  'https://api.apis.guru/v2/specs/sportsdata.io/nba-v3-play-by-play/1.0/swagger.yaml',
  'https://api.apis.guru/v2/specs/sportsdata.io/nba-v3-projections/1.0/swagger.yaml',
  'https://api.apis.guru/v2/specs/sportsdata.io/nba-v3-rotoballer-articles/1.0/swagger.yaml',
  'https://api.apis.guru/v2/specs/sportsdata.io/nba-v3-rotoballer-premium-news/1.0/swagger.yaml',
  'https://api.apis.guru/v2/specs/sportsdata.io/nba-v3-scores/1.0/swagger.yaml',
  'https://api.apis.guru/v2/specs/sportsdata.io/nba-v3-stats/1.0/swagger.yaml',
  'https://api.apis.guru/v2/specs/corona-virus-stats.herokuapp.com/v1/swagger.yaml',
  'https://api.apis.guru/v2/specs/github.com/9.0.0/openapi.yaml',
  'https://api.apis.guru/v2/specs/github.com/v3/swagger.yaml',
  'https://api.apis.guru/v2/specs/gitlab.com/v3/swagger.yaml'
];

const apiKeys = [
  {
    apiKey: 'fa42c8b4',
    parameterName: 'apiKey',
    type: 'query',
    url: 'http://www.omdbapi.com/'
  },
  {
    apiKey: '0567862bf59f462a9f52ecb368cd8f1b',
    parameterName: 'Ocp-Apim-Subscription-Key',
    type: 'header',
    url: 'http://api.sportsdata.io/v3/nba/pbp'
  },
  {
    apiKey: '0567862bf59f462a9f52ecb368cd8f1b',
    parameterName: 'Ocp-Apim-Subscription-Key',
    type: 'header',
    url: 'http://api.sportsdata.io/v3/nba/projections'
  },
  {
    apiKey: '0567862bf59f462a9f52ecb368cd8f1b',
    parameterName: 'Ocp-Apim-Subscription-Key',
    type: 'header',
    url: 'http://api.sportsdata.io/v3/nba/articles-rotoballer'
  },
  {
    apiKey: '0567862bf59f462a9f52ecb368cd8f1b',
    parameterName: 'Ocp-Apim-Subscription-Key',
    type: 'header',
    url: 'http://api.sportsdata.io/v3/nba/news-rotoballer'
  },
  {
    apiKey: '0567862bf59f462a9f52ecb368cd8f1b',
    parameterName: 'Ocp-Apim-Subscription-Key',
    type: 'header',
    url: 'http://api.sportsdata.io/v3/nba/scores'
  },
  {
    apiKey: '0567862bf59f462a9f52ecb368cd8f1b',
    parameterName: 'Ocp-Apim-Subscription-Key',
    type: 'header',
    url: 'http://api.sportsdata.io/v3/nba/stats'
  }
];

class ApiBootstrapper {
  async bootstrapApis(apiIntegrationService) {
    var apiModels = [];
    for (let url of apiList) {
      try {
        const apiModel = await apiIntegrationService.integrateNewAPI(url);
        apiModels.push(apiModel);
      } catch (err) {
        console.error(err);
        continue;
      }
    }

    await ApiModelRepository.addApiModels(apiModels);
  }
  async bootstrapApiKeys() {
    ApiKeyRepository.addApiKeys(apiKeys);
  }
  async bootstrap(apiIntegrationService) {
    await this.bootstrapApis(apiIntegrationService);
    await this.bootstrapApiKeys();
  }
}

const instance = new ApiBootstrapper();
Object.freeze(instance);
export default instance;
