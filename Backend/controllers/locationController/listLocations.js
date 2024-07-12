const Locations = require("../../databaseModels/location");

async function _list(req, res) {
	try {
		const validateInstall = await Locations.find().lean();
		if(!validateInstall || validateInstall.length <= 0 ) {
			return res.status(401).json({
				'status': false,
				'message': "empty Location It is necessary to create a new Location for the default data."
			})
		}
		res.json({
			'status': true,
			'data': validateInstall
		})
	} catch (error) {
		console.error('Error Wellcome:', error);
		return res.status(500).json({ 
			status: 'error', 
			message: 'Internal Server Error'
		});
	}
}

module.exports = {
	_list,
};
