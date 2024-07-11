const Users = require("../../databaseModels/Users");
async function _delete(req, res) {
	try {

		const id = req.params.id;
		if (!id) throw new Error('Check params properties');

		const result = await Users.updateOne({_id: id},{
			$set: {
				"deleted": true
			}
		});

		console.log(result);

		res.json({
			'status': true,
			'data': result || [],
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
	_delete,
};
