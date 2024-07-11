const mongoose = require('mongoose');

const ParkingPackageSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	pricePerHour: { type: Number, required: true },
	freeParkingMinute: { type: Number, required: true },
	colorCode: { type: String },
	createdAt: { type: String, default: Date.now },
});

const ParkingPackage = mongoose.model('Parking', ParkingPackageSchema);
module.exports = ParkingPackage;