/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var validator = require('validator');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var moment = require('moment');
var fs = require('fs');
var atob = require('atob');
var jwt = require('jsonwebtoken');
var mongoSanitize = require('express-mongo-sanitize');
var dateFormat = require('dateformat');
var request = require('request');

directionImg = "/var/www/html/media/";

///Route:('/api/general/imagen')
exports.fnPostImage = function (jsnParameters) {
    return new Promise(function (resolve, reject) {
        console.log(directionImg + jsnParameters.strNombre);
        bitmap = new Buffer(jsnParameters.strBase64, 'base64');
        fs.writeFile(directionImg + jsnParameters.strNombre, bitmap, function (err, buffer) {
            if (err) {
                reject({strAnswer: "Error al guardar la imagen", intStatus: 2});
            }else{
                resolve({strAnswer:"Imagen guardada exitosamente",intStatus:1});
            }
        });
    });
};

///Route:('/api/general/test/:strTipo')
exports.fnGetTest = function (jsnParameters) {
    return new Promise(function (resolve, reject) {
        if(jsnParameters.strTipo == "1"){
            resolve({strAnswer:"Funcionando"});
        }else{
            reject({strAnswer:"Sin jalar"});
        }
    });
};

