import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function TabLayout() {
  return (
    <React.Fragment>
      <StatusBar style="inverted" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "#fff", borderTopWidth: 0, marginTop: -500 },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{ title: "Home", tabBarIcon: () => <Ionicons name="home" size={24} color="#000" /> }}
        />
        <Tabs.Screen
          name="topics"
          options={{ title: "Topics", tabBarIcon: () => <Ionicons name="book" size={24} color="#000" /> }}
        />
        <Tabs.Screen
          name="practice"
          options={{ title: "Practice", tabBarIcon: () => <Ionicons name="mic" size={24} color="#000" /> }}
        />
        <Tabs.Screen
          name="testAudioScreen"
          options={{ title: "Test", tabBarIcon: () => <Ionicons name="beer-sharp" size={24} color="#000" /> }}
        />
        <Tabs.Screen
          name="profile"
          options={{ title: "Profile", tabBarIcon: () => <Ionicons name="person" size={24} color="#000" /> }}
        />
      </Tabs>
    </React.Fragment>
  );
}
