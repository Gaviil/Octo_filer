import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import ListFile from './components/listFile';
import colors from './theme'
import MyHeader from './components/header';

export default function App() {
  const [currentPlace, setCurrentPlace] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [urlBack, setUrlBack] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor='#ff8d3a'
        barStyle="dark-content"
      />
      <MyHeader
        currentPlace={currentPlace}
        setCurrentPlace={setCurrentPlace}
      />
      <ListFile
        isLoading={isLoading}
        setLoading={setLoading}
        currentPlace={currentPlace}
        setCurrentPlace={setCurrentPlace}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.viewDark
  },
});
