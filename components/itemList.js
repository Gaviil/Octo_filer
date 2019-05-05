import React from 'react'
import { View,StyleSheet,TouchableHighlight,Text} from 'react-native'
import colors from '../theme'

export default class ItemList extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }


  render(){

    return(
      <TouchableHighlight
        key={this.props.item.id}
        style={styles.itemList}
        underlayColor="rgba(0,0,0,0.01)"
        onPress={() => this.props.itemClick(this.props.item)}
        onLongPress={() => this.props.cut(this.props.item.name)}>
          <Text style={styles.textItem}>{this.props.item.name}</Text>
      </TouchableHighlight>
    );
  }
}


const styles = StyleSheet.create({
  itemList: {
    paddingLeft:20,
    paddingRight:20,
    height:50,
    width:'100%',
    backgroundColor:colors.view,
    borderLeftWidth:5,
    borderLeftColor:colors.main,
    borderBottomWidth:1,
    borderBottomColor:colors.borderDark,

  },
  textItem:{
    lineHeight:50,
    color:colors.textMain
  }
});
