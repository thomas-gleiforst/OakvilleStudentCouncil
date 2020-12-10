import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import AllMembersScreen from "../screens/AllMembersScreen";
import CalendarScreen from "../screens/CalendarScreen";
import CreateEventScreen from "../screens/CreateEventScreen";
import CreateUserScreen from "../screens/CreateUserScreen";
import HomeScreen from "../screens/HomeScreen";
import MainScreen from "../screens/MainScreen";
import MeetingStatScreen from "../screens/MeetingStatScreen";
import QRCodeScreen from "../screens/QRCodeScreen";
import ScannerScreen from "../screens/ScannerScreen"
import {
  BottomTabParamList,
  AllMembersParamList,
  CalendarParamList,
  CreateEventParamList,
  CreateUserParamList,
  HomeParamList,
  MainParamList,
  MeetingStatParamList,
  QRCodeParamList,
  ScannerParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="AllMembers"
        component={AllMembersNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Calendar"
        component={CalendarNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="CreateEvent"
        component={CreateEventNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="CreateUser"
        component={CreateUserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Main"
        component={MainNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="MeetingStat"
        component={MeetingStatNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="QRCode"
        component={QRCodeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Scanner"
        component={ScannerNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const AllMembersStack = createStackNavigator<AllMembersParamList>();

function AllMembersNavigator() {
  return (
    <AllMembersStack.Navigator>
      <AllMembersStack.Screen
        name="AllMembersScreen"
        component={AllMembersScreen}
        options={{ headerTitle: "All Members" }}
      />
    </AllMembersStack.Navigator>
  );
}

const CalendarStack = createStackNavigator<CalendarParamList>();

function CalendarNavigator() {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{ headerTitle: "Calendar" }}
      />
    </CalendarStack.Navigator>
  );
}

const CreateEventStack = createStackNavigator<CreateEventParamList>();

function CreateEventNavigator() {
  return (
    <CreateEventStack.Navigator>
      <CreateEventStack.Screen
        name="CreateEventScreen"
        component={CreateEventScreen}
        options={{ headerTitle: "Create Event" }}
      />
    </CreateEventStack.Navigator>
  );
}

const CreateUserStack = createStackNavigator<CreateUserParamList>();

function CreateUserNavigator() {
  return (
    <CreateUserStack.Navigator>
      <CreateUserStack.Screen
        name="CreateUserScreen"
        component={CreateUserScreen}
        options={{ headerTitle: "Create User" }}
      />
    </CreateUserStack.Navigator>
  );
}

const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: "Home Screen" }}
      />
    </HomeStack.Navigator>
  );
}

const MainStack = createStackNavigator<MainParamList>();

function MainNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ headerTitle: "Main Screen" }}
      />
    </MainStack.Navigator>
  );
}

const MeetingStatStack = createStackNavigator<MeetingStatParamList>();

function MeetingStatNavigator() {
  return (
    <MeetingStatStack.Navigator>
      <MeetingStatStack.Screen
        name="MeetingStatScreen"
        component={MeetingStatScreen}
        options={{ headerTitle: "Meeting Stats" }}
      />
    </MeetingStatStack.Navigator>
  );
}

const QRCodeStack = createStackNavigator<QRCodeParamList>();

function QRCodeNavigator() {
  return (
    <QRCodeStack.Navigator>
      <QRCodeStack.Screen
        name="QRCodeScreen"
        component={QRCodeScreen}
        options={{ headerTitle: "QR Code" }}
      />
    </QRCodeStack.Navigator>
  );
}

const ScannerStack = createStackNavigator<ScannerParamList>();

function ScannerNavigator() {
  return (
    <ScannerStack.Navigator>
      <ScannerStack.Screen
        name="ScannerScreen"
        component={ScannerScreen}
        options={{ headerTitle: "Scanner" }}
      />
    </ScannerStack.Navigator>
  );
}
