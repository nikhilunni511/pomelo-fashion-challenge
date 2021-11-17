require("dotenv").config();
const Hapi = require('@hapi/hapi');
const apiRoutes = require('./routes/api/index');
const webRoutes = require('./routes/web/index');
const path = require('path');
const HapiSwagger = require('hapi-swagger');

const swaggerOptions = {
	info: {
		'title': 'API Documentation',
		'version': '0.0.1',
	}
};

const init = async () => {

	const server = Hapi.server({
		port: process.env.PORT || 3000,
		host: process.env.HOST || 'localhost',
		routes: {
			files: {
				relativeTo: path.join(__dirname, 'public')
			}
		}
	});

	await server.register([require("@hapi/vision")]);
	await server.register([require("@hapi/inert")]);
	await server.register([{
		plugin: HapiSwagger,
		options: swaggerOptions
	}])

	server.views({
		engines: { html: require("handlebars") },
		path: path.join(__dirname, "views"),
		compileOptions: {
			pretty: false
		},
	});

	server.route(apiRoutes);
	server.route(webRoutes);
	server.route({
		method: 'GET',
		path: '/{param*}',
		handler: {
			directory: {
				path: '.'
			}
		}
	});
	server.route({
		method: '*',
		path: '/{any*}',
		handler: function (request, h) {

			return '404 Error! Page Not Found!';
		}
	});

	await server.start();
	console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

	console.log(err);
	process.exit(1);
});

init();