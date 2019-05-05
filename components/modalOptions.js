import React from 'react'
import { View,StyleSheet,FlatList,ScrollView,TouchableHighlight,TouchableOpacity,TouchableWithoutFeedback,TextInput} from 'react-native'
import { Button,Text,Icon } from 'native-base';
import colors from '../theme'
import Modal from "react-native-modal";


export default class ModalOptions extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      modalVisible:false,
      folderName:'',
      addFolder:false,
    }
  }

  setModalVisible(visible,item) {
    this.setState({
      modalVisible: visible,
      detailsItem:item,
      addFolder:false
    });
  }

  addFolder = () =>{
    this.setState({
      modalVisible:false,
      addFolder:false
    },() =>{
      this.props.addFolder(this.state.folderName)
    })
  }

  render(){
    const renderPast = () =>{
      if(this.props.fileToPaste != ''){
        return(
          <View style={styles.blockOptions}>
            <TouchableHighlight
              onPress={() => this.props.paste()}
              underlayColor="rgba(0,0,0,0.1)">
              <View style={styles.contentOptions}>
                <Icon
                  style={styles.icon}
                  name="copy" />
                <Text style={styles.textIcon}>
                  Coller
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        );
      }
    }
    const renderInputFolderName = () =>{
      if(this.state.addFolder){
        return(
          <View style={styles.detailsBlock}>
            <View style={{flex:2,width:'100%',height:40}}>
              <TextInput
                style={styles.inputNameFolder}
                onChangeText={(folderName) => this.setState({folderName})}
                autoCorrect={false}
              />
            </View>
            <View style={{flex:1,width:'100%',height:40}}>
              <Button
                style={{width:'100%',height:40,backgroundColor:colors.main,borderRadius:0,elevation: 0}}
                onPress={this.addFolder}>
                <Text>Envoyer</Text>
              </Button>
            </View>
          </View>
        );
      }
    }

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
               {renderInputFolderName()}
               <View style={styles.detailsBlockIcon}>
                 <View style={styles.blockOptions}>
                   <TouchableHighlight
                     onPress={() => {this.setState({addFolder:true})}}
                     underlayColor="rgba(0,0,0,0.1)">
                     <View style={styles.contentOptions}>
                       <Icon
                         style={styles.icon}
                         name="folder" />
                       <Text style={styles.textIcon}>
                         Dossier
                       </Text>
                     </View>
                   </TouchableHighlight>
                 </View>
                 <View style={styles.blockOptions}>
                   <TouchableHighlight
                     onPress={() => this.props.download()}
                     underlayColor="rgba(0,0,0,0.1)">
                     <View style={styles.contentOptions}>
                       <Icon
                         style={styles.icon}
                         name="cloud-download" />
                       <Text style={styles.textIcon}>
                         Importer
                       </Text>
                     </View>
                   </TouchableHighlight>
                 </View>
                 {renderPast()}
               </View>
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
    elevation: -4,
    backgroundColor:colors.view,
    padding:10,
    color:colors.textMain,
  },
  modalOutside:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  blockbtn:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  detailsBlock:{
    minHeight:50,
    width:'100%',
    flexDirection:'row',
  },
  detailsBlockIcon:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around'
  },
  contentOptions:{
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:30,
    paddingVertical:15,
  },
  textIcon:{
    color:colors.main
  },
  icon:{
    fontSize: 50,
    color:colors.main
  },
  blockOptions:{
    flex:1,
    marginVertical:10,
    justifyContent:'center',
    alignItems:'center',
  },
  inputNameFolder:{
    elevation: 0,
    height: 40,
    padding:10,
    backgroundColor:colors.inputBackground,
    color:colors.textMain,
  }

});
