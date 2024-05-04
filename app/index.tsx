import { useRouter } from 'expo-router';
import { defaultStyles } from '../constants/Styles';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export default function Login () {
    const router = useRouter();

    const goToLogin = () => {
        router.push('/login')
    };
    const goToRegister = () => {
        router.push('/register')
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', color: "white", fontSize: 35, textAlign: 'center',marginBottom:200,marginTop:225 }}>GYMTRACK</Text>
            <View style={styles.btns}>
                <TouchableOpacity style={defaultStyles.btn} onPress={() => goToRegister()}>
                    <Text style={defaultStyles.btnText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOutline} onPress={() => goToLogin()}>
                    <Text style={styles.btnOutlineText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020D70',
        padding: 26,
        justifyContent: 'center'
    },
    btns:{
        marginTop: 200,
        justifyContent: 'flex-end'
    },
    btnOutline: {
        marginTop: 10,
        backgroundColor: '#020D70',
        borderWidth: 1,
        borderColor: '#020D70',
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    btnOutlineText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'mon-sb',
    },
});
 
