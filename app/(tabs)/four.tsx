import { StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { defaultStyles } from '../../constants/Styles';
import RNPickerSelect from 'react-native-picker-select';


export default function TabTwoScreen() {
  

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ color: "#535673", fontSize: 18, marginTop: 60, marginLeft: 20 }}></Text>
 
        <View style={styles.cardWorkout}>
          <Text style={{ fontSize: 20, color: "white", fontFamily: 'mon-b', }}>SPLIT</Text>
          <View style={{ backgroundColor: '#020D70' }}>
            <Text style={{ fontSize: 16, color: 'white', fontFamily: 'mon-sb', marginTop: 10 }}>Workout</Text>
            <RNPickerSelect
              placeholder={{}}
              useNativeAndroidPickerStyle={false}
              value={'ppl'}
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
              onValueChange={(value) => console.log(value)}
              items={[
                { label: 'Push Pull Legs (6 days)', value: 'Push Pull Legs' },
                { label: 'Torso Legs (4 days)', value: 'Upper-Lower' },
                { label: 'Full Body (3 days)', value: 'Full Body' },
              ]}
            />
          </View>
          <View style={{ backgroundColor: '#020D70' }}>
            <Text style={{ fontSize: 16, color: 'white', fontFamily: 'mon-sb', marginTop: 10 }}>First day</Text>
            <RNPickerSelect
              placeholder={{}}
              useNativeAndroidPickerStyle={false}
              value={'m'}
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
              onValueChange={(value) => console.log(value)}
              items={[
                { label: 'Monday', value: 'm' },
                { label: 'Tuesday', value: 't' },
                { label: 'Wednesday', value: 'w' },
                { label: 'Thursday', value: 'th' },
                { label: 'Friday', value: 'f' },
                { label: 'Saturday', value: 'st' },
                { label: 'Sunday', value: 'sn' },
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
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginLeft: 15
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
