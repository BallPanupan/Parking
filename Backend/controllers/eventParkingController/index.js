const { _list    } = require("./list"    );
const { _create  } = require("./create"  );
const { _update  } = require("./update"  );
const { _getUser } = require("./getUser" );
const { _delete  } = require("./delete"  );

module.exports = {
	list: _list,
	getUser: _getUser,
	create: _create,
	update: _update,
	delete: _delete,
}