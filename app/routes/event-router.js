let express = require('express');
const axios = require('axios');
const { Pool, } = require('pg');
let nodemailer = require('nodemailer');
let fs = require('fs');
const uuidv1 = require('uuid/v1');
let jwt = require('jsonwebtoken');
const connectionString = process.env.DB_URL;
const Insert_event = 'INSERT into Events (id, owner, name, description, date,' +
                       'imageLink, location, partySupplier, caterer,' +
                       'task, guest, wishlist)' +
                       'VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);';
const Update_event = 'Update Events Set date = $1, location = $2, partySupplier = $3, caterer = $4, guests = $5 Where owner = $6 AND id = $7';
const Select_event = 'select * from Events1 where owner = $1 OR guest LIKE $2';

// Instantiate router

let eventRoutes = express.Router();

eventRoutes.post('/create_event', (req, res) => {
    if (!req.query.token) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the token.',
        });
    }
    jwt.verify(req.query.token, process.env.secret, function(err, decode) {
        if(err){
            return res.status(422).send({
                errorType: 'InvalidTokenError',
                message: 'invalid or expired token.',
            });
        }
        if (!req.body.date) {
            return res.status(422).send({
                errorType: 'RequestFormatError',
                message: 'Must include the date.',
            });
        }

        let event = {};
        event.id = uuidv1();
        event.owner = decode.userName;
        event.name = req.body.name ? req.body.name : ' ';
        event.description = req.body.description ? req.body.description : ' ';
        event.date = req.body.date;
        event.imageLink = req.body.imageLink ? req.body.imageLink : ' ';
        event.location = req.body.location ? req.body.location : ' ';
        event.partySupplier = req.body.partySupplier ? req.body.partySupplier : ' ';
        event.caterer = req.body.caterer ? req.body.caterer : ' ';
        event.task = req.body.task ? req.body.task : ' ';
        event.guest = req.body.guest ? req.body.guest : ' ';
        event.wishlist = req.body.wishlist ? req.body.wishlist : ' ';

        const pool = new Pool({
            connectionString: connectionString,
        });

        pool.query(Insert_event, [event.id, event.owner, event.name,
            event.description, event.date, event.imageLink, event.location,
            event.partySupplier, event.caterer, event.task, event.guest,
            event.wishlist, ],  (error, response) => {

            if(error){
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
});

eventRoutes.get('/get_event', (req, res) => {
    if (!req.query.token) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include the token.',
        });
    }
    jwt.verify(req.query.token, process.env.secret, function(err, decode) {
        if(err){
            return res.status(422).send({
                errorType: 'InvalidTokenError',
                message: 'invalid or expired token.',
            });
        }

        const pool = new Pool({
            connectionString: connectionString,
        });

        let event = {};
        event.owner = decode.userName;
        event.guest = '%//**//' + decode.userName + '--%';

        pool.query(Select_event, [event.owner, event.guest, ],  (error, response) => {

            if(error){
                pool.end();
                return res.send({
                    errorType: 'InternalError',
                    message: err,
                });
            }

            pool.end();
            console.log(response.rows);

            return res.send({
                message: 'success',
                data: response.rows,
            });
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

module.exports = eventRoutes;

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
 *          userName: 'johndoe',
 *           date: '2019-02-09 05:00:00',
 *           location: [ 40.423540, -86.921740 ],
 *           partySupplier: 'Party City',
 *           caterer: 'Chipotle',
 *           guests: [ 'Jane Doe', 'Scott Smith', 'George Washington' ]
 *       }
 * @apiSuccess {String} eventID.
 * @apiError (RequestFormatError) 422 For missing parameter(s).
 * @apiError (Internal Error) 500+ Internal Error.
*/