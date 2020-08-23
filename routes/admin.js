const router = require('express').Router();
let video = require('../models/videos.model');
const Busboy = require('busboy');
const fs = require('fs');
const path = require('path');
const session = require('sessionstorage');
var saveThumbnail='';
var saveVideo='';
router.get('/logout',function(req,res) {
   session.clear();
})
router.get('/checkLogin',function(res,res) {
  const username = session.getItem("username");
 const password = session.getItem("password");
 const login = session.getItem("login");

 if(username =='manditjyotiborah' && password=='mandit' && login =='1'){

     res.send({ check : false });
 }
 else{
   res.send({ check : true });
 }
})
router.post('/login',function(req,res){
    if(req.body.username=='manditjyotiborah' && req.body.password=='mandit')
    { 
     session.setItem("username",'manditjyotiborah');
     session.setItem("password",'mandit');
     session.setItem("login","1");
     res.send('/manage');
    }
    else{
      res.send('/login');
    }
});

router.post('/upload',function(req,res)
{ 
  const username = session.getItem("username");
  const password = session.getItem("password");
  const login = session.getItem("login");
  
  if(username=='manditjyotiborah' && password=='mandit' && login=='1'){
  var busboy = new Busboy({ headers: req.headers });
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    if(fieldname=='thumbnail'){
      saveThumbnail = 'thumbnails/'+Date.now()+path.extname(filename);
      file.pipe(fs.createWriteStream('test/public/'+saveThumbnail));
     }
    else if(fieldname=='videofile'){
     saveVideo = 'videos/'+Date.now()+path.extname(filename);
     file.pipe(fs.createWriteStream(saveVideo));
     }
  });
  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype){
      var newVideo=new video({
      title : val,
      thumbnail : saveThumbnail,
      link : saveVideo
    });
    newVideo.save();
   });
  busboy.on('finish', function() {
   
    res.writeHead(200, { 'Connection': 'close' });
    res.end("/manage");
  });
   
  return req.pipe(busboy);
}
else{
  res.send("/login");
}
});



module.exports = router;