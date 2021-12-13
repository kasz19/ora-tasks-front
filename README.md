# Oracle Challenge Frontend

In this project we present de UI for the oracle challenge. It is a ReactJS project, and it contains the components to call via REST API the other module
of the challenge, the oracle-challenge-app.

Please notice that there are two docker files in the root proyect:

Dockerfile -> Allows you to build a docker image from the current source files.

docker-compose.yaml -> Allows you to build both images: current project (frontend) + backend project (oracle-challenge-app). Keep in mind that in order to
perform integration tests of the project, it would be necessary to deploy both proyects in your local machine.

Please find attached in the source folder the classes diagram, it just consists of four classes:

- App: The main Application. Loads the current list of tasks.
- TaskContainer: Class that contains the details of a tasks, with actions over this tasks: Delete or Edit.
- AddTaskForm: Class that contains a form to create a new task
- EditTaskForm: Class that contains a form to edit an existing task.

Besides there is a file that contains the functions to addTask, EditTask, DeleteTask and getTasks. It is the file DataStore, that contains just the request functions.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run start-dev`

Runs the app in the development mode, this is ONLY for the docker image\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser, after running your docker instance.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run start-local`

Runs the app in the development mode as well\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### Docker Scripts

### `sudo docker build -f Dockerfile -t oracle-challenge-frontend .` to build the docker image

### `sudo docker run -p 3000:3000 oracle-challenge-frontend` to run the docker image for frontend project

### `sudo docker-compose up` to build both images (frontend + backend) and run them