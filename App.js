
import React from 'react';
import {  Text, View, Button } from 'react-native';


import "./tailwind.css" // ?


import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';


import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StackNavigator from './StackNavigator';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import { Provider } from 'react-redux';
import { store } from './store';
import BasketScreen from './screens/BasketScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import ProfileScreen from './screens/ProfileScreen';
import TestScreen from './screens/TestScreen';
import TestScreen1 from './screens/RegisterOrLoginScreen';
import RegisterWithNickScreen from './screens/RegisterWithNickScreen';
import LoginWithNickScreen from './screens/LoginWithNickScreen';
import LoginScreen from './screens/LoginScreen';
import CompletedProfileScreen from './screens/CompletedProfileScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';
import DishDetailScreen from './screens/DishDetailScreen';
import RestaurantMoreScreen from './screens/RestaurantMoreScreen';
import SettingsScreen from './screens/SettingsScreen';
import LanguageScreen from './screens/LanguageScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <Provider store={store}>
        <NavigationContainer>
          <TailwindProvider utilities={utilities}>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} 
                
              />
              <Stack.Screen name="Restaurant" component={RestaurantScreen} />
              <Stack.Screen name="Basket" component={BasketScreen} 
                options={{presentation: 'modal', headerShown: false}}
              />
              <Stack.Screen name="PreparingOrderScreen" component={PreparingOrderScreen} 
                options={{presentation: 'fullScreenModal', headerShown: false}}
              />

              <Stack.Screen name="Delivery" component={DeliveryScreen} 
                options={{presentation: 'fullScreenModal', headerShown: false}}
              />

              <Stack.Screen name="Profile" component={ProfileScreen} 
                options={{headerShown: false}}
              />
              <Stack.Screen name="Test" component={TestScreen} 
                options={{headerShown: false, presentation: 'modal'}}
              />

              <Stack.Screen name="Test1" component={TestScreen1} 
                options={{headerShown: false, presentation: 'modal'}}
              />

              <Stack.Screen name="RegisterWithNick" component={RegisterWithNickScreen} 
                options={{presentation: 'modal', headerShown: false}}
              />

              <Stack.Screen name="LoginWithNick" component={LoginWithNickScreen} 
                options={{presentation: 'modal', headerShown: false}}
              />
              
              <Stack.Screen name="Login" component={LoginScreen} 
                options={{ headerShown: false}}
              />

              <Stack.Screen name="CompletedProfile" component={CompletedProfileScreen} 
                options={{ headerShown: false}}
              />

              <Stack.Screen name="OrderDetail" component={OrderDetailScreen} 
                options={{ headerShown: false}}
              />

              <Stack.Screen name="DishDetail" component={DishDetailScreen} 
                options={{presentation: 'modal', headerShown: false}}
              />

              <Stack.Screen name="RestaurantMore" component={RestaurantMoreScreen} 
                options={{ headerShown: false}}
              />

              <Stack.Screen name="Settings" component={SettingsScreen} 
                options={{ headerShown: false}}
              />

              <Stack.Screen name="LanguageScreen" component={LanguageScreen} 
                options={{presentation: 'modal', headerShown: false}}
              />

            </Stack.Navigator>
          </TailwindProvider>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
    
  );
}
