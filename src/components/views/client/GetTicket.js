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

export default class ChooseTenants extends Component {

  //config header pencarian
  static navigationOptions = ({navigate, navigation}) => ({
    headerTitle: 'Ambil nomor antrian',
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
      service: '',
      tenant: '',
      date: '',
      isLoading: true,
      isDateTimePickerVisible: false,
      loading: false,
      disable: false
    }
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

  _handleDatePicked = (date) => {
      this.setState({ isDateTimePickerVisible: false, date: moment(date).format('YYYY-MM-DD') })
  }

  async _bookNewTicket () {
    this.setState({loading:true, disable:true})
    let ticket = await service.ticket.bookNewTicket({tenant_id: this.state.tenant.id, service_id: this.state.service.id,user_id: await Data.getUserId(), date: this.state.date}, global.config)
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

  async componentDidMount () {
    let navigation = this.props.navigation
    this.setState({tenant: navigation.getParam('tenant'), service: navigation.getParam('service'), date: moment().format('YYYY-MM-DD')},()=>{
      this.setState({isLoading:false})
    })
    // console.log(navigation.getParam('tenant'))
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
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker} />
          <View style={{padding: 16}}>
            <Text style={{fontSize:16}}>Layanan</Text>
            <View style={{elevation: 2, height: 44, backgroundColor: 'white', justifyContent:'center', marginTop: 8, padding: 16}}>
              <Text style={{fontSize:16, fontWeight: 'bold'}}>{this.state.service.name}</Text>
            </View>
            <Text style={{fontSize:16, marginTop: 16}}>Layanan</Text>
            <TouchableOpacity onPress={this._showDateTimePicker} style={{elevation: 2, height: 44, backgroundColor: 'white', justifyContent:'space-between',alignItems:'center',flexDirection:'row', marginTop: 8, padding: 16}}>
              <Text style={{fontSize:16, fontWeight: 'bold'}}>{moment(this.state.date).format('DD MMMM YYYY')}</Text>
              <Icon name="arrow-drop-down" size={24}/>
            </TouchableOpacity>
            <View style={{alignItems:'center', marginTop: 24}}>
              <Button
              style={{backgroundColor:'#04a3e7'}} 
              loading={this.state.loading} 
              onPress={() => this._bookNewTicket()}
              textStyle={{color:'white'}} 
              title="Ambil nomor antri" 
              disabled={ this.state.disable }/>
            </View>
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
			backgroundColor: 'white'
		}
	}
)