# LooseLeaf - Node.js App

## Getting Started

We are going to use the following stack:

- **Platform:** [node](https://nodejs.org/docs/latest/api/https.html)
- **Framework**: [express](https://expressjs.com/en/4x/api.html)
- **CSS Framework**: [materialize](http://materializecss.com/getting-started.html)
- **CSS Preprocessor**: SASS
- **JavaScript Framework**: React with [`react-router`](https://github.com/ReactTraining/react-router) v4 and [`react-router-config`](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config)
- **Build Tool**: webpack
- **Unit Testing**: `mocha`, `chai`
- **Integration Testing**: `SuperTest` and `cheerio`.
- **Database**: mongodb
- **Authentication**: facebook, email, google, github, twitter
- **Deployment**: digitalOcean

### Tools

- [`create-react-app`](https://github.com/facebookincubator/create-react-app)
- [`react-hot-loader`](https://github.com/gaearon/react-hot-loader)
- [`NVM`](https://github.com/creationix/nvm)

Authentication and Database Middleware

- [`mongoose`](http://mongoosejs.com/index.html) - object modeling for our MongoDB database
- [`passport`](http://www.passportjs.org/docs/authorize/) - help us authenticating with different methods

Automated Testing

- [`mocha`](https://mochajs.org/) sets up the unit test, while [`chai`](http://chaijs.com/) helps you accomplish a unit test using asserts.
- [`SuperTest`](https://github.com/visionmedia/supertest) spools up your Express server and sends requests to it.Once the requests come back, you can make assertions about the response.
- [`cheerio`](https://cheerio.js.org/) is jQuery for Node. It'll help your server code parse HTML.

### Baseline App
Take the following steps to create a baseline app:

1. Follow [this tutorial](http://joshbroton.com/add-react-hot-reloading-create-react-app/) to set up a [`create-react-app`](https://github.com/facebookincubator/create-react-app) with [`react-hot-loader`](https://github.com/gaearon/react-hot-loader)
	> React Hot Loader allows you to tweak React components in real time.

2. Follow [this tutorial](https://www.mokuji.me/article/universal-app-react-router) to set up the rest of the [`create-react-app`](https://github.com/facebookincubator/create-react-app) project to use [`react-router`](https://github.com/ReactTraining/react-router). We are going to use Version 4.x of the React Router, which is a complete rewrite of Versions 3.x and prior.

	**Warning**:  Implementing the Build, Run & Develop section in the second tutorial could cause `react-hot-loader` to not work so this section wasn't implemented in the baseline app, which is available for download [on Github](https://github.com/xiaoyunyang/looseleaf-node/tree/baseline).

3. FullStackReact's [Tutorial](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/#enter-create-react-app) and [Sample Project](https://github.com/fullstackreact/food-lookup-demo) - A `create-react-app` with server example
	- Pro: Builds a client app to run concurrently with a server app.
	- Con: This helps you build a single page application. If you want to build a isomorphic webapp, proceed with the next step.

4. Isomorphic Webapp Book [Chapter 2 Sample Code](https://github.com/isomorphic-dev-js/chapter2-a-sample-isomorphic-app.git)
	**Learning**

* [React Express Tutorial](http://www.react.express/webpack) provides a comprehensive overview of `create-react-app`.


## Docs

**File Structure**

```
$ tree -l 3 --ignore 'node_modules'
```

```
looseleaf-node
├───package.json
├───.babelrc
├───.env <== #C
├───server
│   ├───server.js <== #B
│   ├───start-client.js	 
│   ├───run.js <== #A
│   ├───build
│   ├───data <== #A
│   ├───assets <== #A
│   └───api
|   	 └───api1.js <== #A and #B
├───test
├───client
│   ├───package.json
│   ├───config
│   ├───public
|   |   └───favicon.ico
|   |   └───index.html  <== #B
│   ├───src
│   |   └───shared
|   |   |   ├───Profile
|   |   |   |   ├── App.js <== #A
|   |   |   |   ├── HTML.js <== #A
|   |   |   |   ├── Header.js
|   |   |   |   ├── Home.js
|   |   |   |   ├── Main.js
|   |   |   |   ├── NotFound.js
|   |   |   |   └── routes.js <== #A
|   |   |   └───Recipe
|   |   |       ├── App.js
|   |   |       ├── HTML.js
|   |   |       └── ...
│   |   ├───AppUser.js <== #B
│   |   └───index.js <== #B
│   |   └───main.js <== #A
|   ├───iso-middleware
|   |   ├── renderRoute.jsx <== #D
|   |   └── renderView.jsx <== #D

```

**Notes**

* Lots of extraneous folders and files were omitted from the file structure map above because they are auto-generated when you first set up your project or after when you build the project
* **#A**: These files are the entry points for the isomorphic webapp.
* **#B**: These files are associated with the create-react-app, which includes HMR and react-hot-loader for better development work flow. `index.js` and `index.html` are the entry points. `index.js` renders component that attaches to the root componnent identified in the `index.html` file.
* **#C**: These files are omitted from the github repo because they contain authentication ids, secrets, etc that are application-specific
* **#D**: These files are used by the server to render html pages using React code shared with the client.

## Tutorial

* [React Express](http://www.react.express/environment)
	>Facebook provides a command-line utility called `create-react-app` which automatically sets up a new React project with a sensible default project structure and feature set. This is the best way to get started as a beginner.

	>You'll likely outgrow this option pretty quickly as you get a better grasp of React and want to customize your stack. Fortunately, create-react-app offers an `eject` option to export your app, so you're not locked in.

* [create-react-app](https://github.com/facebookincubator/create-react-app)
>Create React App is agnostic of the backend, and just produces static HTML/JS/CSS bundles.
* [my babel tutorial](https://github.com/xiaoyunyang/web-dev-cheatsheets/blob/master/guides/es6-and-babel.md)
* [my isomorphic webapp tutorial](https://github.com/xiaoyunyang/web-dev-cheatsheets/blob/master/fundamental/isomorphic-webapp.md)

## Running the App

Before running the app, you have to set up a few things:

1. From the project directory, run the command:

	```
	$ npm install && cd client && npm install && cd ..
	$ mkdir server/build
	```

	This installs all the dependencies in your `package.json` from for both the server and the client. Everytime you make changes to `package.json`, `npm install` needs to be run so that the dependencies defined in the file would get downloaded by npm. The dependencies gets downloaded into a folder called node_modules.
2. Set up your database for the app:

	**MongoDB**

	* Install MongoDB:  `$ brew install mongodb`
	* Create the data directory: `$ sudo mkdir -p /data/db`
	* Set permissions for the data directory:

		```
		$ sudo chown -R `whoami` /data/db
		```
	* Run MongoDB server: `$ mongod`
	* Run MongoDB shell in a separate terminal: `$ mongo`
	* Some useful commands to run in the mongo shell

		```
		> use test $ switch to db test
		> show collections $ list all collections inside current db
		users
		> db.users.find() $ in the users collection, return all documents
		> db.users.remove( { } ) $ remove all documents in the users collection
		> db.users.remove( { index } )
		> db.users.dropIndexes()
		```
 Check out [Azat Marda's Cheatsheet](https://github.com/azat-co/cheatsheets/tree/master/mongodb-mongoose), [Quick Reference](https://docs.mongodb.com/manual/reference/mongo-shell/), and [Little Mongo Handbook](http://openmymind.net/mongodb.pdf) for more useful commands.

3. If you are developing on the client side only, `$ cd client` then `$ npm run build` or `$ yarn build` - Build the project. For production builds, you'll want to use `npm run build` to build an optimized bundle and transpiled down to ES5, which will be saved to the filesystem. If you don't have hot reloading enabled, you have to run this after making changes to your source code to allow the changes to take effect next time you start the client server. This is undesirable and there are a few workarounds, in particular, nodemon and react-hot-reloader, which will be discussed in more detail below.

4. For developing an integrated client and server app, we want to  run the isomorphic webapp with the following command line:

	  ```
	  $ npm start
	  ```

	  This will give us access to:	  
	  - [http://localhost:3001/](http://localhost:3001/)
	  - [http://localhost:3001/iso](http://localhost:3001/iso)
	  - [http://localhost:3001/api/hello](http://localhost:3001/api/hello)
	  If you are not seeing changes made to the client app, do the following, before running the start script again:

	  ```
	  $ npm build-client
	  ```

5. For developing an server and client separately

	* To run both the server and client in separately, do the following, which starts the server to automomatically listen on port 3001 ([http://localhost:3001/](http://localhost:3001/)) and the client to automomatically listen on port 3000 ([http://localhost:3000/](http://localhost:3000/)).

		```
		$ npm start-dev
		```
		If the single page application doesn't render correctly on the server, you need to do this:

		```
		# npm build-client
		```

		The `npm start-dev` script is equivalent to running `npm run start-server` and `npm run start-client` concurrently. We learn how to do that from FullStackReact's [Tutorial](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/#enter-create-react-app) and [Sample Project](https://github.com/fullstackreact/food-lookup-demo).

	* To run just the server app, do

		```
		$ npm run start-server
		```		

	* To run both the client and server app, do

		```
		$ npm start-dev
		```

	* To run the client app, do

		```
		$ npm run start-client
		```

		Alternatively,

		```
		$ cd client && npm start
		```

		In this mode, you can use `react-hot-loader` to make changes to react components in runtime.

		Just go to [http://localhost:3001/api/hello](http://localhost:3000) to see change being made.


		If you want to run on other ports, like 9000, 8000, 8080, just specify the port you want:

		```
		$ PORT=9000 npm start
		```
	* To run the server to serve static content:

		```
		$ yarn global add serve
		$ serve -s build
		```

		In this mode, you can't use `react-hot-loader` because the client app is rendered on the server side.

5. Stop the database server when you are done:
	* Stop the postgres database

	 ```
	 $ pg_ctl -D /usr/local/var/postgres stop
	 ```

	* Or if you use mongo: `control`+`C`  


## Redux

> [`redux`](https://redux.js.org/) is a manager of global variables for React components.

**Middleware**

* [`redux-thunk`](https://github.com/gaearon/redux-thunk) - allows you to write action creators that return a function instead of an action. `redux-thunk` allows you to delay the dispatch of an action or to dispatch only if a certain condition is met. A thunk is a function that wraps an expression to delay its evaluation.
* [`redux-promise`](https://github.com/acdlite/redux-promise) - receives a promise, dispatch the resolved value of the promise, but will not dismatch anything if the promise rejects.
* [`redux-logger`](https://github.com/evgenyrodionov/redux-logger) - logging tool that lets you replay problems as if they happened in your own browser.
* [`react-redux`](https://github.com/reactjs/react-redux) - We need to use `connect` from `react-redux` to connect a React component to a Redux store.

### Express

* [`morgan`](https://www.npmjs.com/package/morgan-2) - log every request to the console
* [`body-parser`](https://github.com/expressjs/body-parser) -  get information from html forms

### Authentication

See [the tutorial](https://github.com/xiaoyunyang/web-dev-cheatsheets/blob/master/guides/auth-setup.md) for how to set up `passport` and `postgresql` with your react-node app.

We also need to create a controller for creating the `User` object after the user enters all the required information:

```
$ mkdir controllers
$ touch controllers/user.js
```

The `user` controller will include logic for creating a new user and authenticating a returning user. The `user` controller relies on the `User` model for creating a new `User`. The `user` controller requires the following dependencies:

* [`async`](https://caolan.github.io/async/) - We will be using `async.waterfall` a lot, which:

	> Runs the tasks array of functions in series, each passing their results to the next in the array. However, if any of the tasks pass an error to their own callback, the next function is not executed, and the main callback is immediately called with the error.
* [`nodemailer`](https://nodemailer.com/about/) - a module for Node.js applications to allow easy as cake email sending.
* [`jsonwebtoken`](https://github.com/auth0/node-jsonwebtoken)
* [`moment`](https://github.com/moment/moment) - is a lightweight Javascript date library for parsing, validating, manipulating, and formatting dates.
* [`request`](https://www.npmjs.com/package/request) - Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.
* [`querystring`](https://nodejs.org/api/querystring.html) - Node's utilities for parsing and formatting URL query strings.


**Oauth**

1. Install dependencies
	* [`moment`](https://github.com/moment/moment), which is a lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
	* [`react-cookie`](https://github.com/reactivestack/cookies/tree/master/packages/react-cookie), which lets you load and save cookies with React.

## CSS
We are using `materialize-css`, which depends on `jquery`. Add the following to the client project:

```
$ cd client
$ npm install --save materialize-css
$ npm install --save jquery
$ touch src/assets/index.css
```
The `index.css` is where the custom styles for you app go. This will override the `materialize-css` style if you add the following imports to your `index.js` (or whatever the main entry point of your client app is):

```javascript
// src/index.js

import 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css';
import './assets/index.css';
```
To use materialize components in your react components, import `jquery` and add the script in `componentDidMount`:

```javascript
// src/components/Header.js
import React from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'

class Header extends React.Component {
  componentDidMount() {
    $(".dropdown-button").dropdown()
  }
  render() {
    // TODO: nav and dropdown menu
  }

```
What about CSS javascripts? Read the [full stack react tutorial](https://www.fullstackreact.com/p/using-webpack-with-create-react-app/) for more on that.



## DevTools
* [`morgan`](https://www.npmjs.com/package/morgan) - quest logger middleware for node.js
* [`webpack`]()
* [`babel`]()
* [`immer`](https://github.com/mweststrate/immer) - a tiny package that allows you to work with immutable state in a more convenient way. It is based on the copy-on-write mechanism.
* [`mobx`](https://github.com/mobxjs) - Simple, scalable state management


## Resources

* Mongoose
	* [Cheatsheet](https://www.techcress.com/mongoose-js-query-cheatsheet/)
* React
	* [My Notes on React](https://github.com/xiaoyunyang/web-dev-cheatsheets/blob/master/react-notes.md)
	* [My Notes on D3 React Integration](https://github.com/xiaoyunyang/web-dev-cheatsheets/blob/master/d3-react-integration.md)
* JavaScript, ES6, and Babel: [My Notes on ES6 and Babel](https://github.com/xiaoyunyang/web-dev-cheatsheets/blob/master/es6-and-babel.md)
* Express: [Manning Express In Action](https://hackerstribe.com/wp-content/uploads/2016/04/Node.js-Express-in-Action.pdf)
* Authentication and Database: [My Notes on Database and Passport setup](https://github.com/xiaoyunyang/web-dev-cheatsheets/blob/master/auth-setup.md)
* DevTools
	* [Webpack vs. Gulp vs. Browserify](https://www.youtube.com/watch?v=xsSnOQynTHs)
 	>Use Webpack because it allows for hot module replacement. Webpack is a prerequisite for [`react-hot-reloader`](https://github.com/gaearon/react-hot-loader), which lets you update your react components during runtime without restarting the server via a `npm run build`.
