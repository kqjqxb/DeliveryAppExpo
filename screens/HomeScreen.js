// import { View, Text, Image, TextInput, ScrollView } from 'react-native'
// import React, { useEffect, useLayoutEffect, useState } from 'react'
// import { useNavigation } from '@react-navigation/native'
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {
//     UserIcon,
//     ChevronDownIcon,
//     MagnifyingGlassIcon,
//     AdjustmentsVerticalIcon,
// } from "react-native-heroicons/outline";
// import Categories from '../components/Categories';
// import FeaturedRow from '../components/FeaturedRow';
// import client from '../sanity/sanityClient'; // Use the Sanity client here

// const HomeScreen = () => {
//     const navigation = useNavigation();
//     const [featuredCategories, setFeaturedCategories] = useState([]);

//     useLayoutEffect(() => {
//         navigation.setOptions({
//             headerShown: false,
//         });
//     }, []);

//     useEffect(() => {
//         client.fetch(`
//             *[_type == "featured"] {
//                 ...,
//                 restaurants[]->{
//                     ...,
//                     dishes[]->
//                 }
//             }`
//         ).then(data => {
//             console.log("Fetched data:", data);
//             setFeaturedCategories(data);
//         });
//     }, []);

//     return (
//         <SafeAreaView className="bg-white pt-5">
//             {/* Header */}
//             <View className="flex-row pb-3 items-center mx-4 space-x-2">
//                 <Image
//                     source={{ uri: 'https://links.papareact.com/wru' }}
//                     className="h-7 w-7 bg-gray-300 p-4 rounded-full"
//                 />
//                 <View className="flex-1">
//                     <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
//                     <Text className="font-bold text-xl">
//                         Current Location
//                         <ChevronDownIcon size={20} color="#00CCBB" />
//                     </Text>
//                 </View>
//                 <View>
//                     <UserIcon size={35} color="#00CCBB" onPress={() => navigation.navigate("Profile")}/>
//                 </View>
//             </View>

//             {/* Search */}
//             <View className="flex-row items-center space-x-2 pb-2 mx-4">
//                 <View className="flex-row space-x-2 flex-1 bg-gray-200 p-2">
//                     <MagnifyingGlassIcon color="gray" size={20} />
//                     <TextInput
//                         placeholder="Restaurants and cuisines"
//                         keyboardType="default"
//                     />
//                 </View>
//                 <AdjustmentsVerticalIcon color="#00CCBB" />
//             </View>

//             {/* Body */}
//             <ScrollView
//                 className="bg-gray-100"
//                 contentContainerStyle={{ paddingBottom: 100 }}
//             >
//                 {/* Categories */}
//                 <Categories />

                


//                 {/* Featured Row */}
//            {featuredCategories?.map(category => (
//                 <FeaturedRow 
//                 key={category._id}
//                 id={category._id}
//                 title={category.name}
//                 description={category.short_description}
//             />
//             ))}


//             {/* <FeaturedRow 
//                 id="123"
//                 title="Featured"
//                 description="Paid placements from our partners"
//             />

//             <FeaturedRow 
//                 id="1234"
//                 title="Featured"
//                 description="Paid placements from our partners"
//             />

//             <FeaturedRow 
//                 id="12345"
//                 title="Featured"
//                 description="Paid placements from our partners"
//             /> */}
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// export default HomeScreen;




import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, ActivityIndicator, TouchableOpacity, RefreshControl, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserIcon, ChevronDownIcon, MagnifyingGlassIcon, AdjustmentsVerticalIcon } from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import client from '../sanity/sanityClient';
import { auth } from '../firebase'; // Імпортуй свій конфіг Firebase
import { useTranslation } from 'react-i18next';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);
  const { t } = useTranslation();

  

const onRefresh = async () => {
  setRefreshing(true);
  try {
    // Перезавантаження даних
    const data = await client.fetch(`
        *[_type == "featured"] {
            ...,
            restaurants[]->{
                ...,
                dishes[]->
            }
        }`
    );
    console.log("Fetched data:", data);
    setFeaturedCategories(data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  } finally {
    setRefreshing(false);
  }
};


    useLayoutEffect(() => {
    navigation.setOptions({
        headerShown: false,
    });
}, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const user = auth.currentUser;
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const handleUserIconPress = () => {
    const user = auth.currentUser;
    if (user) {
      navigation.navigate('CompletedProfile');
    } else {
      navigation.navigate('Profile');
    }
  };

  useEffect(() => {
    client.fetch(`
        *[_type == "featured"] {
            ...,
            restaurants[]->{
                ...,
                dishes[]->
            }
        }`
    ).then(data => {
        console.log("Fetched data:", data);
        setFeaturedCategories(data);
    });
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#00CCBB" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-white pt-5" style={{paddingBottom: 120}}>
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{ uri: 'https://links.papareact.com/wru' }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">{t("deliver_now")}</Text>
          <Text className="font-bold text-xl">
            {t("current_location")}
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <TouchableOpacity onPress={handleUserIconPress}>
          <UserIcon size={35} color="#00CCBB" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-2">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder={t("restaurants_and_cuisines")}
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
        
      </View>
      <View className="pb-3">
        {/* Categories */}
        <Categories />
      </View>
      

      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#00CCBB"]}
          />
        }
      >
        

        {/* Featured Row */}
        {featuredCategories?.map(category => (
          <FeaturedRow 
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}

          

          

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
