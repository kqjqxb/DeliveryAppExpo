import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

const EmailModal = ({ isVisible, onClose, onSave, initialEmail }) => {
    const [email, setEmail] = useState(initialEmail || '');
    const { t } = useTranslation();

    React.useEffect(() => {
        setEmail(initialEmail || '');
    }, [initialEmail, isVisible]);

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
                    <Text style={styles.title}>{t("enter_email")}</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder={t("email_placeholder")}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        autoFocus
                    />
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={onClose} style={[styles.button, { backgroundColor: '#D3D3D3' }]}>
                            <Text style={[styles.buttonText, { color: '#000' }]}>{t("cancel")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (email.trim()) onSave(email.trim());
                            }}
                            style={[styles.button, { backgroundColor: "#0C4F39", opacity: email.trim() ? 1 : 0.7 }]}
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
        marginBottom: 18,
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

export default EmailModal;
