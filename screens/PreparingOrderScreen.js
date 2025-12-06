import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const PreparingOrderScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery');
    }, 4000);
  }, []);

  return (

    <SafeAreaView className="bg-[#0C4F39] flex-1 justify-center items-center">
      {/* 03:09:50 */}

      <Animatable.Image
        source={require("../assets/updated_background.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-80 w-80"
      />

      {/* <Image
        source={{ uri: 'https://media.giphy.com/media/QtvCDSpaMyzly246Gg/giphy.gif' }}
        className="w-full h-80"
      /> */}

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-l my-10 text-white font-bold text-center "
      >
        {t("Waiting_for_Restaurant_to_accept_your_order!")}
      </Animatable.Text>


      <Progress.Circle size={60} indeterminate={true} color='white' />
    </SafeAreaView>
  )
}

export default PreparingOrderScreen