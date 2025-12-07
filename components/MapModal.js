import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapModal = ({ isVisible, onClose, onSave, initialLocation }) => {
    const [marker, setMarker] = useState(null);
    const [ignoreNextMapPress, setIgnoreNextMapPress] = useState(false);
    const dimensions = Dimensions.get('window');

    useEffect(() => {
        if (initialLocation) {
            setMarker(initialLocation);
        }
    }, [initialLocation, isVisible]);

    return (
        <Modal visible={isVisible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Виберіть адресу</Text>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: marker ? marker.latitude : 50.4501,
                            longitude: marker ? marker.longitude : 30.5234,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        onPress={e => {
                            if (ignoreNextMapPress) {
                                setIgnoreNextMapPress(false);
                                return;
                            }
                            setMarker(e.nativeEvent.coordinate);
                        }}
                    >
                        {marker && <Marker coordinate={marker} pinColor='#0C4F39'/>}
                        
                        <TouchableOpacity
                            style={[styles.button, {
                                backgroundColor: '#0C4F39',
                                position: 'absolute',
                                bottom: dimensions.height * 0.01,
                                right: dimensions.height * 0.005,
                                zIndex: 10
                            }]}
                            onPress={() => {
                                if (initialLocation) {
                                    setIgnoreNextMapPress(true);
                                    setMarker(initialLocation);
                                }
                            }}
                            activeOpacity={0.8}
                        >
                            <Image
                                source={require('../assets/gpsIcon.png')}
                                style={{
                                    width: dimensions.width * 0.05,
                                    height: dimensions.width * 0.05,
                                    tintColor: 'white',
                                }}
                            />
                        </TouchableOpacity>
                    </MapView>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <Text style={styles.buttonText}>Закрити</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#0C4F39' }]}
                            onPress={() => marker && onSave(marker)}
                            disabled={!marker}
                        >
                            <Text style={[styles.buttonText, { color: '#fff' }]}>Зберегти</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center'
    },
    container: {
        width: '90%', backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', alignItems: 'center'
    },
    title: {
        fontSize: 18, fontWeight: 'bold', marginVertical: 12
    },
    map: {
        width: Dimensions.get('window').width * 0.85,
        height: 300,
        borderRadius: 12,
    },
    buttons: {
        flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 16
    },
    button: {
        flex: 1, marginHorizontal: 5, padding: 12, borderRadius: 8, backgroundColor: '#eee', alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold'
    }
});

export default MapModal;
