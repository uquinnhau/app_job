import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import imoocFrom from '../../component/imooc-form/imooc-form.js'

@connect(
	state=>state.user,
	{ login }
)
@imoocFrom
class Login extends React.Component{
	debugger
	constructor(props) {
		super(props)
		this.register = this.register.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
	}
	register(){
		this.props.history.push('/register')
	}
    handleLogin () {
        this.props.login( this.props.state )
    }
	render(){
		return (
			<div>
				{(this.props.redirectTo&&this.props.redirectTo!='/login')? <Redirect to={this.props.redirectTo} />:null}
				<Logo></Logo>
				<WingBlank>
					{/* 登录失败的提示信息 */}
					{this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
					<List>
						
						<InputItem
						  onChange={v=>this.props.handleChange('user',v)} autoFocus
						>用户</InputItem>
						<WhiteSpace />
						<InputItem
						  type='password'
						  onChange={v=>this.props.handleChange('pwd',v)}
						>密码</InputItem>
					</List>
					<Button  onClick={this.handleLogin} type='primary'>登陆</Button> 
					<WhiteSpace/>		
					<Button  onClick={this.register} type='primary'>注册</Button> 				
				</WingBlank>				
			</div>
			)
	}
}

export default Login