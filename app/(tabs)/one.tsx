import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Pressable, useColorScheme, Image } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { isLoaded } from 'expo-font';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Circle } from 'react-native-progress';
import { defaultStyles } from '../../constants/Styles';
import { BarChart, LineChart } from "react-native-gifted-charts";
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function TabOneScreen() {
  const [eventDates, setEventDates] = useState([]);
  const [username, setUsername] = useState(null)
  const [ToEnabled, setToEnabled] = useState(true)
  const [exercises, setExercises] = useState(String)
  const [day, setDay] = useState(String)
  const currentDate = new Date();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [workout, setWorkout] = useState()

  const handlePress = () => {
    if (day != null)
      router.push({ pathname: `/(tabs)/train/${workout}` });

  };
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userSession = await SecureStore.getItemAsync('sessionJWT');
        const axiosConfig = {
          headers: {
            Authorization: `Bearer ${userSession}`,
          },
        };

        await axios.get(`http://192.168.0.16:3000/user`, axiosConfig).then(async res => {
          const userdata = res.data;
          setUsername(userdata.username);
          const currentDate = new Date();
          const splitDataResponse = await axios.get(`http://192.168.0.16:3000/split/${res.data.workout}`, axiosConfig);

          let dayAux = currentDate.getDay()
 

          if (splitDataResponse.data.days[dayAux] == 'Rest') {
            let rest: any = "REST"
            setToEnabled(false)
            setDay(rest);
            setExercises('')
          }
          else {
            setToEnabled(true)
            let d = splitDataResponse.data.days[dayAux]
            setDay(d);
            let w = getExercisesByName(d , splitDataResponse.data.workouts).length
            let aux = getExercisesByName(d , splitDataResponse.data.workouts)
            aux.push(d)
            setWorkout(aux)
            setExercises(w + " exercises")
          }
        });

      } catch (error) {
        console.error('Error en la petición:', error);
      }
    };
    getUserData();
  }, [isLoaded]);


  const color = 'rgba(83, 86, 115, 1)';
  const barData = [
    { value: 110 },
    { value: 20 },
    { value: 40 },
    { value: 45 },
    { value: 55, },
    { value: 60 },
    { value: 90 },
    { value: 110 },
    { value: 120 },
    { value: 100, },
    { value: 90 },
    { value: 100 },
    { value: 88 },
    { value: 80 },
    { value: 120, },
    { value: 76 },
    { value: 90 },
    { value: 100 },
    { value: 88 },
    { value: 88 },
    { value: 88 },

  ];

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const formattedDate = months[currentDate.getMonth()] + ' ' + ('0' + currentDate.getDate()).slice(-2) + ', ' + currentDate.getFullYear();

  const date = formattedDate.toUpperCase();


  return (
    <View style={styles.container}>
      <View style={styles.cardUserLayout}>

        <View style={styles.cardUser}>
          <Text style={{ color: "#B3B3B3", fontSize: 10,fontFamily: 'mon' }}><Feather size={10} name='calendar' color="#B3B3B3" /> {date}</Text>
          <Text style={{ color: "white", fontSize: 24, marginTop: 30, textAlign: "left",fontFamily: 'mon'  }}>Hi <Text style={{ fontFamily: 'mon-b', color: "white" }}>{username}</Text>,</Text>
          <Text style={{ color: "white", fontSize: 24, textAlign: "left",fontFamily: 'mon' }}>Welcome back!</Text>
          <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: '#020D70', marginTop: 20, marginBottom: 0 }}>
            <Circle style={{ marginTop: 6, marginRight: 3 }} size={9} indeterminate={false} progress={0.15} color="white" strokeCap="butt" unfilledColor={color} borderWidth={0} thickness={1} />

            <View style={{ marginTop: 5, marginRight: 10 }}>
              <Text style={{ color: "white", fontSize: 10, backgroundColor: '#020D70',fontFamily: 'mon' }}>15% complete</Text>
            </View>

            <MaterialCommunityIcons style={{ marginTop: 5 }} size={12} name='fire' color="#F26B35" />
            <View style={{ marginTop: 5 }}>
              <Text style={{ color: "white", fontSize: 10, backgroundColor: '#020D70',fontFamily: 'mon' }}>3 days Streak</Text>
            </View>

          </View>
        </View>
        <View style={styles.cardUser}>
          <View style={styles.circle}>
            <MaterialCommunityIcons size={40} name='account' color="#020D70" />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: '#020D70', marginTop: 60, marginBottom: 0 }}>
            <View style={{ marginTop: 5 }}>
              <Text style={{ color: "white", fontSize: 10, fontFamily: 'mon-b', backgroundColor: '#020D70', }}>See more</Text>
            </View>
            <MaterialCommunityIcons style={{ marginTop: 7 }} size={18} name='arrow-right-thin' color="white" />
          </View>
        </View>
      </View>
      <View>
        <Text style={{ color: "#535673", fontSize: 18, marginTop: 30, marginLeft: 20,fontFamily: 'mon' }}>Today's Workout</Text>
        <View style={styles.cardWorkout}>
          <View style={{ flexDirection: "row", backgroundColor: '#020D70', borderRadius: 20 }}>
            <View style={{ backgroundColor: "#020D70", margin: 25, marginVertical: 10 }}>
              <View style={{ flexDirection: "row", backgroundColor: '#020D70', marginBottom: 20 }}>
                <MaterialCommunityIcons style={{ marginTop: 5 }} size={12} name='clock-time-four-outline' color="white" />
                <View style={{ marginTop: 5, marginRight: 10 }}>
                  <Text style={{ color: "white", fontSize: 10, backgroundColor: '#020D70',fontFamily: 'mon' }}> 70 min</Text>
                </View>

                <MaterialCommunityIcons style={{ marginTop: 5 }} size={12} name='run' color="white" />
                <View style={{ marginTop: 5 }}>
                  <Text style={{ color: "white", fontSize: 10, backgroundColor: '#020D70',fontFamily: 'mon' }}> 240 Kcal</Text>
                </View>
              </View>
              <Text style={{ color: "white", fontSize: 20, fontFamily: 'mon-b', backgroundColor: '#020D70' }}>{day.toUpperCase()} DAY</Text>
              <Text style={{ color: "white", fontSize: 10, backgroundColor: '#020D70',fontFamily: 'mon' }}>{exercises}</Text>
              {ToEnabled ?
                <TouchableOpacity style={styles.btn} onPress={handlePress} >
                  <Text style={styles.btnText}>Train</Text>
                </TouchableOpacity> : null}

            </View>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1652363722833-509b3aac287b?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
              style={{ width: 150, height: 150, marginLeft: 40, borderRadius: 20 }}
            />
          </View>
        </View>
      </View>
      <Text style={{ color: "#535673", fontSize: 18, marginLeft: 20,fontFamily: 'mon' }}>Stats</Text>

      <View style={styles.cardCharts}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ margin: 0, backgroundColor: '#020D70', borderRadius: 20, paddingTop: 10, paddingRight: 20 }}>
            <Text style={{ color: "white", fontSize: 20, backgroundColor: '#020D70', fontFamily: 'mon-b', marginLeft: 20, marginBottom: 10 }}>LIFTED</Text>
            <View style={{ marginRight: -24.5, marginLeft: -10, backgroundColor: "transparent" }}>
              <LineChart
                initialSpacing={0}
                endSpacing={0}
                data={barData}
                isAnimated
                areaChart
                width={175}
                height={100}
                yAxisThickness={0}
                xAxisThickness={0}
                stepValue={100}
                maxValue={120}
                spacing={8}
                hideDataPoints
                hideRules
                disableScroll
                curved
                hideYAxisText
                color={'white'}
                dataPointsColor={'#535673'}
                startFillColor={"#535673"}
                endFillColor1={"#020D70"}
              />
            </View>
            <Text style={{ color: "white", fontSize: 10, backgroundColor: '#020D70', marginLeft: 20, marginBottom: 10,fontFamily: 'mon' }}>Last update 5 days</Text>
          </View>
          <View style={{ flexGrow: 1 }}></View>
          <View style={{ margin: 0, backgroundColor: '#020D70', borderRadius: 20, paddingTop: 10, paddingRight: 20 }}>
            <Text style={{ color: "white", fontSize: 20, backgroundColor: '#020D70', fontFamily: 'mon-b', marginLeft: 15, marginBottom: 10 }}>WORKOUTS</Text>
            <View style={{ marginRight: -24.5, marginLeft: -10, backgroundColor: "transparent" }}>
              <LineChart
                initialSpacing={0}
                endSpacing={0}
                data={barData}
                isAnimated
                areaChart
                width={175}
                height={100}
                yAxisThickness={0}
                xAxisThickness={0}
                stepValue={100}
                maxValue={120}
                spacing={8}
                hideDataPoints
                hideRules
                disableScroll
                curved
                hideYAxisText
                color={'white'}
                dataPointsColor={'#535673'}
                startFillColor={"#535673"}
                endFillColor1={"#020D70"}
              />
            </View>
            <Text style={{ color: "white", fontSize: 10, backgroundColor: '#020D70', marginLeft: 20, marginBottom: 10,fontFamily: 'mon' }}>Last update 1 days</Text>
          </View>
        </View>
      </View>
    </View>

  );
}

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
    borderRadius: 20,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginLeft: 15
  },
  container: {
    fontFamily: 'mon',
    flex: 1,
    backgroundColor: 'white',
    color: '#000',
  },
  cardUserLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#020D70',
    borderRadius: 20,
  },
  cardUser: {
    backgroundColor: '#020D70',
    marginHorizontal: 20,
    marginTop: 60,
    marginBottom: 10,
  },
  cardUser2: {
    backgroundColor: '#020D70',
    marginHorizontal: 20,
    marginTop: 60,
  },
});

function getExercisesByName(name : string ,data :any) {
  for (let i=0; i < data.length; i++) {
    if (data[i].name === name) {
      return data[i].exercises;
    }
  }
  return -1;  
}