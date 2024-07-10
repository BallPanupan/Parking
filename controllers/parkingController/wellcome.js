async function _wellcome(req, res) {
	try {
		res.json({
			'status': true,
			'message': "Wellcome to parking system."
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
	_wellcome,
};
