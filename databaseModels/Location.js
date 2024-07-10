const mongoose = require('mongoose');

const LocationsSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	type: {
		type: String,
		enum: ['building', 'floor', 'zone'],
		required: true,
	},
	refer: { type: String },
	createdAt: { type: String, default: Date.now },
});

const Locations = mongoose.model('Locations', LocationsSchema);
module.exports = Locations;