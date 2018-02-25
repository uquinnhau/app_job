import React from 'react'
import ReactDom from 'react-dom'
import { createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
// 在处理请求或响应之前拦截请求或响应
// 做出 loading 效果
import './config'
import './index.css'
import App from './app'
import reducer from './reducers'



const store =createStore(reducer,compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
	))

//4 pages:boss,genius, userinfo and msg
ReactDom.hydrate(
		(<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>),
		document.getElementById('root')
		)


