async function _install(req, res) {
	try {
		res.json({
			'status': true,
			'message': "install the Parking System."
		})
	} catch (error) {
		console.error('Error Wellcome:', error);
		return res.status(500).json({ 
			status: 'error', 
			message: 'Internal Server Error'
		});
	}
}

module.exports = {
	_install,
};
