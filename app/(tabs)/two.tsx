import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { Text } from '../../components/Themed';
import { Feather } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { previousDay } from 'date-fns';

interface SetData {
  weigths: number[];
  reps: number[];
}

interface Entrie {
  name: string;
  reps: number[];
  weigth: number[];
}

export default function TabTwoScreen() {
  const [isPickerVisible, setPickerVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [userSession, setUserSession] = useState<string | null>(null);
  const [exercises, setExercises] = useState<string[] | undefined>();
  const [name, setName] = useState<string | undefined>();
  const [sets, setSets] = useState<SetData[] | undefined>();
  const [entrie, setEntrie] = useState<Entrie[] | undefined>();
  const [dataLoaded, setDataLoaded] = useState<boolean>(false); // Nuevo estado

  const getData = async () => {
    try {
      const userSession = await SecureStore.getItemAsync('sessionJWT');
      setUserSession(userSession);
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${userSession}`,
        },
      };
      const user = await axios.get(`http://192.168.0.15:3000/user`, axiosConfig);
      const res = await axios.get(`http://192.168.0.15:3000/entrie/${date}`, axiosConfig);
      const splitDataResponse = await axios.get(`http://192.168.0.15:3000/split/${user.data.workout} `, axiosConfig);
      let eAux: string[] = [];
      for (let i = 0; i < splitDataResponse.data.workouts.length; i++) {
        if (splitDataResponse.data.workouts[i].name === res.data.name) {
          eAux = splitDataResponse.data.workouts[i].exercises;
        }
      }
      setName(res.data.name);
      setSets(res.data.sets);
      setExercises(eAux);
    } catch (e) {
      console.log(e);
    }
  };

  const setData = () => {
    let e: Entrie[] = [];
    let j = 0;
    let counter = 0;

    if (exercises && name && sets) {
      for (let i = 0; i < sets[0].reps.length; i += 3) {
        console.log(sets[0].weigths[i], sets[0].weigths[i + 1], sets[0].weigths[i + 2])
        e.push({
          name: exercises[j],
          weigth: [sets[0].weigths[i], sets[0].weigths[i + 1], sets[0].weigths[i + 2]],
          reps: [sets[0].reps[i], sets[0].reps[i + 1], sets[0].reps[i + 2]],
        });
        counter += 3;
        if (counter % 3 === 0) {
          j++;
        }
      }
      console.log(e);
      setEntrie(e);
      
    }
  };

  useEffect(() => {
    getData();
  }, [date]);

  useEffect(() => {
    setData();
  }, [exercises, name, sets]);
  useEffect(() => {
    setDataLoaded(true)
  }, [entrie]);

  useEffect(() => {
    console.log(entrie);
  }, [entrie]);

  const setDatePicker = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'dismissed') {
      setPickerVisible(false);
    }
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
      setDataLoaded(false)
      setPickerVisible(false);
    }
  };

  const compareDatesWithoutTime = (date1: Date, date2: Date): number => {
    const date1Str = `${date1.getFullYear()}-${date1.getMonth() + 1}-${date1.getDate()}`;
    const date2Str = `${date2.getFullYear()}-${date2.getMonth() + 1}-${date2.getDate()}`;

    if (date1Str < date2Str) {
      return -1;
    } else if (date1Str > date2Str) {
      return 1;
    } else {
      return 0;
    }
  };

  const nextDate = (d: Date) => {
    let dAux = new Date();
    if (compareDatesWithoutTime(dAux, d)) {
      const newDate = new Date(d);
      newDate.setDate(newDate.getDate() + 1);
      setDate(newDate);
      setDataLoaded(false)
    }
  };

  const previousDate = (d: Date) => {
    const newDate = new Date(d);
    newDate.setDate(newDate.getDate() - 1);
    setDate(newDate);
    setDataLoaded(false)
  };

  const showPicker = () => {
    setPickerVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardUserLayout}>
        <View style={styles.cardUser}>
          <TouchableOpacity onPress={() => previousDate(date)}>
            <Feather size={18} name="arrow-left" color="white" />
          </TouchableOpacity>
          <View style={{ flexGrow: 1, backgroundColor: '#020D70' }}></View>
          <TouchableOpacity
            style={{ backgroundColor: '#020D70', flexDirection: 'row' }}
            onPress={() => showPicker()}
          >
            <Feather size={16} name="calendar" color="white" style={{ marginTop: 2 }} />
            <Text style={{ color: 'white', fontSize: 16, fontFamily: 'mon', textAlign: 'center', marginLeft: 5 }}>
              {date.toDateString()}
            </Text>
          </TouchableOpacity>
          <View style={{ flexGrow: 1, backgroundColor: '#020D70' }}></View>
          <TouchableOpacity onPress={() => nextDate(date)}>
            <Feather size={18} name="arrow-right" color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {isPickerVisible && (
        <View style={styles.pickerContainer}>
          <DateTimePicker value={date} onChange={(event, selectedDate) => setDatePicker(event, selectedDate)} maximumDate={new Date()} />
        </View>
      )}

      {dataLoaded && ( // Mostrar ScrollView solo cuando los datos se hayan cargado
        <View>
          <ScrollView style={{ maxHeight: 650 ,marginTop: 20}}>
            {entrie &&
              entrie.map((e, i) => (
                <View style={{ marginTop: 5}}>
                  <Text style={{ color: '#535673', fontSize: 18, fontFamily: 'mon',marginHorizontal: 20, }}>{e.name}</Text>

                  <View style={{ flexDirection: 'row', backgroundColor: '#020D70', margin: 10, marginHorizontal: 20, padding: 10, paddingHorizontal: 20, borderRadius: 20, }}>
                    <View style={styles.inputCard}>
                      <Text style={{ color: 'white', fontSize: 10, fontFamily: 'mon-b', textAlign: 'left' }}>Set</Text>
                      <Text style={{ color: 'white', fontSize: 14, fontFamily: 'mon', textAlign: 'center' }}>1</Text>
                      <Text style={{ color: 'white', fontSize: 14, fontFamily: 'mon', textAlign: 'center' }}>2</Text>
                      <Text style={{ color: 'white', fontSize: 14, fontFamily: 'mon', textAlign: 'center' }}>3</Text>
                    </View>
                    <View style={{ flexGrow: 1, backgroundColor: '#020D70' }}></View>
                    <View style={styles.inputCard}>
                      <Text style={{ color: 'white', fontSize: 10, fontFamily: 'mon-b', textAlign: 'center' }}>WEIGHT (KG)</Text>
                      <Text style={{ color: 'white', fontSize: 14, fontFamily: 'mon', textAlign: 'center' }}>{e.weigth[0]}</Text>
                      <Text style={{ color: 'white', fontSize: 14, fontFamily: 'mon', textAlign: 'center' }}>{e.weigth[1]}</Text>
                      <Text style={{ color: 'white', fontSize: 14, fontFamily: 'mon', textAlign: 'center' }}>{e.weigth[2]}</Text>
                    </View>
                    <View style={styles.inputCard2}>
                      <Text style={{ color: 'white', fontSize: 10, fontFamily: 'mon-b', textAlign: 'center' }}>REPS</Text>
                      <Text style={{ color: 'white', fontSize: 14, fontFamily: 'mon', textAlign: 'center' }}>{e.reps[0]}</Text>
                      <Text style={{ color: 'white', fontSize: 14, fontFamily: 'mon', textAlign: 'center' }}>{e.reps[1]}</Text>
                      <Text style={{ color: 'white', fontSize: 14, fontFamily: 'mon', textAlign: 'center' }}>{e.reps[2]}</Text>
                    </View>
                  </View>

                </View>
              ))}
          </ScrollView>

        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    color: '#000',
  },
  cardUserLayout: {
    backgroundColor: '#020D70',
  },
  cardUser: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#020D70',
    marginHorizontal: 20,
    marginTop: 60,
    marginBottom: 12,
  },
  cardWorkout: {
    borderRadius: 20,
    backgroundColor: '#020D70',
    justifyContent: 'center',
    padding: 10,
    marginHorizontal: 20
  },
  inputCard: {
    backgroundColor: '#020D70',
    borderRadius: 20,
    justifyContent: 'center'
  },
  inputCard2: {
    marginLeft: 20,
    backgroundColor: '#020D70',
    borderRadius: 20,
    justifyContent: 'center'
  },
  pickerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  picker: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    zIndex: 1000,
  },
});
