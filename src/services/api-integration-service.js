import axios from "axios";
import SwaggerParser from "swagger-parser";

export default class ApiIntegrationService {
  getSwaggerSpecification(url) {
    var swaggerSpecification = axios
      .get(url)
      .then(response => console.log(response));

    var parsedSpecification = SwaggerParser.parse(swaggerSpecification);
    console.log(parsedSpecification);
  }
}
