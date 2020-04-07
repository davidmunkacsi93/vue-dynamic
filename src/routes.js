import AddApi from './pages/AddApi.vue';
import ApiContent from './pages/ApiContent.vue';
import Home from './pages/Home.vue';
import ApiKeys from './pages/ApiKeys.vue';

import ApiModelRepository from './repositories/api-model-repsository';
import DynamicComponentRepository from './repositories/dynamic-component-repository';

export const API_ROUTE_NAME = 'api';

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/api/:id',
    component: ApiContent,
    props: async (route) => ({
      apiModel: await ApiModelRepository.getApiModelById(route.params.id),
      dynamicComponents: await DynamicComponentRepository.getDynamicComponentsByApiModelId(
        route.params.id
      )
    })
  },
  {
    path: '/apiKeys',
    component: ApiKeys
  },
  {
    path: '/addApi',
    component: AddApi
  }
];
