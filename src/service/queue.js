import api from '../api'

startQueue = (data, config) => {
	return api.post('queues', data, config)
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

updateQueueStatus = (id, data, config) => {
	return api.put('queues/'+id, data, config)
      .then(response => {
        let responseData = response.data
        if (responseData.success){
        	console.log(responseData.data)
			return responseData.data
        }
      })
      .catch(e => {
        return false
      })
}

nextQueue = (id, config) => {
	return api.get('queues/'+id+'/tickets?action=next&status=waiting', config)
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

recallQueue = (id, code, config) => {
	return api.get('queues/'+id+'/tickets?action=next&status=waiting&code='+code, config)
		.then(response => {
			let responseData = response.data
			if (responseData.success){
				console.log(responseData)
				return responseData.data
			}
		})
		.catch(e => {
			return false
		})
}

export default { startQueue, updateQueueStatus, nextQueue, recallQueue }