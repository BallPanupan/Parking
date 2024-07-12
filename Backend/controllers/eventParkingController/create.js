const moment = require("moment");
const Parking = require("../../databaseModels/Packing");
const EventParking = require("../../databaseModels/ParkingEvent");
const ParkingPackage = require("../../databaseModels/ParkingPackage");
const Users = require("../../databaseModels/Users");

// action IN Helper
async function actionInHelper(userId, parkingId) {
	const userData = await Users.findById({ _id: userId }).lean();
	const parkingData = await Parking.findById({ _id: String(parkingId) }).lean();


	console.log('input', {userId, parkingId})
	console.log('parkingData', parkingData)


	const parkingPackageData = await ParkingPackage.findById({ _id: parkingData.packageId }).lean();

	if(!parkingData || !parkingData) throw new Error(`can't find userId or parkingId`)

	const parkingAvailable = await Parking.findOne({
		_id: parkingId,
		$or: [
			{ "customers": { $exists: false } },
			{ "customers": '' }
		]
	})

	if(!parkingAvailable || parkingAvailable.length <= 0 ) return {
		status: false,
		message: 'Not Available, Please change a Parking'
	}

	const checking = await EventParking.find({
		"user.userId": userId,
		"action.in": true,
	}).lean();

	
	console.log(checking);

	if(checking && checking.length > 0) {
		return {
			status: false,
			message: 'Already registered'
		}
	}
	const eventData = {
		user: userData,
		user: {
			userId: userData._id.toString(),
			name: userData.name,
			carNumber: userData.carNumber,
		},
		parking: {
			parkingId: parkingData._id.toString(),
			name: parkingData.name,
			location: {
				buildingId: parkingData.location.buildingId,
				floorId: parkingData.location.floorId,
				zoneId: parkingData.location.zoneId,
			},
		},
		parkingPackages: {
			parkingPackageId: parkingPackageData._id.toString(),
			name: parkingPackageData.name,
			pricePerHour: parkingPackageData.pricePerHour,
			freeParkingMinute: parkingPackageData.freeParkingMinute,
		},
		startTime: Date.now(),
		endTime: '',
		totalPrice: 0,
		action: {
			in: true
		}
	}
	const lockParking = await Parking.updateOne({_id: parkingId},{
		status: "Inavailable",
		customers: userId.toString()
	})
	const result = await EventParking.create(eventData);
	return {
		status: true,
		data: {
			result,
			lockParking,
		}
	};
}


// action OUT Helper
async function actionOutHelper(userId, parkingId) {
	const parkingData = await Parking.findById({ _id: parkingId }).lean();

	if(!parkingData || !parkingData) throw new Error(`can't find userId or parkingId`);

	const eventParking = await EventParking.findOne({
		"user.userId": userId,
		"action.in": true,
		$or: [
			{ "action.out": { $exists: false } },
			{ "action.out": false }
		]
	}).lean();

	if(!eventParking) {
		return {
			status: false,
			message: 'Pleash register'
		}
	}

	// pricePerHour: 40
	const endTime = Number(moment().valueOf());
	const startTime = Number(eventParking.startTime);
	const freeParkingMinute = eventParking.parkingPackages.freeParkingMinute * 60 * 1000
	const pricePerHour = eventParking.parkingPackages.pricePerHour;
	const totaltimeUsingMinute = ((endTime - startTime) - freeParkingMinute) / (60 * 1000)
	const totalCost = (totaltimeUsingMinute / 60) * pricePerHour;

	const prepareUpdate = {
		$set: {
			'action.out': true,
			endTime: endTime,
			totaltimeUsingMinute: totaltimeUsingMinute > 0 ? totaltimeUsingMinute : 0,
			totalCost: totalCost > 0 ? totalCost : 0,
		}
	}
	const result = await EventParking.updateOne({_id: eventParking._id}, prepareUpdate)
	const lockParking = await Parking.updateOne({_id: parkingId},{
		status: "Available",
		customers: ''
	})
	return {
		result,
		lockParking
	}
}

async function _create(req, res) {
	try {
		const { userId, parkingId, action } = req.body;
		let result = {};
		switch (action) {
			case "IN":
				result = await actionInHelper(userId, parkingId);
				break;
			case "OUT":
				result = await actionOutHelper(userId, parkingId);
				break;
			default:
				throw new Error('action is required');
		}
		res.json(result)
	} catch (error) {
		console.error('Error new Package:', error);
		return res.status(500).json({
			status: false,
			message: error.message,
			data: [],
		});
	}
}

module.exports = {
	_create,
};