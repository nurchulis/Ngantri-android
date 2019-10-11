/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, AsyncStorage, ActivityIndicator, TouchableOpacity, Dimensions, Image, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { withNavigation } from 'react-navigation'
import moment from 'moment'
import 'moment/locale/id' 
import geolib from 'geolib'

import backgroundProfileInstansi from '../../../static/assets/profileInstansi/backgroundProfileInstansi.png'

import api from '../../../api'
import Data from '../../../module/data'
import service from '../../../service'

//import custom components
import Button from '../../uicomponents/Button'
import ButtonIcon from '../../uicomponents/ButtonIcon'

//mengambil panjang dan lebar layar
var {height, width} = Dimensions.get('window')
moment().locale('id')

export default class ChooseTenants extends Component {

  //config header pencarian
  static navigationOptions = ({navigate, navigation}) => ({
    headerTitle: 'Detail Instansi',
    headerTintColor: 'white',
    headerTitleStyle: {
        fontWeight: 'bold',
        color: 'white',
        fontSize:16
      },
      headerStyle: {
        elevation: 1,
        backgroundColor: '#04a3e7',
        height: 50
    }
  })

  constructor(props) {
    super(props)

    this.state = {
      location: {},
      tenant: {},
      dataServices: [],
      isLoading: true,
    }
  }


  _keyExtractor = (item, index) => item.id

  _getTicket = (item) => {
    this.props.navigation.navigate('GetTicket',{service:item,tenant: this.state.tenant})
  }

  _renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={()=> this._getTicket(item)}>
        <View style={{elevation: 1, padding: 16, marginVertical: 8, marginHorizontal:16, backgroundColor: 'white', borderRadius: 8, flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.name}</Text>
            <Icon  name="arrow-forward" size={16}/>
        </View>
      </TouchableOpacity>
    )
  }

  checkOpenTime (configs) {
    if ( configs.date_open.includes(moment().format('dddd').toLowerCase())) {
      let time = moment(moment().format('HH:mm'),'HH:mm')
      let before = moment(configs.time_open,'HH:mm')
      let after = moment(configs.time_close,'HH:mm')
      if (time.isBetween(before, after)) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  async componentDidMount () {
    let navigation = this.props.navigation
    // console.log(navigation.getParam('tenant'))
    // this.setState({isLoading: !this.state.isLoading})
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({location: position.coords}, async () => {
          this.setState({dataServices: await service.service.getServiceByTenant(navigation.getParam('tenant').id, global.config)},()=>{
            this.setState({tenant: navigation.getParam('tenant')},()=> {
              this.setState({isLoading: !this.state.isLoading})
            })
          })
        })
      },
      (error) => this.setState({isLoading: !this.state.isLoading}),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    )
  }

  getDistance (location) {
    let loc = location.split(',')
    let meter = geolib.getDistance(this.state.location,
      {latitude: loc[0], longitude: loc[1]}
    )
    let km = (meter / 1000)
    return km.toFixed(2)
  }

	render () {
    if(this.state.isLoading){
      return (
        <View style={{ ...styles.container,justifyContent:'center' }}>
          <ActivityIndicator size="large" color="#4ae0b5"/>
        </View>
      )
    } else {
  		return (
  			<View style={styles.container}>
          <View>
            <Image source={ this.state.tenant.cover == null ? backgroundProfileInstansi : {uri: this.state.tenant.cover} } style={{width: width, height: width/2 }}/>
          </View> 
          <View style={{padding: 16}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{this.state.tenant.name}</Text>
            <View style={{flexDirection: 'row', marginTop:16}}>
              <Icon name="account-balance" size={16}/>
              <Text style={{fontSize: 16, marginLeft:16}}>{this.state.tenant.address}</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop:8}}>
              <Icon name="schedule" size={16}/>
              <Text style={{fontSize: 16, marginLeft:16}}>{this.state.tenant.configs.time_open} - {this.state.tenant.configs.time_close} WIB</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop:8}}>
              <Icon name="room" size={16}/>
              <Text style={{fontSize: 16, marginLeft:16}}>{ this.getDistance(this.state.tenant.location)} Km</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop:8}}>
              <Icon name="phone" size={16}/>
              <Text style={{fontSize: 16, marginLeft:16}}>{this.state.tenant.phone}</Text>
            </View>
          </View>
          <View style={{paddingHorizontal: 16, marginTop: 8, marginBottom: 8}}>
            <Text style={{fontSize: 16}}>Loket Layanan</Text>
          </View>
          <FlatList
              extraData={this.state}
              data={this.state.dataServices}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}/>
        </View> 
  		)
    }
	}
}

const styles = StyleSheet.create(
	{
		container: {
			flex: 1,
			backgroundColor: 'white'
		}
	}
)