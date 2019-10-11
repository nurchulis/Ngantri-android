import firebase from 'react-native-firebase'
import { AsyncStorage } from 'react-native'

getToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken')
  if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken()
      if (fcmToken) {
          // user has a device token
          await AsyncStorage.setItem('fcmToken', fcmToken)
          return fcmToken
      } else {
        return false
      }
  } else {
    return fcmToken
  }
}

checkPermission = async () => {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      return true
  } else {
      return false
  }
}

requestPermission = async () => {
  try {
      await firebase.messaging().requestPermission()
      // User has authorised
      return true
  } catch (error) {
      // User has rejected permissions
      return false
  }
}

createNotificationListeners = async () => {
  /*
  * Triggered when a particular notification has been received in foreground
  * */
  this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification
      console.log('a' + body)
      return { title, body }
  })

  /*
  * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  * */
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification
      console.log('b' + body)
      return { title, body }
  })

  /*
  * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  * */
  const notificationOpen = await firebase.notifications().getInitialNotification()
  if (notificationOpen) {
      const { title, body } = notificationOpen.notification
      console.log('c' + body)
      return { title, body }
  }

  /*
  * Triggered for data only payload in foreground
  * */
  this.messageListener = firebase.messaging().onMessage((message) => {
    //process data message
    console.log(JSON.stringify(message))
  })

}

export default { getToken, checkPermission, requestPermission, createNotificationListeners }