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


var strUrl = 'mongodb://localhost:27017/aventurags';
var strImageURL = 'http://192.168.17.129:5005/api/server/';
//var strImageURL = 'http://localhost:5005/api/server/';

///Route:('/api/general/canjear')
exports.fnPostCanjear = function (jsnParameters) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(strUrl, function (err, db) {
            if (err) {
                console.error(err);
                reject({intStatus: 2, strAnswer: 'Cannot connect to the DB'});
            } else {
                console.log("Entro al result");
                var puntos = -jsnParameters.nmbPuntos;
                console.log(puntos);
                var queryUpdate = {
                    _id: ObjectId(jsnParameters._id)
                };
                var update = {
                    $inc: {
                        nmbPuntos: puntos
                    }
                };
                db.collection('usuarios').updateOne(queryUpdate, update, function (err, result) {
                    if (err) {
                        console.error(err + '\n');
                        db.close();
                        reject({strAnswer: 'Data retrieval error', intStatus: 2});
                    } else {
                        db.close();
                        resolve({strAnswer: 'Cupon canjeado', intStatus: 1});
                    }
                });
            }
        });
    }
    );
};

///Route:('/api/general/promociones/')
exports.fnGetPromociones = function (jsnParameters) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(strUrl, function (err, db) {
            if (err) {
                console.error(err);
                reject({intStatus: 2, strAnswer: 'Cannot connect to the DB'});
            } else {
                var query;
                var fields =
                        {
                            _id: 1,
                            strNombre: 1,
                            strUbicacion: 1,
                            strDescripcion: 1,
                            strImagen: 1,
                            nmbPuntos: 1
                        };

                db.collection('promociones').find(query, fields).toArray(function (err, result) {
                    if (err) {
                        console.error(err + '\n');
                        db.close();
                        reject({strAnswer: 'Data retrieval error', intStatus: 2});
                    }
                    db.close();
                    console.log("jsnAnswer: regresa el resultado");
                    resolve({jsnAnswer: result, intStatus: 1});
                });
            }
        });
    });
};

///Route:('/api/general/qrCode')
exports.fnPostQrCode = function (jsnParameters) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(strUrl, function (err, db) {
            if (err) {
                console.error(err);
                reject({intStatus: 2, strAnswer: 'Cannot connect to the DB'});
            } else {
                var query = {
                    _id: ObjectId(jsnParameters._id),
                    "arrayQr._id": ObjectId(jsnParameters.qrModelo._id)
                };
                db.collection('usuarios').find(query).toArray(function (err, result) {
                    if (err) {
                        console.error(err + '\n');
                        db.close();
                        reject({strAnswer: 'Data retrieval error', intStatus: 2});
                    }
                    if (result[0]) {
                        reject({
                            strAnswer: 'Codigo QR ya existente', intStatus: 3
                        });
                    } else {
                        var queryUpdate = {
                            _id: ObjectId(jsnParameters._id)
                        };
                        jsnParameters.qrModelo._id = ObjectId(jsnParameters.qrModelo._id);
                        var update = {
                            $push: {
                                arrayQr: jsnParameters.qrModelo
                            },
                            $inc: {
                                nmbPuntos: jsnParameters.qrModelo.nmbPuntos
                            }
                        };
                        db.collection('usuarios').updateOne(queryUpdate, update, function (err, result) {
                            if (err) {
                                console.error(err + '\n');
                                db.close();
                                reject({strAnswer: 'Data retrieval error', intStatus: 2});
                            } else {
                                db.close();
                                resolve({strAnswer: 'Codigo Qr registrado', intStatus: 1});
                            }
                        });
                    }
                });
            }
        });
    });
};

//Route:('/api/general/qrExistente/:_id')
exports.fnGetQrExistente = function (jsnParameters) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(strUrl, function (err, db) {
            if (err) {
                console.error(err);
                reject({intStatus: 2, strAnswer: 'Cannot connect to the DB'});
            } else {
                var query = {_id: ObjectId(jsnParameters._id)};
                db.collection('qr').find(query).toArray(function (err, result) {
                    if (err) {
                        console.error(err + '\n');
                        db.close();
                        reject({strAnswer: 'Data retrieval error', intStatus: 2});
                    }
                    db.close();
                    console.log("Llamada a la APIs");
                    if (result[0]) {
                        resolve({jsnAnswer: result[0], intStatus: 1});
                    } else {
                        reject({strAnswer: 'Codigo Qr no valido', intStatus: 3});
                    }
                });
            }
        });
    });
};

///Route:('/api/general/changePass')
exports.fnPostChangePass = function (jsnParameters) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(strUrl, function (err, db) {
            if (err) {
                console.error(err);
                reject({intStatus: 2, strAnswer: 'Cannot connect to the DB'});
            } else {
                var query = {
                    _id: ObjectId(jsnParameters._id)
                };
                db.collection('usuarios').find(query).toArray(function (err, result) {
                    if (err) {
                        console.error(err + '\n');
                        db.close();
                        reject({strAnswer: 'Data retrieval error', intStatus: 2});
                    }
                    if (result[0]) {
                        var queryUpdate = {
                            _id: ObjectId(jsnParameters._id)
                        };
                        var update = {
                            $set: {
                                strContraseña: jsnParameters.strContraseña
                            }
                        };
                        db.collection('usuarios').updateOne(queryUpdate, update, function (err, result) {
                            if (err) {
                                console.error(err + '\n');
                                db.close();
                                reject({strAnswer: 'Data retrieval error', intStatus: 2});
                            } else {
                                db.close();
                                resolve({strAnswer: 'La contraseña ha sido cambiada correctamente', intStatus: 1});
                            }
                        });
                    }
                });
            }
        });
    });
};

//Route:('/api/general/gRegistro/:correo')
exports.fnGetRegistro = function (jsnParameters) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(strUrl, function (err, db) {
            if (err) {
                console.error(err);
                reject({intStatus: 2, strAnswer: 'Cannot connect to the DB'});
            } else {
                var query = {
                    strCorreo: jsnParameters.correo
                };
                db.collection('usuarios').find(query).toArray(function (err, result) {
                    if (err) {
                        console.error(err + '\n');
                        db.close();
                        reject({strAnswer: 'Error en la info', intStatus: 2});
                    }
                    db.close();
                    console.log("Llamada a la APIs");
                    if (result[0]) {
                        resolve({jsnAnswer: result[0], intStatus: 3});
                    } else {
                        resolve({strAnswer: 'Se puede agregar el usuario', intStatus: 1});
                    }
                });
            }
        });
    });
};

///Route:('/api/general/changePass')
exports.fnPostRegistro = function (jsnParameters) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(strUrl, function (err, db) {
            if (err) {
                console.error("Entro aqui?" + err);
                reject({intStatus: 2, strAnswer: 'Cannot connect to the DB'});
            } else {
                var query = {
                    strNombre: jsnParameters.strNombre,
                    strApellido: jsnParameters.strApellido,
                    strCorreo: jsnParameters.strCorreo,
                    strContraseña: jsnParameters.strContraseña,
                    nmbPuntos: jsnParameters.nmbPuntos
                };
                db.collection('usuarios').insertOne(query, function (err, result) {
                    if (err) {
                        console.error(err + '\n');
                        db.close();
                        reject({strAnswer: 'Data retrieval error', intStatus: 2});
                    } else {
                        db.close();
                        resolve({strAnswer: 'Usuario agregado a la BD', intStatus: 1});
                    }
                });
            }
        });
    });
};

///Route:('/api/general/categoriasGaleria/_id')
exports.fnGetCategoriasGaleria = function () {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(strUrl, function (err, db) {
            if (err) {
                console.error(err);
                reject({intStatus: 2, strAnswer: 'Cannot connect to the DB'});
            } else {
                var fields =
                        {
                            _id: 1,
                            strTitulo: 1,
                            strDescripcion: 1,
                            strImagenPrincipal: 1
                        };

                db.collection('galeria').find({}, fields).toArray(function (err, result) {
                    if (err) {
                        console.error(err + '\n');
                        db.close();
                        reject({strAnswer: 'Data retrieval error', intStatus: 2});
                    }
                    db.close();
                    console.log("Llamada a la APIs");
                    resolve({jsnAnswer: result, intStatus: 1});
                });
            }
        });
    });
};

///Route:('/api/general/detalleGaleria')
exports.fnGetGaleria = function (jsnParameters) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(strUrl, function (err, db) {
            if (err) {
                console.error(err);
                reject({intStatus: 2, strAnswer: 'Cannot connect to the DB'});
            } else {
                var fields = {_id: ObjectId(jsnParameters._id)};
                db.collection('galeria').find(fields).toArray(function (err, result) {
                    if (err) {
                        console.error(err + '\n');
                        db.close();
                        reject({strAnswer: 'Data retrieval error', intStatus: 2});
                    }
                    db.close();
                    resolve({jsnAnswer: result[0], intStatus: 1});
                });
            }
        });
    });
};

///Route:('/api/general/login/:correo/:contrasenia')
exports.fnGetLogIn = function (jsnParameters) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(strUrl, function (err, db) {
            if (err) {
                console.error(err);
                reject({intStatus: 2, strAnswer: 'Cannot connect to the DB'});
            } else {
                var query = {
                    "strCorreo": jsnParameters.correo,
                    "strContraseña": jsnParameters.contrasenia
                };
                db.collection('usuarios').find(query).toArray(function (err, result) {
                    if (err) {
                        console.error(err + '\n');
                        db.close();
                        reject({strAnswer: 'Error en la info', intStatus: 2});
                    }
                    db.close();
                    if (result.length > 0) {
                        resolve({jsnAnswer: result[0], intStatus: 1});
                    } else {
                        resolve({intStatus: 2});
                    }

                });
            }
        });
    });
};

///Route:('/api/general/itinerarios/intPresupuesto')
exports.fnGetItinerarios = function (jsnItinerarios) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(strUrl, function (err, db) {
            if (err) {
                console.error(err);
                reject({intStatus: 2, strAnswer: 'Cannot connect to the DB'});
            } else {
                var query;
                if (jsnItinerarios.intPresupuesto === 0) {
                    query = {};
                } else {
                    query = {
                        nmbCostoAproximado: {$lte: jsnItinerarios.intPresupuesto}
                    }
                }
                var fields =
                        {
                            _id: 1,
                            strTiturlo: 1,
                            strDescripcion: 1,
                            strImagenPrincipal: 1,
                            nmbCostoAproximado: 1,
                            nmbTiempoAproximado: 1
                        };

                db.collection('itinerarios').find(query, fields).toArray(function (err, result) {
                    if (err) {
                        console.error(err + '\n');
                        db.close();
                        reject({strAnswer: 'Data retrieval error', intStatus: 2});
                    }
                    db.close();
                    resolve({jsnAnswer: result, intStatus: 1});
                });
            }
        });
    });
};

///Route:('/api/general/listaEvento/:strTipo')
exports.fnGetEventos = function (jsnTipo) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(strUrl, function (err, db) {
            if (err) {
                console.error(err);
                reject({intStatus: 2, strAnswer: 'Cannot connect to the DB'});
            } else {
                var query;
                var fields;
                if (jsnTipo.strTipo === "TOURS" || jsnTipo.strTipo === "MUSEO") {
                    query = {
                        strTipo: jsnTipo.strTipo
                    };
                    fields = {
                        _id: 1,
                        strTipo: 1,
                        strTitulo: 1,
                        strImagenPrincipal: 1,
                        strUbicacion: 1,
                        nmbCostoAdulto: 1,
                        nmbCostoMenor: 1
                    };
                } else {
                    query = {
                        strTipo: jsnTipo.strTipo,
                        dteFecha: {$gte: new Date()}
                    };
                    fields = {
                        _id: 1,
                        strTipo: 1,
                        strTitulo: 1,
                        dteFecha: 1,
                        strImagenPrincipal: 1,
                        dteHoraInicio: 1,
                        dteHoraFin: 1,
                        nmbCostoAdulto: 1,
                        nmbCostoMenor: 1
                    };
                }
                ;

                db.collection('evento').find(query, fields).toArray(function (err, result) {
                    if (err) {
                        console.error(err + '\n');
                        db.close();
                        reject({strAnswer: 'Data retrieval error', intStatus: 2});
                    }
                    db.close();
                    resolve({jsnAnswer: result, intStatus: 1});
                });
            }
        });
    });
};

///Route:('/api/general/detalleEvento/:_id/:strTipo')
exports.fnGetDetalleEvento = function (jsnEvento) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(strUrl, function (err, db) {
            if (err) {
                console.error(err);
                reject({intStatus: 2, strAnswer: 'Cannot connect to the DB'});
            } else {
                var query = {_id: ObjectId(jsnEvento._id)};
                var fields = {};
                if (jsnEvento.strTipo === "TOURS" || jsnEvento.strTipo === "MUSEO") {
                    fields = {
                        _id: 1,
                        strClave: 1,
                        strTipo: 1,
                        strTitulo: 1,
                        strDescripcion: 1,
                        strResenia: 1,
                        strImagenPrincipal: 1,
                        strUbicacion: 1,
                        nmbCostoAdulto: 1,
                        nmbCostoMenor: 1,
                        nmbCupo: 1
                    };
                } else {
                    fields = {
                        _id: 1,
                        strClave: 1,
                        strTipo: 1,
                        strTitulo: 1,
                        strDescripcion: 1,
                        strResenia: 1,
                        strImagenPrincipal: 1,
                        dteFecha: 1,
                        strUbicacion: 1,
                        dteHoraInicio: 1,
                        dteHoraFin: 1,
                        nmbCostoAdulto: 1,
                        nmbCostoMenor: 1,
                        modeloForo: 1
                    };
                }

                db.collection('evento').find(query, fields).toArray(function (err, result) {
                    if (err) {
                        console.error(err + '\n');
                        db.close();
                        reject({strAnswer: 'Data retrieval error', intStatus: 2});
                    }
                    db.close();
                    console.log("Llamada a la APIs");
                    resolve({jsnAnswer: result[0], intStatus: 1});
                });
            }
        });
    });
};

///Route:('/api/general/detalleForo/:idEvento')
exports.fnGetForo = function (jsnParameters) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(strUrl, function (err, db) {
            if (err) {
                console.error(err);
                reject({intStatus: 2, strAnswer: 'Cannot connect to the DB'});
            } else {
                var query = {_id: ObjectId(jsnParameters.idEvento)};
                var fields = {modeloForo: 1}
                db.collection('evento').find(query, fields).toArray(function (err, result) {
                    if (err) {
                        console.error(err + '\n');
                        db.close();
                        reject({strAnswer: 'Data retrieval error', intStatus: 2});
                    }
                    db.close();
                    resolve({jsnAnswer: result[0], intStatus: 1});
                });
            }
        });
    });
};

///Route:('/api/general/detalleForo')
exports.fnPutAsientosForo = function (jsnParameters) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(strUrl, function (err, db) {
            if (err) {
                console.error(err);
                reject({intStatus: 2, strAnswer: 'Cannot connect to the DB'});
            } else {
                db.collection('evento').find({_id: ObjectId(jsnParameters._id)}).toArray(function (err, result) {
                    if (err) {
                        console.error(err + '\n');
                        db.close();
                        reject({strAnswer: 'Data retrieval error', intStatus: 2});
                    }
                    var restaAsientos = (result[0].modeloForo.dispAsientos - jsnParameters.arrayNumAsientos.length);
                    var updateAsientos = {
                        "modeloForo.dispAsientos": restaAsientos
                    };
                    db.collection('evento').updateOne({_id: ObjectId(jsnParameters._id)}, updateAsientos, function (err, result) {
                        if (err) {
                            console.error(err + '\n');
                            db.close();
                            reject({strAnswer: 'Data retrieval error', intStatus: 2});
                        }
                        for (var i = 0; i < jsnParameters.arrayAsientos.length; i++) {
                            var query = {
                                _id: ObjectId(jsnParameters._id),
                                "modeloForo.arrayAsientos.numAsiento": jsnParameters.arrayNumAsientos[i]
                            };
                            var fields = {
                                $set: {
                                    "modeloForo.arrayAsientos.$.strColor": jsnParameters.strColor
                                }
                            };
                            db.collection('evento').updateOne(query, fields, function (err, result) {
                                if (err) {
                                    console.error(err + '\n');
                                    db.close();
                                    reject({strAnswer: 'Data retrieval error', intStatus: 2});
                                }
                            });
                        }
                        db.close();
                        resolve({jsnAnswer: result, intStatus: 1});
                    });

                });
            }
        });
    });
};

///Route:('/api/general/dispoEvento')
exports.fnPutDisponibilidadEvento = function (jsnParameters) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(strUrl, function (err, db) {
            if (err) {
                console.error(err);
                reject({intStatus: 2, strAnswer: 'Cannot connect to the DB'});
            } else {
                db.collection('evento').find({_id: ObjectId(jsnParameters._id)}, {'arrayInstancias.$': 1}).toArray(function (err, result) {
                    if (err) {
                        console.error(err + '\n');
                        db.close();
                        reject({strAnswer: 'Data retrieval error', intStatus: 2});
                    }
                    var query = {
                        _id: ObjectId(jsnParameters._id),
                        arrayInstancias: jsnParameters.strFecha,
                        arrayInstancias: jsnParameters.strHora
                    };
                    var updateDispo = {
                        $set: {
                            "arrayInstancias.$.nmbLugares": result[0].arrayInstancias[0].nmbLugares - jsnParameters.nmbAsientos
                        }
                    };
                    db.collection('evento').updateOne(query, updateDispo, function (err, result) {
                        if (err) {
                            console.error(err + '\n');
                            db.close();
                            reject({strAnswer: 'Data retrieval error', intStatus: 2});
                        }
                        resolve({jsnAnswer: result, intStatus: 1})
                    });
                });
            }
        });
    });
};

///Route:('/api/general/detalleDisponibilidad/:idEvento/:strFecha')
exports.fnGetDisponibilidadEvento = function (jsnParameters) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(strUrl, function (err, db) {
            if (err) {
                console.error(err);
                reject({intStatus: 2, strAnswer: 'Cannot connect to the DB'});
            } else {
                var query = {_id: ObjectId(jsnParameters.idEvento), "arrayInstancias.strFecha": jsnParameters.strFecha};
                db.collection('evento').find(query, {_id: 1, arrayHorarios: 1, nmbCupo: 1}).toArray(function (err, result) {
                    if (err) {
                        console.error(err + '\n');
                        db.close();
                        reject({strAnswer: 'Data retrieval error', intStatus: 2});
                    }
                    //console.log("Respuesta find -> "+JSON.stringify(result,null,2));
                    if (result[0]) {
                        var aggregateQuery = [
                            {
                                $match: {_id: ObjectId(jsnParameters.idEvento)}
                            },
                            {
                                $unwind: {
                                    path: "$arrayInstancias"
                                }
                            },
                            {
                                $match: {
                                    "arrayInstancias.strFecha": jsnParameters.strFecha
                                }
                            },
                            {
                                $addFields: {
                                    "horarioDisponible": {
                                        strHora: {$cond: {if : {$gte: ["$arrayInstancias.nmbLugares", 0]}, then: "$arrayInstancias.strHora", else: null}},
                                        nmbDisponibles: {$cond: {if : {$gte: ["$arrayInstancias.nmbLugares", 0]}, then: "$arrayInstancias.nmbLugares", else: null}}
                                    }
                                }
                            },
                            {
                                $match: {
                                    "horarioDisponible.strHora": {$ne: null}
                                }
                            },
                            {
                                $group: {
                                    _id: "$_id",
                                    arrayDisponibles: {$push: "$horarioDisponible"}
                                }
                            }
                        ];
                        db.collection('evento').aggregate(aggregateQuery).toArray(function (err, resultAggregate) {
                            if (err) {
                                console.error(err + '\n');
                                db.close();
                                reject({strAnswer: 'Data retrieval error', intStatus: 2});
                            }
                            //console.log("Respuesta aggregate -> "+JSON.stringify(resultAggregate,null,2));
                            if (resultAggregate[0]) {
                                var horariosFaltantes = [];
                                result[0].arrayHorarios.forEach(function (horario) {
                                    var blnExist = false;
                                    resultAggregate[0].arrayDisponibles.forEach(function (disponible) {
                                        if (horario === disponible.strHora) {
                                            blnExist = true;
                                        }
                                    });
                                    if (!blnExist) {
                                        horariosFaltantes.push(horario);
                                    }
                                });
                                horariosFaltantes.forEach(function (nuevoHorario) {
                                    resultAggregate[0].arrayDisponibles.push({
                                        strHora: nuevoHorario,
                                        nmbLugares: result[0].nmbCupo
                                    });
                                    var update = {
                                        $push: {
                                            "arrayInstancias": {
                                                strFecha: jsnParameters.strFecha,
                                                strHora: nuevoHorario,
                                                nmbLugares: result[0].nmbCupo
                                            }
                                        }
                                    };
                                    db.collection('evento').updateOne({_id: ObjectId(jsnParameters.idEvento)}, update, function (err, resultPushUpdate) {
                                        if (err) {
                                            console.error(err + '\n');
                                            db.close();
                                            reject({strAnswer: 'Data retrieval error', intStatus: 2});
                                        }
                                    });
                                });
                                db.close();
                                //console.log("Respuesta aggregate final-> "+JSON.stringify(resultAggregate,null,2));
                                resolve({"intStatus": 1, "jsnAnswer": resultAggregate[0].arrayDisponibles});
                            }
                        });
                    } else {
                        var query = {_id: ObjectId(jsnParameters.idEvento)};
                        db.collection('evento').find(query, {_id: 1, arrayHorarios: 1, nmbCupo: 1}).toArray(function (err, result) {
                            if (err) {
                                console.error(err + '\n');
                                db.close();
                                reject({strAnswer: 'Data retrieval error', intStatus: 2});
                            }
                            if (result[0]) {
                                var arrayDisponibles = [];
                                result[0].arrayHorarios.forEach(function (nuevoHorario) {
                                    arrayDisponibles.push({
                                        strHora: nuevoHorario,
                                        nmbLugares: result[0].nmbCupo
                                    });
                                    var update = {
                                        $push: {
                                            "arrayInstancias": {
                                                strFecha: jsnParameters.strFecha,
                                                strHora: nuevoHorario,
                                                nmbLugares: result[0].nmbCupo
                                            }
                                        }
                                    };
                                    db.collection('evento').updateOne({_id: ObjectId(jsnParameters.idEvento)}, update, function (err, resultPushUpdate) {
                                        if (err) {
                                            console.error(err + '\n');
                                            db.close();
                                            reject({strAnswer: 'Data retrieval error', intStatus: 2});
                                        }
                                    });
                                });
                                db.close();
                                //console.log("Respuesta final-> "+JSON.stringify(arrayDisponibles,null,2));
                                resolve({"intStatus": 1, "jsnAnswer": arrayDisponibles});
                            }
                        });
                    }
                });
            }
        });
    });
};

///Route:('/api/general/detalleItinerario/:_id')
exports.fnGetDetallesItinerario = function (jsnParameters) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(strUrl, function (err, db) {
            if (err) {
                console.error(err);
                reject({intStatus: 2, strAnswer: 'Cannot connect to the DB'});
            } else {
                var query = {_id: ObjectId(jsnParameters._id)};
                db.collection('itinerarios').find(query).toArray(function (err, result) {
                    if (err) {
                        console.error(err + '\n');
                        db.close();
                        reject({strAnswer: 'Data retrieval error', intStatus: 2});
                    }
                    if (result[0]) {
                        var modeloItinerario = result[0];
                        var arrayActividades = [];
                        var arrayClaves = [];
                        modeloItinerario.arrayActividades.forEach(function (actividad) {
                            if (actividad.strClave) {
                                arrayClaves.push(actividad.strClave);
                            }
                        });
                        var queryActividad = {
                            strClave: {$in: arrayClaves}
                        }
                        var fields = {
                            "_id": 1,
                            "strTipo": 1,
                            "strTitulo": 1,
                            "strDescripcion": 1,
                            "strResenia": 1,
                            "strImagenPrincipal": 1,
                            "strUbicacion": 1,
                            "nmbCostoAdulto": 1,
                            "nmbCostoMenor": 1,
                            "nmbCupo": 1,
                            "strClave": 1
                        };
                        db.collection('evento').find(queryActividad, fields).toArray(function (err, resultActividad) {
                            if (err) {
                                console.error(err + '\n');
                                db.close();
                                reject({strAnswer: 'Data retrieval error', intStatus: 2});
                            }
                            if (resultActividad[0]) {
                                //console.log(JSON.stringify(resultActividad[0],null,2));
                                db.close();
                                arrayActividades = resultActividad;
                                resolve({jsnAnswer: {modeloItinerario, arrayActividades}, intStatus: 1});
                            }
                        });
                    }

                });
            }
        });
    });
};

///Route:('/api/general/claves')
exports.fnGetClaves = function (jsnParameters) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(strUrl, function (err, db) {
            if (err) {
                console.error(err);
                reject({intStatus: 2, strAnswer: 'Cannot connect to the DB'});
            } else {
                var aggregateQuery = [
                    {
                        $project: {
                            "id": "clave",
                            "strClave": "$strClave"
                        }
                    },
                    {
                        $group: {
                            _id: "$id",
                            arrayClaves: {$push: "$strClave"}
                        }
                    }
                ];
                db.collection('evento').aggregate(aggregateQuery).toArray(function (err, result) {
                    if (err) {
                        console.error(err + '\n');
                        db.close();
                        reject({strAnswer: 'Data retrieval error', intStatus: 2});
                    }
                    db.close();
                    var arrayClaves = [];
                    if (result[0]) {
                        arrayClaves = result[0].arrayClaves;
                        resolve({jsnAnswer: arrayClaves, intStatus: 1});
                    } else {
                        resolve({jsnAnswer: arrayClaves, intStatus: 1});
                    }

                });
            }
        });
    });
};

///Route:('/api/general/imgGaleria')
exports.fnPostImagenGaleria = function (jsnParameters) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(strUrl, function (err, db) {
            if (err) {
                console.error(err);
                reject({intStatus: 2, strAnswer: 'Cannot connect to the DB'});
            } else {
                delete jsnParameters.modeloGaleria._id;
                var strImageB64 = jsnParameters.modeloGaleria.strImagenPrincipal;
                jsnParameters.modeloGaleria.strImagenPrincipal = (jsnParameters.modeloGaleria.strTitulo.replace(/ /g, "_")) + ".jpg"
                var query = {
                    _id: ObjectId(jsnParameters._id)
                };
                var update = {
                    $push: {
                        "arrayImagenes": jsnParameters.modeloGaleria
                    }
                };
                db.collection('galeria').update(query, update, function (err, result) {
                    if (err) {
                        console.error(err + '\n');
                        db.close();
                        reject({strAnswer: 'Data retrieval error', intStatus: 2});
                    }
                    request.post({
                        "headers": {"content-type": "application/json"},
                        "url": strImageURL + "imagen",
                        "body": JSON.stringify({
                            "strNombre": jsnParameters.modeloGaleria.strImagenPrincipal,
                            "strBase64": strImageB64
                        })
                    }, (error, response, body) => {
                        if (error) {
                            reject({strAnswer: 'La imagen no se pudo subir al servidor', intStatus: 3})
                        }
                        console.log("Response post->" + JSON.stringify(response, null, 2));
                        console.log("Body post->" + JSON.stringify(body, null, 2));
                        resolve({jsnAnswer: result, intStatus: 1})
                    });

                });
            }
        });
    });
};

///Route:('/api/general/itinerario')
exports.fnPostItinerario = function (jsnParameters) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(strUrl, function (err, db) {
            if (err) {
                console.error(err);
                reject({intStatus: 2, strAnswer: 'Cannot connect to the DB'});
            } else {
                var strImageB64 = jsnParameters.strImagenPrincipal;
                jsnParameters.strImagenPrincipal = jsnParameters.strTitulo.replace(' ', '') + ".jpg";
                db.collection('itinerarios').insert(jsnParameters, function (err, result) {
                    if (err) {
                        console.error(err + '\n');
                        db.close();
                        reject({strAnswer: 'Data retrieval error', intStatus: 2});
                    }
                    request.post({
                        "headers": {"content-type": "application/json"},
                        "url": strImageURL + "imagen",
                        "body": JSON.stringify({
                            "strNombre": jsnParameters.strImagenPrincipal,
                            "strBase64": strImageB64
                        })
                    }, (error, response, body) => {
                        if (error) {
                            reject({strAnswer: 'La imagen no se pudo subir al servidor', intStatus: 3})
                        }
                        console.log("Response post->" + JSON.stringify(response, null, 2));
                        console.log("Body post->" + JSON.stringify(body, null, 2));
                        console.log("Result insert->" + JSON.stringify(result, null, 2))
                        resolve({jsnAnswer: result, intStatus: 1})
                    });

                });
            }
        });
    });
};


///Route:('/api/general/evento')
exports.fnPostEvento = function (jsnParameters) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(strUrl, function (err, db) {
            if (err) {
                console.error(err);
                reject({intStatus: 2, strAnswer: 'Cannot connect to the DB'});
            } else {
                var strImageB64 = jsnParameters.strImagenPrincipal;
                jsnParameters.strImagenPrincipal = jsnParameters.strTitulo.replace(' ', '') + ".jpg";
                if (jsnParameters.strTipo == "CONCIERTOS" || jsnParameters.strTipo == "CONCIERTOS") {
                    delete jsnParameters.arrayHorarios;
                    delete jsnParameters.arrayInstancias;
                    delete jsnParameters.strClave;
                }
                if (jsnParameters.strTipo == "MUSEO" || jsnParameters.strTipo == "TOURS") {
                    delete jsnParameters.modeloForo;
                    delete jsnParameters.dteFecha;
                    delete jsnParameters.dteHoraInicio;
                    delete jsnParameters.dteHoraFin;
                }
                if (jsnParameters.strTipo == "DEPORTES") {
                    delete jsnParameters.arrayHorarios;
                    delete jsnParameters.arrayInstancias;
                    delete jsnParameters.modeloForo;
                }
                db.collection('evento').insert(jsnParameters, function (err, result) {
                    if (err) {
                        console.error(err + '\n');
                        db.close();
                        reject({strAnswer: 'Data retrieval error', intStatus: 2});
                    }
                    request.post({
                        "headers": {"content-type": "application/json"},
                        "url": strImageURL + "imagen",
                        "body": JSON.stringify({
                            "strNombre": jsnParameters.strImagenPrincipal,
                            "strBase64": strImageB64
                        })
                    }, (error, response, body) => {
                        if (error) {
                            reject({strAnswer: 'La imagen no se pudo subir al servidor', intStatus: 3})
                        }
                        console.log("Response post->" + JSON.stringify(response, null, 2));
                        console.log("Body post->" + JSON.stringify(body, null, 2));
                        console.log("Result insert->" + JSON.stringify(result, null, 2))
                        resolve({jsnAnswer: result, intStatus: 1})
                    });

                });
            }
        });
    });
};