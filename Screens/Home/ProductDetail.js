import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import SvgIcon from '../../Utils/SvgIcon';
import StarRating from 'react-native-star-rating';
import {useDispatch, useSelector} from 'react-redux';
import {toggleFavorites} from '../../Utils/redux/favouritesActions';
import {increaseQuantity} from '../../Utils/redux/cartActions';

const ProductDetail = ({navigation, route}) => {
  const {item} = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.list);
  const cart = useSelector(state => state.cart.items);
  const isIdInFavorites = () => {
    return favorites.some(fav => fav.id === item.id);
  };

  const handleToggleFavorites = () => {
    dispatch(toggleFavorites(item));
  };

  const totalCount = Object.values(cart).reduce(
    (total, item) => total + item.count,
    0,
  );

  const handleCartPressed = item => {
    navigation.navigate('Cart');
  };

  const handleIncrease = () => {
    dispatch(increaseQuantity(item));
  };

  const handleBuyNow = () => {
    dispatch(increaseQuantity(item));
    navigation.navigate('Cart');
  };

  const roundToNearest = () => {
    const rating = item.rating;

    if (rating < 0 || rating > 5) {
      return 0;
    }

    const floor = Math.floor(rating);
    const decimalPart = rating - floor;

    if (decimalPart <= 0.14) {
      return floor;
    } else if (decimalPart <= 0.39) {
      return floor + 0.5;
    } else if (decimalPart <= 0.64) {
      return floor + 0.5;
    } else if (decimalPart <= 0.89) {
      return floor + 1;
    } else {
      return floor + 1;
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.imagesCarousel}>
      <Image source={{uri: item}} style={styles.thumbnail} />
    </View>
  );
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgIcon icon="backButton" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{position: 'relative'}}
          onPress={handleCartPressed}>
          {totalCount > 0 && (
            <View style={styles.cartValueCircle}>
              <Text style={styles.cartValue}>{totalCount}</Text>
            </View>
          )}
          <SvgIcon icon="darkCart" />
        </TouchableOpacity>
      </View>
      <View style={styles.upperTextContainer}>
        <Text
          style={{
            color: '#1E222B',
            fontWeight: '300',
            fontSize: 50,
          }}>
          {item.title}
        </Text>
        {/* <Text
          style={{
            color: '#1E222B',
            fontWeight: '800',
            fontSize: 50,
          }}>
          gfdgfd
        </Text> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <StarRating
            starSize={15}
            maxStars={5}
            rating={roundToNearest()}
            fullStarColor={'gold'}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              marginLeft: 5,
              color: '#A1A1AB',
            }}>
            110 Reviews
          </Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={styles.favoriteIconContainer}
          onPress={handleToggleFavorites}>
          <SvgIcon
            icon={isIdInFavorites() ? 'redHeartWhiteBg' : 'heartWhiteBg'}
          />
        </TouchableOpacity>
        <FlatList
          data={item.images}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          snapToInterval={Dimensions.get('window').width}
        />
      </View>
      <View style={styles.priceContainer}>
        <Text
          style={{
            fontSize: 16,
            color: '#2A4BA0',
            fontWeight: 600,
          }}>{`$${item.price}`}</Text>
        <View
          style={{
            backgroundColor: '#2A4BA0',
            borderRadius: 70,
            paddingVertical: 4,
            paddingHorizontal: 10,
            marginLeft: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#ffffff',

              fontWeight: 600,
            }}>
            {`${item.discountPercentage} % OFF`}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleIncrease}>
          <Text style={styles.buttonText}>Add To Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleBuyNow}
          style={{...styles.button, backgroundColor: '#2A4BA0'}}>
          <Text style={{...styles.buttonText, color: '#ffffff'}}>Buy Now</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailHeading}>Detail</Text>
        <Text style={styles.detailText}>{item.description}</Text>
      </View>
    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 30,
    marginHorizontal: 20,
  },
  upperTextContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  priceContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A4BA0', // Border color set to #2A4BA0
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2A4BA0',
  },
  detailContainer: {
    marginHorizontal: 20,
    marginTop: 25,
  },
  detailHeading: {
    fontWeight: '400',
    fontSize: 16,
    color: '#1E222B',
  },
  detailText: {
    fontWeight: '400',
    fontSize: 16,
    color: '#8891A5',
    marginTop: 7,
  },
  imagesCarousel: {
    width: Dimensions.get('window').width,
    height: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  favoriteIconContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  cartValueCircle: {
    backgroundColor: '#F9B023',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    position: 'absolute',
    top: -8,
    right: -8,
    width: 20,
    height: 20,
    zIndex: 1,
  },

  cartValue: {
    fontWeight: '600',
    fontSize: 14,
    color: '#ffffff',
  },
});
