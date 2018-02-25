import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem,Radio,WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'

@connect(
	state=>state.user,
	{register}
)
@imoocForm
class Register extends React.Component{
    constructor ( props ) {
        super( props )
        this.state = {
            user: "",
            pwd: "",
            confirmPwd: "",

            // or boss
            type: "genius" 
        }
        this.handleChange = this.handleChange.bind( this )
        this.handleRegister = this.handleRegister.bind( this )
    }
        handleChange ( key, val ) {
        this.setState({
            [key]: val
        })
    }
	handleRegister(){
		this.props.register(this.props.state)
	}
	render(){
		const RadioItem = Radio.RadioItem
		return (
			<div>
				{this.props.redirectTo? <Redirect to={this.props.redirectTo} />:null}
				<Logo></Logo>
				<List>
					{this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
					<InputItem
						onChange={v=>this.props.handleChange('user',v)}
					>用户名</InputItem>
					<WhiteSpace />
					<InputItem
						type='password'
						onChange={v=>this.props.handleChange('pwd',v)}
					>密码</InputItem>
					<WhiteSpace />
					<InputItem
						type='password'
						onChange={v=>this.props.handleChange('repeatpwd',v)}
					>确认密码</InputItem>
					<WhiteSpace />
                    <List renderHeader="身份">
                        <RadioItem checked={ this.state.type === "genius" } onChange={ () => this.handleChange( "type", "genius" ) } >
                            牛人
                        </RadioItem>
                        <RadioItem checked={ this.state.type === "boss" } onChange={ () => this.handleChange( "type", "boss" ) }>
                            BOSS
                        </RadioItem>
                    </List>
					<WhiteSpace />
					<Button type='primary' onClick={this.handleRegister}>注册 </Button>
				</List>


			</div>

		)
	}
}

export default Register