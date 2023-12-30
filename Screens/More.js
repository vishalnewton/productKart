import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import SvgIcon from '../Utils/SvgIcon';

const More = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgIcon icon="backButton" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>More</Text>
        </View>
      </View>
      <View style={styles.svgContainer}>
        <SvgIcon icon="noCategories" />
        <Text style={styles.info}>Coming Soon !</Text>
      </View>
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    marginHorizontal: 20,
  },
  svgContainer: {
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.75,
  },
  info: {
    fontSize: 16,
    fontWeight: '500',
    color: '#153075',
    marginTop: 20,
  },
  headerText: {
    fontWeight: '400',
    fontSize: 16,
    marginLeft: 20,
  },
});
