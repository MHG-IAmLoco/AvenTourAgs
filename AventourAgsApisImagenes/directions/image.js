/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true, parameterLimit: 500000 }));
app.use(bodyParser.json({ limit: '100mb' }));
const functions = require('../functions/imageDAL');
const Joi = require('joi');
var atob = require('atob');
const Celebrate = require('celebrate');
const ObjectID = require('mongodb').ObjectID;

var modeloAsiento = Joi.object().keys({
    numAsiento:Joi.number().required(),
    strColor:Joi.string().required()
});

app.post('/api/server/imagen',Celebrate({
    body:{
        strNombre: Joi.string().required(),
        strBase64: Joi.string().required()
    }
}),function (req, res) {
    functions.fnPostImage(req.body)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.get('/api/server/test/:strTipo',Celebrate({
    params:{
        strTipo:Joi.string().required()
    }
}),function (req, res) {
    functions.fnGetTest(req.params)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

//----------------------------error messages------------------------------------
app.use((err, req, res, next) => {
    res.status(400).json({intStatus: 6, strAnswer: 'Error to attend the petition' + err});
});

//-------------------API MANAGER RESPONDS TO PORT 5000 ------------------------
app.listen(5005,"0.0.0.0", function () {
    console.log('Listen image on 0.0.0.0:5005');
});
