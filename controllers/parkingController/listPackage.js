const Parking = require("../../databaseModels/Packing");

async function _listPackage(req, res) {
	try {
		const result = await Parking.find().lean();
		res.json({
			'status': true,
			'data': result,
		})
	} catch (error) {
		console.error('Error getPackage:', error);
		return res.status(500).json({
			status: false,
		});
	}
}

module.exports = {
	_listPackage,
};
