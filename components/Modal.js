import React, {useState} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput } from "react-native";
import { Asset } from "expo-asset";

import  { useImages} from "./PhotoContext";
import * as ImagePicker from 'expo-image-picker';


const imageProfile = Asset.fromModule(require("../assets/img/profile.png")).uri
const leftBack = Asset.fromModule(require("../assets/img/leftArrow.png")).uri;



const ModalPublicaciones = ({selectedImagePost, setSelectedImagePost, modalVisible, closeModal, addPost}) => {

  const [inputText, setInputText] = useState("");
  const { selectedImageProfile } = useImages();

  const openImagePost = async () => {
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

    setSelectedImagePost({localUri: uri});
  }

  /* ********** ARRAY ENCARGADO DE ALMACENAR LAS PUBLICACIONES ********** */
  
  const handleAddPost = () => {

    if (inputText || selectedImagePost?.localUri) {
      const newPost = { text: inputText, imageUri: selectedImagePost?.localUri };

      addPost(newPost);
      /* reseteamos los valores del modal */
      setInputText("");
      setSelectedImagePost(null);
      closeModal()
    }
  }


  


  return(
    <Modal animationType="slide" visible={modalVisible} onRequestClose={closeModal} >

    <View style={{flex: 1, backgroundColor: "#1c0033"}} >

      {/* BOTON PARA CERRAR EL MODAL, SIN CAMBIOS */}
      <View style={{borderBottomWidth: 2, borderBottomColor: "#fff", padding: 15 }} >
        <TouchableOpacity onPress={closeModal} style={{flexDirection: "row", alignItems: "center", gap: 10}} >
          <Image source={{uri: leftBack}} style={{width: 30, height: 30}} />
          <Text style={{color: "#fff", fontSize: 20, fontWeight: "700"}} >Regresar</Text>

        </TouchableOpacity>
      </View>

      {/* CAJON QUE CONTIENE LA INFORMACIÓN PERSONAL DEL USUARIO */}
      <View style={{flexDirection: "row", padding: 25, gap: 15}}>
        <Image source={{uri: selectedImageProfile !== null ? selectedImageProfile : imageProfile}} style={{width: 80, height: 80, borderRadius: 100, borderWidth: 5, borderColor: "#514484"}} />
        <Text style={{color: "#fff", fontSize: 20, fontWeight: "800"}}>Luis Santos</Text>
      </View>


      {/* CAJON DE LA PUBLICACION */}

      {/* ENTRADA DE TEXTO DE LA PUBLICACIÓN */}
      <View style={{paddingHorizontal: 25, gap: 10}}>
        <TextInput
         placeholder="¿Qué quiéres hacer hoy?"
         placeholderTextColor={"#fff"}
         multiline={true}
         style={{color: "#fff"}}
         value={inputText}
         onChangeText={setInputText}
         />

         {/* VALIDACION PARA UBICAR EL BOTON DE SELECCIONAR IMAGEN */}
         {selectedImagePost?.localUri && (

           <Image source={{uri: selectedImagePost?.localUri}} style={{width: "100%", height: 400}} />
         )}

      </View>

      {/* BOTON PARA INGRESAR A LA GALERIA DE IMAGENES */}
      <TouchableOpacity onPress={openImagePost} style={{backgroundColor: "#ffc93c", padding: 10, width: 250, borderRadius: 125, marginHorizontal: 80, marginTop: 20, flexDirection: "row", justifyContent: "center"}} >
        <Text style={{color: "#fff", fontSize: 20, fontWeight: "800"}}>Selecciona una Imagen</Text>
      </TouchableOpacity>

      {/* BOTON DE PUBLICAR */}
      <TouchableOpacity onPress={handleAddPost} style={{backgroundColor: "#ffc93c", padding: 10, width: 250, borderRadius: 125, marginHorizontal: 80, marginTop: 20, flexDirection: "row", justifyContent: "center"}} >
        <Text style={{color: "#fff", fontSize: 20, fontWeight: "800"}}>Publicar</Text>
      </TouchableOpacity>


    </View>

  </Modal>

  );
};

const styles = StyleSheet.create({


});

export default ModalPublicaciones;