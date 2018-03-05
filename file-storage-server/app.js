var express = require('express');
var cors = require('cors');
var app = express();
var storage = require('filestorage').create();
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var nocache = require('nocache');

var fs = require('fs');

app.use(cors());
app.use(nocache());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/upload', multipartyMiddleware, function(req, res) {
	storage.insert(req.files.file.originalFilename, req.files.file.path , function(err,id,stat){
    fs.unlink(req.files.file.path, function(err){
        if(err){
          res.sendStatus(500);
        }else{
          res.json({ fileId: id });
        }
    });
	});
});

app.post('/update?:fileId', multipartyMiddleware, function(req, res) {
	var fileId = req.query.fileId;
	storage.update(fileId, req.files.file.originalFilename, req.files.file.path , function(err,id,stat){
		fs.unlink(req.files.file.path, function(err){
        if(err){
          res.sendStatus(500)
        }else{
          res.sendStatus(200);
        }
    });
	});
});

app.post('/delete?:fileId',function(req,res){
  var fileId = req.query.fileId;
  storage.remove(fileId, function(err){
    if(err){
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  });
});

app.get('/list',function(req,res){
	storage.listing(function(err,arr){
		res.json({
			files: arr
		});
	});
});

app.get('/get',function(req,res){

	var fileId = req.query.fileId;

	storage.stat( fileId, function(err, stat, path) {
		res.set('Content-type',stat.type);
		res.set('Access-Control-Expose-Headers','Content-Disposition,Content-Length,Content-Type');
		res.set('Content-disposition', 'inline; filename=' + stat.name);
		storage.pipe(fileId,res);
	});

});
app.get('/get2?:fileId',function(req,res){
	storage.stat(fileId, function(err, stat) {
		console.log(stat);
		res.set('Content-Disposition', stat.name);
  	res.set('Content-Length', stat.length);
  	res.set('Content-Type', stat.type);
  	res.set('Access-Control-Expose-Headers','Content-Disposition,Content-Length,Content-Type');
		storage.pipe(2,req,res)
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
