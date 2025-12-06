import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import ResturantCard from './ResturantCard'
import client from '../sanity/sanityClient'

const FeaturedRow = ({ id, title, description }) => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        client.fetch(`
            *[_type == "featured" && _id == $id] {
                ...,
                restaurants[]->{
                    ...,
                    dishes[]->,
                    type->{
                        name
                    }
                }
            }[0]
        `, { id })
        .then(data => {
            setRestaurants(data?.restaurants || []);
        });
    }, [id]);

    // useEffect(() => {
    //     client.fetch(`
    //         *[_type == "featured" && _id == $id] {
    //             ...,
    //             restaurants[]->{
    //                 ...,
    //                 dishes[]->
    //             }
    //         }[0]
    //     `, { id })
    //     .then(data => {
    //         setRestaurants(data?.restaurants || []);
    //     });
    // }, [id]);



    return (
        <View>
            <View className="mt-4 flex-row items-center justify-between px-4">
                <Text className="font-bold text-lg">{title}</Text>
                <ArrowRightIcon color="#0C4F39" />
            </View>

            <Text className="text-xs text-gray-500 px-4">{description}</Text>

            <ScrollView
                horizontal
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
                showsHorizontalScrollIndicator={false}
                className="pt-4"
            >
                {/* RestaurantCards */}
                {restaurants?.map(restaurant => (
                    <ResturantCard
                        key={restaurant._id}
                        id={restaurant._id}
                        imgUrl={restaurant.image}
                        title={restaurant.name}
                        rating={restaurant.rating}
                        genre={restaurant.type?.name}
                        address={restaurant.address}
                        short_description={restaurant.short_description}
                        dishes={restaurant.dishes}
                        categories_of_dishes={restaurant.categories_of_dishes}
                        long={restaurant.long}
                        lat={restaurant.lat}
                        phone={restaurant.phone}
                        google_map_link={restaurant.google_map_link}
                        opening_hours={restaurant.opening_hours}
                        extras={restaurant.dishes.extras}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default FeaturedRow;
