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

export default class ChangePassword extends Component {

  //config header pencarian
  static navigationOptions = {
    headerTitle: "Ganti kata sandi",
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

      this._changePassword.bind(this)

      this.state = {
        old_password: '',
        new_password: '',
        re_password: '',
        error: true,
        isLoading: false
      }
  }

  //fungsi cek error form
  _isError () {
    if ( (this.state.errorOld_password != '') || (this.state.errorNew_password != '') || (this.state.errorRe_password != '') ){
      // console.log('true')
      return true
    } else {
      // console.log('false')
      return false
    }
  }

  async _changePassword () {
    this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
    Keyboard.dismiss()
    if(await service.user.changePassword(await Data.getUserId(), this.state, global.config)){
      this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
      this._settings()
    }
  }

  _settings = () => {
    this.props.navigation.navigate('SettingsStaff')
  }

  render () {
    return (
      <View style={styles.container}>
            <Text style={styles.label}>Kata sandi lama :</Text>
            <Input 
              onChangeText={(text) => this.setState({ 
                            old_password: text, 
                            errorOld_password: validation.validate('password',text)
                          }, () => { 
                            this.setState({ 
                              error: this._isError() 
                            }) 
                          })}
              label="Kata sandi lama"
              password={ true }  
              errorMessage={ this.state.errorOld_password }/>
            <Text style={styles.label}>Kata sandi baru :</Text>
            <Input
              onChangeText={(text) => this.setState({ 
                            new_password: text, 
                            errorNew_password: validation.validate('password',text)
                          }, () => { 
                            this.setState({ 
                              error: this._isError() 
                            }) 
                          })}
              label="Kata sandi baru"
              password={ true }  
              errorMessage={ this.state.errorNew_password }/>
            <Text style={styles.label}>Ulangi kata sandi :</Text>
            <Input
              onChangeText={(text) => this.setState({
                            re_password: text,
                            errorRe_password: validation.validate('password_repeat',text+':::::::'+this.state.new_password)
                          }, () => {
                            this.setState({
                              error: this._isError()
                            })
                          })}
              label="Ulangi kata sandi"
              password={ true }  
              errorMessage={ this.state.errorRe_password }/>
            <Button 
              style={{backgroundColor:'#04a3e7'}} 
              textStyle={{color:'white'}}
              loading={this.state.isLoading}
              disabled={this.state.error}
              onPress={() => this._changePassword()}
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