// // CourierLocationUpdater.js
// import { db } from '../firebase'; // Імпорт вашого Firebase конфігу
// import * as Location from 'expo-location';
// import { useEffect } from 'react';

// // Функція для оновлення місцезнаходження кур'єра у Firestore
// const updateCourierLocation = async () => {
//   // Запит на отримання дозволу для доступу до місцезнаходження
//   let { status } = await Location.requestForegroundPermissionsAsync();
//   if (status !== 'granted') {
//     console.log('Permission to access location was denied');
//     return;
//   }

//   // Отримання поточного місцезнаходження кур'єра
//   let location = await Location.getCurrentPositionAsync({});

//   // Оновлення Firestore з новим місцезнаходженням
//   db.collection('couriers').doc('courier_001').set({
//     latitude: location.coords.latitude,
//     longitude: location.coords.longitude,
//   });
// };

// // Функціональний компонент, який періодично оновлює місцезнаходження кур'єра
// const CourierLocationUpdater = () => {
//   useEffect(() => {
//     // Запуск оновлення місцезнаходження кожні 5 секунд
//     const interval = setInterval(() => {
//       updateCourierLocation();
//     }, 5000); // Оновлення кожні 5 секунд

//     return () => clearInterval(interval); // Очищення інтервалу при виході з компонента
//   }, []);

//   return null; // Цей компонент не рендерить нічого
// };

// export default CourierLocationUpdater;




// CourierLocationUpdater.js
import { collection, doc, setDoc } from 'firebase/firestore'; // Імпорт методів Firestore
import { db } from './firebase'; // Правильний імпорт Firestore з вашого файлу
import { useEffect } from 'react';

// Мокові координати для тестування
const mockLocation = {
    latitude: 46.62610, // Наприклад, фіксовані координати (широта)
    longitude: 31.09958, // Наприклад, фіксовані координати (довгота)
  };

// Функція для оновлення місцезнаходження кур'єра у Firestore
const updateCourierLocation = async () => {
  try {
    // Задаємо посилання на документ у колекції
    const courierRef = doc(collection(db, 'couriers'), 'kMg0jZlC3CkOx9FOcYIl'); 
    await setDoc(courierRef, mockLocation, { merge: true }); // Запис даних до Firestore з опцією merge

    console.log('Місцезнаходження кур’єра успішно оновлено');
  } catch (error) {
    console.error('Помилка при оновленні місцезнаходження кур’єра:', error);
  }
};

// Компонент для періодичного оновлення координат
const CourierLocationUpdater = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      updateCourierLocation();
    }, 5000); // Оновлення кожні 5 секунд

    return () => clearInterval(interval); // Очищення інтервалу при виході з компонента
  }, []);

  return null;
};

export default CourierLocationUpdater;
