const mongoose = require('mongoose');
const ParkingPackage = require('./ParkingPackage');

const EventParkingSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	parkingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Parking', required: true },
	location: {
		building: { type: String, required: true },
		floor: { type: String, required: true },
		zone: { type: String, required: true },
	},
	parkingpackages: { type: ParkingPackage, required: true },
	startTime: { type: String, default: Date.now },
	endTime: { type: Date },
	canceled: { type: Boolean, default: false }
});

const EventParking = mongoose.model('EventParking', EventParkingSchema);
module.exports = EventParking;


// const event = {
// 	"_id": "12314124",
// 	"userId": "668fb17c1f10c7bc48e1af18",
// 	"parkingId": "668f9b199602a7f458e7120d",
// 	"location": {
// 		"building": "668ec9921567b18c176488fe",
// 		"floor": "668ec9e6df58a2185c2ef73f",
// 		"zone": "668ec9f5df58a2185c2ef742"
// 	},
// 	"parkingpackages": {
// 		"_id": "668f8ff6bf8a587bb1f33d04",
// 		"name": "package-001",
// 		"pricePerHour": NumberInt(40),
// 		"freeParkingMinute": NumberInt(15),
// 	}
// }