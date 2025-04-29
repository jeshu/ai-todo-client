# AI Todo App - Frontend

This is the frontend client for the AI Todo App, built with React.js. The application provides a modern interface for managing todos with AI-powered suggestions and analysis.

## Features

- Create, read, update, and delete todos
- AI-powered todo suggestions
- Priority-based todo organization
- Due date tracking
- Completed task management
- Modern, responsive UI

## Tech Stack

- React.js
- Material-UI
- Axios for API calls
- Docker for containerization
- Nginx for production serving

## Project Structure

```
client/
├── src/
│   ├── components/   # React components
│   ├── styles/       # Global styles
│   └── setupProxy.js # API proxy configuration
├── public/           # Static assets
├── Dockerfile        # Docker configuration
└── nginx.conf        # Nginx configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jeshu/ai-todo-client.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000

### Building for Production

```bash
npm run build
```

This will create a production-ready build in the `build` folder.

### Running with Docker

```bash
docker build -t ai-todo-client .
docker run -p 3000:80 ai-todo-client
```

## API Integration

The frontend communicates with the backend API through:
- `/api/todos` - Todo management endpoints
- `/api/ai/suggestions` - AI suggestions
- `/api/ai/analyze` - Todo analysis
- `/api/ai/schedule` - Todo scheduling

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

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
