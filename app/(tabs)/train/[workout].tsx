import { StyleSheet, TouchableOpacity } from 'react-native';
import EditScreenInfo from '../../../components/EditScreenInfo';
import { Text, View } from '../../../components/Themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import NumericInput from 'react-native-numeric-input'
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export default function TabTwoScreen() {
  const { workout } = useLocalSearchParams();
  const [p, setP] = useState([0, 0]);
  const [weigth, setWeigth] = useState(0);
  const [reps, setReps] = useState(0);
  const [textButton, setTextButton] = useState("Next");
  const router = useRouter();

  const [exercisesObjects, setExercisesObjects] = useState(workout.toString().split(",").slice(0, -1).map(exercise => ({
    name: exercise,
    reps: [0, 0, 0],
    weigth: [0, 0, 0]
  })));

  useEffect(() => {
    setReps(exercisesObjects[p[0]].reps[p[1]]);
    setWeigth(exercisesObjects[p[0]].weigth[p[1]]);
    console.log(p[1] === 2 && p[0] === exercisesObjects.length - 1)
    if (p[1] === 2 && p[0] === exercisesObjects.length - 1) {
      setTextButton("Finish")
    }
    else {
      setTextButton("Next")
    }
  }, [p, exercisesObjects]);

  const saveWorkout = async () => {
    try {
      const userSession = await SecureStore.getItemAsync('sessionJWT');

      let name = workout.toString().split(",")[exercisesObjects.length]
      let allReps: any[] = [];
      let allWeights: any[] = [];
      exercisesObjects.forEach(exercise => {
        allReps = allReps.concat(exercise.reps);
        allWeights = allWeights.concat(exercise.weigth);
      });
      let entrie = {
        name: name,
        date: new Date(),
        sets: {
          weigths: allWeights,
          reps: allReps
        }
      }
      const headers = {
        Authorization: `Bearer ${userSession}`,
      }

      axios.post(`http://192.168.0.16:3000/entrie`, entrie, { headers })
        .then((response) => {
          console.log('Respuesta exitosa:', response.data);
        })
        .catch((error) => {
          console.error('Error en la petición:', error.message);
        });
    } catch (error) {

    }
    router.push({ pathname: `/(tabs)/one` });
  }

  const handlePressNext = () => {
    if (p[1] === 2 && p[0] === exercisesObjects.length - 1) {
      saveWorkout()
    }
    else {
      setP((prevP) => {
        if (prevP[1] === 2) return [prevP[0] + 1, 0];
        else return [prevP[0], prevP[1] + 1];
      });
    }
  };

  const handlePressBack = () => {
    if (p[1] === 0 && p[0] === 0) return;
    setP((prevP) => {
      if (prevP[1] === 0) return [prevP[0] - 1, 2];
      else return [prevP[0], prevP[1] - 1];
    });
    ;
  };
  const changeWeight = (value: number) => {
    setExercisesObjects((prevExercises) => {
      const updatedExercises = [...prevExercises];
      updatedExercises[p[0]].weigth[p[1]] = value;
      return updatedExercises;
    });
  };

  const changeReps = (value: number) => {
    setExercisesObjects((prevExercises) => {
      const updatedExercises = [...prevExercises];
      updatedExercises[p[0]].reps[p[1]] = value;
      return updatedExercises;
    });
  };

  return (
    <View style={styles.container}>

      <Text style={{ color: "#535673", fontSize: 18, fontFamily: 'mon', marginTop: 30, marginBottom: 30, marginLeft: 20 }}>{exercisesObjects[p[0]].name}- Set {p[1] + 1}</Text>

      <View style={styles.cardWorkout}>
        <View style={{ flexDirection: "row", backgroundColor: '#020D70' }}>
          <View style={styles.inputCard}>
            <Text style={{ color: "white", fontSize: 10, fontFamily: 'mon-b', textAlign: 'center' }}>WEIGTH (KG)</Text>
            <NumericInput
              initValue={weigth}
              value={weigth}
              minValue={0}
              step={10}
              type='plus-minus'
              textColor={'white'}
              rightButtonBackgroundColor={'#020D70'}
              leftButtonBackgroundColor={'#020D70'}
              rounded
              borderColor='#020D70'
              onChange={value => changeWeight(value)} />
          </View>
          <View style={{ flexGrow: 1, backgroundColor: '#020D70' }}></View>
          <View style={styles.inputCard}>
            <Text style={{ color: "white", fontSize: 10, fontFamily: 'mon-b', textAlign: 'center' }}>REPS</Text>
            <NumericInput
              initValue={reps}
              value={reps}
              minValue={0}
              step={1}
              type='plus-minus'
              textColor={'white'}
              rightButtonBackgroundColor={'#020D70'}
              leftButtonBackgroundColor={'#020D70'}
              rounded
              borderColor='#020D70'
              onChange={value => changeReps(value)} />
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <TouchableOpacity style={styles.btn} onPress={handlePressBack} >
          <Text style={styles.btnText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn2} onPress={handlePressNext} >
          <Text style={styles.btnText2}>{textButton}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    color: '#000',
  },
  btn: {
    backgroundColor: '#white',
    height: 25,
    width: 60,
    borderRadius: 20,
    marginTop: 20,
    marginRight: 10,
    alignItems: 'center',
    borderColor: '#020D70',
    borderWidth: 1
  },
  btnText: {
    marginTop: 3,
    color: '#020D70',
    fontSize: 10,
    fontFamily: 'mon-b',
  },
  btn2: {
    backgroundColor: '#020D70',
    height: 25,
    width: 60,
    borderRadius: 20,
    marginTop: 20,
    marginRight: 30,
    borderColor: '#020D70',
    borderWidth: 1
  },
  btnText2: {
    marginTop: 3,
    alignSelf: 'center',
    color: 'white',
    fontSize: 10,
    fontFamily: 'mon-b',
  },
  title: {
    fontSize: 20,

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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
