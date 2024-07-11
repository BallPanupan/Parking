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

		const logUrlMiddleware = (req, res, next) => {
			console.log(`${req.method}: ${req.url}`);
			next();
		};
		
		app.use(logUrlMiddleware);

		app.get('/', ((req, res) => res.json({message: 'Wellcom to parking system.', status: true})));
		app.use(bodyParser.json())
		app.use(bodyParser.urlencoded({ extended: true }));

		const systemInstallRoutes  = require('./routes/systemInstallRoutes'  );
		const parkingRoutes        = require('./routes/parkingRoutes'        );
		const locationsRoutes      = require('./routes/locationsRoutes'      );
		const parkingPackageRoutes = require('./routes/parkingPackageRoutes' );
		const userRoutes           = require('./routes/userRoutes'           );
		const eventParkingRoutes   = require('./routes/eventParkingRoutes'   );

		app.use('/install'       , systemInstallRoutes );
		app.use('/parking'       , parkingRoutes       );
		app.use('/locations'     , locationsRoutes     );
		app.use('/parkingPackage', parkingPackageRoutes);
		app.use('/users'         , userRoutes          );
		app.use('/eventParking'  , eventParkingRoutes  );

		app.listen(port, () => {
			console.log(`Parking system listening on port ${port}`);
		});
	} catch (error) {
		console.error('Error starting the server:', error);
		process.exit(1); // Exit the process with an error code
	}
}

main();