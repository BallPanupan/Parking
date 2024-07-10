const mongoose = require('mongoose');

const ParkingSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	location: {
		building: { type: String, required: true },
		floor: { type: String, required: true },
		zone: { type: String, required: true },
		required: true,
	},
	status: {
		type: String,
		enum: ['Active', 'inActive'],
		required: true,
	},
	packages: { type: String, required: true },
	customers: { type: String },
	exitNumber: { type: String },
	createdAt: { type: String, default: Date.now },
});

const Parking = mongoose.model('Parking', ParkingSchema);
module.exports = Parking;