import React from 'react'
import { View,StyleSheet,ScrollView,TouchableHighlight,TouchableOpacity,TouchableWithoutFeedback, TextInput,KeyboardAvoidingView,Clipboard} from 'react-native'
import { Button,Text } from 'native-base';
import colors from '../theme'
import Modal from "react-native-modal";


export default class ModalUpload extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      urlFile:''
    }
  }

  render(){
    return(
      <Modal
        isVisible={this.props.visible}
        style={{padding:0,margin:0}}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalOutside}
          onPressOut={() => {this.props.setModalVisible(false)}}>

          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <TextInput
                autoCorrect={false}
                style={styles.input}
                onChangeText={(urlFile) => this.setState({urlFile})}
              />
              <Button
                style={styles.upload}
                block
                onPress={() => {this.props.upload(this.state.urlFile)}}>
                <Text>Upload</Text>
              </Button>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  modalContainer:{
    width:'100%',
    backgroundColor:colors.view,
    shadowColor:'#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: -1, height: -1 },
    padding:10
  },
  modalOutside:{
    flex: 1,
    backgroundColor:'rgba(0,0,0,0.2)',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // marginBottom:20,
  },
  input:{
    height: 40,
    borderRadius:10,
    backgroundColor:colors.viewDark,
    padding:10,
    marginBottom:15,
    backgroundColor:colors.viewDark,
    color:colors.textMain,
  },
  upload:{
    backgroundColor:colors.main
  }
});
