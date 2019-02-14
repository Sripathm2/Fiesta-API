let express = require('express');
const axios = require('axios');
const { Pool, } = require('pg');
const connectionString = process.env.DB_URL;
const Insert_event = 'INSERT INTO Events (owner, date, location, partySupplier, caterer, guests) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';

// Instantiate router

let eventRoutes = express.Router();

/**
 * @api {get} /event
 * @apiName event
 * @apiGroup event
 *
 * @apiQuery (body) {String} location name OR {String} location latitude,longitude.
 *                      {String} budget of the user.
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

/**
 * @api {post} /create
 * @apiName create
 * @apiGroup event
 *
 * @apiParam (body) {String} userName of event owner.
 *                      {String} date of event in format 'YYYY-MM-DD HH:mm:SS'
 *                      {float[2]} array of floats containing longitude/latitude.
 *                      {String} name of party supplier.
 *                      {String} name of caterer.
 *                      {String[]} array of guests invited.
 *
 * @apiParamExample {JSON} Request Body Example
 *      {
            userName: 'johndoe',
            date: '2019-02-09 05:00:00',
            location: [ 40.423540, -86.921740 ],
            partySupplier: 'Party City',
            caterer: 'Chipotle',
            guests: [ 'Jane Doe', 'Scott Smith', 'George Washington' ]

 * @apiSuccess {String} eventID.
 * @apiError (RequestFormatError) 422 For missing parameter(s).
 * @apiError (Internal Error) 500+ Internal Error.
**/

eventRoutes.post('/create', (req, res) => {
    
    if (!req.body.userName) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the owner userName.',
        });
    }
    
    if (!req.body.date) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the date.',
        });
    }
    
    if (!req.body.location) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the location.',
        });
    }
    
    if (!req.body.partySupplier) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the partySupplier.',
        });
    }
    
    if (!req.body.caterer) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the caterer.',
        });
    }
    
    if (!req.body.guests) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the guests.',
        });
    }
    
    let event = {};
    event.owner = req.body.userName;
    event.date = req.body.date;
    event.location = req.body.location;
    event.partySupplier = req.body.partySupplier;
    event.caterer = req.body.caterer;
    event.guests = req.body.guests;

    const pool = new Pool({
        connectionString: connectionString,
    });

    pool.query(Insert_event, [event.owner, event.date, event.location, event.partySupplier, event.caterer, event.guests, ],  (err, response) => {

        if(err){
            pool.end();
            return res.send({
                errorType: 'InternalError',
                message: err,
            });
        }

        pool.end();

        return res.send({
            eventID: response.rows[0].id,
        });
    });
});

module.exports = eventRoutes;
