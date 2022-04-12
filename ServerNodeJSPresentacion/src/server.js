let express = require('express');
let webpack = require('webpack');
let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackConfig = require('../webpack.config');

let app = express();
app.set('port', (process.env.PORT || 3000));/*utiliza el puerto 3000, si no esta configurado un puerto en el entorno*/
app.use('/static', express.static('dist'));
app.use(webpackDevMiddleware(webpack(webpackConfig)));

app.get('/', function(req, res, next){
    
});

app.listen(app.get('port'), () =>{
    console.log('el servidor a inicializado');
})