import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toggleFavorites} from '../Utils/redux/favouritesActions';
import SvgIcon from '../Utils/SvgIcon';
import {increaseQuantity} from '../Utils/redux/cartActions';

const Favourites = ({navigation}) => {
  const favorites = useSelector(state => state.favorites.list);
  const dispatch = useDispatch();

  const handleToggleFavorites = product => {
    dispatch(toggleFavorites(product));
  };

  const isIdInFavorites = productId => {
    return favorites.some(item => item.id === productId);
  };

  const handleIncrease = product => {
    dispatch(increaseQuantity(product));
  };

  const NoFavorites = () => {
    return (
      <View style={styles.svgContainer}>
        <SvgIcon icon="noFavorites" />
        <Text style={styles.info}>No Favorites !</Text>
      </View>
    );
  };
  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.favoriteIconContainer}
        onPress={() => handleToggleFavorites(item)}>
        <SvgIcon icon={isIdInFavorites(item.id) ? 'redHeart' : 'heart'} />
      </TouchableOpacity>
      <View style={styles.productInfoContainer}>
        <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <View style={{width: '80%'}}>
            <Text
              style={{
                color: '#1E222B',
                fontWeight: '600',
                fontSize: 14,
              }}>{`Rs ${item.price}`}</Text>
            <Text
              style={{
                color: '#616A7D',
                fontWeight: '400',
                fontSize: 12,
              }}>
              {item.title}
            </Text>
          </View>
          <TouchableOpacity onPress={() => handleIncrease(item)}>
            <SvgIcon icon="plusIcon" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgIcon icon="backButton" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>Favourites</Text>
        </View>
      </View>
      {favorites?.length > 0 ? (
        <View style={{marginHorizontal: 20, flex: 1, marginTop: 20}}>
          <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      ) : (
        <NoFavorites />
      )}
    </View>
  );
};

export default Favourites;

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
  itemContainer: {
    flex: 1,
    margin: 8,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#F8F9FB',
  },
  favoriteIconContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 1,
  },
  productInfoContainer: {
    padding: 16,
    alignItems: 'center',
  },
  thumbnail: {
    width: 80,
    height: 80,
    marginBottom: 8,
    borderRadius: 10,
  },
});
