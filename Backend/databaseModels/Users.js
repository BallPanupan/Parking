const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	carNumber: { type: String },
	status: { 
		type: String,
		enum: ['Active', 'Inactive'],
	},
	createdAt: { type: String, default: Date.now },
	deleted: { type: Boolean, default: false},
});

const Users = mongoose.model('Users', UserSchema);
module.exports = Users;