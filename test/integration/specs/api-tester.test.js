import ApiIntegrationService from '../../../src/services/api-integration-service';
import Axios from 'axios';

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;

const blacklistedUrls = ['bungie.net', 'microsoft.com:graph', 'stripe.com'];

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

      const apis = Object.entries(listResponse.data);
      const metrics = metricsResponse.data;

      var processed = 1;
      var endpoints = 0;
      var failedApis = [];
      var results = [];

      for (var entry of apis) {
        if (blacklistedUrls.includes(entry[0])) {
          console.error(`URL ${0} is blacklisted and won't be processed`);
          processed++;
          continue;
        }

        var apiObject = entry[1];
        for (var version in apiObject.versions) {
          var versionObject = apiObject.versions[version];

          console.info(`Progress: ${processed} of ${metrics.numSpecs}`);
          console.info(`Parsing ${entry[0]}...`);

          const timeOut = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timed out')), 10000)
          );

          await Promise.race([
            ApiIntegrationService.integrateNewAPI(versionObject.swaggerYamlUrl),
            timeOut
          ])
            .then((result) => {
              results.push(result);
              processed++;
              if (result.dynamicComponents && result.dynamicComponents.length) {
                endpoints = endpoints + result.dynamicComponents.length;
              }
            })
            .catch((reason) => {
              console.error(
                `Parsing failed for API: ${versionObject.swaggerYamlUrl}\n${reason}`
              );
              failedApis.push(apiObject);
              processed++;
            });
        }
      }

      console.info(`Succesful API integration: ${results.length}`);
      console.info(`Succesful endpoint creation: ${endpoints}`);
      console.info(`Failed: ${failedApis.length}`);
      console.info(
        `Precision APIs: ${Math.round(
          (results.length / metrics.numSpecs) * 100
        )}%`
      );
      console.info(
        `Precision endpoints: ${Math.round(
          (endpoints / metrics.numEndpoints) * 100
        )}%`
      );
    },
    MAX_SAFE_TIMEOUT
  );
});
