import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import React, { Component } from 'react'
import { Text, StyleSheet, PixelRatio } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Home from '../components/views/client/Home'
import Settings from '../components/views/client/Settings'
import Riwayat from '../components/views/client/Riwayat'
import Antrian from '../components/views/client/Antrian'
import ChangePassword from '../components/views/client/ChangePassword'
import UpdateProfile from '../components/views/client/UpdateProfile'
import Notification from '../components/views/client/Notification'
import SearchCity from '../components/views/client/SearchCity'
import ChooseTenants from '../components/views/client/ChooseTenants'
import DetailTenant from '../components/views/client/DetailTenant'
import GetTicket from '../components/views/client/GetTicket'
import Ticket from '../components/views/client/Ticket'
import DoneTicket from '../components/views/client/DoneTicket'
import CancelTicket from '../components/views/client/CancelTicket'
import ButtonIcon from '../components/uicomponents/ButtonIcon'

const NavBottomTab = createBottomTabNavigator(
  {
    Home: Home,
    Antrian: Antrian,
    Riwayat: Riwayat,
    Notification:Notification,
    Settings: Settings
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      let label = navigation.state.routeName
      return ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state
          let icon
          if (routeName === 'Home') {
            icon = 'home'
          } else if (routeName === 'Antrian') {
            icon = 'assignment'
          } else if (routeName === 'Settings') {
            icon = 'settings' 
          } else if (routeName === 'Riwayat') {
            icon = 'history'
          } else if (routeName === 'Notification') {
            icon = 'notifications'
          }
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Icon name={icon} size={25} color={tintColor} />
        },
        tabBarLabel: label == 'Home' ? 'Beranda' : label == 'Antrian' ? 'Antrian' : label == 'Riwayat' ? 'Riwayat' : label == 'Notification' ? 'Notifikasi' : 'Pengaturan'
      })
    },
    tabBarOptions: {
      activeTintColor: '#04a3e7',
      inactiveTintColor: '#cfcfcf',
      showLabel: true,
      labelStyle: {
        fontSize: 12,
        marginTop:-10,
        marginBottom:8
      },
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0.8,
        height: 50
      },
    }
  }
)

const Client = createStackNavigator({
  NavBottomTab: {
    screen: NavBottomTab,
    navigationOptions: ({ navigation }) => {
      let routeName = navigation.state.routes[navigation.state.index].routeName
      return ({
        headerTitle: routeName == 'Home' ? 'Beranda' : routeName == 'Antrian' ? 'Status antrian' : routeName == 'Riwayat' ? 'Riwayat' : routeName == 'Notification' ? 'Notifikasi' : 'Pengaturan',
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white',
          fontSize:16
        },
        headerRightContainerStyle: {
          marginRight: 8,
        },
        headerStyle: {
          Clientelevation: 1,
          backgroundColor: '#04a3e7',
          height: 50
        }
      })
    },
  },
  UpdateProfile: {
    screen: UpdateProfile
  },
  ChangePassword: {
    screen: ChangePassword
  },
  SearchCity: {
    screen: SearchCity
  },
  ChooseTenants: {
    screen: ChooseTenants
  },
  DetailTenant: {
    screen: DetailTenant
  },
  GetTicket: {
    screen: GetTicket
  },
  Ticket: {
    screen: Ticket
  },
  DoneTicket: {
    screen: DoneTicket
  },
  CancelTicket:{
    screen:CancelTicket
  }

})

export default Client