import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Pressable, useColorScheme, Image } from 'react-native';
 

export default function TabOneScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  
  return (
    <View style={isDarkMode? styles.dark : styles.light} >
      <View style={isDarkMode? styles.cardDark : styles.cardLight}>
        <Text style={styles.title}>Todays Workout</Text>
        
      </View>
      <View style={isDarkMode? styles.cardDark : styles.cardLight}>
        <Text style={styles.title}>This week</Text>
      </View>
      <View style={isDarkMode? styles.cardDark : styles.cardLight}>
        <Text style={styles.title}>Progress</Text>
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  dark: {
    backgroundColor: '#000',
    color:'#fff'
  },
  light: {
    backgroundColor: '#eee',
    color:'#000'
  },
  cardLight: {
    backgroundColor: '#fff',
    padding:10,
    margin: 20,
    borderRadius:10
  },
  cardDark: {
    backgroundColor: '#222',
    padding:10,
    margin: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
