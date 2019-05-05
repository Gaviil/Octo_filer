import React from 'react'
import { View,StyleSheet,Clipboard} from 'react-native'
import { Button,Text,Icon} from 'native-base';

import colors from '../theme'

export default class OptionFile extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  copyLink = (file) =>{
    Clipboard.setString(file.dlPath)
    this.props.copyLink()
  }
  render(){

    return(
      <View style={styles.blockbtn}>
        <Button
          style={styles.delete}
          block
          onPress={() => {this.copyLink(this.props.file)}}>
          <Icon
            style={styles.icon}
            name="link" />
        </Button>
        <Button
          style={styles.delete}
          block
          onPress={() => {this.props.deleteItem(this.props.file)}}>
          <Icon
            style={styles.icon}
            name="close" />
        </Button>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  blockbtn:{
    marginVertical:10,
    alignItems: 'center',
    flexDirection:'row',
    justifyContent:'space-around'
  },
  delete:{
    flex:1,
    marginHorizontal:5,
    backgroundColor:colors.main,
  },
});
