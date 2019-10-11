import { AsyncStorage } from 'react-native'
import api from '../api'

getToken = async () => {
    const userToken = await AsyncStorage.getItem('user')
    let user = JSON.parse(userToken)
    return user.access_token
}

getUserId = async () => {
    const userToken = await AsyncStorage.getItem('user')
    let user = JSON.parse(userToken)
    return user.id
}

storeData = async (key,data) => {
  	try {
    	await AsyncStorage.setItem(key, JSON.stringify(data))
    	return true
  	} catch (error) {
  		return false
  	}
}

getData = async (key) => {
  const data = await AsyncStorage.getItem(key)
  let Data = JSON.parse(data)
  return Data
}

getTenantId = async () => {
	const tenantToken = await AsyncStorage.getItem('tenant')
	let tenant = JSON.parse(tenantToken)
	// console.log(user.id)
	return tenant.id
}


getProfile = async () => {
  const userProfile = await AsyncStorage.getItem('profile')
  let profile = JSON.parse(userProfile)
  // console.log(user.id)
  return profile
}
getAntrian = async () => {
  const antrianP = await AsyncStorage.getItem('antrian')
  let antrian = JSON.parse(antrianP)
  // console.log(user.id)
  return antrian
}

getQueues = async () => {
  const antrianP = await AsyncStorage.getItem('queues')
  let antrian = JSON.parse(antrianP)
  // console.log(user.id)
  return antrian
}

getQueue = async () => {
  const antrian = await AsyncStorage.getItem('queue')
  let Antrian = JSON.parse(antrian)
  // console.log(user.id)
  return Antrian
}

getTenant = async () => {
  const Tenant = await AsyncStorage.getItem('tenant')
  let tenant = JSON.parse(Tenant)
  // console.log(user.id)
  return tenant
}


getStatusQueues = async () => {
  const Status = await AsyncStorage.getItem('status_antrian')
  return Status 
}

removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
    return true
  } catch (error) {
    return false
  }
}

export default { getToken, storeData, getTenantId, removeData, getUserId, getProfile, getTenant, getAntrian, getQueues, getStatusQueues, getQueue, getData }
