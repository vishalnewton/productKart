import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SvgIcon from '../../Utils/SvgIcon';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {increaseQuantity} from '../../Utils/redux/cartActions';
import {toggleFavorites} from '../../Utils/redux/favouritesActions';

const dummyOffers = [
  {id: '1', content: 'Item 1'},
  {id: '2', content: 'Item 2'},
];

const HomeScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);
  const favorites = useSelector(state => state.favorites.list);
  const [isRefreshing, setIsRefreshing] = useState(false);

  console.log('Cart Items -->', cart);
  console.log('Favorites Items -->', favorites);

  const totalCount = Object.values(cart).reduce(
    (total, item) => total + item.count,
    0,
  );

  const isIdInFavorites = productId => {
    return favorites.some(item => item.id === productId);
  };

  console.log('Total Count:', totalCount);

  const handleIncrease = product => {
    dispatch(increaseQuantity(product));
  };

  const handleToggleFavorites = product => {
    dispatch(toggleFavorites(product));
  };

  const handleSearchInputChange = text => {
    setSearchInput(text);
    const filteredData = allProducts.filter(item => {
      console.log(item.title.toLocaleLowerCase(), text.toLocaleLowerCase());
      return item.title.toLocaleLowerCase().includes(text.toLocaleLowerCase());
    });
    console.log('list', filteredData);
    setProducts(filteredData);
  };

  const fetchProducts = async () => {
    setIsRefreshing(true);
    try {
      const response = await axios.get('https://dummyjson.com/products');
      setAllProducts(response.data.products);
      setProducts(response.data.products);
    } catch (error) {
      Alert.alert('Info', 'Something Went Wrong!');
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const renderDummyOffers = ({item}) => (
    <View style={styles.dummyItem}>
      <View>
        <SvgIcon icon="dummyImage" />
      </View>
      <View>
        <Text style={{fontWeight: '300', fontSize: 20, color: '#ffffff'}}>
          Get
        </Text>
        <Text style={{fontWeight: '300', fontSize: 20, color: '#ffffff'}}>
          50% OFF
        </Text>
        <Text style={{fontWeight: '300', fontSize: 20, color: '#ffffff'}}>
          On first 03 order
        </Text>
      </View>
    </View>
  );

  const handleCardPressed = item => {
    navigation.navigate('ProductDetail', {item});
  };
  const handleCartPressed = item => {
    navigation.navigate('Cart');
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => handleCardPressed(item)}
      style={styles.itemContainer}>
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
    <View style={{flex: 1}}>
      <View style={styles.upperContainer}>
        <View style={styles.heyContainer}>
          <Text style={styles.heyText}>Hey, Rahul</Text>
          <TouchableOpacity
            style={{position: 'relative'}}
            onPress={handleCartPressed}>
            {totalCount > 0 && (
              <View style={styles.cartValueCircle}>
                <Text style={styles.cartValue}>{totalCount}</Text>
              </View>
            )}
            <SvgIcon icon="cartIcon" />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchIcon}>
            <SvgIcon icon="searchIcon" />
          </View>
          <TextInput
            value={searchInput}
            onChangeText={handleSearchInputChange}
            style={styles.input}
            placeholder="Search Products or store"
            placeholderTextColor="#8891A5"
          />
        </View>
        <View style={styles.deliveryContainer}>
          <View>
            <Text style={styles.deliveryHeading}>DELIVERY TO</Text>
            <View style={styles.deliveryTextContainer}>
              <Text style={styles.deliveryText}>Green Way 3000, Sylhet</Text>
              <View style={styles.downArrowContainer}>
                <SvgIcon icon="downArrow" />
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.deliveryHeading}>WITHIN</Text>
            <View style={styles.deliveryTextContainer}>
              <Text style={styles.deliveryText}>1 Hour</Text>
              <View style={styles.downArrowContainer}>
                <SvgIcon icon="downArrow" />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.lowerContainer}>
        <View style={{margin: 20}}>
          <FlatList
            data={dummyOffers}
            renderItem={renderDummyOffers}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            snapToInterval={Dimensions.get('window').width * 0.8}
          />
        </View>
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.recommended}>Recommended</Text>
        </View>
        <View style={{marginHorizontal: 20, flex: 1}}>
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={fetchProducts}
              />
            }
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  upperContainer: {
    backgroundColor: '#2a4ba0',
    paddingTop: 40,
  },
  heyText: {
    color: '#F8F9FB',
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 30.05,
  },
  heyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  recommended: {
    fontSize: 30,
    fontWeight: '400',
    color: '#1E222B',
  },
  lowerContainer: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  deliveryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingBottom: 10,
  },
  deliveryHeading: {
    fontSize: 11,
    color: 'rgba(248, 249, 251, 0.5)',
    fontWeight: '800',
  },
  deliveryText: {
    fontSize: 14,

    color: '#F8F9FB',
    fontWeight: '500',
  },

  downArrowContainer: {
    padding: 7,
  },

  deliveryTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 28,
    paddingHorizontal: 16,
    backgroundColor: '#153075',
    marginHorizontal: 16,
    height: 56,
    marginVertical: 30,
  },
  searchIcon: {
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
  },
  dummyItem: {
    width: Dimensions.get('window').width * 0.8,
    borderRadius: 16,
    backgroundColor: '#F9B023',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 40,
    marginRight: 20,
  },
  dummyText: {
    color: '#fff',
    fontSize: 20,
  },

  listContainer: {
    paddingTop: 16,
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#888',
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
