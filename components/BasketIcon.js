import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
// import Currency from 'react-currency-formatter';
import { useTranslation } from 'react-i18next';

const BasketIcon = () => {
    const items = useSelector(selectBasketItems);
    const navigation = useNavigation();
    const basketTotal = useSelector(selectBasketTotal);
    
    const { t, i18n } = useTranslation();  

    if(items.length === 0 ) return null;

    const textSize = i18n.language === 'uk' ? 'text-base' : 'text-lg'; 

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity onPress={() => navigation.navigate("Basket")} className="bg-[#0C4F39] mx-5 p-4 rounded-lg flex-row items-center space-x-1">
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">{items.length}</Text>
        <Text className={`flex-1 text-white font-extrabold ${textSize} text-center`}>{t("View_Basket")}</Text>
        
        <Text className="text-lg text-white font-extrabold">
            {/* <Currency quantity={basketTotal} currency='UAH'/> */}
            {basketTotal}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default BasketIcon
