const ParkingPackage = require("../../databaseModels/ParkingPackage");

async function _create(req, res) {
	try {

		const {
			name,
			pricePerHour,
			freeParkingMinute,
			colorCode,
		} = req.body;
		
		if (
			!name ||
			!pricePerHour ||
			!freeParkingMinute||
			!colorCode
		) {
			throw new Error('Check your input properties');
		}

		// check duplicate name
		const duplicate = await ParkingPackage.find({name: name}).lean();

		if(duplicate && duplicate.length > 0) {
			return res.status(401).json({
				message: 'duplicate name of Parking Package',
				status: false
			})
		}

		const data = {
			"name": name,
			"pricePerHour": pricePerHour,
			"freeParkingMinute": freeParkingMinute,
			"colorCode": colorCode,
		};
		const result = await ParkingPackage.create(data);

		res.json({
			'status': true,
			'message': result,
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