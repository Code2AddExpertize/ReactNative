import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./src/screens/authentication/LoginPage.js";
import { StatusBar } from "expo-status-bar";
import SignUpPage from "./src/screens/authentication/SignUpPage.js";
import UpdateEvent from "./src/screens/PersonalEventPages/UpdateEvent.js";
import Constants from "./src/constants/Constants.js";
import AuthContextProvider, { AuthContext } from "./src/store/auth-context.js";
import { useContext, useEffect, useState } from "react";
import { Colors } from "./src/constants/styles.js";
import { Feather } from "react-native-vector-icons";
import { FIREBASE_AUTH, handleSignOut } from "./FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import * as SQLite from "expo-sqlite";
import Query from "./src/constants/Queries.js";
import MyEvents from "./src/screens/PersonalEventPages/MyEvents.js";
import NominateEventPage from "./src/screens/Other/NominateEventPage.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OtherEventList from "./src/screens/Other/OtherEventList.js";
import CreateEvent from "./src/screens/PersonalEventPages/CreateEvent.js";
import EventDetailForNomination from "./src/screens/Other/EventDetailForNomination.js";
import EventDetailForEditing from "./src/screens/Other/EventDetailForEditing.js";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
//Used for Authenticating Users and Registrating Users
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: '#F2F2F2' },
      }}
    >
      <Stack.Screen name={Constants.LoginPageStr} component={LoginPage} />
      <Stack.Screen name={Constants.SignUpPageStr} component={SignUpPage} />
    </Stack.Navigator>
  );
}

//Logout Logic
function LogoutButton() {
  const authCtx = useContext(AuthContext);
  function handleLogout() {
    handleSignOut();
    authCtx.logout();
  }

  return (
    <Feather name="log-out" size={24} color="white" onPress={handleLogout} />
  );
}

//Is Used when users are loggedIn
function AuthenticatedStack() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        activeTintColor: Colors.primary800,
      }}
    >
      <Tab.Screen
        name="My Events List"
        component={PersonalStack}
        options={{
          headerShown:false,
          tabBarLabel: "My Events",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Other Events"
        component={OtherEventsStack}
        options={{
          headerShown:false,
          tabBarLabel: "Other Events",
          tabBarIcon: ({ color, size }) => (
            <Feather
              name="settings"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function OtherEventsStack() {
  return (
    <Stack.Navigator
      initialRouteName={Constants.OtherEventsList}
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: '#F2F2F2' },
        headerRight: () => <LogoutButton />,
      }}
    >
      <Stack.Screen
        name={Constants.OtherEventsList}
        component={OtherEventList}
      />
      <Stack.Screen
        name={Constants.NominateEventPage}
        component={NominateEventPage}
      />
      <Stack.Screen
        name={Constants.EventDetail}
        component={EventDetailForNomination}
      />
    </Stack.Navigator>
  );
}

function PersonalStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: '#F2F2F2' },
        headerRight: () => <LogoutButton />,
      }}
    >
      <Stack.Screen name={Constants.MyEvents} component={MyEvents} />
      <Stack.Screen name={Constants.CreateEventStr} component={CreateEvent} />
      <Stack.Screen name={Constants.UpdateEventStr} component={UpdateEvent} />
      <Stack.Screen name={Constants.EventDetailEditing} component={EventDetailForEditing} />
    </Stack.Navigator>
  );
}

//Will Decide on the basis of Context Value , what have to show
function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer headerTitleStyle={{ textAlign: "center" }}>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

//App Starting Point
const App = () => {
  const db = SQLite.openDatabase("events.db");
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(Query.CREATE_TABLE_EVENTS);
      tx.executeSql(Query.CREATE_TABLE_NOMINATIONS);
    });

    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      // console.log(`App.js User:${JSON.stringify(user)}`);
    });
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
};
export default App;
