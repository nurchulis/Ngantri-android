import api from '../api'

getServiceByTenant = (id, config) => {
	return api.get('tenants/'+ id +'/services', config)
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

export default { getServiceByTenant }