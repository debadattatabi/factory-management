var uuidV1 = require('uuid/v1')

var data = function(data){
  var res = {
    data: data,
    requestId: uuidV1()
  };
  return res;
}

var error = function(error){
  var err = {
    error: error,
    requestId: uuidV1()
  };
  return err;
}

module.exports = {
  data: data,
  error: error
};