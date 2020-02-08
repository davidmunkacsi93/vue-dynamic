import ApiContent from "./components/ApiContent.vue";
import Home from "./components/Home.vue";

export default [
  {
    path: "/",
    component: Home
  },
  {
    path: "/api/:apiId",
    name: "api",
    component: ApiContent
  }
];
