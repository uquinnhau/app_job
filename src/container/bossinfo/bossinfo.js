import React from 'react'
import { InputItem, TextareaItem, Button, NavBar } from "antd-mobile"
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'

@connect(
	state=>state.user,
	{ update }
)
class BossInfo extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
            title: "",
            avatar: ""
		}
        this.handleChange = this.handleChange.bind( this )
        this.selectAvatar = this.selectAvatar.bind( this )	
	}
    handleChange ( key, val ) {
        this.setState({
            [key]: val
        })
    }
	    selectAvatar ( imgName ) {
        this.setState({
            avatar: imgName
        })
    }
	render(){
		const redirectTo = this.props.redirectTo
		const path = this.props.location.pathname
		
		return (
			<div>
				{ redirectTo&&redirectTo!==path? <Redirect to={this.props.redirectTo }/> :null}
				<NavBar mode="dark" >boss 页面</NavBar>
				<AvatarSelector selectAvatar={ this.selectAvatar }>头像</AvatarSelector>
				<InputItem onChange={(v)=>this.handleChange('title',v)}>
					招聘职位
				</InputItem>
				<InputItem onChange={(v)=>this.handleChange('company',v)}>
					公司名称
				</InputItem>
				<InputItem onChange={(v)=>this.handleChange('money',v)}>
					职位薪资
				</InputItem>
				<TextareaItem
					onChange={(v)=>this.handleChange('desc',v)}
					rows={3}
					autoHeight
					title='职位要求'
				>
					
				</TextareaItem>
				<Button 
					onClick={()=>{
						this.props.update(this.state)
					}}
					type='primary'>conservation</Button>
			</div>
			
		)
	}
}
export default BossInfo