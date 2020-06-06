import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from '../theme';

export default function MyHeader({ currentPlace, setCurrentPlace }) {

  const Location = currentPlace.split('/')[currentPlace.split('/').length - 1];
  const newLocation = Location.charAt(0).toUpperCase() + Location.slice(1)
  return (
    <View style={{ height: 50, backgroundColor: colors.main, marginTop: 20 }}>
      <Text style={{ color: colors.white, fontSize: 20 }}>{newLocation}</Text>
      <TouchableOpacity
        onPress={() => {
          setCurrentPlace(`${currentPlace.replace(`/${currentPlace.split('/')[currentPlace.split('/').length - 1]}`, "")}`)
        }
        }>
        <Text> .. / </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});
