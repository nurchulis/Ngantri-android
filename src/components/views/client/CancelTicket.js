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
import DateTimePicker from 'react-native-modal-datetime-picker'

import Data from '../../../module/data'
import service from '../../../service'

//import custom components
import Button from '../../uicomponents/Button'
import ButtonIcon from '../../uicomponents/ButtonIcon'

//mengambil panjang dan lebar layar
var {height, width} = Dimensions.get('window')
moment().locale('id')

export default class Tenant extends Component {

  //config header pencarian
  static navigationOptions = ({navigate, navigation}) => ({
    headerTitle: 'Detail antrian',
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
      antrian: {},
      id:{},
      code:{},
      tenant:{},
      service:{},
      time:{},
      id_tenant:"",
      id_service:"",
      user_id:"",
      isLoading: true
    }
  }

  async componentDidMount () {
    let navigation = this.props.navigation
    this.setState({code: navigation.getParam('code')})
    this.setState({time: navigation.getParam('time')})

    this.setState({id_tenant: navigation.getParam('id_tenant')})
    this.setState({id_service: navigation.getParam('id_service')})
    this.setState({user_id: navigation.getParam('user_id')})

    this.setState({service: navigation.getParam('service')})
    this.setState({tenant: navigation.getParam('tenant')},()=>{
      this.setState({isLoading:false})
    })
    // console.log(navigation.getParam('tenant'))
  }

  async _bookNewTicket () {
    this.setState({loading:true, disable:true})
    let ticket = await service.ticket.bookNewTicket({tenant_id: this.state.id_tenant, service_id: this.state.id_service,user_id: await Data.getUserId(), date: this.state.date}, global.config)
    if(ticket !== false){
      this._ticket(ticket)
      console.log(ticket)
      this.setState({loading:false, disable:false})
    } else {
      this.setState({loading:false, disable:false})
    }
  }

  _ticket = (antrian) => {
    this.props.navigation.navigate('Ticket', {tenant:antrian.tenant.name, code:antrian.code, service:antrian.name, time:antrian.tenant.createdAt})
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
          <View style={{padding: 16, justifyContent:'center', alignItems: 'center'}}>
            <View style={{backgroundColor: 'white', width:width-64, alignItems:'center', paddingHorizontal: 16, elevation: 4, paddingVertical: 24, borderRadius: 20}}>
              <Text>ID Antrian: {this.state.antrian.id}</Text>
              <Image source={require('../../../static/img/dibatalkan.png')} style={{marginTop: 16}}/>
              <Text style={{marginTop: 16, fontSize: 16, fontWeight: 'bold', color:'#e74c3c'}}>DIBATALKAN</Text>
              <Text style={{marginTop: 8, fontSize: 60, fontWeight: 'bold', color:'#e74c3c'}}>{this.state.code}</Text>
              <View style={{width:width/1.3, marginVertical: 16, flexDirection:'row', justifyContent: 'space-between'}}>
                <View style={{width:width/30, height: 2, backgroundColor: 'black', marginVertical: 16, backgroundColor:'#989898'}}/>
                <View style={{width:width/30, height: 2, backgroundColor: 'black', marginVertical: 16, backgroundColor:'#989898'}}/>
                <View style={{width:width/30, height: 2, backgroundColor: 'black', marginVertical: 16, backgroundColor:'#989898'}}/>  
                <View style={{width:width/30, height: 2, backgroundColor: 'black', marginVertical: 16, backgroundColor:'#989898'}}/>
                <View style={{width:width/30, height: 2, backgroundColor: 'black', marginVertical: 16, backgroundColor:'#989898'}}/>
                <View style={{width:width/30, height: 2, backgroundColor: 'black', marginVertical: 16, backgroundColor:'#989898'}}/>
                <View style={{width:width/30, height: 2, backgroundColor: 'black', marginVertical: 16, backgroundColor:'#989898'}}/>
                <View style={{width:width/30, height: 2, backgroundColor: 'black', marginVertical: 16, backgroundColor:'#989898'}}/>
                <View style={{width:width/30, height: 2, backgroundColor: 'black', marginVertical: 16, backgroundColor:'#989898'}}/>
                <View style={{width:width/30, height: 2, backgroundColor: 'black', marginVertical: 16, backgroundColor:'#989898'}}/>
                <View style={{width:width/30, height: 2, backgroundColor: 'black', marginVertical: 16, backgroundColor:'#989898'}}/>
                <View style={{width:width/30, height: 2, backgroundColor: 'black', marginVertical: 16, backgroundColor:'#989898'}}/>
                <View style={{width:width/30, height: 2, backgroundColor: 'black', marginVertical: 16, backgroundColor:'#989898'}}/>
              </View>
              <Text style={{marginTop: 8, fontSize: 16, fontWeight: 'bold'}}>{this.state.tenant}</Text>
              <View style={{width:width/4, height: 2, backgroundColor: 'black', marginVertical: 16, backgroundColor:'#989898'}}/>
              <View style={{width:width/1.4}}>
                <View style={{flexDirection: 'row'}}>
                  <Icon name="account-balance" size={16}/>
                  <Text style={{fontSize: 16, marginLeft:16}}>{this.state.tenant}</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop:8}}>
                  <Icon name="schedule" size={16}/>
                  <Text style={{fontSize: 16, marginLeft:16}}>{moment(this.state.time).format('dddd, DD MMMM YYYY')}</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop:8}}>
                  <Icon name="assignment" size={16}/>
                  <Text style={{fontSize: 16, marginLeft:16}}>{this.state.service}</Text>
                </View>
              </View>

            <Button 
                onPress={() => this._bookNewTicket()}
                style={{backgroundColor:'white',borderWidth:0.5, borderColor:'#3498db', marginTop:24, width: width/1.4}} 
                textStyle={{color:'#3498db'}}
                title="Antri ulang" />
            </View>
            <View
                    style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    width: width/1.4
                }}
                />
          </View>
        </View> 
  		)
    }
	}
}

const styles = StyleSheet.create(
	{
		container: {
			flex: 1,
      justifyContent:'center',
      alignItems:'center',
			backgroundColor: '#04a3e7'
		}
	}
)