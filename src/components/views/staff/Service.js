/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, AsyncStorage, ScrollView, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { withNavigation } from 'react-navigation'
import { NavigationEvents } from 'react-navigation'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment'
import 'moment/locale/id'

//import custom components
import Data from '../../../module/data'
import api from '../../../api'
import Button from '../../uicomponents/Button'
import ListItem from '../../uicomponents/ListItem'
import service from '../../../service'

var {height, width} = Dimensions.get('window')

moment.locale('id')

export default class Service extends Component {


	//config header pencarian
	static navigationOptions = {
    	headerTitle: "Antrian",
    	headerTintColor: '#4ae0b5',
    	headerTitleStyle: {
        	fontWeight: 'bold',
        	color: '#4ae0b5'
      	},
      	headerStyle: {
	        elevation: 2,
	        backgroundColor: '#fff',
	        height: 50
	    }
  	}

	constructor(props) {
		super(props)

		this._nextQueue.bind(this)
		this._recallQueue.bind(this)

		this.state = {
			status_close:{'status':'close'},
			status_break:{'status':'break'},
			status_open:{'status':'open'},
	    	profile:{},
        	antrian:{},
        	show: false,
        	queue: null,
	    	isLoading:true,
	    	error:false,
	    	loading_next: false,
	    	loading_break: false,
	    	loading_open: false,
	    	loading_stop: false,
	    	disable: false
	    }
	}


  	_home = async () => {
		this.props.navigation.navigate('HomeStaff')
	}

	async _stopQueues (){
		this.setState({loading_stop:true, disable: true})
		if(await service.queue.updateQueueStatus(this.state.antrian.id, this.state.status_close, global.config)){
			this.setState({loading_stop:false, disable: false})
			if(await Data.removeData('antrian') && await Data.removeData('queue')){
				this._home()
			}	
		} else {
			this.setState({loading_stop:false, disable: false})
		}
	}

	async _breakQueues (){
		this.setState({loading_break:true, disable: true})
		let antrian = await service.queue.updateQueueStatus(this.state.antrian.id, this.state.status_break, global.config)
		if(antrian !== false){
			this.setState({loading_break:false, disable: false})
			if(await Data.storeData('antrian',antrian)){
				this.setState({show:true})
			}	
		} else {
			this.setState({loading_break:false, disable: false})
		}
	}

	async _openQueues (){
		this.setState({loading_open:true, disable: true})
		let antrian = await service.queue.updateQueueStatus(this.state.antrian.id, this.state.status_open, global.config)
		if(antrian !== false){
			this.setState({loading_open:false, disable: false})
			if(await Data.storeData('antrian',antrian)){
				this.setState({show:false})
			}	
		} else {
			this.setState({loading_open:false, disable: false})
		}
	}

	async _nextQueue() {
		this.setState({loading_next:true, disable: true})
		let queue = await service.queue.nextQueue(this.state.antrian.id, global.config)
		if (queue !== false) {
			if (queue === null) {
				this.setState({loading_next:false, disable: false})
				alert('Opppss Antrian Habis')
			} else {
				this.setState({loading_next:false, disable: false})
				if(await Data.storeData('queue',queue)){
	  			  this.setState({queue: queue })
		        } else {
			      alert("error aplication!")
			    }
			}
		} else {
			this.setState({loading_next:false, disable: false})
			alert('gagal memanggil antrian')
		}
	}

	async _recallQueue () {
		this.setState({loading_next:true, disable: true})
		let queue = await service.queue.recallQueue(this.state.antrian.id, this.state.queue.code ,global.config)
		if (queue !== false) {
			if (queue === null) {
				this.setState({loading_next:false, disable: false})
				alert('Opppss Antrian Habis')
			} else {
				this.setState({loading_next:false, disable: false})
				if(await Data.storeData('queue',queue)){
	  			  this.setState({queue: queue })
		        } else {
			      alert("error aplication!")
			    }
			}
		} else {
			this.setState({loading_next:false, disable: false})
			alert('gagal memanggil antrian')
		}	
	}

	async _startPage () {
		this.setState({isLoading: true})
		let profile =  await Data.getProfile()
		let antrian =  await Data.getAntrian()
		let queue =  await Data.getQueue()
    	this.setState({antrian: antrian, profile: profile, queue: queue !== null ? queue : null }, () => {
    		if (antrian === null) {
    			this.setState({isLoading: false, show: false })	
    		} else {
    			this.setState({isLoading: false, show: antrian.status === 'open' ? false : true })
    		}
    	})
	}

	getNumberQueue (code) {
		code = code.split('0')
		return (code[1] - 1)
	}
	
	render () {
		if(this.state.isLoading){
	      return (
	        <View style={{ ...styles.container,justifyContent:'center' }}>
        	<NavigationEvents
			  onDidFocus={payload => this._startPage()}
			/>
	          <ActivityIndicator size="large" color="#4ae0b5"/>
	        </View>
	      )
	    } else if (this.state.antrian === null) {
	    	return (
	    		<View style={{ ...styles.container,justifyContent:'center' }}>
	    		<NavigationEvents
				  onDidFocus={payload => this._startPage()}
				/>
	    			<Text>Silahkan pilih layanan dan loket terlebih dahulu</Text>
	    		</View>
	    	)
	    } else {
			return (
				<View style={styles.container}>
					<NavigationEvents
					  onDidFocus={payload => this._startPage()}
					/>
					<Modal
			          isVisible={this.state.show}
			          animationIn="zoomIn"
			          animationOut="zoomOut"
			                style={{flex:1, justifyContent:'center', alignItems:'center'}}>
			                <View style={{backgroundColor:'white', height:'50%', width:width-64, alignItems:'center', borderRadius:12}}>
			                  <View style={{ padding:32, alignItems:'center'}}>
			                    <Text style={{ fontSize: 20}}>Layanan sedang istirahat</Text>
			                  </View>
			                  <View>
			                  	<Text style={{fontSize:16, textAlign:'center'}}>{this.state.profile.name}</Text>
			                  	<Text style={{fontSize:16, textAlign:'center'}}>{this.state.antrian.service.name}</Text>
			                  	<Text style={{fontSize:16, textAlign:'center'}}>{this.state.antrian.counter}</Text>
			                  </View>
			                  <Button 
			                  	style={{backgroundColor: '#04A3E7',width: ((width/2) - (16+8)), elevation: 1, marginRight:8}} 
			                  	textStyle={{color:'white'}} 
			                  	title="Lanjutkan Layanan" 
			                  	onPress={()=> this._openQueues()}
			                  	loading={this.state.loading_open}
			                  	disabled={this.state.disable}/>
			                </View>
			         </Modal>
					<View style={{flexDirection:'row', alignItems:'center', width:width, borderBottomWidth:1, borderColor:'#cfcfcf'}}>
						<View style={{flexGrow:1, justifyContent:'center', alignItems:'center'}}>
							<Image 
								source={require('../../../static/ASSETS-REV/LAYANAN/layanan.png')}
		          				style={{height:40,width:30}}  />
	          			</View>
	          			<View style={{flexGrow:1}}>
	          				<Text style={{fontSize:12, fontWeight:'normal'}}>Nama</Text>
	          				<Text style={{fontSize:14,marginTop:4, fontWeight:'bold'}}>{this.state.profile.name}</Text>
	          				<Text style={{fontSize:12, marginTop:4, fontWeight:'normal'}}>Layanan</Text>
	          				<Text style={{fontSize:14,marginTop:4, fontWeight:'bold'}}>{this.state.antrian.service.name} </Text>
	          			</View>
	          			<View style={{flexGrow:1}}>
	          				<Text style={{fontSize:12, fontWeight:'normal'}}>Loket</Text>
	          				<Text style={{fontSize:14,marginTop:4, fontWeight:'bold'}}>{this.state.antrian.counter}</Text>
	          				<Text style={{fontSize:12, marginTop:4, fontWeight:'normal'}}>Jam mulai</Text>
	          				<Text style={{fontSize:14,marginTop:4, fontWeight:'bold'}}>{moment(this.state.antrian.createdAt).format('HH:mm')} WIB</Text>
	          			</View>
	          			<View style={{flexGrow:1}}>
	          				<TouchableOpacity disabled={this.state.disable} onPress={() => this._stopQueues(this.state.service_id)} style={{ alignSelf: 'flex-end', backgroundColor: '#FF5757',  justifyContent: 'center', alignItems:'center', width:90, height:104, elevation: 1, opacity: this.state.disable ? 0.3 : 1,}} textStyle={{color:'white'}} title="Jeda">
	          					{
	          						this.state.loading_stop ? <ActivityIndicator size="small" color="black"/> : <Icon name="power-settings-new" style={{color:'white'}} size={25} />
	          					}
	          				</TouchableOpacity>
	          			</View>
		          	</View>
		          	<ScrollView contentContainerStyle={{justifyContent : 'center'}}>
						<View style={{width:width-32, marginHorizontal: 16, elevation:2, marginTop:16, borderRadius:12, backgroundColor:'white'}}>
							<View style={{flexDirection:'row',marginTop:16}}>
								<View style={{flexGrow:2}}>
									<Text style={{color:'#969696', textAlign:'center'}}>Antrian Sekarang</Text>
									<Text style={{fontSize:100, fontWeight:'bold', color:'#04A3E7', textAlign:'center'}}>{this.state.queue !== null ?  this.state.queue.code : '0'}</Text>
								</View>

								<View style={{flexGrow:1}}>
									<Text style={{color:'#969696'}}>Nama Pengunjung</Text>
									<Text style={{color:'black',fontWeight:'bold',marginTop:2,fontSize:16}}>{this.state.queue !== null ?  this.state.queue.customer.name : 'belum ada Pengunjung'}</Text>
									
									<Text style={{marginTop:4,color:'#969696'}}>Tanggal daftar</Text>
									<Text style={{color:'black',fontWeight:'bold',marginTop:2,fontSize:16}} >{this.state.queue !== null ? moment(this.state.queue.started_at).format('DD MMMM YYYY') : 'tanggal'}</Text>
									<Text style={{color:'#969696'}}>Status pelayanan</Text>
									<Text style={{color:'black',fontWeight:'bold',marginTop:2,fontSize:16}} >Sedang dilayani</Text>
								</View>
							</View>
							<View style={{borderBottomColor: '#969696', borderBottomWidth: 1, marginTop:10}}/>
							<View style={{flexDirection:'row', marginVertical:10, paddingHorizontal:32}}>
								{/*
								<View style={{flexGrow:2}}>
									<Text style={{color:'#969696'}}>Sisa antrian</Text>
									<Text style={{color:'#969696',fontWeight:'bold',marginTop:2,fontSize:50}}>3</Text>
								</View>
								*/}
								<View style={{flexGrow:1, alignItems:'center'}}>	
									<Text style={{color:'#969696'}}>Terlayani hari ini</Text>
									<Text style={{color:'#969696',fontWeight:'bold',marginTop:2,fontSize:50}}>{this.state.queue !== null ?  this.getNumberQueue(this.state.queue.code) : '0'}</Text>
								</View>	
							</View>	
						</View>
						<View style={{flexDirection:'row', width:width, paddingHorizontal: 16, marginTop:40, alignItems:'center'}}>
							<Button style={{backgroundColor: '#04A3E7',width: ((width/2) - (16+8)), elevation: 1, marginRight:8}} textStyle={{color:'white'}} title="Panggil ulang" disabled={this.state.disable} onPress={ () => this._recallQueue() }/>
							<Button style={{backgroundColor: '#70C95A',width: ((width/2) - (16+8)), elevation: 1, marginLeft:8}} textStyle={{color:'white'}} title="Selanjutnya" disabled={this.state.disable} loading={this.state.loading_next} onPress={ () => this._nextQueue() }/>	
						</View>
						<View style={{flexDirection:'row',width:width, paddingHorizontal: 16, marginTop:16, marginBottom:20}}>
							<Button style={{backgroundColor: '#969696',width: ((width/2) - (16+8)), elevation: 1, marginRight:8}} textStyle={{color:'white'}} title="Daftar terlewat" disabled={this.state.disable}/>
							<Button style={{backgroundColor: '#F5A11B',width: ((width/2) - (16+8)), elevation: 1, marginLeft:8}} textStyle={{color:'white'}} title="Istirahat" disabled={this.state.disable} loading={this.state.loading_break} onPress={()=> this._breakQueues()}/>	
						</View>
						
					</ScrollView>
				</View>
			)
		}
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
