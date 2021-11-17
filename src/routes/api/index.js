/*
 * Author: Nikhil Unni <nikhi.unni@gmail.com>
 * Created Date: Tuesday November 16th 2021
 * Version : 1.0.0
 * Product : API route
 */

 const Joi = require('joi');
const apiController = require('../../controllers/apiController');

module.exports = [

    /**
     *  @route "/api", name="format_json"
     * @controller arrangeJSON , Formatt payload based on parent_id in request
    */
    {
        method: "POST",
        path: "/api/",
        handler: apiController.arrangeJSON,
        config: {
          description: "Each child should be placed in the children array of its parent",
          tags: ['api'],
          validate: {
              payload: Joi.object()
          }
        }
      }
];

