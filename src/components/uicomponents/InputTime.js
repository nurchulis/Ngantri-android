/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { View, TextInput, Text, Dimensions, PixelRatio, StyleSheet , TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'

//mengambil panjang dan lebar layar
var {height, width} = Dimensions.get('window');

export default class InputTime extends Component {

	constructor(props) {
      super(props)

      this.state = {
      	time: '00:00',
        isDateTimePickerVisible:false
      }
  	}

	_showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

  	_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

  	_handleDatePicked = (date) => {
  		this.setState({time:moment(date).format("HH:mm")})
  		this.props.onChangeTime(moment(date).format("HH:mm"))
	    this._hideDateTimePicker()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.value != this.props.value ){
			console.log(this.props.value)
			this.setState({time: this.props.value})
		}
   	}

   	componentDidMount () {
   		this.setState({time: this.props.value})
   	}

	render () {
		return (
			<View style={{...styles.textinput, ...this.props.style}}>
				<View style={{borderBottomWidth:1,marginHorizontal: 4,borderBottomColor: '#cfcfcf',}}>
					<TouchableOpacity style={ styles.input } onPress={this._showDateTimePicker}>
						<Text style={{opacity: 1}}>{this.state.time}</Text>
						<Icon style={{opacity: 0.5 }} name="arrow-drop-down" size={20}/>
					</TouchableOpacity>
				</View>
				<DateTimePicker
				  mode="time"
		          isVisible={this.state.isDateTimePickerVisible}
		          onConfirm={this._handleDatePicked}
		          onCancel={this._hideDateTimePicker}
		        />
				<Text style={{ color: 'red', fontSize: 12, marginHorizontal: 4 }}>{ this.props.errorMessage }</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create(
{
		textinput: {
			width: (PixelRatio.get() < 1.5) ? width-64 : ( PixelRatio.get() < 2 ) ? width-64 : ( PixelRatio.get() < 3 ) ? width-64 : (PixelRatio.get() < 3.5) ? width-64 : 64,
		},
		input: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			paddingVertical: 15,
			height: (PixelRatio.get() < 1.5) ? 36 : ( PixelRatio.get() < 2 ) ? 48 : ( PixelRatio.get() < 3 ) ? 48 : (PixelRatio.get() < 3.5) ? 48 : 48,
		}
	}
)
