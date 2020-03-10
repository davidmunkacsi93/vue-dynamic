import AddApi from "./components/AddApi.vue";
import ApiContent from "./components/ApiContent.vue";
import Home from "./components/Home.vue";

export const API_ROUTE_NAME = "api";

export default [
  {
    path: "/",
    component: Home
  },
  {
    path: "/api/:apiId",
    name: API_ROUTE_NAME,
    component: ApiContent
  },
  {
    path: "/addApi",
    name: "addApi",
    component: AddApi
  }
];
