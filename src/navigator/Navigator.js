import { createMaterialTopTabNavigator, createBottomTabNavigator, createSwitchNavigator, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Image, View, Text, TouchableOpacity, StyleSheet, PixelRatio } from 'react-native'
import Modal from 'react-native-modal'

//import custom components
import ButtonIcon from '../components/uicomponents/ButtonIcon'

//import semua halaman
import Login from '../components/views/Login'
import Daftar from '../components/views/Daftar'
import Splash from '../components/views/Splash'
import Home from '../components/views/Home'
import SuntingKataSandi from '../components/views/SuntingKataSandi'
import SuntingProfile from '../components/views/SuntingProfile'
import Pencarian from '../components/views/Pencarian'
import PilihAntrian from '../components/views/PilihAntrian'
import DetailInstansi from '../components/views/DetailInstansi'
import AntrianAnda from '../components/views/AntrianAnda'
import Profile from '../components/views/Profile'
import AntriBerlangsung from '../components/views/AntriBerlangsung'
import AntriReservasi from '../components/views/AntriReservasi'
import AntriSelesai from '../components/views/AntriSelesai'


class ModalScreen extends Component {
  state = {
    show: true
  }

  _navigateModal = (to) => {
     let reset = { index:0, actions: [NavigationActions.navigate({routeName: 'Main', params: { moveTo:to }})] }
     let resetAction = StackActions.reset(reset)
     this.props.navigation.dispatch(resetAction)
  }

  render() {
    return (
        <Modal
        isVisible={this.state.show}
        animationIn="slideInDown"
        animationOut="slideOutUp"
              style={{justifyContent: "flex-start", margin: 0}}>
              <View>
              <View style={{ backgroundColor: 'white', height: 50 , alignContent: 'flex-end', justifyContent: 'center', elevation: 1}}>
                <TouchableOpacity onPress={ () => this.setState({show:!this.state.show},this._navigateModal('back'))  } style={{ alignSelf: 'flex-end',marginRight: 14 }}>
                  <Text style={{ fontSize:12, color: '#4ae0b5' }} >TUTUP</Text>
                </TouchableOpacity>
              </View>
              <View style={{height: 140,paddingTop:20, backgroundColor: 'white', alignItems: 'center', justifyContent:'center'}}>
                <TouchableOpacity onPress={ () => this.setState({show:!this.state.show}, this._navigateModal('pengaturanProfile')) } style={{height:40, width:'100%', alignItems: 'center'}}>
                  <Text style={{color:'#4ae0b5'}} >Pengaturan Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.setState({show:!this.state.show}, this._navigateModal('changePassword')) } style={{height:40, width:'100%', alignItems: 'center'}}>
                  <Text style={{color:'#4ae0b5'}} >Kata Sandi</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.setState({show:!this.state.show}, this._navigateModal('changePass')) } style={{height:40, width:'100%', alignItems: 'center'}}>
                  <Text style={{color:'#4ae0b5'}} >Kebijakan dan Ketentuan</Text>
                </TouchableOpacity>
              </View>
          </View>
        </Modal>
    );
  }
}

const ModalProfil = createStackNavigator(
  {
    Main: {
      screen: Profile,
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    cardStyle:{
      backgroundColor:"transparent",
      opacity:0.99
    }
  }
);


const Antri =createMaterialTopTabNavigator(
  {
    AntriBerlangsung: AntriBerlangsung,
    AntriReservasi: AntriReservasi,
    AntriSelesai: AntriSelesai
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarOnPress: ({navigation}) => { 
        navigation.navigate(navigation.state.key)
      },
      tabBarLabel: ({focused, horizontal, tintColor}) => {
        const { routeName } = navigation.state
        let label 
        if (routeName == 'AntriSelesai'){
          label = <Text style={styles.textTopNavBar}>SELESAI</Text>
        } else if (routeName == 'AntriBerlangsung'){
          label = <Text style={styles.textTopNavBar}>BERLANGSUNG</Text>
        } else if (routeName == 'AntriReservasi'){
          label = <Text style={styles.textTopNavBar}>RESERVASI</Text>
        }

        return label
      }
    }),
    tabBarOptions: {
      activeTintColor: '#4ae0b5',
      inactiveTintColor: '#b4b3b3',
      labelStyle: {
        fontSize: 14,
      },
      indicatorStyle: {
        backgroundColor: '#4ae0b5'
      },
      pressColor: '#4ae0b5',
      style: {
        backgroundColor: '#fff',
        elevation: 1,
        height: 44,
        paddingTop: 4
      }
    }
  }
)


const Beranda = createBottomTabNavigator(
  {
    Home: Home,
    Antri: Antri,
    Profile: {
      screen: ModalProfil
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let icon;
        if (routeName === 'Home') {
          icon = 'home'
        } else if (routeName === 'Antri') {
          icon = 'assignment'
        } else if (routeName === 'Profile') {
          icon = 'person' 
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={icon} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#2ab48d',
      showLabel: false,
      labelStyle: {
        fontSize: 20,
      },
      style: {
        backgroundColor: '#4ae0b5',
        borderTopWidth: 0,
        height: 50
      },
    }
  }
)

const Auth = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: () => ({
    	header: null
    })
  },
  Daftar: {
    screen: Daftar,
    navigationOptions: () => ({
    	header: null
    })
  },
})

const App = createStackNavigator({
  Beranda: {
    screen: Beranda,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.state.routes[navigation.state.index].routeName == 'Profile' ? 'Profile' : ( <Image style={{ height:18,width:70, marginLeft:15 }} source={ require('../static/antri.png') } /> ),
      headerRight: navigation.state.routes[navigation.state.index].routeName == 'Home' ? ( <ButtonIcon onPress={ () => navigation.navigate('Pencarian') } size={ 24 } icon="search" /> ) : navigation.state.routes[navigation.state.index].routeName == 'Profile' ? ( <ButtonIcon onPress={ () => navigation.navigate('MyModal',{show:true}) } size={ 24 } icon="more-vert" /> ) : false,
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#4ae0b5',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize:20
      },
      headerRightContainerStyle: {
        marginRight: 8,
      },
      headerStyle: {
        elevation: 1,
        backgroundColor: '#fff',
        height: 50
      }
    }),
  },
  Pencarian:{
    screen: Pencarian,
  },
  DetailInstansi: {
    screen: DetailInstansi,
  },
  PilihAntrian: {
    screen: PilihAntrian,
  },
  SuntingKataSandi: {
    screen: SuntingKataSandi
  },
  SuntingProfile: {
    screen: SuntingProfile
  },
  AntrianAnda: {
    screen: AntrianAnda,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Antrian anda', 
      headerTintColor: '#4ae0b5',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#4ae0b5',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize:20,
      },
      headerStyle: {
        elevation: 1,
        backgroundColor: '#fff',
        height: 50
      },
      headerLeft: null,
      headerRight: <ButtonIcon onPress={ () => navigation.getParam('page') == 3 ? navigation.navigate('AntriSelesai') : navigation.getParam('page') == 2 ? navigation.navigate('AntriReservasi') : navigation.navigate('AntriBerlangsung') } size={20} icon="close"/>,
      headerRightContainerStyle: {
        marginRight: 8,
      },
    }),
  },
})


const styles = StyleSheet.create(
  {
    textTopNavBar: {
      fontSize: ( PixelRatio.get() < 1.5 ) ? 12 : (PixelRatio.get() < 2 ) ? 12 : (PixelRatio.get() < 3 ) ? 14 : (PixelRatio.get() < 3.5 ) ? 14 : (PixelRatio.get() < 4 ) ? 180 : 0,
    }
  }
)



export default createSwitchNavigator(
  {
    Splash: Splash,
    App: App,
    Auth: Auth,
  },
  {
    initialRouteName: 'Splash'
  }
);