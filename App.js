import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, useWindowDimensions } from 'react-native';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BooksScreen from './screens/BooksScreen';
import ReadingScreen from './screens/ReadingScreen';
import LibraryScreen from './screens/LibraryScreen';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from './constants/colors';
import BookDetails from './screens/BookDetails';





const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs({ user, setUser }) {

  const { height, width } = useWindowDimensions();
  let isLargeScreen = false;
  if (width > 500) {
    isLargeScreen = true;
  }


  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Search') iconName = 'search-outline';
          else if (route.name === 'Library') iconName = 'book-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primaryColor, // Amazon Orange
        tabBarInactiveTintColor: 'gray',
        headerStyle: { backgroundColor: '#232F3E' }, // Amazon Dark Blue
        headerTintColor: '#fff',
        headerShown: false,
        // tabBarPosition: isLargeScreen ? 'left' : 'bottom',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="Search" component={SearchScreen} /> */}
      <Tab.Screen name="Library">
        {(props) => <LibraryScreen {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {(props) => <ProfileScreen {...props} user={user} setUser={setUser} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState("guest");


  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!user ? (
              <Stack.Screen name="Login">
                {(props) => <LoginScreen {...props} onLogin={setUser} />}
              </Stack.Screen>
            ) : (
              <Stack.Screen name="MainApp">
                {(props) => <MainTabs user={user} setUser={setUser} />}
              </Stack.Screen>
            )}
            <Stack.Screen name="books">
              {(props) => <BooksScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name="bookdetails">
              {(props) => <BookDetails {...props} />}
            </Stack.Screen>
            <Stack.Screen name="reading">
              {(props) => <ReadingScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name="library">
              {(props) => <LibraryScreen {...props} />}
            </Stack.Screen>

          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff0000",
    alignItems: 'center',
    justifyContent: 'center',
  }
});
