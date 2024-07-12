const EventParking = require("../../databaseModels/ParkingEvent");

async function _report(req, res) {
	try {
		const { startDate, endDate } = req.query;

		// "startDate": "1720061107122",
		// "endDate": "1720761001680",

		if (!startDate || !endDate) {
			return res.status(400).json({ error: 'startDate and endDate are required' });
		}

		const rawData = await EventParking.find({
			startTime: {
				$gte: startDate,
				$lte: endDate // Use endDate variable instead of Date.now()
			},
			$and: [
				{ "action.in": { $exists: true } },
				{ "action.out": { $exists: true } }
			]
		}).lean();

		const resultReport = rawData.map(entry => ({
			parkingName: entry.parking.name,
			totalCost: entry.totalCost,
			totalTimeUsingMinute: entry.totaltimeUsingMinute,
		}));

		const report = {
			startDate: startDate,
			endDate: endDate,
			data: resultReport,
		}
		res.json(report);
	} catch (error) {
		console.error('Error new Package:', error);
		return res.status(500).json({
			status: false,
			message: error.message,
		});
	}
}

module.exports = {
	_report,
};