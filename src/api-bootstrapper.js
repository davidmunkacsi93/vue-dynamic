import { ADD_NEW_API, ADD_API_KEY } from "./types/action-types";

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
  'https://api.apis.guru/v2/specs/sportsdata.io/nba-v3-stats/1.0/swagger.yaml'
];

const apiKeys = [
  {
    apiKey: 'fa42c8b4',
    parameterName: 'apiKey',
    type: 'query',
    url: 'http://omdbapi.com'
  },
  {
    apiKey: '0567862bf59f462a9f52ecb368cd8f1b',
    parameterName: 'Ocp-Apim-Subscription-Key',
    type: 'header',
    url:
      'https://api.apis.guru/v2/specs/sportsdata.io/nba-v3-play-by-play/1.0/swagger.yaml'
  },
  {
    apiKey: '0567862bf59f462a9f52ecb368cd8f1b',
    parameterName: 'Ocp-Apim-Subscription-Key',
    type: 'header',
    url:
      'https://api.apis.guru/v2/specs/sportsdata.io/nba-v3-projections/1.0/swagger.yaml'
  },
  {
    apiKey: '0567862bf59f462a9f52ecb368cd8f1b',
    parameterName: 'Ocp-Apim-Subscription-Key',
    type: 'header',
    url:
      'https://api.apis.guru/v2/specs/sportsdata.io/nba-v3-rotoballer-articles/1.0/swagger.yaml'
  },
  {
    apiKey: '0567862bf59f462a9f52ecb368cd8f1b',
    parameterName: 'Ocp-Apim-Subscription-Key',
    type: 'header',
    url:
      'https://api.apis.guru/v2/specs/sportsdata.io/nba-v3-rotoballer-premium-news/1.0/swagger.yaml'
  },
  {
    apiKey: '0567862bf59f462a9f52ecb368cd8f1b',
    parameterName: 'Ocp-Apim-Subscription-Key',
    type: 'header',
    url:
      'https://api.apis.guru/v2/specs/sportsdata.io/nba-v3-scores/1.0/swagger.yaml'
  },
  {
    apiKey: '0567862bf59f462a9f52ecb368cd8f1b',
    parameterName: 'Ocp-Apim-Subscription-Key',
    type: 'header',
    url:
      'https://api.apis.guru/v2/specs/sportsdata.io/nba-v3-stats/1.0/swagger.yaml'
  }
];

class ApiBootstrapper {
  bootstrapApis(store, apiIntegrationService) {
    apiList.forEach((url) => {
      apiIntegrationService.integrateNewAPI(url).then((apiModel) => {
        store.dispatch(ADD_NEW_API, apiModel);
      });
    });
  }
  bootstrapApiKeys(store) {
    apiKeys.forEach((apiKey) => {
      store.dispatch(ADD_API_KEY, apiKey);
    });
  }
  bootstrap(store, apiIntegrationService) {
    this.bootstrapApis(store, apiIntegrationService);
    this.bootstrapApiKeys(store);
  }
}

const instance = new ApiBootstrapper();
Object.freeze(instance);
export default instance;
