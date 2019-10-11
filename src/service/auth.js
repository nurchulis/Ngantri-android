import api from '../api'

login = (data) => {
	return api.post('auth/login',data)
		.then(response => {
			let responseData = response.data
			if (responseData.success === true){
				return responseData.data
			}
		})
		.catch(e => {
			return false
		})
}

register = (data) => {
	return api.post('auth/register/customer', data)
		.then(response => {
			let responseData = response.data
			if (responseData.success){
				return responseData.data
			}
		})
		.catch(e => {
			return false
		})
}

logout = (config) => {
	return api.get('auth/logout',config)
		.then(response => {
			return true
		})
		.catch(e => {
			return false
		})
}

forgotPassword = (data) => {
	return api.post('auth/forgot',data)
		.then(response => {
			let responseData = response.data
			if (responseData.success){
				return responseData.data
			}
		})
		.catch(e => {
			return false
		})
}

verifyAccount = (data,config) => {
	return api.post('auth/verify', data, config)
		.then(response => {
			let responseData = response.data
			if (responseData.success){
				return responseData.data
			}
		})
		.catch(e => {
			return false
		})
}

resetUserPassword = (data,config) => {
	return api.post('auth/reset', data, config)
		.then(response => {
			let responseData = response.data
			if (responseData.success){
				return responseData.data
			}
		})
		.catch(e => {
			console.log(JSON.stringify(e))
			return false
		})
}

export default { login, register, logout, forgotPassword, verifyAccount, resetUserPassword }
