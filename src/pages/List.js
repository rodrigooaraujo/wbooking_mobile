import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, AsyncStorage, StyleSheet } from 'react-native';

import logo from '../assets/logo.png';

import SpotList from '../components/SpotList';

async function test() {

}

export default function List() {

    //AsyncStorage.removeItem('user');

    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs => {
            const techArray = storageTechs.split(',').map(tech => tech.trim());
            setTechs(techArray);
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.logo}></Image>

            {techs.map(
                tech => <SpotList key={tech} tech={tech} />
            )}

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