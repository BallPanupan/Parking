const Users = require("../../databaseModels/Users");

async function _list(req, res) {
	try {
		const result = await Users.find().lean();
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
