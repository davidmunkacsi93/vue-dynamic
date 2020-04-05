import ApiIntegrationService from '../../../src/services/api-integration-service.js';
import Axios from 'axios';

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;

describe('run test for apis.guru swaggers', () => {
  it(
    'integration of defined apis must run without an error',
    async () => {
      var configuration = {
        crossDomain: true,
        baseURL: 'https://api.apis.guru/',
        url: '/v2/list.json',
        method: 'get'
      };
      const listResponse = await Axios.request(configuration);
      configuration.url = '/v2/metrics.json';
      const metricsResponse = await Axios.request(configuration);

      const apis = listResponse.data;
      const metrics = metricsResponse.data;

      var numOfApis = Object.keys(apis).length;
      var processedApis = 0;
      for (var api in apis) {
        console.log(`Progress: ${processedApis} of ${numOfApis}`);
        var apiObject = apis[api];
        for (var version in apiObject.versions) {
          var versionObject = apiObject.versions[version];
          try {
            const result = await ApiIntegrationService.integrateNewAPI(
              versionObject.swaggerYamlUrl
            );
          } catch (error) {
            console.log(
              `Could not integrate following api: ${api} version ${version}`
            );
            console.log(error.toString());
          }
        }
        processedApis++;
      }
    },
    MAX_SAFE_TIMEOUT
  );
});
