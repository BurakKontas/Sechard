import React from "react";
import { Dimensions } from "react-native";

const heightMobileUI = 851;
const widthMobileUI = 393;

export const responsiveWidth = width => {
    return (Dimensions.get('window').width * width) / widthMobileUI;
  };
  
export const responsiveHeight = height => {
    return (Dimensions.get('window').height * height) / heightMobileUI;
};