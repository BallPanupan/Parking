const ParkingPackage = require("../../databaseModels/ParkingPackage");

async function _getPackage(req, res) {
	try {
		const result = await ParkingPackage.find().lean();
		res.json({
			'status': true,
			'data': result,
		})
	} catch (error) {
		console.error('Error getPackage:', error);
		return res.status(500).json({
			status: false,
			message: 'empty Location It is necessary to create a new Location for the default data.'
		});
	}
}

module.exports = {
	_getPackage,
};
