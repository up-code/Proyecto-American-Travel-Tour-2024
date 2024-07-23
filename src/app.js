const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const areas = require('./modules/areas/rutas');
const actividades = require('./modules/actividades/rutas');
const condiciones = require('./modules/condiciones/rutas');
const destinos = require('./modules/destinos/rutas');
const hoteles = require('./modules/hoteles/rutas');
const imagenes = require('./modules/imagenes/rutas');
const incluye = require('./modules/incluye/rutas');
const itinerarios = require('./modules/itinerarios/rutas');
const paises = require('./modules/paises/rutas');
const programas = require('./modules/programas/rutas');
const valores_programas = require('./modules/valores_programas/rutas');
const tipoCambio = require('./modules/valortc/rutas');
const usuarios = require('./modules/usuarios/rutas');
const auth = require('./modules/auth/rutas');
const error = require('./red/errors');
const vuelos = require('./modules/vuelos/rutas');


const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// configuration
app.set('port', config.app.port);

// rutes
app.use('/api/Areas', areas)
app.use('/api/Actividades', actividades);
app.use('/api/Condiciones', condiciones);
app.use('/api/Destinos', destinos);
app.use('/api/Hoteles', hoteles);
app.use('/api/Imagenes', imagenes);
app.use('/api/Incluye', incluye);
app.use('/api/Itinerarios', itinerarios);
app.use('/api/Paises', paises)
app.use('/api/Programas', programas);
app.use('/api/ValoresProgramas', valores_programas);
app.use('/api/TipoCambio', tipoCambio);
app.use('/api/Vuelos', vuelos);
app.use('/api/Usuarios', usuarios);
app.use('/api/auth', auth);

app.use(error)


module.exports = app;