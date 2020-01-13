const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const hbs = require('express-hbs');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
const multer = require('multer');
var upload = multer({dest: './upload'});

// import routes
var index = require('./routes/index2');
var users = require('./routes/users2');
var employees = require('./routes/employees');

const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('view engine', 'ejs');


// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

app.use('/index2', index);
app.use('/users2', users);
app.use('/employees', employees);

//NEW 
// routes
app.get('/upload', function(req, res) {
res.sendFile('upload', { root: __dirname });
});

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

// FILE UPLOAD
app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(file)
  
})

//Uploading multiple files
app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
  const files = req.files
  if (!files) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    return next(error)
  }
 
    //res.send(files)
    res.redirect('/employees/index2')
  
})

// images to the database
app.post('/uploadphoto', upload.single('picture'), (req, res) => {
    var img = fs.readFileSync(req.file.path);
 var encode_image = img.toString('base64');


 // Define a JSONobject for the image attributes for saving to database
 var finalImg = {
      contentType: req.file.mimetype,
      image:  new Buffer(encode_image, 'base64')
   };
db.collection('quotes').insertOne(finalImg, (err, result) => {
    console.log(result)
 
    if (err) return console.log(err)
 
    console.log('saved to database')
    res.redirect('/')
  })
})

// RETRIEVING IMAGES
app.get('/photos', (req, res) => {
db.collection('mycollection').find().toArray((err, result) => {
 
      const imgArray= result.map(element => element._id);
            console.log(imgArray);
 
   if (err) return console.log(err)
   res.send(imgArray)
 
  })
});

// IMAGE BY ID
app.get('/photo/:id', (req, res) => {
var filename = req.params.id;
 
db.collection('mycollection').findOne({'_id': ObjectId(filename) }, (err, result) => {
 
    if (err) return console.log(err)
 
   res.contentType('image/jpeg');
   res.send(result.image.buffer)
   
    
  })
})
 
// var upload = multer({ storage: storage })

/* GET home page. */
app.get('/upload', function(req, res, next) {
  res.render('upload', { title: 'Job Platform' });
});

/* jobs. */
app.get('/showSeeker', function(req, res, next) {
  
  if(!req.session.user) //new 13/01
    res.redirect('/login.html');//new 13/01
  else//new 13/01
 res.render('showSeeker', { title: 'Job Platform' });
});

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.user = req.session.user //new  12/01/2020
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/', require('./routes/index2'));
app.use('/users2', require('./routes/users2'));
app.use('/', require('./routes/jobSeeker_index'));
//app.use('/jobSeeker', require('./routes/jobSeeker')); 

//Get single employee by id new
app.get('/showSeeker/:id', function(req, res) {
  employee.show(req, res);
 res.sendFile(__dirname  + '/employees/showSeeker');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;