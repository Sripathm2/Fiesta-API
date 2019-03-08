let express = require('express');
const { Pool, } = require('pg');
const connectionString = process.env.DB_URL;
const Insert_designs = 'INSERT INTO Designs (id, designString) VALUES ($1, $2)';

// Instantiate router

let designsRoutes = express.Router();

/**
 * @api {post} /designs
 * @apiName designs
 * @apiGroup designs
 *
 * @apiParam (body) {Integer} eventID
                        {String} Base64 encoded image
 *
 * @apiParamExample {JSON} Request Body Example
 *  {
            eventID: 5,
            imageString: 'Base64EncodedImage'
 
 * @apiSuccess {String} Success.
 * @apiError (RequestFormatError) 422 Missing eventID, imageString or Invalid String (Not Base64)
 * @apiError (Internal Error) 500+ Internal Error
**/

designsRoutes.post('/', (req, res) => {
    
    if (!req.body.eventID) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include eventID',
        });
    }
    
    if (!req.body.imageString) {
        return res.status(422).send({
            errorType: 'RequestFormatError',
            message: 'Must include imageString',
        });
    }
    
    let design = {};
    design.id = req.body.eventID;
    design.text = req.body.imageString;
    
    const pool = new Pool({
        connectionString: connectionString,
    });

    pool.query(Insert_designs, [design.id, design.text, ],  (err, response) => {

        if(err){
            pool.end();
            return res.send({
                errorType: 'InternalError',
                message: err,
            });
        }

        pool.end();

        return res.send({
            message: 'Success',
        });
    });
});

module.exports = designsRoutes;