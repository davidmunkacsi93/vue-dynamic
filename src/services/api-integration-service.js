import axios from "axios";
import SwaggerParser from "swagger-parser";

class ApiIntegrationService {
  async getSwaggerSpecification(url) {
    axios
      .get(url)
      .then(response => {
        SwaggerParser.validate(response.data)
          .then(async () => {
            let parsedSpecification;
            if (response.headers["content-type"] === "application/yaml") {
              parsedSpecification = await SwaggerParser.parse(response.data);
            } else if (response.headers["content-type"] == "application/json") {
              parsedSpecification = response.data;
            } else {
              console.error(
                `Specification format ${
                  response.headers["content-type"]
                } is not supported.`
              );
            }
            console.log(parsedSpecification);
          })
          .catch(() => {
            console.log("Invalid specification");
          });
      })
      .catch(response => {
        console.error(response.code);
      });
  }

  parseSpecification() {
    const specification = require("../example-spec/las-swagger.json");
    SwaggerParser.parse(specification).then(apiDocumentation =>
      console.log(apiDocumentation)
    );
  }
}

const instance = new ApiIntegrationService();
Object.freeze(instance);

export default instance;
