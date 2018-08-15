import React, { Component } from 'react'
import {
  ActivityIndicator,
  Image,
  View,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'

import { connect } from 'react-redux'
import Touchable from 'react-native-platform-touchable'

import * as phonesActions from 'masmovil-app/app/redux/phones'
import PhoneDetail from 'masmovil-app/app/components/PhoneDetail'


class PhoneList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showDetails: false,
      phone: null,
    }
  }

  componentWillMount() {
    this.props.fetchPhones()
  }

  onShowDetails(phone) {
    this.setState({
      showDetails: true,
      phone,
    })
  }

  renderItem = ({ item }) => (
    <TouchableHighlight
      onPress={() => this.onShowDetails(item)}
      style={styles.cardWrapper}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <Image
            source={{ uri: item.image }}
            style={styles.itemImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )

  render() {
    if (this.props.loading) {
      return <ActivityIndicator size="large" />
    }
    if (this.state.showDetails) {
      child = (
        <PhoneDetail
          phone={this.state.phone}
          onGoBack={() => this.setState({ showDetails: false })}
        />
      )
    } else {
      child = (
        <FlatList
          style={styles.container}
          data={this.props.phones}
          keyExtractor={(item) => item.id.toString()}
          renderItem={this.renderItem}
        />
      )
    }

    return (
      <View>
        <StatusBar
          backgroundColor="#3C5A96"
          barStyle="light-content"
        />
        {child}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },

  cardWrapper: {
    margin: 16,
  },
  card: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'white',
    width: 150,
    height: 150,
    marginTop: 16,
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
  }
})


export default connect(
  state => ({
    loading: state.loading,
    phones: state.phones,
  }),
  dispatch => ({
    fetchPhones: () => dispatch(phonesActions.fetchPhones()),
  }),
)(PhoneList)
