import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import App from './views/app';

function Layout(props: any) {

	let store = createStore(rootReducer, props);

	return (
		<html lang="en">
		<head>
			<meta charSet="utf-8" />
			<title>Universal React • TodoMVC</title>
			<link rel="stylesheet" href="node_modules/todomvc-app-css/index.css" />
		</head>
		<body>
		<section className="todoapp" id="root">
			<Provider store={ store }>
				<App />
			</Provider>
		</section>
		<footer className="info">
			<p>Double-click to edit a todo</p>
			<p>Created by <a href="http://github.com/remojansen/">Remo H. Jansen</a></p>
			<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
		</footer>
		<script type="text/javascript" src="dist/bundle.js"></script>

		</body>
		</html>
	);
}
// Old module.exports is required for React-Engine :(
module.exports = Layout;
