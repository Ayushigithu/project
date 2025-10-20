const express = require('express')
const path = require('path')
const urlRoutes = require('./routes/url')
const staticRouters = require('./routes/staticRouters')
const userRoutes = require('./routes/user.js')
const app = express()
const { connectToMongoDB } = require('./mongoDB.js')
const URL = require('./models/url.js')
const cookieParser =require('cookie-parser');
const { applyTimestamps } = require('./models/user.js')
const {  checkForAuthentication,restrictTo}=require('./middleware/auth.js')
// const expressLayouts = require("express-ejs-layouts");


app.use(express.json())
// app.use(express.urlencoded({extented:false})); //creating an error of body-parser deprecated undefined extended: provide extended option index.js:12:17
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(checkForAuthentication);

app.use('/url',restrictTo(["NORMAL",'ADMIN']), urlRoutes)
app.use('/', staticRouters)
app.use('/user', userRoutes)

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))
app.set('views', path.join(__dirname, 'views'))

// app.use(expressLayouts);

// app.set("layout", "layouts/boilerplate");


app.get('/url/:shortId', async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  )
  res.redirect(entry?.redirectURL)
})

connectToMongoDB('mongodb+srv://ayushigoyal2704_db_user:Ayushi%40123@cluster0.grkgwpw.mongodb.net/URL')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
  });

const port = 3002;
app.listen(port, () => {
  `server is listening to ${port}`
})

