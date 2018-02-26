
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import model from './model'
import path from 'path'

//ssr
import csshook from 'css-modules-require-hook/preset' //https://github.com/css-modules/css-modules-require-hook
import assetHook from 'asset-require-hook' //https://github.com/aribouius/asset-require-hook
assetHook({
    extensions: ['png'],
    limit: 8000
})


import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore,applyMiddleware} from 'redux'
import { StaticRouter }  from 'react-router-dom'
import thunk from 'redux-thunk'
import { compose } from 'redux'
import staticPath from './../build/asset-manifest.json'
import reducer from './../src/reducers'
import App from '../src/app'


//import { renderToString } from 'react-dom/server'

const Chat = model.getModel('chat')

const PORT = 9093
const app = express()
// work with express
const ServerApp = require( "http" ).Server( app ) 

const io = require('socket.io')(ServerApp)

io.on('connection',function(socket){
	console.log('user login')
	socket.on('sendmsg',function(data){
		console.log('sendmsg',data)
		const {from, to, msg} = data
		const chatid = [from,to].sort().join('_')
		Chat.create({chatid,from,to,content:msg},function(err,doc){
			io.emit('recvmsg', Object.assign({},doc._doc))
		})
		// console.log(data)
		// io.emit('recvmsg',data)
	})
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
app.use(function (req, res, next) {
    if ( req.url.startsWith("/user/") || req.url.startsWith("/static/")) { 
        return next()
    }
    const context = {}
    const store = createStore(reducer,compose(
	applyMiddleware(thunk)
	))

     res.write(`<!DOCTYPE html>
				<html lang="en">
				  <head>
				    <meta charset="utf-8">
				    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
				    <meta name="theme-color" content="#000000">
				    <title>React App</title>
				    <link rel="stylesheet" href="/${staticPath['main.css']}">
				  </head>
				  <body>
  					  <div id='root'>`)
						const MarkupStream = renderToNodeStream(
				            (<Provider store={store}>
				                <StaticRouter
				                    location={ req.url }
				                    context={ context }
				                >
				                    <App />
				                </StaticRouter>
				            </Provider>)
				        )
				        // 以流的形式返回数据
				        MarkupStream.pipe( res, { end: false } )
				        MarkupStream.on( "end", function () {
				        res.write( `
    				</div>
    				<script src="/${staticPath['main.js']}"></script>
			  		</body>
				</html>`
						)
            res.end()
        })
})

// 设置静态资源目录
app.use( "/static", express.static( path.resolve( "./build/static/" ) ) )

const server = ServerApp.listen( PORT, "localhost", function () {
    let host = server.address().address
    let port = server.address().port
    console.log( "The server is listening at http://%s:%s", host, port )
})

