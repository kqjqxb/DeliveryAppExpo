import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { MapPinIcon, StarIcon } from 'react-native-heroicons/outline'
import {urlFor} from "../sanity"
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next';

const ResturantCard = ({
    id, 
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    categories_of_dishes,
    dishes,
    long,
    lat,
    phone,
    google_map_link,
    opening_hours,
    extras
}) => {
    const { t } = useTranslation();

    const navigation = useNavigation();
  return (
    <TouchableOpacity
        className="bg-white mr-3 shadow"
        
        
        onPress={()=> {
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
                categories_of_dishes,
                long,
                lat,
                phone,
                google_map_link,
                opening_hours,
                extras
            });
            console.log(`\nGenre is ${title}\n`)
            
            navigation.navigate("Restaurant", {
                id, 
                imgUrl,
                title,
                rating,
                genre,
                address,
                short_description,
                dishes,
                categories_of_dishes,
                long,
                lat,
                phone,
                google_map_link,
                opening_hours,
                extras
            })
          }}
    >
        <Image 
            source={{uri: urlFor (imgUrl).url(),

            }}
            className="h-64 w-64 rounded-sm"
        />
        <View className="px-3 pb-4">
            <Text className="font-bold text-lg pt-2">{title}</Text>

            <View className="flex-row items-center space-x-1">
                <StarIcon color="green" opacity={0.5} size={22}/>
                <Text className="text-gray-500 text-xs">
                    <Text className="text-green">{rating} </Text> · {genre}
                </Text>
                
            </View>

            <View className="flex-row items-center space-x-1">
                <MapPinIcon color="gray" opacity={0.4} size={22}/>
                <Text className="text-xs text-gray-500">Nearby · {address}</Text>
            </View>

            <View className="flex-row items-center space-x-1">
                <Image 
                    source={require('../assets/fast-delivery.png')}
                    className="h-5 w-5 color-[#0C4F39]"
                />
                <Text className="text-xs text-[#0C4F39]">₴35 {t("delivery")}</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default ResturantCard