import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard';
import client, { urlFor } from '../sanity';

const Categoties = () => {
const [categories, setCategories] = useState([]);

useEffect(()=> {
  client.fetch(`
      *[_type == "category"]
    `).then(data => {
      setCategories(data);
    })
}, [])

  return (
    <ScrollView
    contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
    }}
    horizontal
    showsHorizontalScrollIndicator={false}
    >
        {/* CategoryCard */}

        {categories.map((category) => (
          <CategoryCard 
          key={category._id}
          imgUrl={urlFor(category.image).width(200).url()}
          title={category.name}
          />
        ))}

        {/* <CategoryCard imgUrl='https://www.justonecookbook.com/wp-content/uploads/2020/01/Sushi-Rolls-Maki-Sushi-–-Hosomaki-1106-II.jpg' title="Testing1"/>
        <CategoryCard imgUrl='https://links.papareact.com/wru' title="Testing2"/>
        <CategoryCard imgUrl='https://links.papareact.com/wru' title="Testing3"/> */}

    </ScrollView>
  )
}

export default Categoties;