const Users = require("../../databaseModels/Users");

async function _create(req, res) {
	try {
		const rawData = req.body;
		const data = {
			name: rawData.name,
			carNumber: rawData.carNumber || '',
			status: rawData.status || 'Active',
		};
		const result = await Users.create(data);
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