// import React from 'react';
// import { View, Text, SafeAreaView, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
// import { ArrowLeftIcon } from 'react-native-heroicons/outline';
// import { useNavigation } from '@react-navigation/native';
// import { getAuth, signOut } from 'firebase/auth';
// import Currency from 'react-currency-formatter';

// const CompletedProfileScreen = () => {
//     const navigation = useNavigation();
//     const auth = getAuth();

//     const handleLogout = async () => {
//         try {
//             await signOut(auth);
//             navigation.replace('Profile'); // Navigate to ProfileScreen after logout
//         } catch (error) {
//             Alert.alert('Logout Error', 'An error occurred while logging out.');
//         }
//     };

//     return (
//         <View className="flex-1 bg-white">
//         <View className="flex-1 bg-[#d6f9f6]">
//           <SafeAreaView
//             className="flex-1 p-5 border-b border-[#00CCBB] bg-[#00CCBB] shadow-xs rounded-3xl -mt-12"
//             style={{ height: '500' }}
//           >
//             <View>
//               {/* Logout Button */}
//               <View className="absolute top-14 right-5 z-50">
//                 <TouchableOpacity
//                   onPress={handleLogout}
//                   className="bg-[#00CCBB] p-2 rounded-full"
//                 >
//                   <Text className="text-white">Log out</Text>
//                 </TouchableOpacity>
//               </View>

//               <View>
//                 <TouchableOpacity
//                   onPress={navigation.goBack}
//                   className="absolute top-14 left-5 p-2 bg-[#00CCBB] rounded-full"
//                 >
//                   <ArrowLeftIcon size={28} color={'white'} />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Profile Info Section */}
//             <View className="flex-row items-center flex-1 space-x-7 ml-14" style={{marginTop: 120}}>
//               <Image
//                 className="w-20 h-20 border-4 border-white rounded-full"
//                 source={require('../assets/avatar_profile_icon.png')}
//               />
//               <View>
//                 <Text className="font-extrabold text-xl">Maksym Maksym</Text>
//                 <Text className="text-gray-500">Customer</Text>
//               </View>
//             </View>
//           </SafeAreaView>

//           <View className="flex-row items-center space-x-4 px-4 py-3 my-5">

//             <Text className="flex-1 text-xl font-bold">My orders:</Text>
//           </View>

//           <ScrollView className="divide-y divide-gray-200">
//           <Text>1st order</Text>
//           <Text>1st order</Text>
//           <Text>1st order</Text>

//           </ScrollView>

//           <View className="p-5 bg-white mt-5 space-y-4">
//             <View className="flex-row justify-between">
//               <Text className="text-gray-400">Subtotal</Text>
//               <Text className="text-gray-400">
//                 <Currency quantity={1000} currency="UAH" />
//               </Text>
//             </View>

//             <View className="flex-row justify-between">
//               <Text className="text-gray-400">Delivery Fee</Text>
//               <Text className="text-gray-400">
//                 <Currency quantity={35} currency="UAH" />
//               </Text>
//             </View>

//             <View className="flex-row justify-between">
//               <Text>Order Total</Text>
//               <Text className="font-extrabold">
//                 <Currency quantity={1000 + 35} currency="UAH" />
//               </Text>
//             </View>

//             <TouchableOpacity
//               onPress={() => navigation.navigate('PreparingOrderScreen')}
//               className="rounded-lg bg-[#00CCBB] p-4"
//             >
//               <Text className="text-center text-white text-lg">Place Order</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>






//     );
// };

// export default CompletedProfileScreen;

























// import React, { useEffect, useState } from 'react';
// import { View, Text, SafeAreaView, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
// import { ArrowLeftIcon } from 'react-native-heroicons/outline';
// import { useNavigation } from '@react-navigation/native';
// import { getAuth, signOut } from 'firebase/auth';
// import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
// import Currency from 'react-currency-formatter';

// const CompletedProfileScreen = () => {
//     const navigation = useNavigation();
//     const auth = getAuth();
//     const db = getFirestore();
//     const [orders, setOrders] = useState([]);

//     // Fetch all orders for the current user
//     useEffect(() => {
//         const fetchOrders = async () => {
//             const user = auth.currentUser;
//             if (user) {
//                 try {
//                     const q = query(collection(db, 'Orders'), where('userId', '==', user.uid));
//                     const querySnapshot = await getDocs(q);
//                     const userOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                     setOrders(userOrders);
//                 } catch (error) {
//                     Alert.alert('Error', 'An error occurred while fetching orders.');
//                 }
//             }
//         };

//         fetchOrders();
//     }, []);

//     const handleLogout = async () => {
//         try {
//             await signOut(auth);
//             navigation.replace('Profile'); // Navigate to ProfileScreen after logout
//         } catch (error) {
//             Alert.alert('Logout Error', 'An error occurred while logging out.');
//         }
//     };

//     return (
//         <View className="flex-1 bg-white">
//             <View className="flex-1 bg-[#d6f9f6]">
//                 <SafeAreaView
//                     className="flex-1 p-5 border-b border-[#00CCBB] bg-[#00CCBB] shadow-xs rounded-3xl -mt-12"
//                     style={{ height: '500' }}
//                 >
//                     <View>
//                         {/* Logout Button */}
//                         <View className="absolute top-14 right-5 z-50">
//                             <TouchableOpacity
//                                 onPress={handleLogout}
//                                 className="bg-[#00CCBB] p-2 rounded-full"
//                             >
//                                 <Text className="text-white">Log out</Text>
//                             </TouchableOpacity>
//                         </View>

//                         <View>
//                             <TouchableOpacity
//                                 onPress={() => navigation.goBack()}
//                                 className="absolute top-14 left-5 p-2 bg-[#00CCBB] rounded-full"
//                             >
//                                 <ArrowLeftIcon size={28} color={'white'} />
//                             </TouchableOpacity>
//                         </View>
//                     </View>

//                     {/* Profile Info Section */}
//                     <View className="flex-row items-center flex-1 space-x-7 ml-14" style={{ marginTop: 120 }}>
//                         <Image
//                             className="w-20 h-20 border-4 border-white rounded-full"
//                             source={require('../assets/avatar_profile_icon.png')}
//                         />
//                         <View>
//                             <Text className="font-extrabold text-xl">Maksym Maksym</Text>
//                             <Text className="text-gray-500">Customer</Text>
//                         </View>
//                     </View>
//                 </SafeAreaView>

//                 <View >
//                     <View className="flex-row items-center space-x-4 px-4 py-3 my-5">
//                         <Text className="flex-1 text-xl font-bold">My orders:</Text>
//                     </View>

//                     <ScrollView className="divide-y divide-gray-200">
//                         {orders.map(order => (
//                             <TouchableOpacity
//                                 key={order.id}
//                                 className="p-5 bg-white shadow-sm mb-2"
//                                 onPress={() => navigation.navigate('OrderDetail', { order })}
//                             >
//                                 <Text className="font-bold text-lg">{order.restaurantName}</Text>
//                                 <Text className="text-gray-600">Total: <Currency quantity={order.totalAmount} currency="UAH" /></Text>
//                             </TouchableOpacity>
//                         ))}
//                     </ScrollView>
//                 </View>


//             </View>
//         </View>
//     );
// };

// export default CompletedProfileScreen;













import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, Alert, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { ArrowLeftIcon, Cog8ToothIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
// import Currency from 'react-currency-formatter';
import { useTranslation } from 'react-i18next';

const CompletedProfileScreen = () => {
    const navigation = useNavigation();
    // use auth and db instances exported from ../firebase (initialized with React Native persistence)
    // const auth and db are imported above
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const { t } = useTranslation();

    const sortedOrders = orders.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());

    const fetchOrders = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                const q = query(collection(db, 'Orders'), where('userId', '==', user.uid));
                const querySnapshot = await getDocs(q);
                const userOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setOrders(userOrders);
            } catch (error) {
                Alert.alert('Error', 'An error occurred while fetching orders.');
            } finally {
                setLoading(false);
                setRefreshing(false); // Stop refreshing animation
            }
        }
    };

    // Fetch orders on component mount
    useEffect(() => {
        fetchOrders();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigation.replace('Profile'); // Navigate to ProfileScreen after logout
        } catch (error) {
            Alert.alert('Logout Error', 'An error occurred while logging out.');
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchOrders();
    }, []);

    const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    return (
        <View className="flex-1 bg-[#FAFAFF]">
            {/* Header Section */}
            <View className="relative bg-[#0C4F39] p-5 rounded-3xl">
                {/* Logout Button */}
                <View className="absolute top-10 right-5 z-50">
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Settings")}
                        className="bg-[#FAFAFF] p-2 rounded-full"
                    >
                        <Cog8ToothIcon size={28} color={'#0C4F39'} />
                    </TouchableOpacity>
                </View>

                <View className="absolute top-10 left-5">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="p-2 bg-[#FAFAFF] rounded-full"
                    >
                        <ArrowLeftIcon size={28} color={'#0C4F39'} />
                    </TouchableOpacity>
                </View>

                <View className="flex-row items-center space-x-7 mt-20 ml-10">
                    <Image
                        className="w-20 h-20 border-4 border-white rounded-full"
                        source={require('../assets/avatar_profile_icon.png')}
                    />
                    <View>
                        <Text className="font-extrabold text-xl text-white">Maksym Maksym</Text>
                        <View className="flex-row items-center pt-2">
                            <Text className="text-white">{t("role")} • </Text>
                            <TouchableOpacity
                                onPress={handleLogout}
                                className="bg-[#FAFAFF] p-2 rounded-full ml-2"
                            >
                                <Text className="text-[#0C4F39]">{t("log_out")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>


            {/* Orders Section */}
            <View className="flex-1 p-4">
                <Text className="text-xl text-[#30343F] font-bold mb-4">{t("my_orders")}:</Text>

                {loading ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color="#00CCBB" />
                    </View>
                ) : orders.length === 0 ? (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-lg text-gray-600">{t("zero_orders_text")}</Text>
                    </View>
                ) : (
                    <ScrollView
                        className="divide-y divide-gray-200"
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={['#00CCBB']} // Customize color of the refresh indicator
                            />
                        }
                    >
                        {sortedOrders.map(order => (
                            <TouchableOpacity
                                key={order.id}
                                className="p-5 bg-white shadow-sm mb-2 rounded-lg"
                                onPress={() => navigation.navigate('OrderDetail', { order })}
                            >
                                <View className="flex-row items-center space-x-4">
                                    <Image
                                        className="w-16 h-16 rounded-xl"
                                        source={{ uri: order.restaurantImage }} // Ensure this URL is correct
                                    />
                                    <View className="flex-1">
                                        <Text className="font-bold text-lg text-[#0C4F39]">{order.restaurant}</Text>
                                        <Text className="font-bold">
                                            {/* {t("total")}: <Currency quantity={order.totalAmount} currency="UAH" /> */}
                                            {t("total")}: {order.totalAmount} UAH
                                        </Text>
                                        <Text className="text-gray-600">
                                            {t("date")}: {new Date(order.createdAt.toDate()).toLocaleDateString('uk-UA', { day: 'numeric', month: 'numeric', year: 'numeric' })}
                                        </Text>

                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}

                {orders.length > 0 && (
                    <View className="p-4 bg-[#FAFAFF] border-t border-gray-200 mt-4 flex-row bottom-3">
                        <Text className="font-bold text-xl flex-1">{t("total_amount")}:</Text>
                        <Text className="text-lg">
                            {/* <Currency quantity={totalAmount} currency="UAH" /> */}
                            {totalAmount} UAH
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

export default CompletedProfileScreen;
