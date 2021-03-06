import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Provider } from 'react-redux'

import store from 'masmovil-app/app/redux/createStore'
import PhoneList from 'masmovil-app/app/screens/PhoneList'


export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <PhoneList />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
