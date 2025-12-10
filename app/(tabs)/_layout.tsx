// import Ionicons from "@expo/vector-icons/Ionicons";
// import { Tabs } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import React from "react";

// export default function TabLayout() {
//   return (
//     <React.Fragment>
//       <StatusBar style="inverted" />
//       <Tabs
//         screenOptions={{
//           headerShown: false,
//           tabBarStyle: { backgroundColor: "#fff", borderTopWidth: 0, marginTop: -500 },
//         }}
//       >
//         <Tabs.Screen
//           name="index"
//           options={{ title: "Home", tabBarIcon: () => <Ionicons name="home" size={24} color="#000" /> }}
//         />
//         <Tabs.Screen
//           name="topics"
//           options={{ title: "Topics", tabBarIcon: () => <Ionicons name="book" size={24} color="#000" /> }}
//         />
//         <Tabs.Screen
//           name="practice"
//           options={{ title: "Practice", tabBarIcon: () => <Ionicons name="mic" size={24} color="#000" /> }}
//         />
//         <Tabs.Screen
//           name="testAudioScreen"
//           options={{ title: "Test", tabBarIcon: () => <Ionicons name="beer-sharp" size={24} color="#000" /> }}
//         />
//         <Tabs.Screen
//           name="profile"
//           options={{ title: "Profile", tabBarIcon: () => <Ionicons name="person" size={24} color="#000" /> }}
//         />
//       </Tabs>
//     </React.Fragment>
//   );
// }

import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  return (
    <React.Fragment>
      <StatusBar style="inverted" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: "none", // Ocultamos el tab bar nativo
          },
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="topics" />
        <Tabs.Screen name="practice" />
        <Tabs.Screen name="testAudioScreen" />
        <Tabs.Screen name="profile" />
      </Tabs>

      {/* Tab bar personalizado con navegación */}
      <CustomTabBar />
    </React.Fragment>
  );
}

// const CustomTabBar = () => {
//   const router = useRouter();
//   const pathname = usePathname();

//   const tabs = [
//     { name: "Home", icon: "home", route: "/" },
//     { name: "Topics", icon: "book", route: "/topics" },
//     { name: "AI Chat", icon: "mic", route: "/practice", isCenter: true },
//     { name: "Test", icon: "beer-sharp", route: "/testAudioScreen" },
//     { name: "Profile", icon: "person", route: "/profile" },
//   ];

//   const isActive = (route: string) => {
//     return pathname === route;
//   };

//   return (
//     <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-20 flex-row items-center justify-between px-4">
//       {tabs.map((tab) => {
//         if (tab.isCenter) {
//           return (
//             <TouchableOpacity key={tab.name} className="items-center -mt-10" onPress={() => router.push(tab.route)}>
//               <View
//                 className={`w-16 h-16 rounded-full justify-center items-center shadow-lg shadow-black/20 ${
//                   isActive(tab.route) ? "bg-amber-600" : "bg-amber-500"
//                 }`}
//               >
//                 <Ionicons name={tab.icon as any} size={28} color="#FFF" />
//               </View>
//               <Text
//                 className={`text-base mt-1 ${isActive(tab.route) ? "text-amber-600 font-semibold" : "text-gray-600"}`}
//               >
//                 {tab.name}
//               </Text>
//             </TouchableOpacity>
//           );
//         }

//         return (
//           <TouchableOpacity key={tab.name} className="items-center flex-1" onPress={() => router.push(tab.route)}>
//             <Ionicons name={tab.icon as any} size={24} color={isActive(tab.route) ? "#F59E0B" : "#6B7280"} />
//             <Text className={`text-sm mt-1 ${isActive(tab.route) ? "text-amber-600 font-semibold" : "text-gray-600"}`}>
//               {tab.name}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };

// const CustomTabBar = () => {
//   const router = useRouter();
//   const pathname = usePathname();

//   const tabs = [
//     { name: "Home", icon: "home", route: "/" },
//     { name: "Topics", icon: "book", route: "/topics" },
//     { name: "Practice", icon: "mic", route: "/practice", isCenter: true },
//     { name: "Test", icon: "beer-sharp", route: "/testAudioScreen" },
//     { name: "Profile", icon: "person", route: "/profile" },
//   ];

//   const isActive = (route: string) => {
//     return pathname === route;
//   };

//   return (
//     <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-20 flex-row items-center px-2">
//       {tabs.map((tab) => {
//         if (tab.isCenter) {
//           return (
//             <View key={tab.name} className="flex-1 items-center -mt-10">
//               <TouchableOpacity className="items-center" onPress={() => router.push(tab.route)} activeOpacity={0.8}>
//                 <View
//                   className={`w-16 h-16 rounded-full justify-center items-center shadow-lg shadow-black/20 ${
//                     isActive(tab.route) ? "bg-amber-600" : "bg-amber-500"
//                   }`}
//                 >
//                   <Ionicons name={tab.icon as any} size={28} color="#FFF" />
//                 </View>
//                 <Text
//                   className={`text-xs mt-1 ${isActive(tab.route) ? "text-amber-600 font-semibold" : "text-gray-600"}`}
//                 >
//                   {tab.name}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           );
//         }

//         return (
//           <TouchableOpacity
//             key={tab.name}
//             className="flex-1 items-center"
//             onPress={() => router.push(tab.route)}
//             activeOpacity={0.7}
//           >
//             <Ionicons name={tab.icon as any} size={24} color={isActive(tab.route) ? "#F59E0B" : "#6B7280"} />
//             <Text className={`text-xs mt-1 ${isActive(tab.route) ? "text-amber-600 font-semibold" : "text-gray-600"}`}>
//               {tab.name}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };

const CustomTabBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { name: "Home", icon: "home", route: "/" },
    { name: "Topics", icon: "book", route: "/topics" },
    { name: "AI Chat", icon: "mic", route: "/practice", isCenter: true },
    { name: "Test", icon: "beer-sharp", route: "/testAudioScreen" },
    { name: "Profile", icon: "person", route: "/profile" },
  ];

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-20">
      {/* Contenedor principal con distribución equitativa */}
      <View className="flex-row items-center h-full px-1">
        {tabs.map((tab, index) => (
          <TabButton
            key={tab.name}
            tab={tab}
            index={index}
            isActive={pathname === tab.route}
            onPress={() => router.push(tab.route)}
          />
        ))}
      </View>
    </View>
  );
};

const TabButton = ({ tab, isActive, onPress }: any) => {
  if (tab.isCenter) {
    return (
      <View className="flex-1 items-center justify-end">
        <TouchableOpacity className="items-center -mt-8" onPress={onPress} activeOpacity={0.8}>
          <View
            className={`w-16 h-16 rounded-full justify-center items-center shadow-lg shadow-black/20 ${
              isActive ? "bg-amber-600" : "bg-amber-500"
            }`}
          >
            <Ionicons name={tab.icon as any} size={28} color="#FFF" />
          </View>
          <Text className={`text-base mt-1 ${isActive ? "text-amber-600 font-semibold" : "text-gray-600"}`}>
            {tab.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity className="flex-1 items-center justify-center" onPress={onPress} activeOpacity={0.7}>
      <Ionicons name={tab.icon as any} size={24} color={isActive ? "#F59E0B" : "#6B7280"} />
      <Text className={`text-base mt-1 ${isActive ? "text-amber-600 font-semibold" : "text-gray-600"}`}>
        {tab.name}
      </Text>
    </TouchableOpacity>
  );
};
