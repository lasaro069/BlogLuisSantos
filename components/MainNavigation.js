import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@react-native-community/masked-view";
import Publicaciones from "./Publicaciones";
import Fotos from "./Fotos";

/* CONSTANTE QUE PERMITE CAMBIAR ENTRE PANTALLAS */
const Tab = createBottomTabNavigator();

const MainNavigation = () => {

  return(

    <Tab.Navigator
      screenOptions={{
        tabBArShowIcon: false,
        tabBarStyle: {
          backgroundColor: "#514484",
          borderTop: 1,
          borderColor: "#000",
        },
        tabBarActiveTintColor: "#ffc93c",
        tabBarInactiveTintColor: "#fff",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500"
        }
      }}
    >

      <Tab.Screen 
        name="Publicaciones" 
        component={Publicaciones} 
        options={{
          headerShown: false,
          tabBarLabel: 'Publicaciones',
          tabBarIcon: ({ color, size }) => (
            <Image source={require("../assets/img/news.png")} name="news" color={color} size={size}  />
          )
        }}

           />

      <Tab.Screen 
        name="Fotos" 
        component={Fotos} 
        options={{
          headerShown: false,
          tabBarLabel: 'Fotos',
          tabBarIcon: ({ color, size }) => (
            <Image source={require("../assets/img/camera.png")} name="camera" color={color} size={size}  />
          )
        }} />

    </Tab.Navigator>


  );
};

export default MainNavigation;