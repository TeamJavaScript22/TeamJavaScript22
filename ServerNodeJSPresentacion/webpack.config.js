const path = require('path'); /*Modulo para el direccionamiento*/
const webpack = require('webpack'); /*Modulo para compilar los estilos y el javascript*/
const htmlwebpackPlugin = require('html-webpack-plugin'); /*plugin para compilar el html*/

module.exports ={
    mode:'development',/*modo de desarrollo*/
    entry:'./src/cliente/js/index.js',/*Es el primer archivo que busca el servidor*/
    output:{
        path:path.join(__dirname, 'dist'),
        filename: 'bundle.js'/*archivo comprimido de JavaScript y estilos*/
    },
    module:{
        rules:[
            {
                test:/\.css$/,/*Regla que busca los estilos*/
                use:['style-loader', 'css-loader']
            }
        ]
    },
    plugins:[
        new htmlwebpackPlugin({
            template:'./src/cliente/index.html'
        })
    ]
};