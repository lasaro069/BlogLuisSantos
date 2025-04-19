import React from "react";
import { View, StyleSheet, Image, ScrollView  } from "react-native";
import { useImages } from "./PhotoContext";


const Fotos = () => {

  const { images } =useImages();

  return(

    <ScrollView style={{flex: 1, backgroundColor: "#1c0033"}}>
      <View style={{flexDirection: "row", flexWrap: "wrap", padding: 2, justifyContent: "flex-start"}} >
        {images.map((uri, index) => (
          <Image key={index} source={{ uri }} style={{width: 190, height: 190, margin: 2, resizeMode: "cover"}} />
        ) )}

      </View>
    </ScrollView>
  )
    
};

export default Fotos;