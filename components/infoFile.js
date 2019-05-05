import React from 'react'
import { View,StyleSheet,Text} from 'react-native'
import colors from '../theme'

export default class InfoFile extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){

    return(
      <View>
        <View style={styles.detailsBlock}>
          <Text style={styles.detailsText}>
            Nom : {this.props.file.name}
          </Text>
        </View>
        <View style={styles.detailsBlock}>
          <Text style={styles.detailsText}>
             Date de modification : {this.props.file.date}
          </Text>
        </View>
        <View style={styles.detailsBlock}>
          <Text style={styles.detailsText}>
            Poid : {this.props.file.size}
          </Text>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  detailsBlock:{
    width:'100%',
    borderBottomWidth:0.5,
    borderColor:colors.borderDark,
  },
  detailsText:{
    lineHeight:40,
    color:colors.textMain,
  },
});
