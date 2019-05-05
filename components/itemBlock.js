import React from 'react'
import { View,StyleSheet,TouchableHighlight,Text} from 'react-native'
import { Body,Left, Right, Icon } from 'native-base';

import colors from '../theme'

export default class ItemBlock extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){

    return(
      <TouchableHighlight
        style={styles.itemList}
        key={this.props.item.id}

        underlayColor="#fcfcfc"
        onPress={() => this.props.itemClick(this.props.item)}
        onLongPress={() => this.props.infoFolder(this.props.item)}>
        <Text numberOfLines={1} style={styles.textItem}>{this.props.item.name}</Text>
      </TouchableHighlight>
    );
  }
}


const styles = StyleSheet.create({
  itemList: {
    width:'45%',
    backgroundColor:colors.view,
    marginLeft:"2.5%",
    marginRight:"2.5%",
    marginBottom:10,
    height:60,
    padding:15,
    flexDirection:'row',
    borderBottomWidth:5,
    borderColor:colors.main,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 4,

  },
  textItem:{
    lineHeight:30,
    color:colors.textMain
  },
});
