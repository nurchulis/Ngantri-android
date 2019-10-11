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
    headerTitle: (navigation.state.params && navigation.state.params.showSearchBox) ? <View style={{width: '100%', backgroundColor: 'white', height: 40, borderRadius: 8, flexDirection: 'row', alignItems:'center', justifyContent:'center', paddingHorizontal: 8}}><Icon name="search" size={24}/><TextInput placeholder="Cari kota anda" style={{width: width-180}} autoFocus={true} onChangeText={(text) => navigation.state.params.handleSearchInput(text)}/><ButtonIcon icon="close" color="black" onPress={()=> navigation.setParams({showSearchBox: false})} /></View> : "Pilih Instansi" ,
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
    },
    headerRight: (navigation.state.params && navigation.state.params.showSearchBox) ? <View></View> : <ButtonIcon style={{padding: 8}} icon="search" onPress={()=> navigation.setParams({showSearchBox: true})} />
  })

  constructor(props) {
    super(props)

    this.state = {
      city: {
        id: 1,
        city: 'Lokasi saat ini'
      },
      location: {},
      dataTenants:[],
      isLoading: false,
    }
  }


  _keyExtractor = (item, index) => item.id

  _renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={()=> this._detailTenant(item)}>
        <View style={{elevation: 4, padding: 16, marginVertical: 8, marginHorizontal:16, backgroundColor: 'white', borderRadius: 8}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{justifyContent: 'center'}}>
              <Image source={{uri: item.cover}} style={{width: (width/5), height: width/5, borderRadius: 8}}/>
            </View>
            <View style={{marginLeft: 16}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.name}</Text>
              <Text style={{fontSize: 16, marginTop: 4}}>{item.address}</Text>
              <View style={{flexDirection: 'row', marginTop: 4, justifyContent:'space-between'}}>
                <View style={{flexDirection: 'row', alignItems:'center'}}>
                  <View style={{width:10,height:10, backgroundColor: this.checkOpenTime(item.configs) ? '#5BD56E' : '#EA5164' ,borderRadius:8}}/>
                  <Text style={{marginLeft:4}}>{ this.checkOpenTime(item.configs) ? 'Buka' : 'Tutup'}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems:'center'}}>
                  <Icon name="room" color="#04A3E7"/>
                  <Text style={{marginLeft:4}}>{ this.getDistance(item.location) } Km</Text>
                </View>
                {/*
                <View style={{flexDirection: 'row', alignItems:'center'}}>
                  <View style={{width:10,height:10, backgroundColor: 'black',borderRadius:8}}/>
                  <Text style={{marginLeft:4}}>Buka</Text>
                </View>
              */}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _detailTenant = (tenant) => {
    this.props.navigation.navigate('DetailTenant',{tenant,tenant})
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
    this.setState({isLoading: !this.state.isLoading})
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({location: position.coords}, async () => {
          this.setState({dataTenants: await service.tenant.getTenantFilterCategory(this.props.navigation.getParam('category_id'), global.config)},()=> {
            this.setState({isLoading: !this.state.isLoading})
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
          <View style={{paddingHorizontal: 16, paddingTop:8}}>
            <View style={{flexDirection:'row'}}>
              <View style={{flex:1,padding:8}}>
                <TouchableOpacity style={{width: '100%', height: 44, alignItems: 'center', flexDirection: 'row'}}>
                  <Icon name="room" size={16} color="#04A3E7"/>
                  <Text style={{fontSize: 16,marginLeft: 8, color: '#04A3E7'}}>{this.state.city.city}</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex:1, flexDirection: 'row', justifyContent:'flex-end'}}>
                <View style={{padding:8}}>
                  <TouchableOpacity style={{width: '100%', height: 44, justifyContent:'center', alignItems: 'center'}}>
                    <Icon name="grid-on" size={24} />
                    <Text style={{fontSize: 16}}>Grid</Text>
                  </TouchableOpacity>
                </View>
                <View style={{padding:8}}>
                  <TouchableOpacity style={{width: '100%', height: 44, justifyContent:'center', alignItems: 'center'}}>
                    <Icon name="list" size={24}/>
                    <Text style={{fontSize: 16}}>Filter</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          {this.state.dataTenants.length > 0 ? 
          <FlatList
              extraData={this.state}
              data={this.state.dataTenants}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}/>
          :
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Image source={require('../../../static/img/kosong.png')} />
            <Text style={{fontSize: 16}}>Opps instansi tidak ditemukan</Text>
          </View> 
          }
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