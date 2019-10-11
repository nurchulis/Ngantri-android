import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import Splash from '../components/views/Splash'
import Intro from '../components/views/intro/Intro'
import Auth from './Auth'
import Client from './Client'

const App = createSwitchNavigator(
  {
    Splash: Splash,
    Intro: Intro,
    Auth: Auth,
    Client: Client
  },
  {
    initialRouteName: 'Splash'
  }
)

export default createAppContainer(App)