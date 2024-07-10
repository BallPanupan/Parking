const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const port = process.env.SERVER_PORT || 3000;
require('dotenv').config();

async function main() {
	try {
		// Verification database and install database
		await connectDB();

		const app = express();
		app.use(bodyParser.json())
		app.use(bodyParser.urlencoded({ extended: true }));

		const systemInstallRoutes = require('./routes/systemInstallRoutes');
		const parkingRoutes = require('./routes/parkingRoutes');
		
		app.use('/install', systemInstallRoutes);
		app.use('/parking', parkingRoutes);

		app.listen(port, () => {
			console.log(`Parking system listening on port ${port}`);
		});
	} catch (error) {
		console.error('Error starting the server:', error);
		process.exit(1); // Exit the process with an error code
	}
}

main();