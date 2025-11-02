// import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
// import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { urlFor } from '../sanity';
// import { ArrowLeftIcon, ChevronRightIcon, MapPinIcon, QuestionMarkCircleIcon, StarIcon } from 'react-native-heroicons/outline';
// import DishRow from '../components/DishRow';
// import BasketIcon from '../components/BasketIcon';
// import FoodCategoriesForRestScreen from '../components/FoodCategoriesForRestScreen';
// import { useDispatch } from 'react-redux';
// import { setRestaurant } from '../features/restaurantSlice';
// import sanityClient from '../sanity';

// const RestaurantScreen = () => {
//     const navigation = useNavigation();
//     const dispatch = useDispatch();
//     const [groupedDishes, setGroupedDishes] = useState({});
//     const [categories, setCategories] = useState([]);
//     const [activeCategory, setActiveCategory] = useState(null);
//     const scrollViewRef = useRef();
//     const categoryRefs = useRef({});

//     const { params: { id, imgUrl, title, rating, genre, address, short_description, dishes } } = useRoute();

//     useEffect(() => {
//         dispatch(setRestaurant({ id, imgUrl, title, rating, genre, address, short_description, dishes }));
//     }, []);

//     useLayoutEffect(() => {
//         navigation.setOptions({ headerShown: false });
//     }, []);

//     const fetchCategories = async () => {
//         const categoryIds = dishes.map(dish => dish.type?._ref).filter(ref => ref);
//         const uniqueIds = [...new Set(categoryIds)];

//         const query = `*[_id in ${JSON.stringify(uniqueIds)}] { _id, name, image }`;
//         const fetchedCategories = await sanityClient.fetch(query);
//         setCategories(fetchedCategories);

//         const categoryMap = fetchedCategories.reduce((acc, category) => {
//             acc[category._id] = category;
//             return acc;
//         }, {});

//         const newGroupedDishes = {};

//         dishes.forEach(dish => {
//             const category = categoryMap[dish.type?._ref] ? categoryMap[dish.type?._ref].name : "Other";
//             if (!newGroupedDishes[category]) {
//                 newGroupedDishes[category] = [];
//             }
//             newGroupedDishes[category].push(dish);
//         });

//         // Додаємо категорію "Other" в кінець
//         const groupedDishesWithOther = { ...newGroupedDishes, Other: newGroupedDishes["Other"] || [] };
//         delete groupedDishesWithOther["Other"];
//         setGroupedDishes({ ...groupedDishesWithOther, Other: newGroupedDishes["Other"] });
//     };

//     useEffect(() => {
//         fetchCategories();
//     }, [dishes]);

//     const handleCategoryPress = (categoryName) => {
//         setActiveCategory(categoryName);
//         const view = categoryRefs.current[categoryName];
//         if (view) {
//             view.measure((fx, fy, width, height, px, py) => {
//                 scrollViewRef.current.scrollTo({ y: py, animated: true });
//             });
//         }
//     };

//     return (
//         <>
//             <BasketIcon />
//             <ScrollView className="bottom-7 bg-[#8ff8ff23]" ref={scrollViewRef} scrollEventThrottle={16}>
//                 <View className="relative">
//                     <Image source={{ uri: urlFor(imgUrl).url() }} className="w-full h-56 bg-gray-300 p-4" />
//                     <TouchableOpacity onPress={navigation.goBack} className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full">
//                         <ArrowLeftIcon size={20} color={'#00CCBB'} />
//                     </TouchableOpacity>
//                 </View>
//                 <View className="bg-white">
//                     <View className="px-4 pt-4">
//                         <Text className="text-3xl font-bold">{title}</Text>
//                         <View className="flex-row space-x-2 my-1">
//                             <View className="flex-row items-center space-x-1">
//                                 <StarIcon color="green" opacity={0.5} size={22} />
//                                 <Text className="text-xs text-gray-500">
//                                     <Text className="text-green-500">{rating}</Text> · {genre}
//                                 </Text>
//                             </View>
//                             <View className="flex-row items-center space-x-1">
//                                 <MapPinIcon color="green" opacity={0.5} size={22} />
//                                 <Text className="text-xs text-gray-500">Nearby · {address}</Text>
//                             </View>
//                         </View>
//                         <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
//                     </View>
//                     <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
//                         <QuestionMarkCircleIcon color="gray" opacity={0.5} size={20} />
//                         <Text className="pl-2 flex-1 text-md font-bold">Have a food allergy?</Text>
//                         <ChevronRightIcon color="#00CCBB" />
//                     </TouchableOpacity>
//                 </View>

//                 <FoodCategoriesForRestScreen 
//                     categories={categories} 
//                     onCategoryPress={handleCategoryPress} 
//                     activeCategory={activeCategory} 
//                 />

//                 <ScrollView className=" top-5" style={{ paddingBottom: 100 }}>
//                     {Object.entries(groupedDishes).map(([categoryName, categoryDishes]) => (
//                         <View key={categoryName} ref={el => categoryRefs.current[categoryName] = el} className="mb-4">
//                             <Text className="font-bold text-lg px-4">{categoryName}</Text>
//                             <View className="flex-row flex-wrap justify-between px-4">
//                                 {categoryDishes.map(dish => (
//                                     <DishRow
//                                         key={dish._id}
//                                         id={dish._id}
//                                         name={dish.name}
//                                         description={dish.short_description}
//                                         price={dish.price}
//                                         image={dish.image}
//                                     />
//                                 ))}
//                             </View>
//                         </View>
//                     ))}
//                 </ScrollView>
//             </ScrollView>
//         </>
//     );
// }

// export default RestaurantScreen;










import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { urlFor } from '../sanity';
import { ArrowLeftIcon, ChevronRightIcon, MapPinIcon, QuestionMarkCircleIcon, StarIcon } from 'react-native-heroicons/outline';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import FoodCategoriesForRestScreen from '../components/FoodCategoriesForRestScreen';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';
import sanityClient from '../sanity';
import { findNodeHandle } from 'react-native';
import { useTranslation } from 'react-i18next';

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const scrollViewRef = useRef();
  const categoryRefs = useRef({});
  const [groupedDishes, setGroupedDishes] = useState({});
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    console.log("For test: ")
            console.log({
                id, 
                imgUrl,
                title,
                rating,
                genre,
                address,
                short_description,
                dishes,

                long,
                lat,
                phone,
                google_map_link,
                opening_hours,
                extras
            });
            console.log(`\nGenre is ${title}\n`)
  }, [])

  const { params: { id, imgUrl, title, rating, genre, address, short_description, dishes, lat, long, phone, google_map_link, opening_hours, extras } } = useRoute();

  useEffect(() => {
    dispatch(setRestaurant({ id, imgUrl, title, rating, genre, address, short_description, dishes, lat, long, phone, google_map_link, opening_hours, extras }));
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const fetchCategories = async () => {
    const categoryIds = dishes.map(dish => dish.type?._ref).filter(ref => ref);
    const uniqueIds = [...new Set(categoryIds)];

    const query = `*[_id in ${JSON.stringify(uniqueIds)}] { _id, name, image }`;
    const fetchedCategories = await sanityClient.fetch(query);

    const categoryMap = fetchedCategories.reduce((acc, category) => {
      acc[category._id] = category;
      return acc;
    }, {});

    const newGroupedDishes = {};
    dishes.forEach(dish => {
      const category = categoryMap[dish.type?._ref] ? categoryMap[dish.type?._ref].name : "Other";
      if (!newGroupedDishes[category]) {
        newGroupedDishes[category] = [];
      }
      newGroupedDishes[category].push(dish);
    });

    // Додаємо категорію "Other" в кінець
    const groupedDishesWithOther = { ...newGroupedDishes, Other: newGroupedDishes["Other"] || [] };
    delete groupedDishesWithOther["Other"];
    setGroupedDishes({ ...groupedDishesWithOther, Other: newGroupedDishes["Other"] });

    // Встановлюємо порядок категорій
    const orderedCategories = [...fetchedCategories, { _id: 'Other', name: 'Other', image: null }];
    setCategories(orderedCategories);
  };

  useEffect(() => {
    fetchCategories();
  }, [dishes]);

  const handleCategoryPress = (categoryName) => {
    setActiveCategory(categoryName);
    const view = categoryRefs.current[categoryName];
    if (view) {
      view.measureLayout(
        findNodeHandle(scrollViewRef.current),
        (x, y, width, height) => {
          scrollViewRef.current.scrollTo({ y: y - 125, animated: true });
        }
      );
    }
  };

  const handleScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
  
    Object.keys(categoryRefs.current).forEach((categoryName) => {
      const view = categoryRefs.current[categoryName];
      view.measureLayout(
        findNodeHandle(scrollViewRef.current),
        (x, y, width, height) => {
          // Перевіряємо, чи категорія активна
          if (y < contentOffsetY + 300 && y + height > contentOffsetY + 300) {
            setActiveCategory(categoryName);
          }
        }
      );
    });
  };
  

  return (
    <>
      <BasketIcon />
      <ScrollView
        className="bg-[#8ff8ff23]"
        ref={scrollViewRef}
        scrollEventThrottle={16}
        stickyHeaderIndices={[2]}
        onScroll={handleScroll}
      >
        <View className="relative">
          <Image source={{ uri: urlFor(imgUrl).url() }} className="w-full h-56 bg-gray-300 p-4" />
          <TouchableOpacity onPress={navigation.goBack} className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full">
            <ArrowLeftIcon size={20} color={'#00CCBB'} />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="px-4 pt-4">
          <TouchableOpacity onPress={() => navigation.navigate("RestaurantMore")}>
              <Text className="text-3xl font-bold">{title}</Text>
              <View className="flex-row space-x-2 my-1">
                <View className="flex-row items-center space-x-1">
                  <StarIcon color="green" opacity={0.5} size={22} />
                  <Text className="text-xs text-gray-500">
                    <Text className="text-green-500">{rating}</Text> · {genre}
                  </Text>
                </View>
                <View className="flex-row items-center space-x-1">
                  <MapPinIcon color="green" opacity={0.5} size={22} />
                  <Text className="text-xs text-gray-500">Nearby · {address}</Text>
                </View>
              </View>
            
                <View className="flex align-middle">
                    <Text>
                        <Text className="font-bold" style={{fontSize: 16}}>{t("more_detail")}</Text><ChevronRightIcon color="black" size={16}/>
                    </Text>
                </View>
            </TouchableOpacity>
            <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
          </View>
          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon color="gray" opacity={0.5} size={20} />
            <Text className="pl-2 flex-1 text-md font-bold">{t("have_a_food_allergy")}</Text>
            <ChevronRightIcon color="#00CCBB" />
          </TouchableOpacity>
        </View>

        {/* Фіксоване меню категорій */}
        <View className="bg-white pt-7 z-10">
          <FoodCategoriesForRestScreen
            categories={categories}
            onCategoryPress={handleCategoryPress}
            activeCategory={activeCategory}
          />
        </View>

        {/* Список страв */}
        <ScrollView className="top-5 pb-10">
          {categories.map((category) => (
            <View key={category._id} ref={el => categoryRefs.current[category.name] = el} className="mb-0">
              <Text className="font-bold text-2xl ml-3 pb-4 pt-4 px-4">{category.name}</Text>
              <View className="flex-row flex-wrap justify-between px-4">
                {groupedDishes[category.name]?.map(dish => (
                  <DishRow
                    key={dish._id}
                    id={dish._id}
                    name={dish.name}
                    description={dish.short_description}
                    price={dish.price}
                    image={dish.image}
                  />
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </>
  );
}

export default RestaurantScreen;
