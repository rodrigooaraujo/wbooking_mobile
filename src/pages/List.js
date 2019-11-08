import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Image, AsyncStorage, StyleSheet, Alert } from 'react-native';

import logo from '../assets/logo.png';

import SpotList from '../components/SpotList';

import socketio from 'socket.io-client';

import api from '../services/api';

export default function List() {

    // AsyncStorage.removeItem('user');

    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs => {
            const techArray = storageTechs.split(',').map(tech => tech.trim());
            setTechs(techArray);
        });
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio(api.defaults.baseURL, {
                query: { user_id }
            });

            socket.on('bookingResponse', booking => {
                Alert.alert(`Your Request at ${booking.spot.company} on 
                ${booking.date} has been ${booking.approved ? 'APPROVED' : 'REJECTED'}!`);
            });

        });
    });

    return (
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.logo}></Image>
            <ScrollView showsVerticalScrollIndicator={false}>
                {techs.map(
                    tech => <SpotList key={tech} tech={tech} />
                )}
            </ScrollView>

        </SafeAreaView>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    logo: {
        height: 32,
        resizeMode: 'contain'
    }
});