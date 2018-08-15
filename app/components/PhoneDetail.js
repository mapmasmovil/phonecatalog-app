import React, { Component } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Image,
  View,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
} from 'react-native'

import Touchable from 'react-native-platform-touchable'


export default class PhoneDetail extends Component {

  render() {
    const { phone } = this.props

    return (
      <View style={styles.card}>
        <Touchable
          onPress={this.props.onGoBack}
          style={styles.backButtonWrapper}
        >
          <Image
            source={require('masmovil-app/app/resources/img/back_arrow.png')}
          />
        </Touchable>
        <View style={styles.header}>
          <Image
            source={{ uri: phone.image }}
            style={styles.itemImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>{phone.title} ({phone.released})</Text>
          <Text style={styles.description}>{phone.description}</Text>
        </View>

        <View style={styles.propertiesBody}>
          <Text style={styles.properties}>
            <Text style={styles.bold}>CPU:</Text> {phone.cpu}
          </Text>
          <Text style={styles.properties}>
            <Text style={styles.bold}>Storage options:</Text> {phone.storage.join(', ')}
          </Text>
          <Text style={styles.properties}>
            <Text style={styles.bold}>Colors:</Text> {phone.colors.join(', ')}
          </Text>
          <Text style={styles.properties}>
            <Text style={styles.bold}>Battery:</Text> {phone.battery}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backButtonWrapper: {
    position: 'absolute',
    left: 16,
    top: 16,
  },
  backButton: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  card: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'white',
    width: 250,
    height: 250,
    marginTop: 16,
    margin: 16,
  },
  itemImage: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    top: 16,
  },
  body: {
    padding: 16,
    backgroundColor: '#41A3D1',
  },
  title: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    color: 'white',
  },
  propertiesBody: {
    flex: 1,
    width: Dimensions.get('window').width - 32,
    margin: 16,
  },
  properties: {
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  }
})