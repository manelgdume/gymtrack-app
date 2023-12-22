import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme, Image } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from '../../components/Themed';
import { StatusBar } from 'expo-status-bar';
import Colors from '../../constants/Colors';
import * as SystemUI from 'expo-system-ui';
import { NavigationContainer } from '@react-navigation/native';
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
 }) {
  return <Feather size={26} style={{ marginTop: 8}} {...props} />;
}
function UserIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return <MaterialCommunityIcons size={36}  {...props} />;
}


function CustomHeader() {
  return (
    <Text style={{ fontWeight: 'bold', color: "#007aff" , fontSize:20}}>GYMTRACK</Text>
  );
}
SystemUI.setBackgroundColorAsync("white");
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      sceneContainerStyle={{backgroundColor: colorScheme === 'dark' ? '#000' : '#eee'}}
      screenOptions={{
 
       
        headerTitleAlign:"center",
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff', 
        },
        headerTitle: () => <CustomHeader />,
        headerLeft: () =><UserIcon name="account-circle" color="#007aff" />,
        headerLeftContainerStyle:({ paddingLeft:20 , marginRight:-20}),
        
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff', 
        },
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#eee' : '#000', 
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="activity" color={color} />,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="book-open" color={color} />,
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="settings" color={color} />,
        }}
      />
    </Tabs>
  );
}
