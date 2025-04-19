import React, { createContext, useState, useContext} from "react";

const ImageContext = createContext();

export const ImageProvider = ({children}) => {

  const [images, setImage] = useState([]);

  const [selectedImageProfile, setSelectedImageProfile] = useState(null);

  const addImage = (newImage) => {
    setImage([...images, newImage])
  }

  const updateSelectedImageProfile = (newImage) => {
    setSelectedImageProfile(newImage);
  }

  return(
    <ImageContext.Provider value={{images, addImage, selectedImageProfile, updateSelectedImageProfile}}>
      {children}
    </ImageContext.Provider>

  );
};

export const useImages = () => useContext(ImageContext);