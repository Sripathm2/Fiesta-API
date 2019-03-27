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
const Update_event = 'UPDATE Events set name = coalesce( $1, name),' +
                        'description = coalesce( $2, description),' +
                        'date = coalesce( $3, date),' +
                        'imageLink = coalesce( $4, imageLink),' +
                        'location = coalesce( $5, location),' +
                        'partySupplier = coalesce( $6, partySupplier),' +
                        'caterer = coalesce( $7, caterer),' +
                        'task = coalesce( $8, task),' +
                        'guest = coalesce( $9, guest),' +
                        'wishlist = coalesce( $10, wishlist)' +
                        'where id = $11 and owner = $12;';
const Select_event = 'select * from Events where owner = $1 OR guest LIKE $2';

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

            return res.send({
                message: 'success',
                data: response.rows,
            });
        });
    });
});

eventRoutes.post('/update_event', (req, res) => {
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

        if (!req.body.id) {
            return res.status(422).send({
                errorType: 'RequestFormatError',
                message: 'Must include the id.',
            });
        }
        let event = {};
        event.id = req.body.id;
        event.owner = decode.userName;
        event.name = req.body.name ? req.body.name : null;
        event.description = req.body.description ? req.body.description : null;
        event.date = req.body.date? req.body.date : null ;
        event.imageLink = req.body.imageLink ? req.body.imageLink : null;
        event.location = req.body.location ? req.body.location : null;
        event.partySupplier = req.body.partySupplier ? req.body.partySupplier : null;
        event.caterer = req.body.caterer ? req.body.caterer : null;
        event.task = req.body.task ? req.body.task : null;
        event.guest = req.body.guest ? req.body.guest : null;
        event.wishlist = req.body.wishlist ? req.body.wishlist : null;

        const pool = new Pool({
            connectionString: connectionString,
        });

        pool.query(Update_event, [event.name, event.description, event.date,
            event.imageLink, event.location,
            event.partySupplier, event.caterer, event.task, event.guest,
            event.wishlist, event.id, event.owner,  ],  (error, response) => {

            if(error){
                pool.end();
                return res.send({
                    errorType: 'InternalError',
                    message: error,
                });
            }

            pool.end();

            return res.send({
                message: 'success',
            });
        });

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