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
import DropDown from '../../uicomponents/DropDown'
import MapsInput from '../../uicomponents/MapsInput'
import Button from '../../uicomponents/Button'

import api from '../../../api'
import Data from '../../../module/data'
import validation from '../../../validation'
import service from '../../../service'

//mengambil panjang dan lebar layar
var {height, width} = Dimensions.get('window')

export default class BuatTenant extends Component {

	//config header pencarian
  static navigationOptions = {
      headerTitle: "Buat lokasi usaha",
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

      this._createTenant.bind(this)

      this.state = {
        name: '',
        address: '',
        location: '',
        phone: '',
        area_id: '',
        category_id: '',
        areas: [],
        categories: [],
        isLoading: false,
        loading: false,
        error:true
      }
  }

  //fungsi cek error form
  _isError () {
    if ( (this.state.errorName != '') || (this.state.errorAddress != '') || (this.state.errorPhone != '') || (this.state.errorLocation != '') || (this.state.errorArea_id != '') || (this.state.errorCategory_id != '') ){
      // console.log('true')
      return true
    } else {
      // console.log('false')
      return false
    }
  }

  _owner = () => {
    this.props.navigation.navigate('NavOwner')
  }

  async _createTenant () {
    this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
    Keyboard.dismiss()
    let tenant = await service.tenant.createTenant(this.state, global.config)
    if (tenant !== false) {
      this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
      if (Data.storeData('tenant',tenant)){
        this._owner()
      }
    } else {
      this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
      alert('gagal membuat instansi')
    }   
  }

  async componentDidMount() {
    let area = await service.tenant.getArea()
    let category = await service.tenant.getCategory()
    let areas = []
    let categories = []
    for (var i = 0; i < area.length; i++) {
      areas.push({id: area[i].id, value:area[i].id, text:area[i].city})
    }
    for (var i = 0; i < category.length; i++) {
      categories.push({id:category[i].id, value:category[i].id, text:category[i].name})
    }
    this.setState({
      areas: areas, 
      categories: categories,
    })
  }

	render () {
		return (
			<View style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={{flexGrow:1}}>
          <View style={{...styles.container, width:width}}>
            <Input 
              onChangeText={(text) => this.setState({ 
                            name: text, 
                            errorName: validation.validate('name',text)
                          }, () => { 
                            this.setState({ 
                              error: this._isError() 
                            }) 
                          })}
              label="Nama usaha / bisnis" 
              errorMessage={ this.state.errorName }/>
            <Input
              onChangeText={(text) => this.setState({ 
                            address: text, 
                            errorAddress: validation.validate('address',text)
                          }, () => { 
                            this.setState({ 
                              error: this._isError() 
                            }) 
                          })}
              label="Alamat lengkap"
              errorMessage={ this.state.errorAddress }/>
            <Input
              onChangeText={(text) => this.setState({ 
                            phone: text, 
                            errorPhone: validation.validate('phone',text)
                          }, () => { 
                            this.setState({ 
                              error: this._isError() 
                            }) 
                          })}
              label="Nomor Telepon"
              
              errorMessage={ this.state.errorPhone }/>
            <DropDown
              label="Kota"
              data={this.state.areas}
              placeholder="pilih kota"
              onSelectItem={ (value) => this.setState({
                            area_id: value.value, 
                            errorArea_id: validation.validate('area',value)
                          }, () => {
                            this.setState({
                              error: this._isError()
                            })
                          })}/>
            <DropDown
              label="Kategori"
              data={this.state.categories}
              placeholder="pilih kategori"
              onSelectItem={ (value) => this.setState({
                            category_id: value.value, 
                            errorCategory_id: validation.validate('category',value)
                          }, () => {
                            this.setState({
                              error: this._isError()
                            })
                          })}/>
            <MapsInput
              label="Lokasi"
              location={this.state.location}
              onSelectLocation={(lokasi) => this.setState({
                            location:lokasi, 
                            errorLocation:validation.validate('location',lokasi)
                          }, () => {
                            this.setState({
                              error: this._isError()
                            })
                          })}/>
            <Button 
              title="Simpan"
              onPress={ ()=> this._createTenant()} 
              style={{backgroundColor:'#04a3e7'}}  
              textStyle={{color:'white'}}
              loading={this.state.isLoading} 
              disabled={this.state.error}/>
          </View>
        </KeyboardAwareScrollView> 
      </View>
		)
	}
}

const styles = StyleSheet.create(
	{
		container: {
			flex: 1,
      marginVertical:15,
      alignItems: 'center',
      backgroundColor: 'white'
		}
	}
)