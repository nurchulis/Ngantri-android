import api from '../api'

getTenantByUser = (id, config) => {
	return api.get('users/' + id + '/tenants', config)
		.then(response => {
			let responseData = response.data
			if (responseData.success){
				if (typeof(responseData.data) !== 'undefined'){
					return responseData.data
				} else {
					return false
				}
			}
		})
		.catch(e => {
			return false
		})
}

getTenantFilterCategory = (categoryId, config) => {
	console.log(config)
	return api.get('tenants?category_id=' + categoryId, config)
		.then(response => {
			let responseData = response.data
			if (responseData.success){
				// alert(responseData)
				return responseData.data
			}
		})
		.catch(e => {
			// alert(JSON.stringify(e))
			return false
		})
}

getTenantById = (id, config) => {
	return api.get('tenans/' + id , config)
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

getTenantService = (id, config) => {
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

getTenantRole = (id, config) => {
	return api.get('tenants/'+ id +'/roles', config)
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

getArea = () => {
	return api.get('areas')
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

getCategory = () => {
	return api.get('categories')
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
	return api.put('tenants/'+id, data, config)
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

updateCover = (id, data, config) => {
	return api.post('tenants/'+id+'/cover', data, config)
		.then(response => {
			let responseData = response.data
			console.log(responseData)
			if (responseData.success){
				return responseData.data
			}
		})
		.catch(e => {
			return false
		})
}

updateConfig = (id, data, config) => {
	return api.put('tenants/'+id+'/configs', data, config)
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

createTenantService = (id, data, config) => {
	return api.post('tenants/'+ id +'/services', data, config)
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

updateTenantService = (id, data, config) => {
	return api.put('services/'+id, data, config)
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

updateTenantRole = (id, data, config) => {
	return api.patch('tenants/'+id+'/roles', data, config)
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

createTenant = (data, config) => {
	return api.post('tenants',data, config)
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

export default { 
	getTenantByUser, 
	getTenantRole,
	getTenantById, 
	getTenantFilterCategory,
	getArea, 
	getCategory, 
	update, 
	updateCover,
	updateConfig, 
	getTenantService, 
	createTenantService,
	updateTenantService,
	createTenant,
	updateTenantRole
}