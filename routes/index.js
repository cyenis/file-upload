var express = require('express');
var router = express.Router();
var multer = require('multer');


const Picture = require('../models/pictures');


/* GET home page. */
router.get('/', function (req, res, next) {
  Picture.find((err, pictures) => {
    res.render('index', { pictures })
  })
});


// POST FILE WITH MULTER 

var upload = multer({ dest: './public/uploads/' });

router
  .post('/upload', upload.single('photo'), function (req, res) {

    const pic = new Picture({
      name: req.body.name,
      pic_path: `/uploads/${req.file.filename}`,
      pic_name: req.file.originalname
    });

    pic.save((err) => {
      if (err) {
        next(err)
      }
      else {
        res.redirect('/');
      }
    });
  });


module.exports = router;
