const mongoose = require('mongoose');

const EventParkingSchema = new mongoose.Schema({
	user: {
		userId: { type: String, required: true },
		name: { type: String, required: true },
		carNumber: { type: String, required: true },
	},
	parking: {
		parkingId: { type: String, required: true },
		name: { type: String, required: true },
		location: {
			buildingId: { type: String, required: true },
			floorId: { type: String, required: true },
			zoneId: { type: String, required: true },
		},
	},
	parkingPackages: {
		parkingPackageId: { type: String, required: true },
		name: { type: String, required: true },
		pricePerHour: { type: Number, required: true },
		freeParkingMinute: { type: Number, required: true },
	},
	startTime: { type: String, default: Date.now },
	endTime: { type: String },
	totaltimeUsingMinute: { type: Number },
	totalCost: { type: Number, default: 0 },
	action: {
		in: { type: Boolean, default: true},
		out: { type: Boolean, default: false},
	},
	canceled: { type: Boolean, default: false }
});

const EventParking = mongoose.model('EventParking', EventParkingSchema);
module.exports = EventParking;