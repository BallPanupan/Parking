const Users = require("../../databaseModels/Users");

async function _update(req, res) {
	try {
		const id = req.params.id;
		const rawData = req.body;

		if (!id) throw new Error('Check your input properties');

		const findParking = await Users.findById(id).lean();
		if(!findParking) throw new Error('Check your input properties');

		const update = {
			$set: {
				...rawData
			}
		}
		const result = await Users.updateOne({ _id: id }, update);

		res.json({
			'status': true,
			'message': result,
		})
	} catch (error) {
		console.error('Error user update:', error);
		return res.status(500).json({
			status: false,
			message: error.message,
			data: []
		});
	}
}

module.exports = {
	_update,
};