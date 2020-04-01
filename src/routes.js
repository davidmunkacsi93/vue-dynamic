import AddApi from './pages/AddApi.vue';
import ApiContent from './pages/ApiContent.vue';
import Home from './pages/Home.vue';
import ApiKeys from './pages/ApiKeys.vue';

export const API_ROUTE_NAME = 'api';

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/api/:apiId',
    name: API_ROUTE_NAME,
    component: ApiContent
  },
  {
    path: '/apiKeys',
    name: 'apiKeys',
    component: ApiKeys
  },
  {
    path: '/addApi',
    name: 'addApi',
    component: AddApi
  }
];
