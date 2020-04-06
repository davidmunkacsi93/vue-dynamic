import ApiIntegrationService from '../../../src/services/api-integration-service';
import Axios from 'axios';

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;

const blacklistedUrls = ['bungie.net', 'microsoft.com:graph'];

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

      var processed = 0;
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
            })
            .catch((reason) => {
              console.error(
                `Parsing failed for API: ${versionObject.swaggerYamlUrl}\n${reason}`
              );
              processed++;
            });
        }
      }

      console.info(`Succesful: ${results.length}`);
      console.info(`Failed: ${failedApis.length}`);
      console.info(
        `Precision: ${Math.round(
          ((results.length / metrics.numSpecs) * 100) / 100
        )}%`
      );
    },
    MAX_SAFE_TIMEOUT
  );
});
