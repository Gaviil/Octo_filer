import React from 'react';
import { StyleSheet, Text, View,FlatList,ScrollView,ActivityIndicator,RefreshControl,StatusBar } from 'react-native';
import { FilesGet,FilesRemove,FilesAdd,FilesCutPaste,FolderAdd } from '../services/files'
import colors from '../theme'
import Header from './header'
import List from './list'
import FabOption from './fab'
import ModalUpload from './modalUpload'
import ModalInfo from './modalInfo'
import Toast from './toast'
import ModalOptions from './modalOptions'

export default class Filer extends React.Component {
static navigationOptions = { title: '', header: null };

  constructor(props){
    super(props);
    this.state = {
      currentPlace:'',
      files:[],
      loading:false,
      modalUploadVisible:false,
      modalInfoVisible:false,
      modalOptionsVisible:false,
      detailsItem:{},
      refreshing:false,
      fileToCut:'',
      toastVisible:false,
      toastMessage:'',
      fabOpen:false,
    }

    this.emptyValue = {
      name:'',
      size:'',
      date:'',
    }
  }

  componentDidMount(){
    this.getFiles();
  }


  getFiles = (directory) => {
    let urlBack = ''
    if(directory != undefined && directory != '..'){
      this.setState({
        currentPlace:this.state.currentPlace+'/'+directory
      }, () =>{
        this.CallApiGet()
      });
    }
    else if(directory != undefined && directory == '..'){
      let urlBack = this.state.currentPlace.replace('/'+this.state.currentPlace.split('/')[this.state.currentPlace.split('/').length-1],"");

      this.setState({
        currentPlace:urlBack
      }, () =>{
        this.CallApiGet()
      });

    }
    else if(directory == undefined){
      this.CallApiGet()
    }

    this.setState({
      loading:false
    })
  }

  CallApiGet(){
    FilesGet(this.state.currentPlace)
    .then((res) => {
      if(res.error){
        console.log(res.error)
      }
      else{
        this.setState({files: res.files,refreshing:false});
      }
    });
  }

  deleteItem(item){
    FilesRemove(this.state.currentPlace+'/'+item.name)
    .then((res) => {
      if(res.error){
        console.log(res.error)
        this.setToastVisible("Erreur dans la suppersion")
      }
      else{
        this.setToastVisible('Fichier surprimmé')
        this.setState({
          loading:true,
          fabOpen:false
        },() =>{
          this.getFiles();
          this.setModalInfoVisible(false)
        })
      }
    });
  }

  uploadModal(visible){
    this.setState({
      modalInfoVisible:false,
      modalOptionsVisible:false,
    },(visible) =>{
      setTimeout(function(){
        this.setState({
          modalUploadVisible:true,
        })
      }.bind(this), 500);


    })
  }
  setModalInfoVisible(visible,item){
    this.setState({
      modalInfoVisible: visible,
      detailsItem:item != undefined?item:this.emptyValue,
    });
  }

  optionsModal(visible){
    this.setState({
      modalOptionsVisible:visible,
    })
  }

  uploadFile(file){
    this.setState({
      modalUploadVisible:false
    },() =>{
      FilesAdd(this.state.currentPlace,file)
      .then((res) => {
        if(res.error){
          console.log(res.error)
          this.setToastVisible("Erreur dans l'upload")
        }
        else{
          this.getFiles()
        }
      });
    })
  }

  onRefresh = () => {
    this.setState({refreshing: true},() => {
      this.getFiles();
    });
  }

  cutFile = (file) => {
    this.setState({
      fileToCut:this.state.currentPlace+'/'+file
    },() => {
      this.setToastVisible('Fichier copié')
    })

  }
  pastFile = () => {
    FilesCutPaste(this.state.currentPlace+'/'+this.state.fileToCut.split('/')[this.state.fileToCut.split('/').length-1],this.state.fileToCut)
    .then((res) => {
      if(res.error){
        console.log(res.error)
      }
      else{
        this.setState({
          fileToCut:'',
          modalOptionsVisible:false,
        },() => {
          this.getFiles()
        })
      }
    });
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
      }, 2000);
    })
  }

  addFolder = (folderName) =>{
    this.setState({
      modalOptionsVisible:false
    },() =>{
      FolderAdd(this.state.currentPlace,folderName)
      .then((res) => {
        if(res.error){
          console.log(res.error)
          this.setToastVisible("Erreur dans l'ajout d'un dossier")
        }
        else{
          this.getFiles()
        }
      });
    })
  }
  copyUrl = () => {
    this.setState({
      modalInfoVisible:false
    },() =>{
      this.setToastVisible('Url copié')
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
        />
        <Toast
          visible={this.state.toastVisible}
          message={this.state.toastMessage}
          toastClick={() => {this.setState({toastVisible:false})}}/>
        <Header
          title={this.state.currentPlace.split('/')[this.state.currentPlace.split('/').length-1]}
          goback={() => this.getFiles('..')}/>

        <ScrollView
          refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
          }>
          <List
            data={this.state.files}
            redirectTo={(directory) => this.getFiles(directory)}
            setModalVisible={(visible,item) => this.setModalInfoVisible(visible,item)}
            deleteItem={(item) => this.delete(item)}
            cutFile={(file) => this.cutFile(file)}/>
        </ScrollView>

        <FabOption
          setOptionsModalVisible={(visible) => this.optionsModal(visible)}
        />

        <ModalOptions
          visible={this.state.modalOptionsVisible}
          fileToPaste={this.state.fileToCut}
          paste={() => this.pastFile()}
          download={() => this.uploadModal(true)}
          addFolder={(folderName) => this.addFolder(folderName)}
          setModalVisible={(visible) => this.setState({modalOptionsVisible:false})}
        />
        <ModalUpload
          visible={this.state.modalUploadVisible}
          setModalVisible={(visible)  => this.setState({modalUploadVisible:false})}
          upload={(file)  => this.uploadFile(file)}
        />
        <ModalInfo
          visible={this.state.modalInfoVisible}
          item={this.state.detailsItem}
          setModalVisible={(visible)  => this.setState({modalInfoVisible:false})}
          deleteItem={(item) => this.deleteItem(item)}
          copyLink={() => this.copyUrl()}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    backgroundColor:colors.viewDark
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});
