import { royalblue } from 'color-name';
import React from 'react'
import { View,Text,StyleSheet } from "react-native";

export default function Header(){
    return <View style={styles.header}>
        <Text style={styles.header_text}>League of Legends Tier List</Text>
    </View>
}


const styles = StyleSheet.create({
    header:{
        fontSize:30,
        paddingBottom:20,
        backgroundColor:"#000000"
        
    },
    header_text:{
        color:"#fff",
        fontSize:17,
    }
})