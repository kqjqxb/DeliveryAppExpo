import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const FoodCategoryCard = ({imgUrl, title}) => {
  return (
    <TouchableOpacity className="relative mr-7">
        <Image source={{ uri: imgUrl }} 
          className="h-12 w-12 rounded items-center bottom-7" 
        />

      <Text className="flex-row absolute text-center bottom-1 left-1 font-bold text-xs"
        
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default FoodCategoryCard