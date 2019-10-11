import { createStackNavigator } from 'react-navigation'

import Login from '../components/views/Login'
import Registration from '../components/views/Registration'
import Welcome from '../components/views/Welcome'
import Activation from '../components/views/Activation'
import ForgotPassword from '../components/views/resetPassword/ForgotPassword'
import VerifyAccount from '../components/views/resetPassword/VerifyAccount'
import ResetPassword from '../components/views/resetPassword/ResetPassword'
import SavedPassword from '../components/views/resetPassword/SavedPassword'

const Auth = createStackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: () => ({
      header: null
    })
  },
  Login: {
    screen: Login,
  },
  Registration: {
    screen: Registration
  },
  Activation: {
    screen: Activation
  },
  ForgotPassword: {
    screen: ForgotPassword
  },
  VerifyAccount: {
    screen: VerifyAccount
  },
  ResetPassword: {
    screen: ResetPassword
  },
  SavedPassword: {
    screen: SavedPassword
  }
})

export default Auth