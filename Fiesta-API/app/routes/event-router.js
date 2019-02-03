let express = require('express');
const axios = require('axios');

// Instantiate router

let eventRoutes = express.Router();

/**
 * @api {get} /event
 * @apiName event
 * @apiGroup event
 *
 * @apiQuery (body) {String} searchRequest of the user.
 *						{String} budget of the user.
 *
 * @apiSuccess {String} up to 100 results.
 * @apiError (RequestFormatError) 422 For missing data or invalid searchRequest or budget.
 * @apiError (Internal Error) 500+ Internal Error
**/

eventRoutes.get('/event', (req, res) => {
	
	if (!req.query.searchRequest) {
		return res.status(422).send({
			errorType: 'RequestFormatError',
			message: 'Must include searchRequest.',
		});
	}
	
	if (!req.query.budget) {
		return res.status(422).send({
			errorType: 'RequestFormatError',
			message: 'Must include budget.',
		});
	}
	
	var searchRadius = 50;

	axios.get('https://eventup.com/api/v3/search/place/', {
		params: {
			budget: req.query.budget,
			radius: searchRadius,
			search: req.query.searchRequest,
		}
	})
	.then(function (response) {
		var ven = response.data.venues;
		var ret = [];
		for (var i = 0; i < response.data.count; i++) {
			if (i >= 100) {
				break;
			}
			if (i in ven) {
				if ('title' in ven[i]) {
					ret.push(ven[i]['title']);
					console.log(ven[i]['title']);
				}
			}
		}
		//console.log(ret);
		res.send({
			results: ret,
		});
	})
	.catch(function (error) {
		//console.log(error);
		return res.status(500).send({
			errorType: 'Internal Error',
			message: error,
		});
	});
});
