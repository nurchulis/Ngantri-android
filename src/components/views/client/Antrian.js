/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, AsyncStorage, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { withNavigation } from 'react-navigation'
import moment from 'moment'
import 'moment/locale/id' 

import Data from '../../../module/data'
import service from '../../../service'

//import custom components
import Button from '../../uicomponents/Button'
moment().locale('id')

export default class Antrian extends Component {

  constructor(props) {
    super(props)

    this._focuse.bind(this)

    this.state = {
      antrian: {
        reservasi: true,
        selesai: false,
        dibatalkan: false
      },
      dataReservasi:[],
      dataSelesai:[],
      dataDibatalkan:[],
      isLoading: false,
    }
  }


  _keyExtractor = (item, index) => item.id

  _renderItem = ({item}) => {
    return (
      <View>

<TouchableOpacity onPress={()=> this._detailTenant(item)}>
        <View style={{elevation: 4, height:120, padding: 16, marginVertical: 8, marginHorizontal:16, backgroundColor: 'white', borderRadius: 8}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
            <View>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.tenant.name}</Text>
              <Text style={{fontSize: 16}}>{item.tenant.address}</Text>
              <Text style={{fontSize: 16}}>{moment(item.started_at).format('dddd, DD MMMM YYYY')}</Text>
            </View>
            <View>
              <Icon name="arrow-forward" size={24} color={this.state.antrian.reservasi ? '#04a3e7' : this.state.antrian.selesai ? '#01B108' : '#FF6B6B'}/>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 16, marginTop: 8, flex:1}}>{item.service.name}</Text>
            <Text style={{fontSize: 16, marginTop: 8, flex:1}}>{item.code}</Text>
            {/*<Text style={{fontSize: 16, marginTop: 8, flex:1}}>{item.key}</Text>*/}
          </View>
        </View>
        </TouchableOpacity>
      </View>
    )
  }

  async _detailTenant (antrian) {
    if(antrian.status=='canceled'){
    this.props.navigation.navigate('CancelTicket',{tenant:antrian.tenant.name, id_tenant:antrian.tenant._id, id_service:antrian.service.id, user_id:await Data.getUserId(), code:antrian.code, service:antrian.service.name, time:antrian.tenant.createdAt})
    }else if(antrian.status=='waiting'){
      this.props.navigation.navigate('Ticket', {tenant:antrian.tenant.name, code:antrian.code, service:antrian.service.name, time:antrian.tenant.createdAt})
    }else if(antrian.status=='finished'){
      this.props.navigation.navigate('DoneTicket', {tenant:antrian.tenant.name, code:antrian.code, service:antrian.service.name, time:antrian.tenant.createdAt})      
    }
  }

  _focuse = (text) => {
    let antrian = this.state.antrian
    antrian.reservasi = false
    antrian.selesai = false
    antrian.dibatalkan = false
    antrian[text] = true
    this.setState({antrian: antrian})
  }

  _keyExtractor = (item, index) => item.id

  async componentDidMount () {
    let data = await service.ticket.getTicketByUser(await Data.getUserId(), global.config)
    console.log(data)
    let reservasi = data.filter((x)=>{
        return x.status == 'waiting'
    })
    let selesai = data.filter((x)=>{
        return x.status == 'finished'
    })
    let dibatalkan = data.filter((x)=>{
        return x.status == 'canceled'
    })
    this.setState({dataReservasi: reservasi, dataSelesai: selesai, dataDibatalkan: dibatalkan })
      
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
              <View style={{flex:1, padding:8}}>
                <TouchableOpacity onPress={()=> this._focuse('reservasi')} style={{width: '100%', height: 44, backgroundColor: this.state.antrian.reservasi ? '#04a3e7' : 'white', borderRadius: 24, elevation: 2, justifyContent:'center', alignItems: 'center'}}><Text style={{fontSize: 16, color: this.state.antrian.reservasi ? 'white' : 'black'}}>Reservasi</Text></TouchableOpacity>
              </View>
              <View style={{flex:1, padding:8}}>
                <TouchableOpacity onPress={()=> this._focuse('selesai')} style={{width: '100%', height: 44, backgroundColor: this.state.antrian.selesai ? '#04a3e7' : 'white', borderRadius: 24, elevation: 2, justifyContent:'center', alignItems: 'center'}}><Text style={{fontSize: 16, color: this.state.antrian.selesai ? 'white' : 'black'}}>Selesai</Text></TouchableOpacity>
              </View>
              <View style={{flex:1, padding:8}}>
                <TouchableOpacity onPress={()=> this._focuse('dibatalkan')} style={{width: '100%', height: 44, backgroundColor: this.state.antrian.dibatalkan ? '#04a3e7' : 'white', borderRadius: 24, elevation: 2, justifyContent:'center', alignItems: 'center'}}><Text style={{fontSize: 16, color: this.state.antrian.dibatalkan ? 'white' : 'black'}}>Dibatalkan</Text></TouchableOpacity>
              </View>
            </View>
          </View>
          { (this.state.antrian.reservasi && this.state.dataReservasi.length > 0) || (this.state.antrian.selesai && this.state.dataSelesai.length > 0) || (this.state.antrian.dibatalkan && this.state.dataDibatalkan.length > 0) ?
          <FlatList
              extraData={this.state}
              data={this.state.antrian.reservasi ? this.state.dataReservasi : this.state.antrian.selesai ? this.state.dataSelesai : this.state.dataDibatalkan}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}/>
          : 
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Image source={require('../../../static/img/kosong.png')} />
            <Text style={{fontSize: 16}}>Anda belum pernah mengambil antrian</Text>
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