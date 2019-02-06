let express = require('express');

// Instantiate router

let designsRoutes = express.Router();

/**
 * @api {get} /designs
 * @apiName designs
 * @apiGroup designs
 *
 * @apiQuery (body) {String} 
 *                  {String} 
 *
 * @apiSuccess {String} 
 * @apiError (RequestFormatError) 422
 * @apiError (Internal Error) 500+ Internal Error
**/

designsRoutes.get('/designs', (req, res) => {
    
});
