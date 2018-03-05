
function formatDate(dateTime, format) {
    var moment = require('moment')
    if (moment) {
        return moment(dateTime).format("DD-MM-YYYY");
    }
    else {
        return dateTime;
    }
}

function formatYear(dateTime) {
    var moment = require('moment')
    if (moment) {
        return moment(dateTime).format("YYYY");
    }
    else {
        return dateTime;
    }
}

function beforeRender(req, res, done) {
  // merge in some values for later use in engine
  // and preserve other values which are already in
  //req.data = Object.assign({}, req.data, {foo: "foo"})
    req.template.helpers += '\n' + formatDate + '\n' + formatYear
    //done()
    // require('request')({
    //         url:"http://localhost:3009/api/fivesurveys",
    //         json:true
    //     }, function(err, res, body){
    //         req.data = body;//Object.assign({}, req.data, body);
    //         done();
    //     });
    require('request')({
            url:"http://localhost:3009/api/getgraphs",
            json:true
        }, function(err, res, body){
            req.data = body;//Object.assign({}, req.data, body);
            done();
        });
    
}