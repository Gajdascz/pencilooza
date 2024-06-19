# Pencilooza

Created as part of [The Odin Project Curriculum](https://www.theodinproject.com/lessons/nodejs-inventory-application), Pencilooza is a pencil-themed mock application management web app. Users can submit 'manufacturer' applications which are then managed by the administrator. Once an application is submitted, only the administrator can review (accept or reject), create, delete, and update the data. Completing this project allowed me to integrate and explore essential web development concepts.

**Live Preview:** [Deployed using Railway](https://pencilooza-production.up.railway.app)

## Challenges

<details>
<summary>
<h4>Authorization</h4>
</summary>

- **Problem:** Restrict operation execution by requiring an admin password.
- **Solution:**
  <ol style='list-style-type:number;'>
  <li> Define a route to accept the authorization POST request.</li>
  <li> Create middleware
  <ul>
  <li>Sanitize the user input.</li>
  <li>Accept an `adminPassword` and `adminCommand`.</li>
  <li> Define a collection of key-value pairs where the key represents the restricted `adminCommand`, and the value is a function that executes if the authorization passes (handles the request).</li>
  <li> Compare the user input to the admin password (stored in an environment variable).</li>
  <li> If the input is valid then retrieve and execute the function in the previously defined collection of key value pairs using the adminCommand as the key.</li>  
   </ul>
  </li>
  <li>Assign the middleware to handle POST requests sent to the route defined in step 1.</li>
  <li>Create a form with an input to accept the password and a hidden field containing the restricted adminCommand which handles the request.</li>
  <li>Use AJAX to:
  <ul>
  <li>send a POST request to the route defined in step one containing the provided password and requested admin command.</li>
  <li>Handle the fetch response from the server by updating the user interface or redirecting to a new page.</li>
  </ul>
  </li>
  </ol>
  </details>

<details>
<summary>
<h4>Form UI Updates</h4>
</summary>

- **Problem:** Update the client-facing user interface based on server-sided validation results.
- **Solution:**
  <ol style='list-style-type:number;'>
  <li>Create your template with fields that have unique ids for targeting.</li>
  <li>Create a client side script to use these unique ids to select and update the form fields.</li>
  <li>POST the form data to the server for validation and parsing.</li>
  <li>Validate the input and parse the errors to connect a field selector (the unique id created for targeting in step 1) to the error message.</li>
  <li>Pass the parsed validation errors to the client-side script created in step 2 by using one of the following methods:</li>
  <ul>
  <li>Pass the errors to the template directly through res.render and embed the errors in a hidden element for the client side scripts to handle.</li>
  <li>Use AJAX to send the data to the validation endpoint with a fetch POST request and await the response. Use the response to either update the UI by calling the client side script directly, or pass the data to a redirected route by creating a form, injecting the data into inputs and posting the data to the redirect route</li>
  </ul>
  </ol>
</details>

## Learning Outcome

<details><summary>Express/Node</summary>

- **Routing:** Gained a deeper understanding of routing and how data flows between server and client.
- **Centralized Route Authorization:** Implemented centralized route authorization by requiring an administrator password to execute certain operations.
- **Form Sanitization and Validation:** Used the `express-validator` library to sanitize and validate user input.
- **AJAX:** Implemented AJAX principles to exchange data between the server and client.

  <details><summary>Libraries</summary>

  - **compression:** Reduces the size of served content, which improves load time and resource usage.
  - **helmet:** Provides security by setting various HTTP headers.
  - **debug:** Allows console logging based on node environment and namespaces.
  - **express-rate-limit:** Configurable client request restrictions.
  - **morgan:** HTTP request logger middleware.
  - **dotenv:** Loads environment variables from .env file into process.env.
  </details>

</details>

<details><summary>MongoDB/Mongoose</summary>
 
- **Configuration:** Configured and deployed a Mongo MongoDB database using the Mongoose library.
- **Asynchronous Queries and Error Handling:** Gained practical knowledge in handling asynchronous database queries, managing errors and exceptions, and general Mongoose usage.
- **Population Script:** Created a script to populate the database with structured default data.
- **Aggregation Framework:** Utilized MongoDB's aggregation framework to query specific data of documents.
</details>

<details><summary>Model-View-Controller (MVC) Architecture</summary>

- **Model:** Manages data schema properties.
- **View:** Provides templates rendered using model data.
- **Controller:** Interfaces between model and view, handling input/requests to retrieve data from the model and render views.
</details>

<details><summary>Pug</summary>

- Worked with the [Pug template engine](https://pugjs.org/api/getting-started.html) to render dynamic webpages.
- Created reuseable Mixins to streamline and normalize HTML element creation.
- Learned how to decouple and refactor inline-javascript from templates to improve security, code modularity, and project organization.
- Learned about Interpolation and how it can be used to access server-side data directly in client-side inline-JavaScript.
</details>

<details><summary>Other</summary>

- Deployed the application using [Railway](https://railway.app/), which provides a robust and intuitive platform for fullstack app deployment.
- [Created a UML Class diagram](/public/documents/models.pu) using [plantUML](https://plantuml.com/) to plan the general structure of the document Models.
</details>

## Improvements

- Complete Item implementation.
- Clean up and polish the user interface.
- Improve and modularize CSS.
- Implement more account types.
- Restructure project files.

## Created With

<details><summary>Core</summary>

- [**JavaScript**](https://ecma-international.org/publications-and-standards/standards/): Primary language.
- [**HTML5**](https://html.spec.whatwg.org/multipage/): DOM structuring.
- [**CSS3**](https://www.w3.org/Style/CSS/): Design and styling.
- [**Node.js**](https://nodejs.org/): JavaScript runtime environment.
- [**Express**](https://expressjs.com/): Node.js web framework.
- [**MongoDB**](https://mongodb.com/): Non-relational database management system.
- [**pug**](https://pugjs.org/): JavaScript template engine.
- [**mongoose**](https://mongoosejs.com/): MongoDB Object Data Manager (ODM).
</details>

<details><summary>Libraries</summary>

- [**debug**](https://github.com/debug-js/debug/): Provides console debugging based on application environment and namespaces.
- [**dotenv**](https://github.com/motdotla/dotenv/): Loads environment variables from .env\* file(s) into process.env.
- [**express-application-generator**](https://github.com/expressjs/generator#readme): Generates file structure and boilerplate for an Express application.
- [**cookie-parser**](https://github.com/expressjs/cookie-parser): Parses cookie headers and populates the req.cookise with an object keyed by the cookie names.
- [**morgan**](https://github.com/expressjs/morgan): HTTP request logger.
- [**http-errors**](https://github.com/jshttp/http-errors): Used to create HTTP errors for node web applications.
- [**helmet**](https://helmetjs.github.io/): Helps secure Express applications by setting HTTP response headers.
- [**compression**](https://github.com/expressjs/compression): Compresses request response bodies
- [**express-async-handler**](https://github.com/Abazhenov/express-async-handler): Handles exceptions for asynchronous express route handlers.
- [**express-rate-limit**](https://github.com/express-rate-limit/express-rate-limit): Limits repeated requests to public APIs and/or endpoints.
- [**express-validator**](https://express-validator.github.io/docs/): Wraps [validator.js](https://github.com/validatorjs/validator.js) to provide validation and sanitization of express requests.
</details>

<details><summary>Development and Deployment</summary>

- [**PlantUML**](https://plantuml.com/): Diagram tool.
- [**Railway**](https://railway.app/): Infrastructure platform for managing, monitoring, and deploying full-stack web applications.
- [**MongoDB Atlas**](https://www.mongodb.com/): Cloud database service that automates deployment, scaling, and management of MongoDB clusters.
- [**ESLint**](https://eslint.org/): Static JavaScript code analyzer.
- [**ESLint Config Standard**](https://github.com/standard/eslint-config-standard): Enforces JavaScript Standard Style code syntax rules through ESLint.
- [**ESLint Config Prettier**](https://github.com/prettier/eslint-config-prettier): Turns off conflicting and/or unnecessary ESLint rules for Prettier.
- [**Prettier**](https://prettier.io/): Code formatter to enforce consistency.
- [**GitHub**](https://github.com/): Remote repository hosting.
- [**Git**](https://git-scm.com/): Version control and source code management.
</details>

## License

Copyright © 2024 Nolan Gajdascz | GitHub

This project is licensed under the GNU General Public License v3.0 - see the LICENSE file for details.
