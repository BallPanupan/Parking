const Parking = require("../../databaseModels/Packing");

async function _create(req, res) {
	try {

		const rawData = req.body;

		const data = {
			name: rawData.name,
			location: {
				building: rawData.location.building,
				floor: rawData.location.floor,
				zone: rawData.location.zone
			},
			status: rawData.status || 'Active',
			packages: rawData.packages,
			exitNumber: rawData.exitNumber
		};
		const result = await Parking.create(data);
		res.json({
			'status': true,
			'message': result || [],
		})
	} catch (error) {
		console.error('Error new Package:', error);
		return res.status(500).json({
			status: false,
			message: error.message,
			data: [],
		});
	}
}

module.exports = {
	_create,
};