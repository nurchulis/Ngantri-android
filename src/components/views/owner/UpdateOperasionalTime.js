/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Keyboard, AsyncStorage, Text, ActivityIndicator} from 'react-native'
import { withNavigation } from 'react-navigation'
import CheckBox from 'react-native-check-box'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//import custom components
import InputTime from '../../uicomponents/InputTime'
import Button from '../../uicomponents/Button'

import api from '../../../api'
import Data from '../../../module/data'
import validation from '../../../validation'
import service from '../../../service'

//mengambil panjang dan lebar layar
var {height, width} = Dimensions.get('window')

export default class UpdateOperasionalTime extends Component {

  //config header pencarian
  static navigationOptions = {
    headerTitle: "Jadwal operasional",
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

      this._onClikCheckBox.bind(this)
      // this._getConfigTenant.bind(this)
      this._UpdateConfigTenant.bind(this)

      this.state = {
        time_open:'00:00',
        time_close:'00:00',
        date_open:[],
        error: false,
        isLoading: false,
        loading:false
      }
  }

  //fungsi cek error form
  _isError () {
    if ( (this.state.errorTime_open != '') || (this.state.errorTime_close != '') ){
      // console.log('true')
      return true
    } else {
      // console.log('false')
      return false
    }
  }

  async _UpdateConfigTenant () {
    this.setState({loading:!this.state.loading, error:!this.state.error})
    Keyboard.dismiss()
    let tenant = await service.tenant.updateConfig(await Data.getTenantId(), this.state, global.config)
    if(tenant !== false){
      if(await Data.storeData('tenant', tenant)){
        this.setState({loading:!this.state.loading, error:!this.state.error})
        this._settings()
      }
    } else {
      alert("jam Operasional gagal di rubah!")
    }
  }

  _settings = () => {
    this.props.navigation.navigate('Settings')
  }

  _removeA(arr) {
    var what, a = arguments, L = a.length, ax
    while (L > 1 && arr.length) {
        what = a[--L]
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1)
        }
    }
    return arr
  }

  _onClikCheckBox (day) {
    days = this.state.date_open
    if(days.includes(day)){
      days=this._removeA(days,day)
      this.setState({date_open:days})
    } else {
      days.push(day)
      this.setState({date_open:days})
    }
  }

  async componentDidMount () {
    // this._getConfigTenant()
    var configs = await Data.getTenant()
    if(Object.keys(configs.configs).length > 1){
      this.setState({date_open: configs.configs.date_open, time_open: configs.configs.time_open, time_close: configs.configs.time_close})
    }
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
              <Text style={styles.label}>Jam buka :</Text>
              <InputTime
                value={ this.state.time_open }
                onChangeTime={ (time) => this.setState({time_open:time})}
                errorMessage={ this.state.errorTime_open }/>
              <Text style={styles.label}>Jam tutup :</Text>
              <InputTime
                value={ this.state.time_close }
                onChangeTime={ (time) => this.setState({time_close:time})}
                errorMessage={ this.state.errorTime_close }/>
              <Text style={styles.label}>Hari buka :</Text>
              <View style={{width:width-64}}>
                  <CheckBox
                      style={{paddingVertical: 8}}
                      isChecked={this.state.date_open.includes('senin')}
                      onClick={()=> this._onClikCheckBox('senin')}
                      rightText={"Senin"}/>
                  <CheckBox
                      style={{paddingVertical: 8}}
                      isChecked={this.state.date_open.includes('selasa')}
                      onClick={()=> this._onClikCheckBox('selasa')}
                      rightText={"Selasa"}/>
                  <CheckBox
                      style={{paddingVertical: 8}}
                      isChecked={this.state.date_open.includes('rabu')}
                      onClick={()=> this._onClikCheckBox('rabu')}
                      rightText={"Rabu"}/>
                  <CheckBox
                      style={{paddingVertical: 8}}
                      isChecked={this.state.date_open.includes('kamis')}
                      onClick={()=> this._onClikCheckBox('kamis')}
                      rightText={"Kamis"}/>
                  <CheckBox
                      style={{paddingVertical: 8}}
                      isChecked={this.state.date_open.includes('jumat')}
                      onClick={()=> this._onClikCheckBox('jumat')}
                      rightText={"Jumat"}/>
                  <CheckBox
                      style={{paddingVertical: 8}}
                      isChecked={this.state.date_open.includes('sabtu')}
                      onClick={()=> this._onClikCheckBox('sabtu')}
                      rightText={"Sabtu"}/>
                  <CheckBox
                      style={{paddingVertical: 8}}
                      isChecked={this.state.date_open.includes('minggu')}
                      onClick={()=> this._onClikCheckBox('minggu')}
                      rightText={"Minggu"}/>
              </View>
              <Button 
                style={{backgroundColor:'#04a3e7'}} 
                textStyle={{color:'white'}}
                loading={this.state.loading}
                disabled={this.state.error}
                onPress={() => this._UpdateConfigTenant()}
                title="Simpan" />
            </View>
      )
    }
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