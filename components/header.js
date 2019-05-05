import React from 'react'
import { View,StyleSheet,Text } from 'react-native'
import {  Left, Body, Right, Button, Icon, Title } from 'native-base';

import colors from '../theme'


export default class Header extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      title:'Mon Drive',
    }


  }
  componentWillReceiveProps(){

    if(this.props.title){
      this.setState({
        title:this.props.title
      })
    }
    else{
      this.setState({
        title:'Mon Drive'
      })
    }
  }

  render(){

    const renderBackButton = () =>{
      if(this.props.title){
        return(
          <Button
            transparent
            onPress={() => this.props.goback()}
          >
            <Icon style={{color:colors.main}} name='arrow-back'/>
          </Button>
        )
      }
    }
    return(
      <View style={styles.contentHeader}>
        <View style={styles.headStatusBar}></View>
        <View style={styles.header}>
          <Left>
            {renderBackButton()}
          </Left>
          <Body style={styles.bodyTitle}>
            <Title style={styles.title}>{this.state.title}</Title>
          </Body>
          <Right>
          </Right>
        </View>
      </View>

    )
  }
}


const styles = StyleSheet.create({
  contentHeader:{
    height:75,
    top: 0,
    left: 0,
  },
  headStatusBar:{
    height:25,
    backgroundColor:colors.viewDark
  },
  header:{
    height:50,
    backgroundColor:colors.viewDark,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  bodyTitle:{
    flex:4
  },
  title:{
    color:colors.textMain,
    fontSize:20
  }
});
