let express = require('express');
const axios = require('axios');
const { Pool, } = require('pg');
let nodemailer = require('nodemailer');
let fs = require('fs');
const uuidv1 = require('uuid/v1');
const connectionString = process.env.DB_URL;
const Insert_event = 'INSERT INTO Events (owner, date, location, partySupplier, caterer, guests, id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id   ';
const Update_event = 'Update Events Set date = $1, location = $2, partySupplier = $3, caterer = $4, guests = $5 Where owner = $6 AND id = $7';
const Insert_rsvp = 'INSERT INTO Rsvp (userName, eventID, status) VALUES ($1, $2, $3)';
const postImages = 'Update Events Set images = $1 Where id = $2';
const Select_event = 'Select * from Events where owner = $1 AND id = $2';

const Insert_wishlist_item = 'INSERT INTO wishlist (userName, item) VALUES($1,$2)';
const Delete_wishlist_item = 'DELETE FROM wishlist WHERE id=($1)';
const Insert_question_answer = 'INSERT INTO Questionanswer(event_id, questionUserName, question, questionID, answerUsername, answer) VALUES($1,$2,$3,$4,$5,$6)';
const Select_question = 'SELECT * FROM questionanswer WHERE questionUserName=($1) AND answerUsername=($2)';
const Select_answer = 'SELECT * FROM questionanswer WHERE questionUserName=($1) AND answerUsername=($2)';
const Select_wishlist = 'SELECT * FROM wishlist WHERE userName=($1)';

const getImages = 'Select images from Events where id = $1';
const postTasks = 'Update Events Set tasks = $1 Where id = $2';
const getTasks = 'Select tasks from Events where id = $1';

// Instantiate router

let eventRoutes = express.Router();

// Selects Questions

eventRoutes.get('/selectQuestion', (request ,response) => {
    if (!request.query.event_id) {
        return response.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include an event_id.',
        });
    }

    if (!request.query.questionUserName) {
        return response.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include a questionUserName.',
        });
    }

    if (!request.query.question) {
        return response.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include a question.',
        });
    }

    if (!request.query.questionID) {
        return response.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include a questionID.',
        });
    }

    if (!request.query.answerUsername) {
        return response.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the answerUsername.',
        });
    }

    if (!request.query.answer) {
        return response.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include an answer.',
        });
    }

    const pool = new Pool({
        connectionString: connectionString,
    });

    const{questionUserName, answerUsername} = request.query;

    pool.query(Select_question,[questionUserName, answerUsername],(err,res) => {
        if(err) {
            pool.end();
            return response.send({
                errorType: 'InternalError',
                message: err
            });
        }
        return response.send({
                message: 'Success',
                data: res.rows,
        });
        pool.end();
    });
});

// Selects answers

eventRoutes.get('/selectAnswer', (request ,response) => {


    if (!request.query.answerUsername) {
        return response.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the answerUsername.',
        });
    }

    if (!request.query.answer) {
        return response.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include an answer.',
        });
    }

    const pool = new Pool({
        connectionString: connectionString,
    });

    const{questionUserName,answerUsername} = request.query;

    pool.query(Select_answer,[questionUserName,answerUsername],(err,res) => {
        if(err) {
            pool.end();
            return res.send({
                errorType: 'InternalError',
                message: err
            });
        }
        pool.end();
    });
});

// This function permits users to post questions. --------------------------

eventRoutes.post('/question', (request ,response) => {
    if (!request.body.event_id) {
        return response.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the event_id.',
        });
    }

    if (!request.body.questionUserName) {
        return response.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include a questionUserName.',
        });
    }

    if (!request.body.question) {
        return response.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include a question.',
        });
    }

    if (!request.body.questionID) {
        return response.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include a questionID.',
        });
    }

    const pool = new Pool({
        connectionString: connectionString,
    });

    const {event_id,questionUserName, question} = request.body;
    pool.query(Insert_question_answer,[event_id, questionUserName, question, uuidv1(), null, null],(err,res) => {
        if(err) {
            pool.end();
            return response.send({
                errorType: 'InternalError',
                message: err
            });
        }
        pool.end();
        return response.send({
                message: 'Success',
        });
    });
});

// The function permits users to answer to questions.

eventRoutes.post('/answer', (request ,response) => {
    if (!request.body.answerUsername) {
        return response.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the answerUsername.',
        });
    }

    if (!request.body.answer) {
        return response.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include an answer.',
        });
    }

    const pool = new Pool({
        connectionString: connectionString,
    });

    const {event_id, answerUsername, answer } = request.body;
    pool.query(Insert_question_answer,[event_id, null, null, uuidv1(), answerUsername, answer],(err,res) => {
        if(err) {
            pool.end();
            return response.send({
                errorType: 'InternalError',
                message: err
            });
        }
        pool.end();
        return response.send({
                message: 'Success',
        });
    });
});

//This function is used to select from Wishlist

eventRoutes.get('/selectWishlist', (request ,response) => {
    if (!request.query.userName) {
            return response.status(422).send({
                errorType: 'RequestFormatError',
                message: 'Must include the owner userName.',
            });
        }

        if (!request.query.item) {
            return response.status(422).send({
                errorType: 'RequestFormatError',
                message: 'Must include an item name for the wishlist.',
            });
        }
        const pool = new Pool({
            connectionString: connectionString,
        });

        const {userName} = request.query;
        pool.query(Select_wishlist,[userName],(err,res) => {
            if(err) {
                pool.end();
                return res.send({
                    errorType: 'InternalError',
                    message: err
                });
            }
            pool.end();

            return res.send({
                eventID: response.rows[0].id,
            });
        });
    });


// This function inserts an item into a wishlist

eventRoutes.put('/createWishlist', (request ,response) => {
if (!request.body.userName) {
        return response.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the owner userName.',
        });
    }

    if (!request.body.item) {
        return response.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include an item name for the wishlist.',
        });
    }
    const pool = new Pool({
        connectionString: connectionString,
    });

    const {userName, item} = request.body;
    pool.query(Insert_wishlist_item,[userName,item],(err,res) => {
        if(err) {
            pool.end();
            return res.send({
                errorType: 'InternalError',
                message: err
            });
        }
        pool.end();

        return res.send({
            eventID: response.rows[0].id,
        });
    });
});

// This function deletes an item from a wishlist

eventRoutes.delete('/deleteWishlist/:id', (request, response) => {
    if (!request.body.userName) {
        return response.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the owner userName.',
        });
    }

    if (!request.body.item) {
        return response.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include an item name for the wishlist.',
        });
    }
    const pool = new Pool({
        connectionString: connectionString,
    });

    const{id} = request.body;

    pool.query(Delete_wishlist_item, [id], (err,res) => {
        if(err) {
            pool.end();
            return res.send({
                errorType: 'InternalError',
                message: err
            });
        }
        pool.end();
    });
});

/**
 * @api {get} /event
 * @apiName event
 * @apiGroup event
 *
 * @apiQuery (body) {String} location name OR {String} location latitude,longitude.
 *                      {String} budget of the user in dollar signs 1, 2, 3, or 4, combinations possible ie. 1:2 for both 1 and 2 dollar amounts.
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

    let budget = req.body.budget ? req.body.budget : '1:2:3:4';

    const searchRadius = 50;

    let url = 'https://eventup.com/api/v3/search/';
    if (req.query.location) {
        url = url + 'place/';
    } else {
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

        url = url + 'lat_lng/' + req.query.latlon + '/';
    }

    axios.get(url, {
        params: {
            dollar_signs: req.query.budget,
            radius: searchRadius,
            search: req.query.location,
        },
    })
        .then(function (response) {
            const ven = response.data.venues;
            let venues = [];
            for (let i = 0; i < response.data.count; i++) {
                if (i >= 100) {
                    break;
                }
                if (i in ven) {
                    if ('title' in ven[i]) {
                        venues.push(ven[i]['title']);
                    }
                }
            }
            res.send({
                data: venues,
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
        }
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

    let event = {};
    event.owner = req.body.userName;
    event.date = req.body.date;
    event.location = req.body.location;
    event.partySupplier = req.body.partySupplier;
    event.caterer = req.body.caterer;
    event.guests = req.body.guests ? req.body.guests : {};

    const pool = new Pool({
        connectionString: connectionString,
    });

    pool.query(Insert_event, [event.owner, event.date, event.location, event.partySupplier, event.caterer, event.guests, uuidv1(),  ],  (err, response) => {

        if(err){
            pool.end();
            return res.send({
                errorType: 'InternalError',
                message: err,
            });
        }

        pool.end();

        return res.send({
            data: response.rows[0].id,
        });
    });
});

/**
 * @api {post} /update
 * @apiName update
 * @apiGroup event
 *
 * @apiParam (body) {String} date of event in format 'YYYY-MM-DD HH:mm:SS'
 *                  {float[2]} array of floats containing longitude/latitude.
 *                  {String} name of party supplier.
 *                  {String} name of caterer.
 *                  {String[]} array of guests invited.
                    {String} id of the event
 *
 * @apiParamExample {JSON} Request Body Example
 *      {
            date: '2019-02-09 05:00:00',
            location: [ 40.423540, -86.921740 ],
            partySupplier: 'Party City',
            caterer: 'Chipotle',
            guests: [ 'Jane Doe', 'Scott Smith', 'George Washington' ]
        }
 * @apiSuccess {String} message: success.
 * @apiError (RequestFormatError) 422 For missing parameter(s).
 * @apiError (Internal Error) 500+ Internal Error.
**/

eventRoutes.post('/update', (req, res) => {

    if (!req.body.userName) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the owner userName.',
        });
    }

    if (!req.body.id) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the id.',
        });
    }

    let event = {};
    event.owner = req.body.userName;
    event.id = req.body.id;

    const pool = new Pool({
        connectionString: connectionString,
    });

    pool.query(Select_event, [event.owner, event.id, ],  (err, response) => {

        if(err){
            pool.end();
            return res.send({
                errorType: 'InternalError',
                message: err,
            });
        }

        if(!response.rows[0]){
            return res.status(422).send({
                errorType: 'NoSuchEventError',
                message: 'Incorrect owner or id.',
            });
        }

        event.date = req.body.date ? req.body.date : response.rows[0].date;
        event.location = req.body.location ? req.body.location : response.rows[0].location;
        event.partySupplier = req.body.partySupplier ? req.body.partySupplier : response.rows[0].partySupplier;
        event.caterer = req.body.caterer ?  req.body.caterer : response.rows[0].caterer;
        event.guests = req.body.guests ? req.body.guests : response.rows[0].guests;

        const pool1 = new Pool({
            connectionString: connectionString,
        });

        pool1.query(Update_event, [event.date, event.location, event.partySupplier, event.caterer, event.guests, event.owner, event.id, ],  (err, response) => {

            if(err){
                pool1.end();
                return res.send({
                    errorType: 'InternalError',
                    message: err,
                });
            }
            pool1.end();

            return res.send({
                message: 'sucess',
            });
        });

        pool.end();
    });
});

function nodemailerSender(maillist){

    let transporter = nodemailer.createTransport ({
        service: 'gmail',
        auth: {
            user: 'incfiesta@gmail.com',
            pass: 'fiesta2019.',
        },
    });
    fs.readFile('app/res/invitecard.html', { encoding: 'utf-8', }, function (err, html) {
        if (!err) {
            maillist.forEach(function(to, i, array) {
                let msg = {
                    from: 'Team Fiesta',
                    subject: 'Event Invite!',
                    text: 'Howdy!\nYou have been invited to an event. Open the card enclosed below to view the invite.\n\nCheers!\nTeam Fiesta',
                    html: html,
                };
                msg.to = to;
                transporter.sendMail(msg, function(error, info) {
                });
            });
        }
    });
}

/**
 * @api {post} /rsvp
 * @apiName rsvp
 * @apiGroup event
 *
 * @apiParam (body) {String} userName
                    {String} id of the event
                    {String} rsvp status ('yes'/'no')
 *
 * @apiParamExample {JSON} Request Body Example
 *      {
            userName: 'johndoe',
            id: 'jhbbgdciuwdc',
            status: 'yes'
        }
 * @apiSuccess {String} message: success.
 * @apiError (RequestFormatError) 422 For missing parameter(s).
 * @apiError (Internal Error) 500+ Internal Error.
**/

eventRoutes.post('/rsvp', (req, res) => {
    if (!req.body.userName) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the guest username.',
        });
    }

    if (!req.body.eventID) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the event ID.',
        });
    }

    if (!req.body.status) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the rsvp status.',
        });
    }

    if (req.body.status.toUpperCase() !== 'YES' && req.body.status.toUpperCase() !== 'NO') {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include valid rsvp status.',
        });
    }

    let rsvp = {};
    rsvp.user = req.body.userName;
    rsvp.eventID = req.body.eventID;
    rsvp.status = req.body.status;

    const pool = new Pool({
        connectionString: connectionString,
    });

    pool.query(Insert_rsvp, [rsvp.user, rsvp.eventID, rsvp.status, ],  (err, response) => {

        if(err){
            pool.end();
            return res.send({
                errorType: 'InternalError',
                message: err,
            });
        }

        pool.end();

        return res.send({
            message: 'success',
        });
    });
});

/**
 * @api {post} /image_post
 * @apiName image_post
 * @apiGroup event
 *
 * @apiParam (body) {String} data of the images encoded 64.
                    {String} id of the event
 *
 * @apiParamExample {JSON} Request Body Example
 *      {
            data: 'oaisduhfhugiouhedrgiergiuoher',
            id: 'jhbbgdciuwdc'
        }
 * @apiSuccess {String} message: success.
 * @apiError (RequestFormatError) 422 For missing parameter(s).
 * @apiError (Internal Error) 500+ Internal Error.
**/

eventRoutes.post('/image_post', (req, res) => {

    if (!req.body.id) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the id.',
        });
    }

    if (!req.body.data) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the data.',
        });
    }

    let event = {};
    event.data = req.body.data;
    event.id = req.body.id;

    const pool = new Pool({
        connectionString: connectionString,
    });

    pool.query(postImages, [event.data, event.id, ],  (err, response) => {

        if(err){
            pool.end();
            return res.status(501).send({
                errorType: 'InternalError',
                message: err,
            });
        }

        pool.end();
        return res.send({
            message: 'sucess',
        });

    });
});

/**
 * @api {get} /image_get
 * @apiName image_get
 * @apiGroup event
 *
 * @apiParam (query) {String} id of the event
 *
 * @apiParamExample {JSON} Request query Example
 *      {
            id: 'jhbbgdciuwdc'
        }
 * @apiSuccess {String} image data.
 * @apiError (RequestFormatError) 422 For missing parameter(s).
 * @apiError (Internal Error) 500+ Internal Error.
**/

eventRoutes.get('/image_get', (req, res) => {

    if (!req.query.id) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the id.',
        });
    }

    let event = {};
    event.id = req.query.id;

    const pool = new Pool({
        connectionString: connectionString,
    });

    pool.query(getImages, [event.id, ],  (err, response) => {

        if(err){
            pool.end();
            return res.status(501).send({
                errorType: 'InternalError',
                message: err,
            });
        }

        pool.end();
        return res.send({
            message: 'sucess',
            data: response.rows[0],
        });

    });
});

/**
 * @api {post} /tasks_post
 * @apiName tasks_post
 * @apiGroup event
 *
 * @apiParam (body) {String} tasks of the event.
                    {String} id of the event
 *
 * @apiParamExample {JSON} Request Body Example
 *      {
            task: '{oaisduhfhugiouhedrgiergiuoher}',
            id: 'jhbbgdciuwdc'
        }
 * @apiSuccess {String} message: success.
 * @apiError (RequestFormatError) 422 For missing parameter(s).
 * @apiError (Internal Error) 500+ Internal Error.
**/

eventRoutes.post('/tasks_post', (req, res) => {

    if (!req.body.id) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the id.',
        });
    }

    if (!req.body.task) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the data.',
        });
    }

    let event = {};
    event.task = req.body.task;
    event.id = req.body.id;

    const pool = new Pool({
        connectionString: connectionString,
    });

    pool.query(postTasks, [event.task, event.id, ],  (err, response) => {

        if(err){
            pool.end();
            return res.status(501).send({
                errorType: 'InternalError',
                message: err,
            });
        }

        pool.end();
        return res.send({
            message: 'sucess',
        });

    });
});

/**
 * @api {get} /tasks_get
 * @apiName task_get
 * @apiGroup event
 *
 * @apiParam (query) {String} id of the event
 *
 * @apiParamExample {JSON} Request query Example
 *      {
            id: 'jhbbgdciuwdc'
        }
 * @apiSuccess {String} image data.
 * @apiError (RequestFormatError) 422 For missing parameter(s).
 * @apiError (Internal Error) 500+ Internal Error.
**/

eventRoutes.get('/tasks_get', (req, res) => {

    if (!req.query.id) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the id.',
        });
    }

    let event = {};
    event.id = req.query.id;

    const pool = new Pool({
        connectionString: connectionString,
    });

    pool.query(getTasks, [event.id, ],  (err, response) => {

        if(err){
            pool.end();
            return res.status(501).send({
                errorType: 'InternalError',
                message: err,
            });
        }

        pool.end();
        return res.send({
            message: 'sucess',
            data: response.rows[0],
        });

    });
});

module.exports = eventRoutes;
