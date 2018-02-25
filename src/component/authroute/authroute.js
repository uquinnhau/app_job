import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'
@withRouter
@connect(
	null,
	{loadData}
)

class AuthRoute extends React.Component{
	componentDidMount(){
		const publicList = ['/login','/register']
		const pathname =this.props.location.pathname
		if(publicList.indexOf(pathname)>-1){
			return null
		}
		//fetch user data
		axios.get('/user/info')
			.then(res=>{
				if(res.status===200){
					if(res.data.code===0){
						//with login information
						this.props.loadData(res.data.data)
					}else{
						this.props.history.replace('/login')
					}
					
				}
			})
		//login or not
		//should the login page switch by the present url address
		//the type of user ,boss or genius
		//is the information of user complete(img,resume)?
	}
	render(){
		return null
	}
}

export default AuthRoute