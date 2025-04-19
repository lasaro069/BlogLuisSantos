import React, {useState} from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, TextInput } from "react-native";
import { Asset } from "expo-asset";

import Profile from "./components/Profile";
import * as ImagePicker from 'expo-image-picker';

// constante de importación de imagen local
const imageProfile = Asset.fromModule(require("./assets/img/profile.png")).uri
const leftBack = Asset.fromModule(require("./assets/img/leftArrow.png")).uri;



//funcion que renderiza la App
const App = () => {

  /* ********** ACTUALIZADOR DE IMAGENES ********** */

  // ********** IMAGEN DEL BANNER **********
  const [selectedImageBanner, setSelectedImageBanner] = useState(null);

  // ********** IMAGEN DE PERFIL **********
  const[selectedImageProfile, setSelectedImageProfile] = useState(null);

  // ********** MODAL **********

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  const [selectedImagePost, setSelectedImagePost] = useState(null);


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
  const [posts, setPosts] = useState([]);
  const [inputText, setInputText] = useState("");

  const addPost = () => {

    if (inputText || selectedImagePost?.localUri) {
      const newPost = { text: inputText, imageUri: selectedImagePost?.localUri };

      setPosts([...posts, newPost]);
      /* reseteamos los valores del modal */
      setInputText("");
      setSelectedImagePost(null);
      setModalVisible(false)
    }
  }




  return(

    <>
    
      {/* View para diferenciar el menu superior del dispositivo */}
      <View style={{width: "100%", height: 35, backgroundColor: "#000" }} >

      </View>

      <ScrollView style={{backgroundColor: "#1c0033"}}>

  {/* ************  SECCION PERIFL DEL USUARIO ***************** */}
        <Profile
          selectedImageBanner={selectedImageBanner}
          setSelectedImageBanner={setSelectedImageBanner}
          selectedImageProfile={selectedImageProfile}
          setSelectedImageProfile={setSelectedImageProfile} 
        />

        {/* ********** PUBLICACIONES ********** */}
        <View style={styles.containerPost}>

          {/* ********** CONTENEDOR DE LOS BOTONES DE PUBLICACIONES Y FOTOS ********** */}
          <View style={{width: "100%", height: 50, backgroundColor: "#3e006e", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 15}} >

            <View style={{backgroundColor: "#ffc93c", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 50 }}>
              <Text style={{color: "#fff", fontSize: 15, fontWeight: "800", }}>Publicaciones</Text>
            </View>

            <View style={{  paddingVertical: 5, paddingHorizontal: 10, borderRadius: 20}}>
              <Text style={{color: "#fff", fontSize: 15, fontWeight: "800"}}>Fotos</Text>
            </View>
          </View>




            {/* ********** CONTENEDOR DE LAS PUBLICACIONES */}
          <ScrollView>
            <View style={{width: "100%", height: "100%", paddingHorizontal: 20, }}>
              {posts.length > 0 ? (
                posts.slice().reverse().map((post, index) => (
  
                  // PUBLICACION
                  <View key={index} style={{width: "100%", padding: 20, backgroundColor: "#3e006e", borderRadius: 15, marginTop: 10}}>
                    
                    {/* CONTENEDOR DEL TEXTO DE LA PUBLICACION */}
                    <View>
  
                      <View style={{flexDirection: "row"}} >
  
                        <Image source={{uri: selectedImageProfile !== null ? selectedImageProfile.localUri : imageProfile}} style={{width: 50, height: 50, borderRadius: 100, borderWidth: 5, borderColor: "#514484"}} />
                        <View style={{flexDirection: "column", justifyContent: "center", marginLeft: 10 }}>
  
                          <Text style={{color: "#fff", fontSize: 16, fontWeight: 500, }}>Luis Santos</Text>
                          <Text style={{color: "#fff", fontSize: 13, fontWeight: 500, }}>20/01/2024</Text>
  
                        </View>
                      </View>
  
                    </View>
  
                    <Text style={{color: "#fff", fontSize: 16,fontWeight: "400", marginTop: 10}}>{post.text}</Text>
                    {post.imageUri && <Image source={{uri: post.imageUri}} style={{width: "100%", height: 320, backgroundColor: "#ccc", borderRadius: 20, marginTop: 10 }} />}

                    {/* CONTENEDOR DE LA IMAGEN DE LA PUBLICACION */}
                  </View>
                ))) : (
                  <View style={{width: "100%", height: 455, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: "#fff", fontSize: 20, fontWeight: "800", }}>No has realizado ninguna Publicación</Text>
                  </View>
                ) }




            </View >
          </ScrollView>

        </View>
      
      
      </ScrollView>

      {/* BOTON PARA AGREGAR PUBLICACIONES */}
      <TouchableOpacity onPress={openModal} style={{position: "absolute", top: "800", zIndex: 100, right: 15,  width: 50, height: 50, backgroundColor: "#ffc93c", borderRadius: 25, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
        <Text style={{color: "#fff", fontSize: 24, fontWeight: "800"}}>+</Text>
      </TouchableOpacity>

      {/* MODAL QUE APARECE AL PRESIONAR EL BOTON DE AGREGAR PUBLICACIONES */}
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
            <Image source={{uri: selectedImageProfile !== null ? selectedImageProfile.localUri : imageProfile}} style={{width: 80, height: 80, borderRadius: 100, borderWidth: 5, borderColor: "#514484"}} />
            <Text style={styles.textNameUser}>Luis Santos</Text>
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
          <TouchableOpacity onPress={addPost} style={{backgroundColor: "#ffc93c", padding: 10, width: 250, borderRadius: 125, marginHorizontal: 80, marginTop: 20, flexDirection: "row", justifyContent: "center"}} >
            <Text style={{color: "#fff", fontSize: 20, fontWeight: "800"}}>Publicar</Text>
          </TouchableOpacity>


        </View>

      </Modal>


    </>

  );
};

const styles = StyleSheet.create({


  // ********** ESTILOS DE BANNER Y PERFIL **********
  


  // ********** ESTILOS DE LAS PUBLICACIONES **********
  containerPost: {
    flex: 1,
    backgroundColor: "#1c0033"

  }


});

export default App;