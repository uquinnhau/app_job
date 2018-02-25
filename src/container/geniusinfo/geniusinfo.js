
import React from 'react'
import { NavBar,InputItem,WhiteSpace,TextareaItem,Button,WingBlank } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'

@connect(
	state=>state.user,
	{ update }
)
class GeniusInfo extends React.Component{
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
				{redirectTo&&redirectTo!==path? <Redirect to={this.props.redirectTo}/> :null}
				<NavBar mode="dark" >牛人页面</NavBar>
				<AvatarSelector selectAvatar={ this.selectAvatar }>头像</AvatarSelector>
				<WingBlank>
				<InputItem onChange={(v)=>this.handleChange('title',v)}>
					求职岗位
				</InputItem>
				<TextareaItem
				        title="个人简介"
                        autoHeight
                        rows={3}
                        onChange={ v => this.handleChange( "desc", v ) }
				/>
				<WhiteSpace />
				<Button 
					onClick={()=>{
						this.props.update(this.state)
					}}
					type='primary'>保存</Button>
					                </WingBlank>
			</div>
		)
	}
}

export default GeniusInfo