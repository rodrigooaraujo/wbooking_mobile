import React, { useState } from 'react';
import { SafeAreaView, AsyncStorage, TouchableOpacity, Alert, TextInput, View, StyleSheet, Text } from 'react-native';

import api from '../services/api';

export default function Booking({ navigation }) {
    const id = navigation.getParam('id');
    const [date, setData] = useState('');

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');

        const response = await api.post(`/spots/${id}/bookings`, {
            date: date
        }, {
                headers: { user_id }
            });

        Alert.alert(`Booking has been created with success: ${response.data._id}`);
        navigation.navigate('List');
    }

    function handleCancel() {
        navigation.navigate('List');
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.label}>BOOKING DATE*</Text>
                <TextInput style={styles.input}
                    placeholder=" For which date you wanna request? *"
                    keyboardType="default"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={date}
                    onChangeText={setData} />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Request booking</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
        marginTop: 50
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 5
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});