const Locations = require("../../databaseModels/location");

async function _create(req, res) {
	try {
		const buildingType = [
			"building",
			"floor",
			"zone"
		]

		const name = req.body.name || '';
		const type = buildingType.includes(req.body.type) ? req.body.type : null 
		const refer = req.body.refer || '';
		if(!name || !type ) throw new Error(`name or type is empty!`);

		const data = {
			name: name,
			type: type,
			refer: refer || '',
		}
		// check duplicate name
		const duplicate = await Locations.find(data).lean();

		if(duplicate && duplicate.length > 0) {
			return res.status(401).json({
				message: 'duplicate name and type of location',
				status: false
			})
		}

		const result = await Locations.create(data);
		
		return res.json({
			'status': true,
			'data': result
		})
	} catch (error) {
		console.error('Location Error:', error);
		return res.status(500).json({ 
			status: 'error', 
			message: error.message,
		});
	}
}

module.exports = {
	_create,
};
