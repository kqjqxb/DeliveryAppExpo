import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next'; // Імпорт для зміни мови

const LanguageModal = ({ isVisible, onClose }) => {
    const { t } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); // Ініціалізуємо мову

    // Використовуємо useEffect для оновлення вибраної мови при відкритті модального вікна
    useEffect(() => {
        if (isVisible) {
            setSelectedLanguage(i18n.language); // Оновлюємо вибрану мову при відкритті модального вікна
        }
    }, [isVisible]);

    const changeLanguage = () => {
        i18n.changeLanguage(selectedLanguage); // Змінюємо мову через i18n
        onClose(); // Закриваємо модальне вікно після зміни мови
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose} // Закрити при натисканні поза модальним вікном
            style={{ justifyContent: 'flex-end', margin: 0 }} // Стиль модального вікна
        >
            <View style={{ height: '45%', backgroundColor: '#FFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
                <Text style={{ textAlign: 'center', fontSize: 18, paddingBottom: 10 }}>{t("select_language")}</Text>
                <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue) => setSelectedLanguage(itemValue)} // Оновлюємо вибір мови
                >
                    <Picker.Item label="🇺🇦 Українська" value="uk" />
                    <Picker.Item label="🇬🇧 English" value="en" />
                </Picker>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={{ padding: 19, backgroundColor: '#D3D3D3', borderRadius: 10, flex: 1, marginRight: 5, alignItems: 'center' }}
                    >
                        <Text style={{ textAlign: 'center', color: '#000' }}>{t("cancel")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={changeLanguage} // Викликаємо функцію зміни мови
                        style={{ padding: 19, backgroundColor: '#0C4F39', borderRadius: 10, flex: 1, marginLeft: 5 }}
                    >
                        <Text style={{ textAlign: 'center', color: '#FFF' }}>{t("ok")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default LanguageModal;
