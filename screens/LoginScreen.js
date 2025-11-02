// LoginScreen.js
import React, { useLayoutEffect } from 'react';
import { View, Text, Button, ImageBackgroundComponent, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
// import tw from "tailwind-rn";
import { TouchableOpacity } from 'react-native-gesture-handler';

const LoginScreen = () => {
    const navigation = useNavigation();
    const { signInWithGoogle } = useAuth();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <View className="flex-1">
            <ImageBackground resizeMode='cover' className="flex-1" 
            
            >
                
                <View className="flex-1 justify-end items-center">
                    <TouchableOpacity className="w-52 bg-white p-4 rounded-2xl mb-10 " onPress={() => navigation.navigate('LoginWithNick')}>
                        <Text className="font-semibold text-center" >Sign in</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="w-52 bg-white p-4 rounded-2xl mb-10 " onPress={() => navigation.navigate('RegisterWithNick')}>
                        <Text className="font-semibold text-center" >Sign up</Text>
                    </TouchableOpacity>
                </View>
                
            </ImageBackground>
            
            
        </View>
    );
};

export default LoginScreen;
