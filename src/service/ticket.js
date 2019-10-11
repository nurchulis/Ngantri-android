import api from '../api'

bookNewTicket = (data, config) => {
	return api.post('tickets', data, config)
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

getTicketByUser = (id, config) => {
	return api.get('users/'+ id +'/tickets', config)
		.then(response => {
			let responseData = response.data
			if (responseData.success){
				return responseData.data
			}
		})
		.catch(e => {
			alert(JSON.stringify(e))
			return false
		})
}
cancelTicketByUser =(data, config)=>{
	return api.patch('tickets/5d713ee3d2b42f30ad648c5f',data, config)
		.then(response => {
			let responseData = response.data
			if (responseData.success){
				return responseData.data
			}
		})
		.catch(e => {
			alert(JSON.stringify(e))
			return false
		})
}

export default { bookNewTicket, getTicketByUser }