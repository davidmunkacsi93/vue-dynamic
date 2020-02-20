import axios from "axios";
import SwaggerParser from "swagger-parser";

class ApiIntegrationService {
  getSwaggerSpecification(url) {
    var swaggerSpecification = axios
      .get(url)
      .then(response => console.log(response));

    return SwaggerParser.parse(swaggerSpecification);
  }
}

const instance = new ApiIntegrationService();
Object.freeze(instance);

export default instance;
