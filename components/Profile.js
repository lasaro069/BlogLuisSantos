import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, } from "react-native";
import { Asset } from "expo-asset";

import * as ImagePicker from 'expo-image-picker';

const imageBanner = Asset.fromModule(require("../assets/img/banner.png")).uri;
const imageProfile = Asset.fromModule(require("../assets/img/profile.png")).uri


const Profile = ({selectedImageBanner, setSelectedImageBanner, selectedImageProfile, setSelectedImageProfile}) => {



  // ********** IMAGEN DEL BANNER **********

  const openImageBanner = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permiso Denegado");
      return;
    };

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.canceled === true) {
      return;
    }

    const {uri} = pickerResult.assets[0];

    setSelectedImageBanner({localUri: uri});
  }

  // ********** IMAGEN DE PERFIL **********

  const openImageProfile = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permiso Denegado");
      return;
    };

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.canceled === true) {
      return;
    }

    const {uri} = pickerResult.assets[0];

    setSelectedImageProfile({localUri: uri});
  }





  return (

    <View style={styles.containerProfile}>
      {/* ********** BANNER ********** */}
      <TouchableOpacity
        onPress={openImageBanner}
        style={styles.containerUserBanner}
      >
        <Image
          source={{
            uri:
              selectedImageBanner !== null
                ? selectedImageBanner.localUri
                : imageBanner,
          }}
          style={styles.imageBanner}
        />
      </TouchableOpacity>

      {/* ********** INFORMACION PERSONAL ********** */}
      <View style={styles.containerInfoUser}>
        <Text style={styles.textNameUser}>Luis Antonio Santos</Text>
        <Text style={styles.textProfessionUser}>
          Suboficial de la ReservaActiva
        </Text>
      </View>

      {/* ********** IMAGEN DE PERFIL ********** */}
      <TouchableOpacity
        onPress={openImageProfile}
        style={styles.containerUserProfile}
      >
        <Image
          source={{
            uri:
              selectedImageProfile !== null
                ? selectedImageProfile.localUri
                : imageProfile,
          }}
          style={styles.imageProfile}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerProfile: {
    width: "100%",
    height: 320,
    backgroundColor: "#1c0033"
  },

  containerUserBanner: {
    width: "100%",
    height: 220,
    backgroundColor: "#ccc"
  },

  imageBanner: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  
  containerInfoUser: {
    padding: 15,
  },

  textNameUser: {
    fontSize: 25,
    fontWeight: "800",
    color: "#fff"
  },

  textProfessionUser: {
    fontSize: 12,
    fontWeight: "300",
    color: "#fff"
  },

  containerUserProfile: {
    position: "absolute",
    top: 150,
    right: 25
  },

  imageProfile: {
    backgroundColor: "#fff",
    width: 131,
    height: 131,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#214484",
  },
});

export default Profile;
