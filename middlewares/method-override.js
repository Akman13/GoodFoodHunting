const methodOverride = require('method-override');

// Going by the documentation: methodOverride() returns a function
// This is the value that we want to feed back into the server
// Therefore we need to 'catch' it - by storing it into a variable (fnReturn)
// Then we export fnReturn, which is the function we caught

const fnReturn = methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
});


module.exports = fnReturn;