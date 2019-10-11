/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, AsyncStorage, Alert, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
//import custom components
import Data from '../../../module/data'
import api from '../../../api'
import Button from '../../uicomponents/Button'
import ListItem from '../../uicomponents/ListItem'
import moment from 'moment'
import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs'

var {height, width} = Dimensions.get('window')

export default class Service_Save extends Component {


	//config header pencarian
	static navigationOptions = {
    	headerTitle: "Loket Layanan",
    	headerLeft: null,
    	headerTintColor: 'white',
    	headerTitleStyle: {
        	fontWeight: 'bold',
        	color: 'white'
      	},
     	 headerStyle: {
	        elevation: 1,
	        backgroundColor: '#04a3e7',
	        height: 50,
        	textAlign: 'center'

	    }
  	}

	constructor(props) {
		super(props)
		this.state = {
			status_close:{'status':'close'},
			status_break:{'status':'break'},
      status_open:{'status':'open'},
	    	profile:{},
	    	antrian:{},
	    	data:{},
	    	customer:'',
        service:{},
        	dilayani:0,
        	sisa:0,
        status:0,
        ticket_count:true,
	    	isLoading:false,
	    	error:false
	    }
	}


  	_removeCache = async () => {
		if((await Data.removeData('antrian')) && (await Data.removeData('queues')) && (await Data.removeData('status_antrian')) ){
			this.props.navigation.navigate('HomeStaff')
		}
	}
	
	 async openConfirm (show)  {
         this.setState({ showConfirm: show })

    }
    openConfirmEnd = (show) => {
    	this.setState({ showConfirm_end: show })
    }
    //Show Modal Break
    async ConfirmBreak (show) {
      this.set= await Data.storeData('status_antrian',1)
      this.setState({showBreak: show})
    }

    //Set Status Sync Status Antrian
    async _ChangeStatus  (show) {
      this.set= await Data.storeData('status_antrian',0)
      this.setState({showBreak: show}) 
    }

    optionYesEnd = () => {
        this.openConfirmEnd(false)
        setTimeout(
            () => {
 			 this._updateQueues(this.state.antrian.id,this.state.status_close) 
            },
            300,
        )
    }
    optionYes = () => {
        this._updateQueues(this.state.antrian.id,this.state.status_break) 
        this.openConfirm(false)
    }

    optionNo = () => {
        this.openConfirm(false)
        this.openConfirmEnd(false)
    }
    _lanjutQueues = () => {
        this._updateQueues(this.state.antrian.id,this.state.status_open) 
    }



	//For Stop a Service Queues
	async _updateQueues (id,status){
		let config = {
      headers: {
        'X-Access-Token': await Data.getToken()
      }
    }

    api.put('queues/'+id, status, config)
      .then(response => {
        let responseData = response.data
        console.log(responseData)
        if (responseData.success === true){
          if(status.status === 'close'){
            this._removeCache() 
          }else if(status.status === 'break'){
            this.ConfirmBreak(true)
          }else if(status.status === 'open'){
            this._ChangeStatus(false)
          }
        }
      })
      .catch(e => {
        alert(JSON.stringify(e))
        this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
      })
	}


	//For Count Get Ticket_count 
	async _getCount() {
		let config = {
	      headers: {
	        'X-Access-Token': await Data.getToken()
	      }
	    }
	    api.get('services/'+this.state.service.id+'/status', config)
	      .then(response => {
	        let responseData = response.data
	        if (responseData.success === true){
	          this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
	        		this.setState({sisa:responseData.data.ticket_count})
	        		//alert(JSON.stringify(responseData))			
	    }
	      })
	      .catch(e => {
	        //alert(JSON.stringify(e))
	        //alert('Cek Your Connection')
	        this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
	      })

	}
	//For Next Ticket if served
		async _next() {
	    this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
	    let config = {
	      headers: {
	        'X-Access-Token': await Data.getToken()
	      }
	    }

	    api.get('queues/'+this.state.antrian.id+'/tickets?action=next&status=waiting', config)
	      .then(response => {
	        let responseData = response.data
	        if (responseData.success === true){
	          this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
	          if(responseData.data === null){
	           Alert.alert('Opppss','Antrian Habis')
	        }
	        else {
	        		if(Data.storeData('queues',responseData.data)){
	          				this.setState({data:responseData.data, customer:responseData.data.customer })
	          				Alert.alert('Pemberitahuan','CODE Antrian '+this.state.data.code+' Dipanggil' )
	          				tambah=this.state.dilayani+1
	          				this.setState({dilayani:tambah})
	          				this._getCount()				
						} else {
							alert("error aplication!")
						}

	        }
	    }
	      })
	      .catch(e => {
	        alert(JSON.stringify(e))
	        this.setState({isLoading:!this.state.isLoading, error:!this.state.error})
	      })
	
	}
    cek_status=()=>{
    if( this.state.status == 1 ){
      this.ConfirmBreak(true)
    }
    }

  	async componentDidMount () {
  	let profile =  await Data.getProfile()
		let status = await Data.getStatusQueues()
    this.setState({status:status}) 
    this.setState({profile:profile})
		var queues =  await Data.getQueues()
    	if(queues){
      	this.setState({data:queues, customer:queues.customer}) 
		}
    this.cek_status()
    //Get Data Queues 
		var antrian = await Data.getAntrian()
    	if(antrian){
      	this.setState({antrian:antrian, service: antrian.service}) 
		}
		//Refresh when 4 second for get Ticket_count
		this._interval = setInterval(() => {
    		this._getCount()
        if(this.state.sisa > 0){
          this.setState({ticket_count:false})
        }else{
          this.setState({ticket_count:true})
        }
    	}, 4000)
		
	}


     
	
	
	
	render () {
		const { data } = this.state
		return (
			<View style={styles.container}>

			   <ConfirmDialog
                    title="Istirahat "
                    animationType="fade"
                    message="Anda yakin ingin Istirahat?"
                    onTouchOutside={ () => this.openConfirm(false) }
                    visible={ this.state.showConfirm }
                    dialogStyle={{alignItems:"center"}}
                    contentStyle={{alignItems:"center"}}
                    negativeButton={{title: "NO",onPress: this.optionNo,
                            titleStyle: {
                                color: "#1D88FC",
                                colorDisabled: "aqua",
                            },
                            style: {
                                backgroundColor: "transparent",
                                backgroundColorDisabled: "transparent",

                            },
                        }
                    }
                    positiveButton={
                        {
                            title: "YES",
                            onPress: this.optionYes,
                            titleStyle: {
                                color: "red",
                                colorDisabled: "aqua",
                            },
                        }
                    }
                />



         <ConfirmDialog
                    title="Sedang Istirahat "
                    animationType="slide"
                    message="Sedang Istirahat?"
                    visible={ this.state.showBreak }
                    buttonsStyle = {{alignItems:'center',marginLeft:-20}}
                    dialogStyle={{alignItems:"center"}}
                    contentStyle={{alignItems:"center"}}
                    positiveButton={
                        {
                            title: "Lanjutkan",
                            onPress: this._lanjutQueues,
                            // disabled: true,
                            titleStyle: {
                                color: "#1D88FC",
                                colorDisabled: "aqua",
                            },
                            style: {
                                backgroundColor: "transparent",
                                backgroundColorDisabled: "transparent",

                            },
                        }
                    }
                />

                <ConfirmDialog
                    title="Akhiri Layanan "
                    animationType="fade"
                    message="Anda yakin ingin mengakhiri Layanan Loket ?"
                    onTouchOutside={ () => this.openConfirm(false) }
                    visible={ this.state.showConfirm_end }
                    dialogStyle={{alignItems:"center"}}
                    contentStyle={{alignItems:"center",}}
                    negativeButton={
                        {
                            title: "NO",
                            onPress: this.optionNo,
                            // disabled: true,
                            titleStyle: {
                                color: "#1D88FC",
                                colorDisabled: "aqua",
                            },
                            style: {
                                backgroundColor: "transparent",
                                backgroundColorDisabled: "transparent",

                            },
                        }
                    }
                    positiveButton={
                        {
                            title: "YES",
                            onPress: this.optionYesEnd,
                            titleStyle: {
                                color: "red",
                                colorDisabled: "aqua",
                            },
                        }
                    }
                />

			<View style={{flexDirection:'row', alignItems:'center', width:width, padding:14, borderBottomWidth:1, borderColor:'#cfcfcf'}}>
      
					<Image 
						source={require('../../../static/ASSETS-REV/LAYANAN/layanan.png')}
						
          				style={{height:40,width:30, marginRight:6}}  />
          			<View style={{marginLeft:10, width:'25%'}}>
          				<Text style={{fontSize:12, fontWeight:'normal'}}>Nama</Text>
          				<Text style={{fontSize:14,marginTop:4, fontWeight:'bold'}}>{this.state.profile.name}</Text>
          				<Text style={{fontSize:12, marginTop:4, fontWeight:'normal'}}>Layanan</Text>
          				<Text style={{fontSize:14,marginTop:4, fontWeight:'bold'}}>{this.state.service.prefix} </Text>
          			</View>
          			
          			<View style={{marginLeft:40, width:'25%'}}>
          				<Text style={{fontSize:12, fontWeight:'normal'}}>Loket</Text>
          				<Text style={{fontSize:14,marginTop:4, fontWeight:'bold'}}>{this.state.antrian.counter}</Text>
          				<Text style={{fontSize:12, marginTop:4, fontWeight:'normal'}}>Jam mulai</Text>
          				<Text style={{fontSize:14,marginTop:4, fontWeight:'bold'}}>{
          					moment(this.state.antrian.started_at).format('h:mm a')
          					}</Text>
          			</View>

          			<View style={{right: 0, top:-3, bottom:-10, marginLeft:10, marginTop:-30, marginBottom:-35}}>
          			<TouchableOpacity onPress={ () => this.openConfirmEnd(true) } style={{ alignSelf: 'flex-end', backgroundColor: '#FF5757',  justifyContent: 'center', alignItems:'center', width:90, height:104, elevation: 1, marginRight:8}} textStyle={{color:'white'}} title="Jeda">
          			<Icon name="power-settings-new" style={{color:'white'}} size={25} />
          			</TouchableOpacity>
          			</View>

          	</View>

          	 <ScrollView contentContainerStyle={{flexGrow : 1, justifyContent : 'center'}}>

					<View style={{flexDirection:'column', width:width-20, marginLeft:10, padding:14, elevation:2,marginTop:24, borderRadius:12,backgroundColor:'white'}}>
					
					<View style={{flexDirection:'row'}}>
					<View style={{width:'50%',marginTop:10, marginLeft:15}}>
						<Text style={{color:'#969696'}}>Antrian Sekarang</Text>
    				{data
						? <Text style={{fontSize:50, fontWeight:'bold', color:'#04A3E7'}}>{data.code}</Text>
						: <Text style={{fontSize:50, fontWeight:'bold', color:'#04A3E7'}}>Habis</Text>
					}

					</View>

					<View style={{width:'50%',marginTop:10}}>
						<Text style={{color:'#969696'}}>Nama Pengunjung</Text>
					
						 <Text style={{color:'black',fontWeight:'bold',marginTop:2,fontSize:14}}>{this.state.customer.name}</Text>
					
						<Text style={{marginTop:4,color:'#969696'}}>Tanggal daftar</Text>
						<Text style={{color:'black',fontWeight:'bold',marginTop:2,fontSize:16}} >
						{moment(this.state.data.createdAt).format('Do MMMM YYYY, h:mm:ss a')}	
						</Text>
						<Text style={{color:'#969696'}}>Status pelayanan</Text>
						<Text style={{color:'black',fontWeight:'bold',marginTop:2,fontSize:16}} >Sedang Dilayani</Text>
					</View>
					</View>

					<View style={{borderBottomColor: '#969696', borderBottomWidth: 1, marginTop:10, marginLeft:-14,marginRight:-14}}/>

					<View style={{flexDirection:'row'}}>

					<View style={{width:'50%',marginTop:10, marginLeft:15}}>
						<Text style={{color:'#969696'}}>Sisa antrian</Text>
						<Text style={{color:'#969696',fontWeight:'bold',marginTop:2,fontSize:50}}>{this.state.sisa}</Text>
					</View>
					
					<View style={{width:'50%',marginTop:10}}>	
						<Text style={{color:'#969696'}}>Terlayani hari ini</Text>
						<Text style={{color:'#969696',fontWeight:'bold',marginTop:2,fontSize:50}}>{this.state.dilayani}
						</Text>
					</View>	
						
					</View>


					</View>


				<View style={{flexDirection:'row',flex:1, paddingHorizontal: 16, marginTop:20}}>
					<Button style={{backgroundColor: '#04A3E7',width:160, elevation: 1, marginRight:8}} textStyle={{color:'white'}} title="Panggil ulang"/>
					<Button disabled={ this.state.ticket_count } onPress={() => this._next()} style={{backgroundColor: '#70C95A',width:160, elevation: 1, marginLeft:8}} textStyle={{color:'white'}} title="Selanjutnya"/>	
				</View>

				<View style={{flexDirection:'row',flex:1, paddingHorizontal: 16, marginTop:10, marginBottom:20}}>
					<Button style={{backgroundColor: '#969696',width:160, elevation: 1, marginRight:8}} textStyle={{color:'white'}} title="Daftar terlewat"/>
					<Button   onPress={ () => this.openConfirm(true) } style={{backgroundColor: '#F5A11B',width:160, elevation: 1, marginLeft:8}} textStyle={{color:'white'}} title="Istirahat"/>	
				</View>
				

			</ScrollView>

			</View>
		)
	}
}

const styles = StyleSheet.create(
	{
		container: {
			flex: 1,
			backgroundColor: '#fafafa',
			alignItems: 'center',
		}
	}
)