// import React, { useMemo, useState } from 'react';
// import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectRestaurant } from '../features/restaurantSlice';
// import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
// import { XCircleIcon } from 'react-native-heroicons/solid';
// import Currency from 'react-currency-formatter';
// import { doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore'; 
// import { db, auth } from '../firebase'; // Імпортуй конфігурацію Firebase
// import { urlFor } from '../sanity';

// const BasketScreen = () => {
//   const navigation = useNavigation();
//   const restaurant = useSelector(selectRestaurant);
//   const items = useSelector(selectBasketItems);
//   const basketTotal = useSelector(selectBasketTotal);
//   const dispatch = useDispatch();
//   const [groupedItemInBasket, setGroupedItemInBasket] = useState([]);

//   useMemo(() => {
//     const groupedItems = items.reduce((results, item) => {
//       (results[item.id] = results[item.id] || []).push(item);
//       return results;
//     }, {});

//     setGroupedItemInBasket(groupedItems);
//   }, [items]);

//   const handlePlaceOrder = async () => {
//     const user = auth.currentUser;

//     if (!user) {
//       Alert.alert('Error', 'Please log in to place an order');
//       return;
//     }

//     const orderData = {
//       userId: user.uid,
//       restaurant: restaurant.title,
//       restaurantImage: urlFor(restaurant.imgUrl).url(), // Використовуємо URL зображення ресторану
//       items: items.map(item => ({
//         id: item.id,
//         name: item.name,
//         price: item.price,
//         image: urlFor(item.image).url(),
//       })),
//       totalAmount: basketTotal + 35,
//       createdAt: serverTimestamp(),
//     };

//     try {
//       await addDoc(collection(db, 'Orders'), orderData);
//       navigation.navigate("PreparingOrderScreen");
//     } catch (error) {
//       console.error('Error adding order: ', error);
//       Alert.alert('Error', 'Failed to place order');
//     }
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <View className="flex-1 bg-gray-100">
//         <View className="p-5 border-b border-[#0C4F39] bg-white shadow-xs">
//           <View>
//             <Text className="text-lg font-bold text-center">Basket</Text>
//             <Text className="text-center text-gray-400">{restaurant.title}</Text>
//           </View>

//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             className="rounded-full bg-gray-100 absolute top-3 right-5"
//           >
//             <XCircleIcon color="#0C4F39" height={50} width={50} />
//           </TouchableOpacity>
//         </View>

//         <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
//           <Image
//             source={{ uri: urlFor(restaurant.imgUrl).url() }}
//             className="h-7 w-7 bg-gray-300 p-4 rounded-full"
//           />
//           <Text className="flex-1">Deliver in 10-19 min</Text>
//           <TouchableOpacity>
//             <Text className="text-[#0C4F39]">Change</Text>
//           </TouchableOpacity>
//         </View>

//         <ScrollView className="divide-y divide-gray-200">
//           {Object.entries(groupedItemInBasket).map(([key, items]) => (
//             <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
//               <Text className="text-[#0C4F39]">{items.length} x</Text>
//               <Image
//                 source={{ uri: urlFor(items[0]?.image).url() }}
//                 className="h-12 w-12 rounded-full"
//               />
//               <Text className="flex-1">{items[0].name}</Text>
//               <Text className="text-gray-600">
//                 <Currency quantity={items[0]?.price} currency='UAH' />
//               </Text>
//               <TouchableOpacity className="">
//                 <Text className="text-[#0C4F39] text-xs"
//                   onPress={() => dispatch(removeFromBasket({ id: key }))}
//                 >
//                   Remove
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           ))}
//         </ScrollView>

//         <View className="p-5 bg-white mt-5 space-y-4">
//           <View className="flex-row justify-between">
//             <Text className="text-gray-400">Subtotal</Text>
//             <Text className="text-gray-400">
//               <Currency quantity={basketTotal} currency='UAH' />
//             </Text>
//           </View>

//           <View className="flex-row justify-between">
//             <Text className="text-gray-400">Delivery Fee</Text>
//             <Text className="text-gray-400">
//               <Currency quantity={35} currency='UAH' />
//             </Text>
//           </View>

//           <View className="flex-row justify-between">
//             <Text>Order Total</Text>
//             <Text className="font-extrabold">
//               <Currency quantity={basketTotal + 35} currency='UAH' />
//             </Text>
//           </View>

//           <TouchableOpacity onPress={handlePlaceOrder} className="rounded-lg bg-[#0C4F39] p-4">
//             <Text className="text-center text-white text-lg">Place Order</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default BasketScreen;








import React, { useMemo, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal, clearBasket } from '../features/basketSlice';
import { XCircleIcon } from 'react-native-heroicons/solid';
// import Currency from 'react-currency-formatter';
import { doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore'; 
import { db, auth } from '../firebase'; // Імпортуй конфігурацію Firebase
import { urlFor } from '../sanity';
import { useTranslation } from 'react-i18next';

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();
  const [groupedItemInBasket, setGroupedItemInBasket] = useState([]);

  const { t } = useTranslation(); 

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemInBasket(groupedItems);
  }, [items]);

  const handlePlaceOrder = async () => {
    const user = auth.currentUser;
  
    if (!user) {
      Alert.alert(`${t("Error")}`, `${t("Please_log_in_to_place_an_order")}`);
      return;
    }
  
    const DishesAmount = basketTotal; // Сума за страви
    const DeliveryAmount = 35; // Фіксована ціна за доставку
    const totalAmount = DishesAmount + DeliveryAmount; // Загальна сума
  
    const orderData = {
      userId: user.uid,
      restaurant: restaurant.title,
      restaurantImage: urlFor(restaurant.imgUrl).url(), // Використовуємо URL зображення ресторану
      items: items.map(item => ({
        id: item.id,
        name: item.title,
        price: item.price,
        image: urlFor(item.imgUrl).url(),
      })),
      DishesAmount, // Сума за страви
      DeliveryAmount, // Ціна за доставку
      totalAmount, // Загальна сума
      createdAt: serverTimestamp(),
    };
    
    try {
      // Додаємо замовлення в колекцію Orders
      const orderRef = await addDoc(collection(db, 'Orders'), orderData);
      // Залишаємо лише запис у загальній колекції Orders.
      // Якщо потрібно зберігати у users/{uid}/orders — оновіть правила Firestore або додайте серверну функцію.
  
      dispatch(clearBasket()); // Очищення корзини
      navigation.navigate("PreparingOrderScreen");
    } catch (error) {
      console.error('Error adding order: ', error);
      console.error('Firestore error code:', error.code);
      Alert.alert(`${t("Error")}`, `${t("Failed_to_place_order")}`);
    }
  };
  

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#0C4F39] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">{t("Basket")}</Text>
            <Text className="text-center text-gray-400">{restaurant.title}</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#0C4F39" height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{ uri: urlFor(restaurant.imgUrl).url() }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">{t("Deliver_in")}</Text>
          <TouchableOpacity>
            <Text className="text-[#0C4F39]">{t("Change")}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemInBasket).map(([key, items]) => (
            <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
              <Text className="text-[#0C4F39]">{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.imgUrl).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0].name}</Text>
              <Text className="text-gray-600">
                {/* <Currency quantity={items[0]?.price} currency='UAH' /> */}
                {items[0]?.price}
              </Text>
              <TouchableOpacity>
                <Text className="text-[#0C4F39] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  {t("Remove")}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">{t("Subtotal")}</Text>
            <Text className="text-gray-400">
              {/* <Currency quantity={basketTotal} currency='UAH' /> */}
              {basketTotal}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">{t("Delivery_Fee")}</Text>
            <Text className="text-gray-400">
              {/* <Currency quantity={35} currency='UAH' /> */}
              {35}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text>{t("Order_Total")}</Text>
            <Text className="font-extrabold">
              {/* <Currency quantity={basketTotal + 35} currency='UAH' /> */}
              {basketTotal + 35}
            </Text>
          </View>

          <TouchableOpacity onPress={(handlePlaceOrder)} className="rounded-lg bg-[#0C4F39] p-4">
            <Text className="text-center text-white text-lg">{t("Place_Order")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
