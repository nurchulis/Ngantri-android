/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Keyboard, AsyncStorage, Text} from 'react-native'
import { withNavigation } from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//import custom components
import Input from '../../uicomponents/Input'
import Button from '../../uicomponents/Button'

import api from '../../../api'
import Data from '../../../module/data'
import validation from '../../../validation'
import service from '../../../service'

//mengambil panjang dan lebar layar
var {height, width} = Dimensions.get('window')

export default class UpdateService extends Component {

  //config header pencarian
  static navigationOptions = {
    headerTitle: "Detail Layanan",
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
  }

  constructor(props) {
      super(props)

      this._updateService.bind(this)

      this.state = {
        id: '',
        name: '',
        prefix: '',
        counters: [],
        error: false,
        isLoading: false
      }
  }

  //fungsi cek error form
  _isError () {
    if ( ( (this.state.errorName === '') || (typeof(this.state.errorName) === 'undefined') ) && ( (this.state.errorPrefix === '') || (typeof(this.state.errorPrefix) === 'undefined') ) && ( (this.state.errorCounters === '') || (typeof(this.state.errorCounters) === 'undefined') ) ){
      // console.log('true')
      return false
    } else {
      // console.log('false')
      return true
    }
  }

  _listOfServices = (data) => {
    this.props.navigation.state.params.onUpdateService(data)
    this.props.navigation.navigate('ListOfServices')
  }

  async _updateService () {
    this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
    Keyboard.dismiss()
    let services = await service.tenant.updateTenantService(this.state.id, this.state, global.config)
    if(services !== false){
      this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
      this._listOfServices(services)
    } else {
      this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
      alert('gagal update layanan')
    }
  }

  _inputCounters (text) {
    let jumlah = parseInt(text)
    let counters = []
    for (var i = 0; i < jumlah; i++) {
      counters.push((i+1).toString())
    }
    return counters
  }

  _getService = () => {
    const { navigation } = this.props
    const data = navigation.getParam('item')
    if(data.description == null){
      delete data.description
    }
    delete data.tenant
    this.setState(data)
  }

  componentDidMount () {
    this._getService()
  }

  render () {
    let item = this.props.navigation.getParam('item')
    return (
      <View style={styles.container}>
            <Text style={styles.label}>Nama Layanan :</Text>
            <Input 
              onChangeText={(text) => this.setState({ 
                            name: text, 
                            errorName: validation.validate('name',text)
                          }, () => { 
                            this.setState({ 
                              error: this._isError() 
                            }) 
                          })}
              label="Nama Layanan"
              value={this.state.name}
              errorMessage={ this.state.errorName }/>
            <Text style={styles.label}>Kode Layanan :</Text>
            <Input
              onChangeText={(text) => this.setState({ 
                            prefix: text, 
                            errorPrefix: validation.validate('prefix',text)
                          }, () => { 
                            this.setState({ 
                              error: this._isError() 
                            }) 
                          })}
              label="Kode Layanan"
              value={this.state.prefix}
              errorMessage={ this.state.errorPrefix }/>
            <Text style={styles.label}>Jumlah Loket :</Text>
            <Input
              onChangeText={(text) => this.setState({
                            counters: this._inputCounters(text),
                            errorCounters: validation.validate('counters',text)
                          }, () => {
                            this.setState({
                              error: this._isError()
                            })
                          })}
              label="Jumlah Loket"
              value={this.state.counters.length.toString()}
              errorMessage={ this.state.errorCounters }/>
            <Button 
              style={{backgroundColor:'#04a3e7'}} 
              textStyle={{color:'white'}}
              loading={this.state.isLoading}
              disabled={this.state.error}
              onPress={() => this._updateService()}
              title="Simpan" />
          </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
      marginVertical: 20,
    },
    label: {
      alignSelf:'flex-start', 
      marginLeft:36,
      fontSize:12,
    }
  }
)