import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { FilesGet } from '../services/files';

export default function ListFile({ isLoading, setLoading, currentPlace, setCurrentPlace }) {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  // const [currentPlace, setCurrentPlace] = useState('');

  useEffect(() => {
    getFile(currentPlace);
  }, [setFiles, setFolders]);

  const getFile = (currentPlace) => {
    setLoading(true);
    FilesGet(currentPlace).then((res) => {
      if (res.error) {
        console.log(res.error)
      }
      else {
        const folderList = [];
        const fileList = [];
        for (let i = 0; i < res.files.length; i += 1) {
          if (res.files[i].isDirectory) {
            folderList.push(res.files[i]);
          } else if (res.files[i].isFile) {
            fileList.push(res.files[i]);
          }
        }
        setFiles(fileList);
        setFolders(folderList);
      }
    });
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      {files.length > 0 && !isLoading ?
        (
          <ScrollView>
            <TouchableOpacity
              onPress={() => {
                setCurrentPlace(`${currentPlace.replace(`/${currentPlace.split('/')[currentPlace.split('/').length - 1]}`, "")}`)
                getFile(`${currentPlace.replace(`/${currentPlace.split('/')[currentPlace.split('/').length - 1]}`, "")}`);
              }}
            >
              <Text>../</Text>
            </TouchableOpacity>
            {folders.map(folder => (
              <TouchableOpacity
                onPress={() => {
                  console.log(`${currentPlace}`, `${currentPlace}/${folder.name}`);
                  setCurrentPlace(`${currentPlace}/${folder.name}`)
                  getFile(`${currentPlace}/${folder.name}`);
                }}
              >
                <Text>{folder.name}</Text>
              </TouchableOpacity>
            ))}
            {files.map(file => (
              <Text>{file.name}</Text>
            ))}
          </ScrollView>
        ) : <TouchableOpacity
          onPress={() => {
            setCurrentPlace(`${currentPlace.replace(`/${currentPlace.split('/')[currentPlace.split('/').length - 1]}`, "")}`)
            getFile(`${currentPlace.replace(`/${currentPlace.split('/')[currentPlace.split('/').length - 1]}`, "")}`);
          }}
        >
          <Text>../</Text>
        </TouchableOpacity>

      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
