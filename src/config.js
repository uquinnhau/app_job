import  axios  from 'axios'
import { Toast } from 'antd-mobile'

//intercepte request
axios.interceptors.request.use(function(config){
	Toast.loading('loading...',0)
	return config
})

//intercepte response
axios.interceptors.response.use(function(config){
	Toast.hide()
	return config
})