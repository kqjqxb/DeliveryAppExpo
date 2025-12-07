import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, Alert, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { addToBasket, removeFromBasket, selectBasketItemsWithId, selectBasketTotal, clearBasket } from '../features/basketSlice';
import { ArrowLeftIcon, MinusCircleIcon, PlusCircleIcon, XMarkIcon } from 'react-native-heroicons/outline';
// import Currency from 'react-currency-formatter';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase'; // Ensure Firebase is correctly configured
import { urlFor } from '../sanity';
import { useTranslation } from 'react-i18next';

const DishDetailScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const { params: { id, imgUrl, title, price, description } } = route;

  const [quantity, setQuantity] = useState(1); // State to manage dish quantity


  const basketTotal = useSelector(selectBasketTotal);

  const { t } = useTranslation();

  useEffect(() => {
    // If you need to set the restaurant or perform other side effects, do it here
  }, [dispatch]);

  // Create a memoized selector instance for this dish id
  const selectItemsForId = useMemo(() => selectBasketItemsWithId(id), [id]);
  const items = useSelector(selectItemsForId);

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, title, description, price, imgUrl }));
  };

  const removeItemFromBasket = () => {
    if (items.length === 0) return;
    dispatch(removeFromBasket({ id }));
  };

  const handleAddToBasket = () => {
    dispatch(addToBasket({ id, title, price, description, imgUrl, quantity })); // Передай кількість
  };

  const handleRemoveFromBasket = () => {
    if (quantity > 0) {
      dispatch(removeFromBasket({ id }));
      setQuantity(prev => (prev > 0 ? prev - 1 : 0));
    }
  };

  const handlePlaceOrder = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Error', 'Please log in to place an order');
      return;
    }

    const orderData = {
      userId: user.uid,
      dish: title,
      dishImage: urlFor(imgUrl).url(),
      quantity,
      totalAmount: price * quantity,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'Orders'), orderData);
      dispatch(clearBasket());
      navigation.navigate("PreparingOrderScreen");
    } catch (error) {
      console.error('Error adding order: ', error);
      Alert.alert('Error', 'Failed to place order');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <TouchableOpacity
        onPress={navigation.goBack}
        className="absolute top-7 right-5 p-2 bg-gray-100 rounded-full z-50"
      >
        <XMarkIcon color="#0C4F39" size={20} />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Dish Image */}
        <View className="relative">
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className="w-full h-56 bg-gray-300"
          />
        </View>

        {/* Dish Details */}
        <View className="bg-white -mt-5 p-5 rounded-t-3xl shadow-lg">
          <View className="flex-1 flex-row justify-between">
            {/* Quantity Selector */}
            <Text className="text-3xl font-bold" style={{
              maxWidth: Dimensions.get('window').width * 0.6,
              fontSize: Dimensions.get('window').width * 0.064,
            }}>{title}</Text>
            <View className="bg-white px-4">
              <View className="flex-row items-center space-x-2 pb-3">
                <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
                  <MinusCircleIcon
                    color={items.length > 0 ? "#0C4F39" : "gray"}
                    size={Dimensions.get('window').width * 0.1}
                  />
                </TouchableOpacity>

                <Text style={{
                  fontWeight: '600',
                  fontSize: Dimensions.get('window').width * 0.04,
                }}>{items.length}</Text>

                <TouchableOpacity onPress={addItemToBasket}>
                  <PlusCircleIcon size={Dimensions.get('window').width * 0.1} color="#0C4F39" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Text className="text-xl text-gray-700 mt-2">
            {/* <Currency quantity={price} currency="UAH" /> */}
            {price} UAH
          </Text>
          <Text className="text-gray-600 mt-4">{description}</Text>
        </View>

        {/* Choose Additions Section */}
        <View className="p-5 border-t border-b border-gray-300 bg-white">
          <Text className="text-lg font-semibold">{t("Choose_Additions")}</Text>
          {/* Placeholder for additions (to be implemented) */}
          <Text className="text-gray-500 mt-2">{t("Add_your_favorite_extras_here")}</Text>
        </View>


      </ScrollView>

      {/* Place Order Button */}
      {quantity > 0 && (
        <View className="p-5 bg-white border-t border-gray-300 flex-row justify-between space-x-5">
          <View className="flex bg-[#1b513fdc] rounded-xl p-3" style={{
            height: Dimensions.get('window').height * 0.08,
            maxHeight: Dimensions.get('window').height * 0.08,
          }}>
            <Text className="text-xs text-gray-200 text-center">
              {t("Total_price")}
            </Text>
            <Text className=" text-white font-bold ">
              <Text className="text-xl">
                {basketTotal}
              </Text> UAH
            </Text>
          </View>

          <View className="flex-1">
            {/* Add to Basket Button */}
            <TouchableOpacity
              onPress={handleAddToBasket}
              className="mx-5  rounded-lg bg-[#30343F] p-4 py-4 justify-center"
              style={{
                height: Dimensions.get('window').height * 0.08,
              }}
            >
              <Text className="text-center text-white text-lg" style={{
                fontWeight: '500',
              }}>{t("Add_to_Basket")}</Text>
            </TouchableOpacity>
          </View>

        </View>
      )}
    </SafeAreaView>
  );
};

export default DishDetailScreen;
