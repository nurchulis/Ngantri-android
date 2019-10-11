/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Keyboard, AsyncStorage} from 'react-native'
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

export default class CreateService extends Component {

  //config header pencarian
  static navigationOptions = {
    headerTitle: "Buat Layanan",
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

      this._createService.bind(this)

      this.state = {
        name: '',
        prefix: '',
        counters: [],
        error: true,
        isLoading: false
      }
  }

  //fungsi cek error form
  _isError () {
    if ( (this.state.errorName != '') || (this.state.errorPrefix != '') || (this.state.errorCounters != '')){
      // console.log('true')
      return true
    } else {
      // console.log('false')
      return false
    }
  }

  _listOfServices = (data) => {
    this.props.navigation.state.params.onAddService(data)
    this.props.navigation.navigate('ListOfServices')
  }

  async _createService () {
    this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
    Keyboard.dismiss()
    let services = await service.tenant.createTenantService(await Data.getTenantId(), this.state, global.config)
    if( services !== false ){
      this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
      this._listOfServices(services)
    } else {
      this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
      alert('gagal membuat layanan')
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

  render () {
    return (
      <View style={styles.container}>
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
              errorMessage={ this.state.errorName }/>
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
              errorMessage={ this.state.errorPrefix }/>
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
              errorMessage={ this.state.errorCounters }/>
            <Button 
              style={{backgroundColor:'#04a3e7'}} 
              textStyle={{color:'white'}}
              loading={this.state.isLoading}
              disabled={this.state.error}
              onPress={() => this._createService()}
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
    }
  }
)