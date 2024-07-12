const EventParking = require("../../databaseModels/ParkingEvent");

async function _list(req, res) {
	try {
		const result = await EventParking.find().lean();
		res.json({
			'status': true,
			'data': result,
		})
	} catch (error) {
		console.error('Error getPackage:', error);
		return res.status(500).json({
			status: false,
			data: []
		});
	}
}

module.exports = {
	_list,
};
