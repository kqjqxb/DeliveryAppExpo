// import { useNavigation } from '@react-navigation/native';
// import React from 'react';
// import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
// import { ArrowLeftIcon } from 'react-native-heroicons/outline';

// // Функція для групування страв і підрахунку їх кількості
// const groupItemsByName = (items) => {
//   const groupedItems = items.reduce((acc, item) => {
//     if (acc[item.name]) {
//       acc[item.name].quantity += 1;
//     } else {
//       acc[item.name] = { ...item, quantity: 1 };
//     }
//     return acc;
//   }, {});
  
//   return Object.values(groupedItems);
// };

// const OrderDetailScreen = ({ route }) => {
//   const { order } = route.params;
//   const navigation = useNavigation();

//   // Групуємо страви
//   const groupedItems = groupItemsByName(order.items);

//   return (
//     <ScrollView>
//       <View className="relative">
//         <Image 
//           source={{ uri: order.restaurantImage }}
//           className="w-full h-56 bg-gray-300 p-4"
//         />

//         <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full">
//           <ArrowLeftIcon size={20} color={'#0C4F39'} />
//         </TouchableOpacity>
//       </View>
//       <View className="mx-4 mt-3">
//         <Text className="text-2xl font-bold">Order from {order.restaurant}</Text>
//         <Text className="text-gray-500">Total: {order.totalAmount} UAH</Text>
//       </View>
      
//       {groupedItems.map(item => (
//         <View key={item.name} className="flex-row items-center space-x-4 mt-4 mx-3">
//         <Image source={{ uri: item.image }} className="w-20 h-20 rounded-full" />
//         <Text className="flex-1 text-lg">
//           {item.name} <Text className="text-[#0C4F39]">(x{item.quantity})</Text>
//         </Text>
//         <View className="flex-1 items-end">
//           <Text className="text-lg">{item.price * item.quantity} UAH</Text>
//           <Text className="text-xs">{item.price} UAH <Text className="font-bold">x{item.quantity}</Text></Text>
//         </View>
//       </View>
      
//       ))}
//     </ScrollView>
//   );
// };

// export default OrderDetailScreen;



import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { useTranslation } from 'react-i18next';

// Функція для групування страв і підрахунку їх кількості
const groupItemsByName = (items) => {
  const groupedItems = items.reduce((acc, item) => {
    if (acc[item.name]) {
      acc[item.name].quantity += 1;
    } else {
      acc[item.name] = { ...item, quantity: 1 };
    }
    return acc;
  }, {});
  
  return Object.values(groupedItems);
};

const OrderDetailScreen = ({ route }) => {
  const { order } = route.params;
  const navigation = useNavigation();

  const { t } = useTranslation();

  // Групуємо страви
  const groupedItems = groupItemsByName(order.items);

  return (
    <ScrollView>
      <View className="relative">
        <Image 
          source={{ uri: order.restaurantImage }}
          className="w-full h-56 bg-gray-300 p-4"
        />

        <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full">
          <ArrowLeftIcon size={20} color={'#0C4F39'} />
        </TouchableOpacity>
      </View>
      <View className="mx-4 mt-3">
        <Text className="text-2xl font-bold">{t("order_from")} {order.restaurant}</Text>
        <Text className="text-gray-500">{t("total")}: {order.totalAmount} UAH</Text>
      </View>
      
      {groupedItems.map(item => (
        <View key={item.name} className="flex-row items-center space-x-4 mt-4 mx-3">
          <Image source={{ uri: item.image }} className="w-20 h-20 rounded-full" />
          <Text className="flex-1 text-lg">
            {item.name} <Text className="text-[#0C4F39]">(x{item.quantity})</Text>
          </Text>
          <View className="flex-1 items-end">
            <Text className="text-lg">{item.price * item.quantity} UAH</Text>
            <Text className="text-xs">{item.price} UAH <Text className="font-bold">x{item.quantity}</Text></Text>
          </View>
        </View>
      ))}
      <View className="mb-7"></View>
    </ScrollView>
  );
};

export default OrderDetailScreen;
