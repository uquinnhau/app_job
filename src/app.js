import React from 'react'
import { Route,Switch } from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'

class App extends React.Component{
		constructor ( props ) {
		super( props )
		this.state = { hasError: false }
	}
	componentDidCatch ( error, info ) {
		console.log( error, info )
		if ( error ) {
			this.setState( { hasError: true } )
		}
	}
	render(){
		return this.state.hasError
		? <h2>page error!</h2>
		:(
			<div>
				<AuthRoute />	
					<Switch>
						<Route exact path="/" component={ Login } />
						<Route path='/bossinfo' component={BossInfo}></Route>
						<Route path='/geniusinfo' component={GeniusInfo}></Route>
						<Route path='/login' component={Login}></Route>
						<Route path='/register' component={Register}></Route>
						<Route path='/chat/:user' component={Chat}></Route>
						<Route component={Dashboard}></Route>
					</Switch>
				
			</div>
			)
	}
}
export default App