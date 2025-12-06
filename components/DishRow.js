// import { View, Text, TouchableOpacity, Image } from 'react-native';
// import React, { useState } from 'react';
// import Currency from 'react-currency-formatter';
// import { urlFor } from '../sanity';
// import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToBasket, removeFromBasket, selectBasketItemsWithId } from '../features/basketSlice';

// const DishRow = ({ id, name, description, price, image }) => {
//   const [isPressed, setIsPressed] = useState(false);
//   const dispatch = useDispatch();
//   const items = useSelector((state) => selectBasketItemsWithId(state, id));

//   const addItemToBasket = () => {
//     dispatch(addToBasket({ id, name, description, price, image }));
//   };

//   const removeItemFromBasket = () => {
//     if (!items.length > 0) return;

//     dispatch(removeFromBasket({ id }));
//   };

//   return (
//     <View className="w-[48%] bg-white rounded-3xl mb-4 shadow-md" >
//       {/* Зображення страви */}
//       <TouchableOpacity onPress={() => setIsPressed(!isPressed)} className={`${isPressed && "border-b-0 rounded-b-3xl"}`} style={{borderBottomRightRadius: 24, borderBottomLeftRadius: 24}}>
//         <View className="relative">
//             <Image
//             source={{ uri: urlFor(image).url() }}
//             className="w-full h-40 rounded-t-3xl"
//             style={{ resizeMode: 'cover' }}
//             />
//             {/* Ціна в правому верхньому куті */}
//             <View className="absolute top-0 right-0 bg-white p-1 " style={{borderBottomLeftRadius: 16, borderTopRightRadius: 24}}>
//             <Text className="text-sm font-bold">₴{price}.00
//                 {/* <Currency quantity={price} currency='UAH' /> */}
//             </Text>
//             </View>
//         </View>

//         {/* Назва та опис */}
        
//         <View className="p-3">
//             <Text className="font-bold text-lg text-center">{name}</Text>
//             <Text className="text-gray-500">{description}</Text>
//         </View>
//         </TouchableOpacity>

//         {/* Додавання та видалення елементів */}
//         {isPressed && (
//             <View className="bg-white px-4">
//             <View className="flex-row items-center space-x-2 pb-3">
//                 <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
//                 <MinusCircleIcon
//                     color={items.length > 0 ? "#0C4F39" : "gray"}
//                     size={40}
//                 />
//                 </TouchableOpacity>

//             <Text>{items.length}</Text>

//             <TouchableOpacity onPress={addItemToBasket}>
//               <PlusCircleIcon size={40} color="#0C4F39" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// };

// export default DishRow;








// DishRow.js
import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState, useMemo } from 'react';
// import Currency from 'react-currency-formatter';
import { urlFor } from '../sanity';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from '../features/basketSlice';
import { useNavigation } from '@react-navigation/native';

const DishRow = ({ id, name, description, price, image }) => {
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();
  const selectItemsForId = useMemo(() => selectBasketItemsWithId(id), [id]);
  const items = useSelector(selectItemsForId);

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBasket = () => {
    if (items.length === 0) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <View className="w-[48%] bg-white rounded-3xl mb-4 shadow-md">
      <TouchableOpacity 
        onPress={() => {
          setIsPressed(!isPressed);
          navigation.navigate("DishDetail", { 
            id, 
            imgUrl: image, 
            title: name, 
            price, 
            description 
          });
        }} 
        className={`${isPressed ? "border-b-0 rounded-b-3xl" : ""}`} 
        style={{ borderBottomRightRadius: 24, borderBottomLeftRadius: 24 }}
      >
        <View className="relative">
          <Image
            source={{ uri: urlFor(image).url() }}
            className="w-full h-40 rounded-t-3xl"
            style={{ resizeMode: 'cover' }}
          />
          {/* Price in the top-right corner */}
          <View 
            className="absolute top-0 right-0 bg-white p-1" 
            style={{ borderBottomLeftRadius: 16, borderTopRightRadius: 24 }}
          >
            <Text className="text-sm font-bold">₴{price}.00</Text>
          </View>
        </View>

        {/* Name and Description */}
        <View className="p-3">
          <Text className="font-bold text-lg text-center">{name}</Text>
          <Text className="text-gray-500">{description}</Text>
        </View>
      </TouchableOpacity>

      {/* Add and Remove Items */}



    </View>
  );
};

export default DishRow;
