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
app.use(bodyParser.urlencoded({limit: '100mb', extended: true, parameterLimit: 500000}));
app.use(bodyParser.json({limit: '100mb'}));
const functions = require('../functions/generalDAL');
const Joi = require('joi');
var atob = require('atob');
const Celebrate = require('celebrate');
const ObjectID = require('mongodb').ObjectID;

var modeloAsiento = Joi.object().keys({
    numAsiento: Joi.number().required(),
    strColor: Joi.string().required()
});

var modeloQr = Joi.object().keys({
    _id: Joi.string().required(),
    strNombre: Joi.string().required(),
    strUbicacion: Joi.string().required(),
    nmbPuntos: Joi.number().required()
});

app.get('/api/general/login/:correo/:contrasenia', Celebrate({
    params: {
        correo: Joi.string().required(),
        contrasenia: Joi.string().required()
    }
}), function (req, res) {
    functions.fnGetLogIn(req.params)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.get('/api/general/categoriasGaleria', function (req, res) {
    functions.fnGetCategoriasGaleria()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.get('/api/general/detalleGaleria/:_id', Celebrate({
    params: {
        _id: Joi.string().required()
    }
}), function (req, res) {
    functions.fnGetGaleria(req.params)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.get('/api/general/itinerarios/:intPresupuesto', Celebrate({
    params: {
        intPresupuesto: Joi.number().required()
    }
}), function (req, res) {
    functions.fnGetItinerarios(req.params)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.get('/api/general/listaEvento/:strTipo', Celebrate({
    params: {
        strTipo: Joi.string().required()
    }
}), function (req, res) {
    functions.fnGetEventos(req.params)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.get('/api/general/detalleEvento/:_id/:strTipo', Celebrate({
    params: {
        _id: Joi.string().required(),
        strTipo: Joi.string().required()
    }
}), function (req, res) {
    functions.fnGetDetalleEvento(req.params)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.get('/api/general/detalleForo/:idEvento', Celebrate({
    params: {
        idEvento: Joi.string().required()
    }
}), function (req, res) {
    functions.fnGetForo(req.params)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.get('/api/general/detalleDisponibilidad/:idEvento/:strFecha', Celebrate({
    params: {
        idEvento: Joi.string().required(),
        strFecha: Joi.string().required()
    }
}), function (req, res) {
    functions.fnGetDisponibilidadEvento(req.params)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.put('/api/general/detalleForo', Celebrate({
    body: {
        _id: Joi.string().required(),
        arrayNumAsientos: Joi.array().items(Joi.number().required()),
        strColor: Joi.string().required()
    }
}), function (req, res) {
    functions.fnPutAsientosForo(req.body)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.put('/api/general/dispoEvento', Celebrate({
    body: {
        _id: Joi.string().required(),
        strFecha: Joi.string().required(),
        strHora: Joi.string().required(),
        nmbAsientos: Joi.number().required()
    }
}), function (req, res) {
    functions.fnPutDisponibilidadEvento(req.body)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.post('/api/general/qrCode', Celebrate({
    body: {
        _id: Joi.string().required(),
        qrModelo: modeloQr
    }
}), function (req, res) {
    functions.fnPostQrCode(req.body)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.post('/api/general/changePass', Celebrate({
    body: {
        _id: Joi.string().required(),
        strContraseña: Joi.string().required()
    }
}), function (req, res) {
    functions.fnPostChangePass(req.body)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.get('/api/general/qrExistente/:_id', Celebrate({
    params: {
        _id: Joi.string().required()
    }
}), function (req, res) {
    functions.fnGetQrExistente(req.params)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.get('/api/general/gRegistro/:strCorreo', Celebrate({
    params: {
        strCorreo: Joi.string().required()
    }
}), function (req, res) {
    functions.fnGetRegistro(req.params)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.post('/api/general/pRegistro', Celebrate({
    body: {
        strNombre: Joi.string().required(),
        strApellido: Joi.string().required(),
        strCorreo: Joi.string().required(),
        strContraseña: Joi.string().required(),
        nmbPuntos: Joi.number().required()
    }
}), function (req, res) {
    functions.fnPostRegistro(req.body)
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
app.listen(5000, "0.0.0.0", function () {
    console.log('Listen general on 0.0.0.0:5000');
});
