import ApiComponent from "./components/ApiComponent.vue";
import LandingPage from "./components/LandingPage.vue";

export default [
  {
    path: "/",
    component: LandingPage
  },
  {
    path: "/api/:apiId",
    component: ApiComponent
  }
];
