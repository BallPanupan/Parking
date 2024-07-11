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
		app.get('/', ((req, res) => res.json({message: 'Wellcom to parking system.', status: true})));

		app.use(bodyParser.json())
		app.use(bodyParser.urlencoded({ extended: true }));

		const systemInstallRoutes  = require('./routes/systemInstallRoutes');
		const locationsRoutes      = require('./routes/locationsRoutes'    );
		const parkingRoutes        = require('./routes/parkingRoutes'      );
		const parkingPackageRoutes = require('./routes/parkingPackage'     );
		
		app.use('/install'       , systemInstallRoutes );
		app.use('/parking'       , parkingRoutes       );
		app.use('/locations'     , locationsRoutes     );
		app.use('/parkingPackage', parkingPackageRoutes);

		app.listen(port, () => {
			console.log(`Parking system listening on port ${port}`);
		});
	} catch (error) {
		console.error('Error starting the server:', error);
		process.exit(1); // Exit the process with an error code
	}
}

main();