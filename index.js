//----------------require extensions-----------------//
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { connect } = require('./config/database.js');
connect();

//-------------end require extensions-----------------//

const app = express();


//------------------ use extensions------------------//
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//---------------end use extension------------------//

//-------------------use router---------------------//




//----------------end use router--------------------//

//--------------------build server------------------//
const PORT = process.env.APP_PORT || 8000;
app.listen(PORT, () => {
    console.log('App listening on port: ' + PORT);
});
//----------------end build server------------------//