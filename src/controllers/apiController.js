/*
 * Author: Nikhil Unni <nikhi.unni@gmail.com>
 * Created Date: Tuesday November 16th 2021
 * Version : 1.0.0
 * Product : API controller
 */

 const { changeFormat } = require('../utilities/index');

 
module.exports = {
/**
 * Returns formatted array
*/
  arrangeJSON: (request, h) => {
    try {
      const { payload } = request;
      return changeFormat(payload);
    }
    catch (e) {
      console.log(e);
      return h.response({
        status: 'failure',
        error: 'Something went wrong, please try again later!'
      }).code(500);
    }
  }
}
