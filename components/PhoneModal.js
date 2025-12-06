import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

function formatPhone(input) {
    // Remove all non-digit except leading '+'
    let digits = input.replace(/[^\d]/g, '');
    // Ensure starts with '38'
    if (!digits.startsWith('38')) {
        digits = '38' + digits.replace(/^38*/, '');
    }
    // Limit to 10 digits after '38'
    digits = digits.slice(0, 12); // '38' + 10 digits
    // Format as '+38 000 000 0000'
    let formatted = '+38';
    if (digits.length > 2) {
        formatted += ' ' + digits.slice(2, 5);
    }
    if (digits.length > 5) {
        formatted += ' ' + digits.slice(5, 8);
    }
    if (digits.length > 8) {
        formatted += ' ' + digits.slice(8, 12);
    }
    return formatted;
}

const PhoneModal = ({ isVisible, onClose, onSave, initialPhone }) => {
    const { t } = useTranslation();
    // Always start with "+38"
    const [phone, setPhone] = useState(formatPhone(initialPhone || '+38'));

    React.useEffect(() => {
        setPhone(formatPhone(initialPhone || '+38'));
    }, [initialPhone, isVisible]);

    const handleChange = (text) => {
        // Remove all non-digit except '+'
        let digits = text.replace(/[^\d]/g, '');
        // Always start with '38'
        if (!digits.startsWith('38')) {
            digits = '38' + digits.replace(/^38*/, '');
        }
        // Limit to 10 digits after '38'
        digits = digits.slice(0, 12);
        setPhone(formatPhone('+' + digits));
    };

    const isValid = phone.length === 16; // "+38 000 000 0000"

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            style={{ justifyContent: 'flex-end', margin: 0 }}
            avoidKeyboard
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <View style={styles.modal}>
                    <Text style={styles.title}>{t("enter_phone")}</Text>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={handleChange}
                        placeholder={t("phone_placeholder")}
                        keyboardType="phone-pad"
                        autoFocus
                        maxLength={16}
                    />
                    <Text style={{ color: isValid ? 'green' : 'red', marginBottom: 8, textAlign: 'center' }}>
                        {t("phone_format_info") || "+38 000 000 0000"}
                    </Text>
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={onClose} style={[styles.button, { backgroundColor: '#D3D3D3' }]}>
                            <Text style={[styles.buttonText, { color: '#000' }]}>{t("cancel")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (isValid) onSave(phone);
                            }}
                            style={[styles.button, { backgroundColor: "#0C4F39", opacity: isValid ? 1 : 0.7 }]}
                        >
                            <Text style={[styles.buttonText, { color: "#fff" }]}>{t("save")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#fff',
        padding: 24,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: "#0C4F39",
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginBottom: 8,
        fontSize: 16,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PhoneModal;
