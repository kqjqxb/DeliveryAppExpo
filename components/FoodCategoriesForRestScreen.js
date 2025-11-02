// import { View, Text, ScrollView } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import FoodCategoryCard from './FoodCategoryCard';
// import client, { urlFor } from '../sanity';

// const FoodCategoriesForRestScreen = ({restaurantId}) => {
// const [categories, setCategories] = useState([]);

// useEffect(() => {
//   if (restaurantId) {
//     client.fetch(`
//       *[_type == "restaurant" && _id == $restaurantId] {
//         categories_of_dishes[]-> {
//           _id,
//           name,
//           image
//         }
//       }
//     `, { restaurantId })
//     .then(data => {
//       console.log(data); // Перевірте дані
//       const categories = data[0]?.categories_of_dishes || []; // Установіть порожній масив, якщо categories_of_dishes відсутній
//       setCategories(categories);
//     })
//     .catch(err => {
//       console.error('Error fetching categories:', err);
//     });
//   }
// }, [restaurantId]);

//   return (
//     <ScrollView
    
//     contentContainerStyle={{
//         paddingHorizontal: 15,
//         paddingTop: 40,
//         marginHorizontal: 14,
//     }}
//     horizontal
//     showsHorizontalScrollIndicator={false}
    
//     >
//         {/* CategoryCard */}

//         {categories.map((category) => (
//           <FoodCategoryCard 
//           key={category._id}
//           imgUrl={urlFor(category.image).width(200).url()}
//           title={category.name}
//           />
//         ))}

//     </ScrollView>
//   )
// }

// export default FoodCategoriesForRestScreen;






// FoodCategoriesForRestScreen.jsx
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { urlFor } from '../sanity';

const FoodCategoriesForRestScreen = ({ categories, onCategoryPress, activeCategory }) => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="p-4 ">
            {categories.map(category => (
                <TouchableOpacity
                    key={category._id}
                    onPress={() => onCategoryPress(category.name)}
                    className={`mx-4 items-center justify-center flex ${activeCategory === category.name ? 'opacity-100' : 'opacity-50'}`}
                >
                    {category.image ? (
                        <Image
                            source={{ uri: urlFor(category.image).width(200).url() }}
                            className="h-12 w-12 rounded"
                        />
                    ) : (
                        <Image
                            source={require('../assets/otherCategoryImage.png')}
                            className="h-12 w-12 rounded"
                        />
                        
                    )}
                    <Text className={`text-center mt-1 font-bold text-xs ${activeCategory === category.name ? 'text-black' : 'text-gray-500'}`}>
                        {category.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default FoodCategoriesForRestScreen;
