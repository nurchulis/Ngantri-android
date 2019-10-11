/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Keyboard, AsyncStorage, ActivityIndicator,ScrollView, Text, ImageBackground, TouchableOpacity} from 'react-native'
import { withNavigation } from 'react-navigation'
import Image from 'react-native-remote-svg'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ImagePicker from 'react-native-image-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Modal from 'react-native-modal'

import backgroundProfileInstansi from '../../../static/assets/profileInstansi/backgroundProfileInstansi.png'

//import custom components
import Input from '../../uicomponents/Input'
import Button from '../../uicomponents/Button'
import DropDown from '../../uicomponents/DropDown'
import MapsInput from '../../uicomponents/MapsInput'

import Logo from '../../../static/ASSETS-REV/COVERPENGATURAN/cover-profil-instansi.svg'

import api from '../../../api'
import Data from '../../../module/data'
import validation from '../../../validation'
import service from '../../../service'

//mengambil panjang dan lebar layar
var {height, width} = Dimensions.get('window')

const options = {
  title: 'Pilih Foto Profil Instansi',
  cancelButtonTitle: 'Batal',
  takePhotoButtonTitle: 'Ambil gambar',
  chooseFromLibraryButtonTitle: 'Ambil dari galeri'
}

export default class UpdateProfilInstansi extends Component {

  //config header pencarian
  static navigationOptions = {
    headerTitle: "Profil Instansi",
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

      this._updateProfilInstansi.bind(this)

      this.state = {
        cover:null,
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
        error:false,
        upload: false
      }
  }

  //fungsi cek error form
  _isError () {
    if ( ( (this.state.errorName === '') || (typeof(this.state.errorName) === 'undefined') ) && ( (this.state.errorAddress === '') || (typeof(this.state.errorAddress) === 'undefined') ) && ( (this.state.errorPhone === '') || (typeof(this.state.errorPhone) === 'undefined') ) && ( (this.state.errorLocation === '') || (typeof(this.state.errorLocation) === 'undefined') ) && ( (this.state.errorArea_id === '') || (typeof(this.state.errorArea_id) === 'undefined') ) && ( (this.state.errorCategory_id === '') || (typeof(this.state.errorCategory_id) === 'undefined') ) ){
      // console.log('true')
      return false
    } else {
      // console.log('false')
      return true
    }
  }

  _settings = () => {
    this.props.navigation.navigate('Settings')
  }

  _showImagePicker = () => {
    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        this.setState({upload:true})
        const source = { uri: response.uri }
        const image = new FormData()
        image.append('image',{uri:response.uri,type:response.type,name:response.fileName})
        let cover = await service.tenant.updateCover(await Data.getTenantId(), image, global.config)
        if (cover !== false) {
          this.setState({upload:false})
          this.setState({cover: cover.cover}, async () => {
            let tenant = await getData('tenant')
            tenant.cover = cover.cover
            Data.storeData('tenant', tenant)
          })
        } else {
          this.setState({upload:false})
          alert('gagal merubah cover instansi!')
        }
      }
    })
  }

  async _updateProfilInstansi () {
    this.setState({loading:!this.state.loading, error:!this.state.error})
    Keyboard.dismiss()
    let tenant = await service.tenant.update(await Data.getTenantId(), this.state, global.config)
    if (tenant !== false) {
      if (await Data.storeData('tenant', tenant)) {
        this.setState({loading:!this.state.loading, error:!this.state.error})
        this._settings()
      } else {
        alert("gagal menyimpan Profile Instansi")
      }
    } else {
      this.setState({loading:!this.state.loading, error:!this.state.error})
      alert("Profile Instansi gagal diupdate.")
    }
  }

  async componentDidMount () {
    this.setState({isLoading:!this.state.isLoading})
    let area = await service.tenant.getArea()
    let category = await service.tenant.getCategory()
    let tenant = await service.tenant.getTenantByUser(await Data.getUserId(), global.config)
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
    }, () => {
      this.setState({
        name:tenant.name,
        address:tenant.address,
        phone:tenant.phone, 
        location:tenant.location,
        area_id:tenant.area,
        category_id:tenant.category,
        cover:tenant.cover
      }, () => {
        this.setState({isLoading: false})
      })
    })
  }

  render () {
    if(this.state.isLoading){
      return (
        <View style={{ ...styles.container,justifyContent:'center',flex:1 }}>
          <ActivityIndicator size="large" color="#4ae0b5"/>
        </View>
      )
    } else {
      return (
        <View style={{flex:1}}>
            <Modal
              isVisible={this.state.upload}
              animationIn="zoomIn"
              animationOut="zoomOut"
                    style={{justifyContent: 'center', alignItems:'center',flex:1}}>
                      <View style={{justifyContent:'center',alignItems:'center', height:80,width:80, backgroundColor:'white', borderRadius:8}}>
                        <ActivityIndicator size="large" color="#4ae0b5"/>
                      </View>
              </Modal>
            <ImageBackground source={ this.state.cover == null ? backgroundProfileInstansi : {uri: this.state.cover}} style={{width: '100%', height: '26%', marginBottom:16, alignItems:'center', justifyContent:'center'}} imageStyle={{height:'100%', width:'100%'}}>
                <TouchableOpacity onPress={this._showImagePicker} style={{potition:'relative',justifyContent:'center',alignItems:'center', right:'-36%',bottom:'-30%', height:30, width:30,borderRadius:20, backgroundColor:'white', }}>
                  <Icon name="local-see" size={20}/>
                </TouchableOpacity>
            </ImageBackground>
            <ScrollView contentContainerStyle={styles.container}>
              <Text style={styles.label}>Nama instansi:</Text>
              <Input 
                onChangeText={(text) => this.setState({ 
                              name: text, 
                              errorName: validation.validate('name',text)
                            }, () => { 
                              this.setState({ 
                                error: this._isError() 
                              }) 
                            })}
                label="Nama instansi"
                value={this.state.name}
                errorMessage={ this.state.errorName }/>
              <Text style={styles.label}>Alamat lengkap :</Text>
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
                value={this.state.address}
                errorMessage={ this.state.errorAddress }/>
              <Text style={styles.label}>Nomor telepon :</Text>
              <Input
                onChangeText={(text) => this.setState({
                              phone: text,
                              errorPhone: validation.validate('phone',text)
                            }, () => {
                              this.setState({
                                error: this._isError()
                              })
                            })}
                label="Nomor telepon"
                value={this.state.phone}
                errorMessage={ this.state.errorPhone }/>
              <Text style={styles.label}>Kota / kabupaten :</Text>
              <DropDown
                label="Kota / kabupaten"
                data={this.state.areas}
                value={this.state.area_id}
                placeholder="pilih kota"
                onSelectItem={ (value) => this.setState({
                            area_id: value.value, 
                            errorArea_id: validation.validate('area',value)
                          }, () => {
                            this.setState({
                              error: this._isError()
                            })
                          })}/>
              <Text style={styles.label}>kategori instansi :</Text>
              <DropDown
                label="Kategori"
                data={this.state.categories}
                placeholder="pilih kategori"
                value={this.state.category_id}
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
                style={{backgroundColor:'#04a3e7', marginBottom:26}} 
                textStyle={{color:'white'}}
                loading={this.state.loading}
                disabled={this.state.error}
                onPress={() => this._updateProfilInstansi()}
                title="Simpan" />
            </ScrollView>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create(
  {
    container: {
      alignItems: 'center',
      backgroundColor: 'white',
    },
    label: {
      alignSelf:'flex-start', 
      marginLeft:36,
      fontSize:12,
    }
  }
)