import React, {useState} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import { Asset } from "expo-asset";

import { useImages } from "./PhotoContext";
import Modal from "./Modal";

const imageProfile = Asset.fromModule(require("../assets/img/profile.png")).uri


const Publicaciones = () => {

  const[selectedImageProfile, setSelectedImageProfile] = useState(null);
  const [selectedImagePost, setSelectedImagePost] = useState(null);
  const { addImage } = useImages();
  const [posts, setPosts] = useState([]);

  // ********** MODAL **********

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  }



  /* ********** ARRAY ENCARGADO DE ALMACENAR LAS PUBLICACIONES ********** */

  const addPost = (newPost) => {

    setPosts([...posts, newPost]);

    if (newPost.imageUri) {
      addImage(newPost.imageUri);
    };

  }




  return(

    <>

      <View style={styles.containerPost}>

          {/* ********** CONTENEDOR DE LAS PUBLICACIONES */}
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


        {/* BOTON PARA AGREGAR PUBLICACIONES */}
        <TouchableOpacity onPress={openModal} style={{position: "absolute", top: "800", zIndex: 100, right: 15,  width: 50, height: 50, backgroundColor: "#ffc93c", borderRadius: 25, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <Text style={{color: "#fff", fontSize: 24, fontWeight: "800"}}>+</Text>
        </TouchableOpacity>

        <Modal 
          selectedImagePost = {selectedImagePost}
          setSelectedImagePost = {setSelectedImagePost}
          modalVisible = {modalVisible}
          closeModal = {closeModal}
          selectedImageProfile = {selectedImageProfile}
          addPost = {addPost}
        />


      </View>
    
    </>


    

  );
};

const styles = StyleSheet.create({

});

export default Publicaciones;