import api from '../api'

getUserById = (id, config) => {
	return api.get('users/' + id, config)
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

update = (id, data, config) => {
	return api.put('users/' + id, data, config)
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

updateAvatar = (id, data, config) => {
	return api.post('users/'+id+'/avatar', data, config)
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

changePassword = (id, data, config) => {
	return api.post('users/'+id+'/password', data, config)
      .then(response => {
        let responseData = response.data
        if (responseData.success){
        	return true
        }
      })
      .catch(e => {
      	return false
      })
}

export default { getUserById, update, updateAvatar, changePassword }