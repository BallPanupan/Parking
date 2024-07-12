const ParkingPackage = require("../../databaseModels/ParkingPackage");

async function _update(req, res) {
	try {
		const id = req.params.id;
		const rawData = req.body;
		
		if (
			!id ||
			!rawData.name ||
			!rawData.pricePerHour ||
			!rawData.freeParkingMinute||
			!rawData.colorCode
		) {
			throw new Error('Check your input properties');
		}

		const result = await ParkingPackage.updateOne({_id: id},{
			$set: {
				"name": rawData.name,
				"pricePerHour": rawData.pricePerHour,
				"freeParkingMinute": rawData.freeParkingMinute,
				"colorCode": rawData.colorCode,
				"deleted": rawData.deleted
			}
		});

		res.json({
			'status': true,
			'message': result,
		})
	} catch (error) {
		console.error('Error new Package:', error);
		return res.status(500).json({
			status: false,
			message: error.message,
		});
	}
}

module.exports = {
	_update,
};