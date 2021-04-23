const router = require('express').Router();
let video = require('../models/video.model');
const fs = require('fs');
router.get('/show-videos',function(req,res){
    video.find()
      .then(videos => {
        cosnole.log(videos)
        res.json(videos)
    })
    .catch(err=>{
        res.status(400).json(err)
    });
});
router.post('/watch/:id',function(req,res){
   video.findById(req.params.id)
   .then(videos=>{
    const path = videos.link ;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
  
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1]? parseInt(parts[1], 10): fileSize-1 ;
  
      if(start >= fileSize) {
        res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
        return ;
      }
      
      const chunksize = (end-start)+1;
      const file = fs.createReadStream(path, {start, end});
      const head = {
        'Content-Range': 'bytes '+start+'-'+end+'/'+fileSize,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4,video/ogg,video/webm',
      };
  
      res.writeHead(206, head);

      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4,video/ogg,video/webm',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }
   })
});
module.exports = router;