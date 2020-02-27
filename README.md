# generic-customizable-web-ui

## Description
In web applications the changes on the backend usually have to be realized on the frontend as well. Whenever an interface changes, additional development effort is often required. Minor changes of an interface could be resolved within the application, when providing features for the user to configure the application themselves. There are already approaches, where the application dynamically responds to the change of the interface, but a generic solution for REST interfaces could not be found. Approaches to design and describe OpenAPI-based REST interfaces already exist, but they are not capable of issuing API calls and displaying the data in a user-friendly configurable interface. Moreover, features to integrate additional interfaces can be implemented to provide a better user experience and create more personalized applications.

For this matter a single page application will be implemented using a component-based approach based on the Vue.JS JavaScript framework. The implementation provides a solution to customize the layout and the rendered DOM elements based on the HTML Drag and Drop API. The responsive design is achieved through using Material Design components. OpenAPI specified REST interfaces can be integrated runtime based on Swagger.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
