const mongoose = require('mongoose');

const ParkingPackageSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	PricePerHour: { type: Number, required: true },
	freeParking: { type: Number, required: true },
	color: { type: String },
	createdAt: { type: String, default: Date.now },
});

const ParkingPackage = mongoose.model('Parking', ParkingPackageSchema);
module.exports = ParkingPackage;