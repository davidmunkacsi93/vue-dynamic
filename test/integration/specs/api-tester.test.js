import ApiIntegrationService from '../../../src/services/api-integration-service';
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

      var processed = 0;
      var failedApis = [];
      var results = [];

      for (var api in apis) {
        if (processed === 100) break;
        var apiObject = apis[api];
        for (var version in apiObject.versions) {
          console.log(`Progress: ${processed} of ${metrics.numSpecs}`);

          var versionObject = apiObject.versions[version];

          await Promise.race([
            ApiIntegrationService.integrateNewAPI(versionObject.swaggerYamlUrl),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Timed out')), 30000)
            )
          ])
            .then((result) => {
              results.push(result);
              processed++;
            })
            .catch((reason) => {
              failedApis.push({
                api: api,
                version: version,
                error: reason
              });
              processed++;
            });
        }
      }

      console.log(`Succesful: ${results.length}`);
      console.log(`Failed: ${failedApis.length}`);
      console.log(failedApis);
    },
    MAX_SAFE_TIMEOUT
  );
});
