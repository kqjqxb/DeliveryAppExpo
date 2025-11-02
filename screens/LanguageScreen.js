import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal'; // Використовуємо бібліотеку 'react-native-modal'

const LanguageScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('uk');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Кнопка вибору мови */}
      <TouchableOpacity onPress={toggleModal} style={styles.languageButton}>
        <Text style={styles.languageButtonText}>Select Language</Text>
      </TouchableOpacity>

      {/* Модальне вікно */}
      <Modal 
        isVisible={isModalVisible}
        onBackdropPress={toggleModal} // Закриває при натисканні поза вікном
        style={styles.modal} // Стилізація, щоб модальне вікно займало частину екрану
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Language</Text>
          <ScrollView>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
            >
              <Picker.Item label="Українська" value="uk" />
              <Picker.Item label="English" value="en" />
            </Picker>
          </ScrollView>
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  languageButton: {
    padding: 10,
    backgroundColor: '#0C4F39',
    borderRadius: 5,
  },
  languageButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  modal: {
    justifyContent: 'flex-end', // Відображає вікно в нижній частині екрана
    margin: 0, // Забирає маргін навколо модального вікна
  },
  modalContent: {
    height: '25%', // Модальне вікно займає чверть екрану
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingBottom: 10,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#0C4F39',
    margin: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    textAlign: 'center',
    color: '#FFF',
  },
});

export default LanguageScreen;
