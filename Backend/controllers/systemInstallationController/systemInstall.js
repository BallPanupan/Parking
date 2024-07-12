const Locations = require("../../databaseModels/location");

async function _install(req, res) {
	try {
		const data = await Locations.find({}, {
			"name": 1,
			"type": 1,
			"refer": 1,
		}).lean();
		const transformedData = data.map(item => ({ ...item, _id: item._id.toString() }));

		const buildings = transformedData
			.filter(item => item.type === 'building')
			.map(building => ({
				...building,
				floors: transformedData
					.filter(floor => floor.refer === building._id)
					.map(floor => ({
						...floor,
						zones: transformedData.filter(zone => zone.refer === floor._id)
					}))
			}));

		const verifyLocation = !buildings[0].floors[0].zones[0];
		if (verifyLocation) throw new Error()

		if (!data || data.length <= 0) {
			return res.status(401).json({
				'status': false,
				'message': "empty Location It is necessary to create a new Location for the default data."
			})
		}
		res.json({
			'status': true,
			'message': "install the Parking System."
		})
	} catch (error) {
		console.error('Error Wellcome:', error);
		return res.status(500).json({
			status: false,
			message: 'empty Location It is necessary to create a new Location for the default data.'
		});
	}
}

module.exports = {
	_install,
};
