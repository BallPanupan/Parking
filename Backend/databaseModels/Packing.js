const mongoose = require('mongoose');

const ParkingSchema = new mongoose.Schema({
	name: { type: String, required: true },
	location: {
		buildingId: { type: String, required: true },
		floorId   : { type: String, required: true },
		zoneId    : { type: String, required: true },
	},
	status: {
		type: String,
		enum: ['Available', 'Inavailable'],
		required: true,
	},
	packageId : { type: String , required: true    },
	customers : { type: String                     },
	exitNumber: { type: String                     },
	deleted   : { type: Boolean, default: false    },
	createdAt : { type: String , default: Date.now },
});

const Parking = mongoose.model('Parking', ParkingSchema);
module.exports = Parking;
