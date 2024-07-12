const { _create } = require("./createLocation");
const { _list } = require("./listLocations");

module.exports = {
	list: _list,
	create: _create,
}