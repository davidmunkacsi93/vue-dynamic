import ApiContent from "./components/ApiContent.vue";
import LandingPage from "./components/LandingPage.vue";

export default [
  {
    path: "/",
    component: LandingPage
  },
  {
    path: "/api/:apiId",
    component: ApiContent
  }
];
