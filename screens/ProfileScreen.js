import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { ArrowLeftIcon, GlobeAltIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import LanguageModal from '../components/LanguageModal'; // Імпорт нового компонента LanguageModal

const ProfileScreen = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView className="flex-1">
            <View className="z-50">
                <TouchableOpacity onPress={navigation.goBack} className="absolute top-4 left-5 p-2 bg-[#0C4F39] rounded-full">
                    <ArrowLeftIcon size={20} color={'white'} />
                </TouchableOpacity>
            </View>

            <View className="z-50">
                <TouchableOpacity onPress={() => setModalVisible(true)} className="absolute top-4 right-5">
                    <GlobeAltIcon size={35} color="#0C4F39" />
                </TouchableOpacity>
            </View>

            <View className="items-center justify-center pt-10">
                <View className="pb-3" style={{ paddingTop: 80 }}>
                    <Image className="items-center w-20 h-20 rounded-xl"
                        source={require("../assets/nearbyLogo.png")}
                    />
                </View>

                <View className="text-center">
                    <Text className="text-center text-xl font-bold pb-5">{t("Almost_there")}</Text>
                </View>

                <View>
                    <Text className="text-center">{t("Sign_up_or_log_in_to_continue")}.</Text>
                </View>
                <View>
                    <Text className="font-bold text-center pt-3">{t("It_only_takes_a_minute")}</Text>
                </View>
            </View>

            <View className="bg-[#0C4F39] p-7" style={{ position: "absolute", bottom: 0, width: '100%', paddingBottom: 100, paddingTop: 50 }}>
                <TouchableOpacity className="p-3 my-2 bg-white rounded-xl flex-row items-center">
                    <Text className="flex-1">{t("Continue_with_Apple")}</Text>
                    <Image className="items-center w-7 h-7 mr-1"
                        source={require("../assets/apple-logo.png")}
                    />
                </TouchableOpacity>

                <TouchableOpacity className="p-3 my-2 bg-white rounded-xl flex-row items-center">
                    <Text className="flex-1">{t("Continue_with_Google")} </Text>
                    <Image className="items-center w-7 h-7 mr-1"
                        source={require("../assets/google_logo_icon.png")}
                    />
                </TouchableOpacity>

                <TouchableOpacity className="p-3 my-2 bg-white rounded-xl flex-row items-center">
                    <Text className="flex-1 ">{t("Continue_with_Facebook")}</Text>
                    <Image className="items-center w-7 h-7 mr-1"
                        source={require("../assets/facebook-logo.png")}
                    />
                </TouchableOpacity>

                <TouchableOpacity className="p-3 my-2 rounded-xl" onPress={() => navigation.navigate("Test1")}>
                    <Text className="text-white text-center font-bold">{t("Continue_with_email")}</Text>
                </TouchableOpacity>
            </View>

            <LanguageModal
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)} // Закриває модальне вікно
            />
        </SafeAreaView>
    );
};

export default ProfileScreen;
