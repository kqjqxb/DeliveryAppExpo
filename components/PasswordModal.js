import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

const PasswordModal = ({ isVisible, onClose, onSave, checkCurrentPassword }) => {
    const [step, setStep] = useState(1);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const { t } = useTranslation();

    React.useEffect(() => {
        setStep(1);
        setCurrentPassword('');
        setNewPassword('');
        setRepeatPassword('');
        setError('');
    }, [isVisible]);

    const handleNext = async () => {
        if (!currentPassword.trim()) {
            setError(t('enter_current_password'));
            return;
        }
        if (checkCurrentPassword) {
            const ok = await checkCurrentPassword(currentPassword);
            if (!ok) {
                setError(t('wrong_current_password'));
                return;
            }
        }
        setError('');
        setStep(2);
    };

    const handleSave = () => {
        if (!newPassword.trim() || !repeatPassword.trim()) {
            setError(t('enter_new_passwords'));
            return;
        }
        if (newPassword !== repeatPassword) {
            setError(t('passwords_do_not_match'));
            return;
        }
        setError('');
        onSave(currentPassword, newPassword);
    };

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
                    {step === 1 ? (
                        <>
                            <Text style={styles.title}>{t("enter_current_password")}</Text>
                            <TextInput
                                style={styles.input}
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                placeholder={t("current_password_placeholder")}
                                secureTextEntry
                                autoFocus
                            />
                            {error ? <Text style={styles.error}>{error}</Text> : null}
                            <View style={styles.buttons}>
                                <TouchableOpacity onPress={onClose} style={[styles.button, { backgroundColor: '#D3D3D3' }]}>
                                    <Text style={[styles.buttonText, { color: '#000' }]}>{t("cancel")}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleNext}
                                    style={[styles.button, { backgroundColor: "#0C4F39", opacity: currentPassword.trim() ? 1 : 0.7 }]}
                                >
                                    <Text style={[styles.buttonText, { color: "#fff" }]}>{t("next")}</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <>
                            <Text style={styles.title}>{t("enter_new_password_twice")}</Text>
                            <TextInput
                                style={styles.input}
                                value={newPassword}
                                onChangeText={setNewPassword}
                                placeholder={t("new_password_placeholder")}
                                secureTextEntry
                                autoFocus
                            />
                            <TextInput
                                style={styles.input}
                                value={repeatPassword}
                                onChangeText={setRepeatPassword}
                                placeholder={t("repeat_new_password_placeholder")}
                                secureTextEntry
                            />
                            {error ? <Text style={styles.error}>{error}</Text> : null}
                            <View style={styles.buttons}>
                                <TouchableOpacity onPress={onClose} style={[styles.button, { backgroundColor: '#D3D3D3' }]}>
                                    <Text style={[styles.buttonText, { color: '#000' }]}>{t("cancel")}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleSave}
                                    style={[styles.button, { backgroundColor: "#0C4F39", opacity: (newPassword.trim() && repeatPassword.trim()) ? 1 : 0.7 }]}
                                >
                                    <Text style={[styles.buttonText, { color: "#fff" }]}>{t("save")}</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
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
        marginBottom: 12,
        fontSize: 16,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 8,
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

export default PasswordModal;
