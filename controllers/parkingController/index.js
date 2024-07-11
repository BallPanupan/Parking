const { _listPackage } = require("./listPackage");
const { _create } = require("./create");
const { _update } = require("./update");
const { _getPackage } = require("./getPackage");
const { _delete } = require("./delete");

module.exports = {
	listPackage: _listPackage,
	getPackage: _getPackage,
	create: _create,
	update: _update,
	delete: _delete,
}