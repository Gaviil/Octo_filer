import React from 'react';
import { View,StyleSheet,TouchableHighlight,AsyncStorage,StatusBar} from 'react-native'
import { Button,Text } from 'native-base';
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import Toast from './toast'

import colors from '../theme'


export default class Login extends React.Component {
static navigationOptions = { title: 'Welcome', header: null };
  constructor(props){
    super(props);
    this.state = {
      code:[],
      id:0
    }
    this.keys = [1,2,3,4,5,6,7,8,9,0];
    this.codeSize = 4;
  }

  keyboardPress(key){
    const newPin = this.state.code.slice()
    newPin[this.state.id] = key

    this.setState({
      code: newPin,
      id:this.state.id +1
    },() =>{
      if(this.state.id == 4){
        this.checkCode()
      }

    })
  }

  checkCode = () =>{
    let codeUser = '';
    const newPin = this.state.code.slice()
    for(let k = 0; k < this.state.id; k++){
      codeUser = codeUser + this.state.code.slice()[k];
    }

    AsyncStorage.getItem('loginCode')
    .then((value) => {
      if(value == null){
        AsyncStorage.setItem('loginCode', codeUser);
      }
      else{
        if(codeUser == value){
          this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Filer' })
            ],
          }))
        }
        else{
          this.setToastVisible('Mauvais code')
        }
      }
    });


    this.setState({
      code:[],
      id:0
    })
  }

  setToastVisible = (message) => {
    this.setState({
      toastMessage:message,
      toastVisible:true
    },() =>{
      this.timerId = setTimeout(() => {
        this.setState({
          toastMessage:'',
          toastVisible:false
        })
      }, 3000);
    })
  }


  render(){
    let bubbles = [];
    const renderBubble = () =>{
      for(let i=0; i<this.codeSize;i++){
        bubbles.push(<View style={this.state.id >= i+1? styles.bubbleSelected:styles.bubble}></View>);
      }
      return bubbles;

    }
    return(
      <View style={styles.pageLogin}>
        <StatusBar
          barStyle="dark-content"
        />
        <Toast
          visible={this.state.toastVisible}
          message={this.state.toastMessage}
        />
        <View style={styles.code}>
          {renderBubble()}
        </View>
        <View style={styles.keyboard}>
          {
            this.keys.map((key, i) => {
              return (
                <TouchableHighlight
                  style={styles.keys}
                  key={i}
                  underlayColor="rgba(236, 120, 43, 0.1)"
                  onPress={() => this.keyboardPress(key)}>
                  <Text style={styles.textKey}>{key}</Text>
                </TouchableHighlight>
              );
            })
          }
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  pageLogin:{
    flex:1,
    backgroundColor:colors.view
  },
  code:{
    flex:1,
    width:"100%",
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  keyboard:{
    flex:1,
    width:"100%",
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center',
    marginBottom:10
  },
  keys:{
    width:'30%',
    justifyContent:'center',
    alignItems:'center',
    height:'23%',
    borderWidth:1,
    borderColor:colors.borderDark,
    margin:5
  },
  textKey:{
    fontSize:25,
    color:colors.textMain
  },
  bubble:{
    width:20,
    height:20,
    borderWidth:2,
    borderColor:colors.textMain,
    borderRadius:50,
    margin:10
  },
  bubbleSelected:{
    width:20,
    height:20,
    borderWidth:2,
    borderColor:colors.main,
    borderRadius:50,
    margin:10,
    backgroundColor:colors.main
  }
});
