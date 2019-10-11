/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, AsyncStorage, ActivityIndicator, Image, TouchableOpacity, Dimensions, Switch } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { withNavigation } from 'react-navigation'
import Modal from 'react-native-modal'
import QRCode from 'react-native-qrcode'
import Images from 'react-native-scalable-image'

import api from '../../../api'
import Data from '../../../module/data'
import service from '../../../service'

//import custom components
import Button from '../../uicomponents/Button'

import logoWelcome from '../../../static/assets/layanan/empty.png'

var {height, width} = Dimensions.get('window')

export default class ListOfStaff extends Component {

   constructor(props) {
    super(props)
    
    this._changeRoleStaff.bind(this)

    this.state = {
      data:[],
      isLoading: false,
      show:false,
      tenantId:''
    }
  }

  async _changeRoleStaff (data, id) {
    let role = await service.tenant.updateTenantRole(await Data.getTenantId(), data, global.config)
    if (role !== false) {
      data = this.state.data
      index = data.findIndex((obj => obj.id == id))
      data[index].role = role.role
      this.setState({data:data})
    } else {
      alert('gagal merubah role tenant')
    } 
  }

  _keyExtractor = (item, index) => item.id

  _openModal () {
    this.setState({show:!this.state.show})
  }

  _renderItem = ({item}) => {
    return (
      <View style={{borderBottomWidth:0.5, borderColor:'#cfcfcf', marginBottom:0.5, width:width-32}}>
        <View style={{height:64, alignItems:'center', flexDirection:'row', justifyContent:'space-between'}}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Image
              source={ item.user.avatar !== null ? {uri: item.user.avatar} : require('../../../static/blank-profile.png') }
              resizeMode='cover'
              style={{height:50,width:50, borderRadius:30, marginRight:16}}
            />
            <View>
              <Text style={{fontSize:16}}>{item.user.name}</Text>
              <View style={{flexDirection:'row', marginTop:4,alignItems:'center'}}>
                <View style={{backgroundColor:item.role == 'staff' ? '#4cd964':'#cfcfcf', borderRadius:30,width:10,height:10}}/>
                <Text style={{marginLeft:4}}>{item.role == 'staff' ? 'aktif':'tidak aktif'}</Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <Switch onValueChange={ () => this._changeRoleStaff({user_id:item.user.id ,type: item.role == 'staff' ? 'unassigned' : 'staff'}, item.id)} value={item.role == 'staff' ? true : false} trackColor={{false:'#cfcfcf', true:'#4cd964'}} thumbColor={item.role == 'staff' ? '#4cd964':'#cfcfcf' }/>
            {/*
            <TouchableOpacity>
              <Icon name="delete" size={20}/>
            </TouchableOpacity>
          */}
          </View>
        </View>
      </View>
    )
  }

  async componentDidMount () {
    this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
    let roles = await service.tenant.getTenantRole(await Data.getTenantId(), global.config)
    roles = roles.filter( f => f.role != 'owner' )
    this.setState({
      tenantId:await Data.getTenantId(),
      data: roles
    }, () => {
      console.log(this.state.data)
      this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
    })
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
          isVisible={this.state.show}
          animationIn="zoomIn"
          animationOut="zoomOut"
          onBackButtonPress={() => this.setState({show:!this.state.show}) }
          onBackdropPress={() => this.setState({show:!this.state.show})}
                style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <View style={{backgroundColor:'white', height:'70%', width:width-64, alignItems:'center', borderRadius:12}}>
                  <View style={{ padding:32, alignItems:'center', flex:8}}>
                    <Text style={{marginBottom:64}}>Arahkan scanner ke Qrcode berikut</Text>
                    <QRCode
                      value={this.state.tenantId}
                      size={250}
                      bgColor='black'
                      fgColor='white'/>
                  </View>
                  <View style={{borderTopWidth:0.5, width:'100%', flex:1, borderColor:'#cfcfcf'}}>
                    <TouchableOpacity style={{alignItems:'center', justifyContent:'center', height:'100%'}} onPress={() => this.setState({show:!this.state.show})}>
                      <Text style={{color:'#04a3e7'}}>Selesai</Text>
                    </TouchableOpacity>
                  </View>
                </View>
          </Modal>
          {/*
          <View style={{flexDirection:'row', width:'100%', height:60, elevation:1, borderBottomWidth:0.5, borderColor:'#fafafa'}}>
            <TouchableOpacity style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              <Icon name="sort-by-alpha" size={30} color='#04a3e7'/>
              <Text>Sortir</Text>
            </TouchableOpacity>
            <View style={{width:1, backgroundColor:'#bfbfbf'}}/>
            <TouchableOpacity style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              <Icon name="format-list-bulleted" size={30} color='#04a3e7'/>
              <Text>Filter</Text>
            </TouchableOpacity>
          </View>
          */}
          { this.state.data.length < 1 ?
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}> 
              <Images
               width={width/2} // height will be calculated automatically
               source={logoWelcome}
              />
              <Text style={{fontSize:24, fontWeight: 'bold', marginBottom:16}}>Ups...!</Text>
              <Text>Anda belum memiliki operator</Text>
            </View> : 
            <FlatList
              style={ styles.flatList }
              data={this.state.data}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}/>
          }
          <View style={{potition:'absolute', bottom:'5%', alignItems:'center'}}>
            <Button 
            style={{backgroundColor:'white',borderWidth:0.5, borderColor:'#04a3e7'}} 
            textStyle={{color:'#04a3e7'}}
            onPress={() => this._openModal()}
            title="+ Tambah perator" />
          </View>
        </View> 
      )
    }
  }
}

const styles = StyleSheet.create(
  {
    container: {
      alignItems:'center',
      flex: 1,
      backgroundColor: 'white',
    }
  }
)