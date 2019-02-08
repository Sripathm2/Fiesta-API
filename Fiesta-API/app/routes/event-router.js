let express = require('express');
const axios = require('axios');

// Instantiate router

let eventRoutes = express.Router();

/**
 * @api {get} /event
 * @apiName event
 * @apiGroup event
 *
 * @apiQuery (body) {String} location name OR {String} location latitude,longitude.
 *                  {String} budget of the user.
 *
 * @apiSuccess {String} up to 100 results.
 * @apiError (RequestFormatError) 422 For missing data or invalid location/lat,lon or budget.
 * @apiError (Internal Error) 500+ Internal Error
**/

eventRoutes.get('/event', (req, res) => {
    
    if (!req.query.location && !req.query.latlon) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include location or latitude,longitude.',
        });
    }
    
    if (!req.query.budget) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include budget.',
        });
    }
    
    let coords = req.query.latlon.split(',');
    if (coords.length !== 2 || isNaN(coords[0]) || isNaN(coords[1])) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Invalid latitude,longitude format.',
        });
    }
    
    if (+coords[0] < -180 || +coords[0] > 180 || +coords[1] < -90 || +coords[1] > 90) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Invalid values for latitude/longitude.',
        });
    }
    
    const searchRadius = 50;
    
    let url = 'https://eventup.com/api/v3/search/';
    if (req.query.location) {
        url = url + 'place/';
    } else {
        url = url + 'lat_lng/' + req.query.latlon + '/';
    }

    axios.get(url, {
        params: {
            budget: req.query.budget,
            radius: searchRadius,
            search: req.query.location,
        },
    })
        .then(function (response) {
            const ven = response.data.venues;
            let ret = [];
            for (let i = 0; i < response.data.count; i++) {
                if (i >= 100) {
                    break;
                }
                if (i in ven) {
                    if ('title' in ven[i]) {
                        ret.push(ven[i]['title']);
                    }
                }
            }
            res.send({
                results: ret,
            });
        })
        .catch(function (error) {
            return res.status(500).send({
                errorType: 'Internal Error',
                message: error,
            });
        });
});
