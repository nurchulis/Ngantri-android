/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, AsyncStorage, ActivityIndicator, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { withNavigation } from 'react-navigation'
import moment from 'moment'
import 'moment/locale/id' 

import api from '../../../api'
import Data from '../../../module/data'
import service from '../../../service'

//import custom components
import Button from '../../uicomponents/Button'
moment().locale('id')

export default class Riwayat extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data:[],
      isLoading: false,
    }
  }


  _keyExtractor = (item, index) => item.id

  _renderItem = ({item}) => {
    return (
      <View>
      <TouchableOpacity onPress={()=> this._detailTenant(item)}>
        <View style={{elevation: 4, height:90, padding: 16, marginVertical: 8, marginHorizontal:16, backgroundColor: 'white', borderRadius: 8, justifyContent:'center'}}>
          <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <View>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.tenant.name}</Text>
            </View>
            <View>
              <Icon name="arrow-forward" size={24} color={ item.status === 'finished' ? '#01B108' : '#f39c12'}/>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 16, marginTop: 8, flex:1}}>{moment(item.started_at).format('dddd, DD MMMM YYYY')}</Text>
            <Text style={{fontSize: 16, marginTop: 8, flex:1}}>{item.status}</Text>
          </View>
        </View>
        </TouchableOpacity>
      </View>
    )
  }

  _detailTenant = (antrian) => {
    if(antrian.status=='finished'){
    this.props.navigation.navigate('DoneTicket',{tenant:antrian.tenant.name, code:antrian.code, service:antrian.service.name, time:antrian.tenant.createdAt})
    }else if(antrian.status=='waiting'){
      this.props.navigation.navigate('Ticket', {tenant:antrian.tenant.name, code:antrian.code, service:antrian.service.name, time:antrian.tenant.createdAt})
    }else if(antrian.status=='canceled'){
      this.props.navigation.navigate('CancelTicket', {tenant:antrian.tenant.name, code:antrian.code, service:antrian.service.name, time:antrian.tenant.createdAt})      
    }
  }


  async componentDidMount () {
    let data = await service.ticket.getTicketByUser(await Data.getUserId(), global.config)
    this.setState({data:data})
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
          <View style={{paddingHorizontal: 16, paddingTop:16, marginBottom: 8}}>
            <Text style={{fontSize: 16}}>Daftar antrian terakhir</Text>
          </View>
          <FlatList
              extraData={this.state}
              data={this.state.data}
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