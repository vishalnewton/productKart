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
import {
  decreaseQuantity,
  increaseQuantity,
} from '../../Utils/redux/cartActions';
import SvgIcon from '../../Utils/SvgIcon';

const Cart = ({navigation}) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);
  const totalCount = Object.values(cart).reduce(
    (total, item) => total + item.count,
    0,
  );
  let total = 0;

  const cartArray = Object.entries(cart).map(([key, value]) => ({
    id: value.product.id,
    title: value.product.title,
    description: value.product.description,
    price: value.product.price,
    discountPercentage: value.product.discountPercentage,
    rating: value.product.rating,
    stock: value.product.stock,
    brand: value.product.brand,
    category: value.product.category,
    thumbnail: value.product.thumbnail,
    images: value.product.images,
    count: value.count,
  }));

  for (const key in cart) {
    if (cart.hasOwnProperty(key)) {
      const product = cart[key].product;
      total += cart[key].count * product.price;
    }
  }

  const handleIncrease = product => {
    dispatch(increaseQuantity(product));
  };

  const handleDecrease = product => {
    dispatch(decreaseQuantity(product));
  };

  const EmptyCart = () => {
    return (
      <View style={styles.svgContainer}>
        <SvgIcon icon="emptyCart" />
        <Text style={styles.info}>Cart Empty !</Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.productContainer}>
        <View
          style={{
            flexDirection: 'row',
            width: '68%',
          }}>
          <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
          <View style={styles.productContentContainer}>
            <Text style={styles.productName}>{item.title}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
          </View>
        </View>
        <View style={{...styles.quantityContainer}}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleDecrease(item)}>
            <SvgIcon icon="minusButton" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.count}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleIncrease(item)}>
            <SvgIcon icon="plusButton" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
      }}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SvgIcon icon="backButton" />
          </TouchableOpacity>
          <View>
            <Text
              style={styles.headerText}>{`Shopping Cart (${totalCount})`}</Text>
          </View>
        </View>

        {cartArray?.length > 0 ? (
          <View>
            <View style={styles.productOuterContainer}>
              <FlatList
                data={cartArray}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
              />
            </View>
            <View style={styles.editContainer}>
              <Text style={styles.editText}>Edit</Text>
            </View>
          </View>
        ) : (
          <EmptyCart />
        )}
      </View>
      {cartArray.length > 0 && (
        <View style={styles.totalContainer}>
          <View style={styles.allTextContainer}>
            <View style={styles.totalTextContainer}>
              <Text style={styles.totalLeft}>Subtotal</Text>
              <Text style={styles.totalRight}>${total.toFixed(2)}</Text>
            </View>
            <View style={styles.totalTextContainer}>
              <Text style={styles.totalLeft}>Delivery</Text>
              <Text style={styles.totalRight}>$2.00</Text>
            </View>
            <View style={styles.totalTextContainer}>
              <Text style={styles.totalLeft}>Total</Text>
              <Text style={styles.totalRight}>${(total + 2).toFixed(2)}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Proceed To Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    marginHorizontal: 20,
  },
  headerText: {
    fontWeight: '400',
    fontSize: 16,
    marginLeft: 20,
    color: '#1E222B',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBFB',
    justifyContent: 'space-between',
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  productContentContainer: {
    maxWidth: '71%',
    width: '100%',
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    color: '#1E222B',
    flexWrap: 'wrap',
  },
  productPrice: {
    fontSize: 14,
    color: '#1E222B',
    fontWeight: '400',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    flex: 1,
  },
  quantityButton: {
    padding: 5,
    borderRadius: 3,
  },
  quantityText: {
    fontSize: 14,
    color: '#1E222B',
    fontWeight: '500',
  },
  productOuterContainer: {
    marginTop: 30,
    maxHeight: Dimensions.get('window').height * 0.52,
    marginHorizontal: 20,
  },
  editContainer: {
    flexDirection: 'row-reverse',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  editText: {
    color: '#2A4BA0',
    fontSize: 12,
    fontWeight: '500',
  },
  totalContainer: {
    backgroundColor: '#F8F9FB',
    borderRadius: 30,
    padding: 10,
    marginHorizontal: 20,
  },
  totalTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  button: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A4BA0',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // width: '45%',
    backgroundColor: '#2A4BA0',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  totalLeft: {
    color: '#616A7D',
    fontWeight: '400',
    fontSize: 14,
  },
  totalRight: {
    color: '#1E222B',
    fontWeight: '500',
    fontSize: 14,
  },
  allTextContainer: {
    padding: 10,
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
});
