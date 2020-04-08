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
    path: '/api/:id',
    name: API_ROUTE_NAME,
    component: ApiContent
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
