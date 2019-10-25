import React, { useState, useEffect } from 'react';

import api from '../services/api';

import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';


export default function SpotList({ tech }) {

    const [spots, setSpots] = useState([]);

    useEffect(() => {

        async function loadSpots() {

            const response = await api.get('/spots', {
                params: { tech }
            });

            setSpots(response.data);
        }
        loadSpots();

    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Companies that work with: <Text style={styles.bold}>{tech}</Text>
            </Text>

            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listView}>
                        <Image
                            style={styles.thumbnail}
                            source={{ uri: item.thumbnail_url }}></Image>
                        <Text style={styles.company}>{item.company} </Text>
                        <Text style={styles.price}>{item.price ? `A$${item.price}/ day` : `0/ day`}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => { }}>
                            <Text style={styles.buttonText}>Request Booking</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>);
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15
    },
    bold: {
        fontWeight: 'bold'
    }
});