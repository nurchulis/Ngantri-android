 /**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar, ActivityIndicator, ScrollView } from 'react-native'
import { withNavigation } from 'react-navigation'
import { NavigationEvents } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Image from 'react-native-scalable-image'
import { IndicatorViewPager, PagerDotIndicator, ViewPager } from 'rn-viewpager'

//import custom components
import CardIcon from '../../uicomponents/CardIcon'
import homeAdmin from '../../../static/assets/homeAdmin/homeAdmin.png'

import api from '../../../api'
import Data from '../../../module/data'
import service from '../../../service'

//mengambil panjang dan lebar layar
var {height, width} = Dimensions.get('window')

export default class Home extends Component {

	constructor(props) {
	    super(props)

	    this.state = {
	    	tenant:{},
	    	services:[],
	    	staff:[],
	      	isLoading: true,
	    }
	}

	_renderDotIndicator() {
        return <PagerDotIndicator pageCount={Math.ceil(this.state.services.length/2)} selectedDotStyle={{backgroundColor: '#04a3e7', opacity:0.5, width:24}} dotStyle={{backgroundColor: '#04a3e7', opacity:0.5}}/>
    }

    renderButtons () {
	    return this.state.services.map((item) => {
	        return (
	            <View style={{flexDirection:'row', marginBottom:30}}>
					<View style={{flex:1, backgroundColor:'white',elevation:2, borderRadius:12, padding:12, marginRight:8,marginLeft:4}}>
						<Text style={{color:'#04a3e7'}}>Customer Service</Text>
						<View style={{flexDirection:'row', justifyContent:'space-between'}}>
							<View style={{alignItems:'center',justifyContent:'flex-end'}}>
								<Text style={{fontSize:26, textAlign:'center'}}>1</Text>
								<Text style={{fontSize:10, textAlign:'center',color:'#04a3e7'}}>Loket</Text>
							</View>
							<View style={{alignItems:'center'}}>
								<Text style={{fontSize:12, textAlign:'center'}}>1</Text>
								<Text style={{fontSize:10, textAlign:'center',color:'#04a3e7'}}>total</Text>
								<Text style={{fontSize:12, textAlign:'center'}}>1</Text>
								<Text style={{fontSize:10, textAlign:'center',color:'#04a3e7'}}>sisa</Text>
							</View>
						</View>
					</View>
					<View style={{flex:1, backgroundColor:'white',elevation:2, borderRadius:12, padding:12, marginLeft:8,marginRight:4}}>
						<Text style={{color:'#04a3e7'}}>Teller</Text>
						<View style={{flexDirection:'row', justifyContent:'space-between'}}>
							<View style={{alignItems:'center',justifyContent:'flex-end'}}>
								<Text style={{fontSize:26, textAlign:'center'}}>1</Text>
								<Text style={{fontSize:10, textAlign:'center',color:'#04a3e7'}}>Loket</Text>
							</View>
							<View style={{alignItems:'center'}}>
								<Text style={{fontSize:12, textAlign:'center'}}>1</Text>
								<Text style={{fontSize:10, textAlign:'center',color:'#04a3e7'}}>total</Text>
								<Text style={{fontSize:12, textAlign:'center'}}>1</Text>
								<Text style={{fontSize:10, textAlign:'center',color:'#04a3e7'}}>sisa</Text>
							</View>
						</View>
					</View>
				</View>
	        );
	    });
	}

	async componentDidMount () {
		this.setState({isLoading: true})
		let tenant = await Data.getData('tenant')
		this.setState({
			tenant:tenant, 
			services: await service.tenant.getTenantService(tenant.id, global.config),
			roles: await service.tenant.getTenantRole(tenant.id, global.config)
		}, () => {
			this.setState({isLoading: false})
		})
	}

	render () {
		if(this.state.isLoading){
	      return (
	        <View style={{ ...styles.container,justifyContent:'center' }}>
	          <StatusBar backgroundColor="#0288D1" barStyle="light-content"/>
	          <ActivityIndicator size="large" color="#4ae0b5"/>
	        </View>
	      )
	    } else {
			return (
				<ScrollView contentContainerStyle={{alignItems:'center'}}>
					<NavigationEvents
					  onDidFocus={payload => this.componentDidMount()}
					/>
					<View style={styles.container}>
						<StatusBar backgroundColor="#0288D1" barStyle="light-content"/>
						<Image
						   style={this.state.tenant.cover === null ? {marginVertical:38} : {marginVertical:0, marginBottom:16}}
					       width={this.state.tenant.cover === null ? width-100 : width} // height will be calculated automatically
					       height={this.state.tenant.cover === null ? 150 : 200 }
					       source={this.state.tenant.cover === null ? homeAdmin : {uri:this.state.tenant.cover}}
					    />
					    <View style={{width:width-32, padding:16,paddingVertical: 20, elevation:2, borderRadius:12, flexDirection:'row', alignItems:'center'}}>
					    	<View style={{width:50,height:50, backgroundColor:'#04a3e7', justifyContent:'center', alignItems:'center', borderRadius:12, padding:6, marginRight:16}}>
					    		<Icon name="room" size={30} color="white"/>
					    	</View>
					    	<View>
					    		<Text style={{fontSize:16,fontWeight:'bold'}}>{this.state.tenant.name}</Text>
					    		<Text>{this.state.tenant.address}</Text>
					    		<Text style={{fontSize:10}}>{this.state.tenant.configs.date_open.length !== 0 ? 'jam operasional hari ini: '+this.state.tenant.configs.time_open+' - '+this.state.tenant.configs.time_close : 'jadwal operasioanl belum di setting'}</Text>
					    	</View>
					    </View>
						<View style={{marginTop:12, width:width-32, height:275, elevation:2, borderRadius:12, padding:16,marginBottom: 16}}>
							<Text style={{marginBottom:8}}>Statistika Instansi</Text>
							<View style={{flexDirection:'row'}}>
								<View style={{flexGrow:1, backgroundColor:'white',elevation:2, borderRadius:12, padding:8, marginRight:8, flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginHorizontal:4}}>
									<View style={{width:30,height:30, backgroundColor:'#04a3e7', justifyContent:'center', alignItems:'center', borderRadius:8, padding:4, marginRight:16}}>
										<Icon name="assignment" size={20} color="white"/>
									</View>
									<View style={{marginRight:8}}>
										<Text style={{fontSize:12, textAlign:'right'}}>{this.state.services.length}</Text>
										<Text style={{fontSize:12, textAlign:'right'}}>Layanan</Text>
									</View>
								</View>
								<View style={{flexGrow:1, backgroundColor:'white',elevation:2, borderRadius:12, padding:8, marginLeft:8, flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginHorizontal:4}}>
									<View style={{width:30,height:30, backgroundColor:'#04a3e7', justifyContent:'center', alignItems:'center', borderRadius:8, padding:4, marginRight:16}}>
										<Icon name="group" size={20} color="white"/>
									</View>
									<View style={{marginRight:8}}>
										<Text style={{fontSize:12, textAlign:'right'}}>{this.state.staff.length}</Text>
										<Text style={{fontSize:12, textAlign:'right'}}>Operator</Text>
									</View>
								</View>
							</View>
							<Text style={{marginVertical:8}}>Status antrian</Text>
							<IndicatorViewPager 
							  horizontalScroll={true}
							  ref={ viewPager => { this.viewPager = viewPager }}
							  style={{height:140}}
							  indicator={this._renderDotIndicator()}>
								<View style={{flexDirection:'row', marginBottom:30}}>
									<View style={{flex:1, backgroundColor:'white',elevation:2, borderRadius:12, padding:12, marginRight:8,marginLeft:4}}>
										<Text style={{color:'#04a3e7'}}>Customer Service</Text>
										<View style={{flexDirection:'row', justifyContent:'space-between'}}>
											<View style={{alignItems:'center',justifyContent:'flex-end'}}>
												<Text style={{fontSize:26, textAlign:'center'}}>1</Text>
												<Text style={{fontSize:10, textAlign:'center',color:'#04a3e7'}}>Loket</Text>
											</View>
											<View style={{alignItems:'center'}}>
												<Text style={{fontSize:12, textAlign:'center'}}>1</Text>
												<Text style={{fontSize:10, textAlign:'center',color:'#04a3e7'}}>total</Text>
												<Text style={{fontSize:12, textAlign:'center'}}>1</Text>
												<Text style={{fontSize:10, textAlign:'center',color:'#04a3e7'}}>sisa</Text>
											</View>
										</View>
									</View>
									<View style={{flex:1, backgroundColor:'white',elevation:2, borderRadius:12, padding:12, marginLeft:8,marginRight:4}}>
										<Text style={{color:'#04a3e7'}}>Teller</Text>
										<View style={{flexDirection:'row', justifyContent:'space-between'}}>
											<View style={{alignItems:'center',justifyContent:'flex-end'}}>
												<Text style={{fontSize:26, textAlign:'center'}}>1</Text>
												<Text style={{fontSize:10, textAlign:'center',color:'#04a3e7'}}>Loket</Text>
											</View>
											<View style={{alignItems:'center'}}>
												<Text style={{fontSize:12, textAlign:'center'}}>1</Text>
												<Text style={{fontSize:10, textAlign:'center',color:'#04a3e7'}}>total</Text>
												<Text style={{fontSize:12, textAlign:'center'}}>1</Text>
												<Text style={{fontSize:10, textAlign:'center',color:'#04a3e7'}}>sisa</Text>
											</View>
										</View>
									</View>
								</View>
								<View></View>
								<View></View>
							</IndicatorViewPager>
						</View>
					</View>
				</ScrollView>
			)
		}
	}
}

const styles = StyleSheet.create(
	{
		container: {
			flex: 1,
			alignItems: 'center',
			backgroundColor: 'white'
		}
	}
)