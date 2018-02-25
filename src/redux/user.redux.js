
import axios from 'axios'
import { getRedirectPath } from '../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const initState={
	redirectTo:'',
	msg:'',
	user:'',
	type:''
}

//reducer
export function user(state=initState, action){
	switch(action.type){
		case AUTH_SUCCESS:
			return {...state, redirectTo:getRedirectPath(action.payload),msg:'',...action.payload}
		case LOAD_DATA:
			return {...state, ...action.payload}
		case ERROR_MSG:
			return {...state, isAuth:false, msg:action.msg}
		case LOGOUT:
            return {...initState,redirectTo: '/login'}
		default:
			return state
	}
} 


function authSuccess(obj){
	const {pwd,...data} = obj
	return {type: AUTH_SUCCESS, payload:data}
}
function errorMsg(msg){
	return { msg, type:ERROR_MSG }
}


//loadData
export function loadData(userinfo){
	// console.log(loadData)
	return { type:LOAD_DATA, payload:userinfo}
}
//logout
export function logoutSubmit(){
	return { type:LOGOUT }
}
//update
export function update(data){
	return dispatch=>{
				console.log(data)
		axios.post('/user/update',data)

			.then((res)=>{
				console.log( "服务端返回更新响应信息", res.data )
				if (res.status==200&&res.data.code===0) {
					dispatch(authSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
}

//login
export function login ( { user, pwd } ) {
    if ( !user || !pwd ) {
        return errorMsg( "请输入用户名或密码" )
    }
    return dispatch => {
        axios.post( "/user/login", { user, pwd } )
            .then( res => {
                // 登录成功
                if ( res.status === 200 && res.data.code === 0 ) {
                	console.log( authSuccess( res.data.data ))
                    dispatch( authSuccess( res.data.data ) )
                }
                // 登录失败
                else {
                    dispatch( errorMsg( res.data.msg ) )
                }
            })
    }
}

//register
export function register({user,pwd,repeatpwd,type}){
	if(!user||!pwd||!type){
		return errorMsg('please input your usrNmae and pwd !')
	}
	if(pwd!==repeatpwd){
		return errorMsg('disassemble with your pwd !')
	}
	return dispatch=>{
			axios.post('/user/register',{user,pwd,type})
		.then(res=>{
			if(res.status==200&&res.data.code==0){
				dispatch(authSuccess(res.data.data))
			}else{
				dispatch(errorMsg(res.data.msg))
			}
		})
}
	}

















