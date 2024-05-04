import { StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { defaultStyles } from '../../constants/Styles';
import RNPickerSelect from 'react-native-picker-select';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Circle } from 'react-native-progress';
import { useRouter } from 'expo-router';


export default function TabTwoScreen() {
  const [split, setSplit] = useState()
  const router = useRouter();

  const setData = async (value: string) => {
    try {
      const userSession = await SecureStore.getItemAsync('sessionJWT');
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${userSession}`,
        },
      };
      const s = {
        split: value
      }
      console.log(s)
      const changeSplit = await axios.post(`http://192.168.0.15:3000/user/changeSplit`, s, axiosConfig);
      console.log(changeSplit.data)
    }
    catch (e) {
      console.log(e)
    }
  }
  const logout = async () => {
    try {
       const userSession = await SecureStore.deleteItemAsync('sessionJWT');
       console.log(userSession)
       router.push('/')
    }
    catch (e) {
      console.log(e)
    }
  }

  const getData = async () => {
    try {
      const userSession = await SecureStore.getItemAsync('sessionJWT');
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${userSession}`,
        },
      };
      const changeSplit = await axios.get(`http://192.168.0.15:3000/user`, axiosConfig);
      console.log(changeSplit.data)
      setSplit(changeSplit.data.workout)
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getData()
  }, []);
  const color = 'rgba(83, 86, 115, 1)';
  return (
    <View style={styles.container}>
      <View style={styles.cardUser}>
        <View style={styles.circle}>
          <MaterialCommunityIcons size={80} name='account' color="#020D70" />
        </View>
        <Text style={{ color: "white", fontSize: 24, marginTop: 10, textAlign: "center", fontFamily: 'mon' }}> Manel </Text>
        <Text style={{ color: "#B3B3B3", fontSize: 14, textAlign: "center", fontFamily: 'mon' }}> manelgdume@gmail.com </Text>
        <TouchableOpacity onPress={logout} style={{ flexDirection: 'row', alignContent: 'flex-end', backgroundColor: '#020D70', paddingHorizontal: 20, marginTop: 20 }}>
          <Feather size={20} name='log-out' color="white" style={{ marginTop: 10 }} />
          <Text style={{ color: "white", fontSize: 14, marginVertical: 10, textAlign: "center", fontFamily: 'mon' }}>Log out</Text>
        </TouchableOpacity>

      </View>
      <View>
        <Text style={{ color: "#535673", fontFamily: 'mon', fontSize: 18, marginTop: 60, marginLeft: 20 }}>Training</Text>
        <View style={styles.cardWorkout}>
          <View style={{ backgroundColor: '#020D70' }}>
            <Text style={{ fontSize: 16, color: 'white', fontFamily: 'mon-sb' }}>Workout</Text>
            <RNPickerSelect
              placeholder={{}}
              useNativeAndroidPickerStyle={false}
              value={split}
              style={{
                inputAndroid: {
                  fontFamily: 'mon',
                  fontSize: 12,
                  width: 200,
                  color: 'white',
                  backgroundColor: '#020D70',
                },
                iconContainer: {
                  backgroundColor: '#020D70',
                  top: 5,
                  right: 15,
                },
              }}
              Icon={() => {
                return <MaterialCommunityIcons size={20} color="white" name='chevron-down' />;
              }}
              onValueChange={(value) => setData(value)}
              items={[
                { label: 'Push Pull Legs (6 days)', value: 'Push Pull Legs' },
                { label: 'Torso Legs (4 days)', value: 'Upper-Lower' },
                { label: 'Full Body (3 days)', value: 'Full Body' },
              ]}
            />
          </View>
        </View>
      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  cardCharts: {
    margin: 20
  },
  btn: {
    backgroundColor: '#383464',
    height: 25,
    borderRadius: 20,
    marginTop: 20,
    marginRight: 50,
    alignItems: 'center',
  },
  btnText: {
    marginTop: 5,
    color: 'white',
    fontSize: 10,
    fontFamily: 'mon-b',
  },
  cardWorkout: {
    backgroundColor: '#020D70',
    margin: 20,
    padding: 20,
    borderRadius: 20,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  cardUserLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#020D70',
    borderRadius: 20,
  },
  cardUser: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#020D70',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 10,
    borderRadius: 20,
  },
  cardUser2: {
    backgroundColor: '#020D70',
    marginHorizontal: 20,
    marginTop: 60,
  },

  container: {
    fontFamily: 'mon',
    flex: 1,
    backgroundColor: 'white',
    color: '#000',
  },

  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperator: {
    fontFamily: 'mon-sb',
    color: '#eee',
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
});
