/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Image, View, StyleSheet, Dimensions, Keyboard, ImageBackground, ActivityIndicator, Text, TouchableOpacity} from 'react-native'
import { withNavigation } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ImagePicker from 'react-native-image-picker'
import Modal from 'react-native-modal'

//import custom components
import Input from '../../uicomponents/Input'
import Button from '../../uicomponents/Button'

import backgroundProfileAdmin from '../../../static/assets/profileAdmin/backgroundProfileAdmin.png'

import api from '../../../api'
import Data from '../../../module/data'
import validation from '../../../validation'
import service from '../../../service'

//mengambil panjang dan lebar layar
var {height, width} = Dimensions.get('window')

const options = {
  title: 'Pilih Foto Profil',
  cancelButtonTitle: 'Batal',
  takePhotoButtonTitle: 'Ambil gambar',
  chooseFromLibraryButtonTitle: 'Ambil dari galeri'
}

export default class UpdateProfil extends Component {

  //config header pencarian
  static navigationOptions = {
    headerTitle: "Profil",
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

      this._updateProfil.bind(this)

      this.state = {
        name: '',
        email: '',
        phone: '',
        avatar: null,
        error: false,
        loading:false,
        isLoading: false,
        upload: false
      }
  }

  //fungsi cek error form
  _isError () {
    if ( ( (this.state.errorName === '') || (typeof(this.state.errorName) === 'undefined') ) && ( (this.state.errorEmail === '') || (typeof(this.state.errorEmail) === 'undefined') ) && ( (this.state.errorPhone === '') || (typeof(this.state.errorPhone) === 'undefined') ) ){
      // console.log('true')
      return false
    } else {
      // console.log('false')
      return true
    }
  }

  _updateImageLocal = async (avatar) => {
    let profile = await Data.getProfile()
    profile.avatar = avatar
    if (await Data.storeData('profile',profile)) {
      this.props.navigation.state.params.onUpdateAvatar(avatar)
    } else {
      alert('error penyimpanan')
    }
  }

  _showImagePicker =  () => {
    ImagePicker.showImagePicker(options, async (response) => {
      console.log('Response = ', response)

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
        // this._uploadImage(image)
        let avatar = await service.user.updateAvatar(await Data.getUserId(), image, global.config)
        if (avatar !== false) {
          this.setState({upload:false})
          this.setState({avatar: avatar.avatar}, () => {
            this._updateImageLocal(avatar.avatar)
          })
        } else {
          this.setState({upload:false})
          alert('gagal menyimpan avatar!')
        }
      }
    })
  }

  _settings = (data) => {
    this.props.navigation.state.params.onUpdateProfile(data)
    this.props.navigation.navigate('Settings')
  }

  async _updateProfil () {
    this.setState({loading:!this.state.loading, error:!this.state.error})
    Keyboard.dismiss()
    let data = this.state
    let avatar = data.avatar
    delete data.avatar
    let profile = await service.user.update(await Data.getUserId(), data, global.config)
    if (profile !== false) {
      this.setState({avatar:avatar,loading:!this.state.loading, error:!this.state.error})
      if (await Data.storeData('profile',profile)) {
        this._settings(profile)
      } else {
        alert('gagal menyimpan profile baru!')
      }
    } else {
      this.setState({loading:!this.state.loading, error:!this.state.error})
      alert('update profile gagal!')
    }
  }

  async componentDidMount () {
    this.setState({isLoading: true})
    let profile = await Data.getData('profile')
    if( profile ){
      this.setState({
        name:profile.name, 
        email: profile.email, 
        phone: profile.phone, 
        avatar: profile.avatar
      }, () => {
        this.setState({isLoading:false})
      }) 
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
              <Modal
              isVisible={this.state.upload}
              animationIn="zoomIn"
              animationOut="zoomOut"
                    style={{justifyContent: 'center', alignItems:'center',flex:1}}>
                      <View style={{justifyContent:'center',alignItems:'center', height:80,width:80, backgroundColor:'white', borderRadius:8}}>
                        <ActivityIndicator size="large" color="#4ae0b5"/>
                      </View>
              </Modal>
              <ImageBackground source={backgroundProfileAdmin} style={{width: '100%', height: '25%', marginBottom:16, alignItems:'center', justifyContent:'center'}} imageStyle={{height:'100%'}}>
                <Image 
                  source={ this.state.avatar === null ? require('../../../static/blank-profile.png') : { uri: this.state.avatar }}
                  resizeMode='cover'
                  style={{height:80,width:80, borderRadius:40,marginTop:20}}  />
                  <TouchableOpacity onPress={this._showImagePicker} style={{potition:'absolute',justifyContent:'center',alignItems:'center', right:'-8%',bottom:'18%', height:30, width:30,borderRadius:20, backgroundColor:'white', }}>
                    <Icon name="local-see" size={20}/>
                  </TouchableOpacity>
              </ImageBackground>
              <Text style={styles.label}>Nama :</Text>
              <Input 
                onChangeText={(text) => this.setState({ 
                              name: text, 
                              errorName: validation.validate('name',text)
                            }, () => { 
                              this.setState({ 
                                error: this._isError() 
                              }) 
                            })}
                label="Nama lengkap"
                value={this.state.name}
                errorMessage={ this.state.errorName }/>
              <Text style={styles.label}>Email :</Text>
              <Input
                onChangeText={(text) => this.setState({ 
                              email: text, 
                              errorEmail: validation.validate('email',text)
                            }, () => { 
                              this.setState({ 
                                error: this._isError() 
                              }) 
                            })}
                label="Alamat email"
                value={this.state.email}
                errorMessage={ this.state.errorEmail }/>
              <Text style={styles.label}>Telepon :</Text>
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
              <Button 
                style={{backgroundColor:'#04a3e7', marginBottom:32}} 
                textStyle={{color:'white'}}
                loading={this.state.loading}
                disabled={this.state.error}
                onPress={() => this._updateProfil()}
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
    },
    label: {
      alignSelf:'flex-start', 
      marginLeft:36,
      fontSize:12,
    }
  }
)