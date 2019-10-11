/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { View, Text, Dimensions, PixelRatio, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Modal from 'react-native-modal'

//mengambil panjang dan lebar layar
var {height, width} = Dimensions.get('window');

export default class DropDown extends Component {

	constructor(props) {
	    super(props)

	    this._setOnchangeProps.bind(this)

	    this.state = {
	    	show:false,
	    	text:''
	    }
	}

	_setOnchangeProps (value) {
		this.setState({text:value.text,show:!this.state.show})
		this.props.onSelectItem(value)
	}



	_keyExtractor = (item, index) => item.id

	_renderItem = ({item}) => {
		return <TouchableOpacity onPress={ () => this._setOnchangeProps(item) } style={{width:width-200,alignItems:'center',padding:8}}><Text>{item.text}</Text></TouchableOpacity>
	}

	componentDidUpdate(prevProps) {
		if (prevProps.value != this.props.value ){
			let value = this.props.value
			let data = this.props.data
			index = data.findIndex(x => x.value == value)
			this.setState({text:data[index].text})
		}
   	}

   	componentDidMount(){
   		if(this.props.value){
   			let value = this.props.value
			let data = this.props.data
			index = data.findIndex(x => x.value == value)
			this.setState({text: data[index].text})	
   		} else {
   			this.setState({text: this.props.placeholder})
   		} 
   	}

	render () {
		return (
			<View style={{...styles.textinput, ...this.props.style}}>
				<View style={{borderBottomWidth:1,marginHorizontal: 4,borderBottomColor: '#cfcfcf',}}>
					<TouchableOpacity style={ styles.input } onPress={ () => this.setState({show:!this.state.show}) }>
						<Text style={{opacity: (this.state.text === this.props.placeholder) ? 0.5 : 1}}>{this.state.text}</Text>
						<Icon style={{opacity: 0.5 }} name="arrow-drop-down" size={20}/>
					</TouchableOpacity>
				</View>
				<Text style={{ color: 'red', fontSize: 12, marginHorizontal: 4 }}>{ this.props.errorMessage }</Text>
				<Modal
		        isVisible={this.state.show}
		        animationIn="zoomIn"
		        animationOut="zoomOut"
		        onBackButtonPress={() => this.setState({show:!this.state.show}) }
		        onBackdropPress={() => this.setState({show:!this.state.show})}
		              style={{justifyContent: 'center', alignItems:'center',flex:1}}>
		              	<View style={{justifyContent:'center',alignItems:'center', height:200, backgroundColor:'white', borderRadius:8}}>
			              	<FlatList
			              		contentContainerStyle={{ height:200, paddingVertical:16,justifyContent:'center'}}
								data={this.props.data}
								keyExtractor={this._keyExtractor}
								renderItem={ this._renderItem }/>
						</View>
		        </Modal>
			</View>
		)
	}
}

const styles = StyleSheet.create(
	{
		textinput: {
			width: (PixelRatio.get() < 1.5) ? width-64 : ( PixelRatio.get() < 2 ) ? width-64 : ( PixelRatio.get() < 3 ) ? width-64 : (PixelRatio.get() < 3.5) ? width-64 : 96,
		},
		input: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			paddingVertical: 15,
			height: (PixelRatio.get() < 1.5) ? 36 : ( PixelRatio.get() < 2 ) ? 48 : ( PixelRatio.get() < 3 ) ? 48 : (PixelRatio.get() < 3.5) ? 48 : 48,
		}
	}
)
