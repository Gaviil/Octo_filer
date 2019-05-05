import React from 'react'
import { View,StyleSheet,Text,TouchableHighlight } from 'react-native'
import { Left, Body, Right } from 'native-base';

import colors from '../theme'

export default class Toast extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      title:'Mon Drive',
    }


  }

  render(){

    return(
      <TouchableHighlight
        style={this.props.visible?styles.toast:styles.toastHidden}
        underlayColor="#333"
        onPress={() => this.props.toastClick()}>
          <Text style={styles.toastText}>{this.props.message}</Text>
      </TouchableHighlight>

    )
  }
}


const styles = StyleSheet.create({
  toast:{
    position:'absolute',
    bottom: 30,
    left: 20,
    right:20,
    backgroundColor:'#333',
    borderRadius:8,
    padding:15,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    elevation: 4,
    zIndex:9999
  },
  toastHidden:{
    display:'none'
  },
  toastText:{
    color:colors.view,
    fontSize:15
  }
});
