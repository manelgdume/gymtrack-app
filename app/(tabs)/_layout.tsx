
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme, Image } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from '../../components/Themed';
import * as SystemUI from 'expo-system-ui';
import * as NavigationBar from 'expo-navigation-bar';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
}) {
  return <Feather size={26} style={{ marginTop: 8 }} {...props} />;
}

function CustomHeader() {
  return (
    <Text style={{ fontFamily: 'mon-b', color: "#007aff", fontSize: 20 }}>GYMTRACK</Text>
  );
}
NavigationBar.setBackgroundColorAsync("#020D70");
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      sceneContainerStyle={{ backgroundColor: '#020D70' }}
      screenOptions={{
 
        headerShown: false,

        tabBarStyle: {
          backgroundColor: '#020D70',

        },
        tabBarInactiveTintColor: '#797EAA',
        tabBarActiveTintColor: '#FFFFFF'
      }}>
      <Tabs.Screen
        name="one"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="book-open" color={color} />,
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="menu" color={color} />,
        }}
      />
      <Tabs.Screen
        name="train/[workout]"
        
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#020D70',
          },
           title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="menu" color={color} />,
          href: null,
        }}
      />
    </Tabs>
  );
}
