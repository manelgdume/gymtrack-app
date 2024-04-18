import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>

    <Text style={{ color: "#535673", fontSize: 18, fontFamily: 'mon', marginTop: 30, marginBottom: 30, marginLeft: 20 }}>Push day</Text>

    <View style={styles.cardWorkout}>
      <View style={{ flexDirection: "row", backgroundColor: '#020D70' }}>
      <View style={styles.inputCard}>
          <Text style={{ color: "white", fontSize: 10, fontFamily: 'mon-b', textAlign: 'left' }}>Exercise</Text>
          <Text style={{ color: "white", fontSize: 20, fontFamily: 'mon', textAlign: 'center' }}>Dumbell press</Text>
        </View>
        <View style={{ flexGrow: 1, backgroundColor: '#020D70' }}></View>
        <View style={styles.inputCard}>
          <Text style={{ color: "white", fontSize: 10, fontFamily: 'mon-b', textAlign: 'center' }}>WEIGTH (KG)</Text>
          <Text style={{ color: "white", fontSize: 20, fontFamily: 'mon', textAlign: 'center' }}>0</Text>
        </View>
        <View style={styles.inputCard}>
          <Text style={{ color: "white", fontSize: 10, fontFamily: 'mon-b', textAlign: 'center' }}>REPS</Text>
          <Text style={{ color: "white", fontSize: 20, fontFamily: 'mon', textAlign: 'center' }}>0</Text>
        </View>
      </View>
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

