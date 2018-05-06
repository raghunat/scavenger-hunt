const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('../logger');


const app = express();
app.use(bodyParser.json());

// TODO Add require routers here
// app.use('/somepath', require(./routes/somepath.js));

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    }, stream: process.stderr
}));

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode >= 400
    }, stream: process.stdout
}));

// alive route
app.use('/alive', require('./routes/alive'));

app.use('/version', require('./routes/version.js'));

app.use('/hunts', require('./routes/hunts.js'));

app.use('/process', require('./routes/process.js'));

app.listen(process.env.PORT || 3000, () => logger.info('App is listening...'));
