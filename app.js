const express = require('express');
const bodyParser = require("body-parser");
const router = require('./routes/routing');
const myErrorLogger = require('./utilities/errorlogger')
const myRequestLogger = require('./utilities/requestlogger')
const nodemailer=require('nodemailer');
const path=require('path');
const exphbs=require('express-handlebars');
const cors = require('cors');
const app = express();
// view engine setup
app.engine('handlebars',exphbs({ extname: "hbs", defaultLayout: false, layoutsDir: "views/ "}));
app.set('view engine','handlebars');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use(myRequestLogger);
app.use('/', router);
app.use(myErrorLogger);

app.listen(3000);
console.log("Server listening in port 3000");


module.exports = app