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
const functions = require('../functions/generalDAL');
const Joi = require('joi');
var atob = require('atob');
const Celebrate = require('celebrate');
const ObjectID = require('mongodb').ObjectID;

var modeloQr = Joi.object().keys({
    _id: Joi.string().required(),
    strNombre: Joi.string().required(),
    strUbicacion: Joi.string().required(),
    nmbPuntos: Joi.number().required()
});

var modeloAsiento = Joi.object().keys({
    numAsiento:Joi.number().required(),
    strColor:Joi.string().required()
});

var modeloInstancia = Joi.object().keys({
    strFecha:Joi.string().required(),
    strHora:Joi.string().required(),
    nmbLugares:Joi.number().required(),
});

var modeloActividad = Joi.object().keys({
    strDescripcion:Joi.string().required(),
    nmbDuracion:Joi.number().required(),
    strClave:Joi.string().allow("")
});

var modeloForo = Joi.object().keys({
    cantAsientos:Joi.number().required(),
    dispAsientos:Joi.number().required(),
    arrayAsientos:Joi.array().items(modeloAsiento)
});
var modeloGaleriaInterior = Joi.object().keys({
    _id:Joi.string().required().allow(""),
    strTitulo:Joi.string().required(),
    strDescripcion:Joi.string().required(),
    strImagenPrincipal:Joi.string().required().allow(""),
    arrayImagenes:Joi.array().allow(null)
});

var modeloGaleria = Joi.object().keys({
    _id:Joi.string().allow(""),
    strTitulo:Joi.string().required(),
    strDescripcion:Joi.string().required(),
    strImagenPrincipal:Joi.string().required().allow(""),
    arrayImagenes:Joi.array().items(modeloGaleriaInterior).allow(null)
});

app.post('/api/general/canjear', Celebrate({
    body: {
        _id: Joi.string().required(),
        nmbPuntos: Joi.number().required()
    }
}), function (req, res) {
    functions.fnPostCanjear(req.body)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.get('/api/general/promociones/', Celebrate({
    params: {    }
}), function (req, res) {
    functions.fnGetPromociones(req.params)
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


app.get('/api/general/login/:correo/:contrasenia',Celebrate({
    params:{
        correo: Joi.string().required(),
        contrasenia: Joi.string().required()
    }
}),function (req, res) {
    functions.fnGetLogIn(req.params)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.get('/api/general/categoriasGaleria',function (req, res) {
    functions.fnGetCategoriasGaleria()
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.get('/api/general/detalleGaleria/:_id',Celebrate({
    params:{
        _id:Joi.string().required()
    }
}),function (req, res) {
    functions.fnGetGaleria(req.params)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.get('/api/general/itinerarios/:intPresupuesto',Celebrate({
    params:{
        intPresupuesto:Joi.number().required()
    }
}),function (req, res) {
    functions.fnGetItinerarios(req.params)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.get('/api/general/listaEvento/:strTipo',Celebrate({
    params:{
        strTipo:Joi.string().required()
    }
}),function (req, res) {
    functions.fnGetEventos(req.params)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.get('/api/general/detalleEvento/:_id/:strTipo',Celebrate({
    params:{
        _id:Joi.string().required(),
        strTipo: Joi.string().required()
    }
}),function (req, res) {
    functions.fnGetDetalleEvento(req.params)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.get('/api/general/detalleForo/:idEvento',Celebrate({
    params:{
        idEvento: Joi.string().required()
    }
}),function (req, res) {
    functions.fnGetForo(req.params)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.get('/api/general/detalleDisponibilidad/:idEvento/:strFecha',Celebrate({
    params:{
        idEvento: Joi.string().required(),
        strFecha: Joi.string().required()
    }
}),function (req, res) {
    functions.fnGetDisponibilidadEvento(req.params)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.post('/api/general/detalleForo', Celebrate({
    body: {
        _id: Joi.string().required(),
        arrayNumAsientos: Joi.array().items(Joi.number().required()),
        strColor: Joi.string().required()
    }
}), function (req, res) {
    functions.fnPostAsientosForo(req.body)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.post('/api/general/dispoEvento', Celebrate({
    body: {
        _id:Joi.string().required(),
        strFecha:Joi.string().required(),
        strHora:Joi.string().required(),
        nmbAsientos:Joi.number().required()
    }
}), function (req, res) {
    functions.fnPostDisponibilidadEvento(req.body)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.post('/api/general/dispoDeportes', Celebrate({
    body: {
        _id:Joi.string().required(),
        nmbAsientos:Joi.number().required()
    }
}), function (req, res) {
    functions.fnPostDisponibilidadDeportes(req.body)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.get('/api/general/detalleItinerario/:_id',Celebrate({
    params:{
        _id:Joi.string().required()
    }
}),function (req, res) {
    functions.fnGetDetallesItinerario(req.params)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.get('/api/general/claves',function (req, res) {
    functions.fnGetClaves(req.params)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.post('/api/general/imgGaleria', Celebrate({
    body: {
        _id:Joi.string().required(),
        modeloGaleria:modeloGaleria
    }
}), function (req, res) {
    functions.fnPostImagenGaleria(req.body)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.post('/api/general/itinerario', Celebrate({
    body: {
        _id:Joi.string().allow(""),
        strTitulo:Joi.string().required(),
        strDescripcion:Joi.string().required(),
        strImagenPrincipal:Joi.string().required(),
        nmbCostoAproximado:Joi.number().required(),
        nmbTiempoAproximado:Joi.number().required(),
        arrayActividades:Joi.array().items(modeloActividad)
    }
}), function (req, res) {
    delete req.body._id;
    functions.fnPostItinerario(req.body)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.post('/api/general/evento', Celebrate({
    body: {
        _id:Joi.string().allow(""),
        strTipo:Joi.string().required(),
        strTitulo:Joi.string().required(),
        strDescripcion:Joi.string().required(),
        strMunicipio:Joi.string(),
        strResenia:Joi.string().required(),
        strImagenPrincipal:Joi.string().required(),
        dteFecha:Joi.date(),
        strUbicacion:Joi.string().required(),
        dteHoraInicio:Joi.date(),
        dteHoraFin:Joi.date(),
        nmbCostoAdulto:Joi.number().required(),
        nmbCostoMenor:Joi.number().required(),
        modeloForo:modeloForo,
        nmbCupo:Joi.number(),
        arrayHorarios:Joi.array().items(Joi.string()),
        arrayInstancias: Joi.array().items(modeloInstancia),
        strClave:Joi.string()
    }
}), function (req, res) {
    delete req.body._id;
    functions.fnPostEvento(req.body)
            .then(function (result) {
                res.json(result);
            })
            .catch(function (err) {
                res.json(err);
            });
});

app.post('/api/general/promocion', Celebrate({
    body: {
        _id:Joi.string(),
    	strNombre:Joi.string().required(),
    	strUbicacion:Joi.string().required(),
    	strDescripcion:Joi.string().required(),
    	strImagen:Joi.string().required(),
    	nmbPuntos:Joi.number().required(),
    }
}), function (req, res) {
    delete req.body._id;
    functions.fnPostPromocion(req.body)
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
app.listen(5000,"0.0.0.0", function () {
    console.log('Listen general on 0.0.0.0:5000');
});
