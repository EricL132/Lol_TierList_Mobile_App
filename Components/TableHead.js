import React, { useEffect } from 'react'
import { View,Text,StyleSheet, Pressable } from 'react-native'
export default function TableHead({dimensions,sortByRow,sortByName,sortByTier,sortByWr,sortByBr,sortByPr,sortByGp}){
    return <View style={[styles.table_row,styles.table_head_row]}>
    <Pressable onPress={sortByRow} style={[styles.table_row_role,styles.table_row_view]}><Text style={[styles.table_row_text,styles.table_head_row_text]}>Role</Text></Pressable>
    <Pressable onPress={sortByName} style={[styles.table_row_view,{marginRight:10}]}><Text style={[styles.table_row_text,styles.table_head_row_text]}>Champion</Text></Pressable>
    <Pressable onPress={sortByTier} style={[styles.table_row_view]}><Text style={[styles.table_row_text,styles.table_head_row_text]}>Tier</Text></Pressable>
    <Pressable onPress={sortByWr} style={[styles.table_row_view]}><Text style={[styles.table_row_text,styles.table_head_row_text]}>Win Rate</Text></Pressable>
    {dimensions.window.width>650&&
    <>
    <Pressable onPress={sortByBr} style={[styles.table_row_view]}><Text style={[styles.table_row_text,styles.table_head_row_text]}>Ban Rate</Text></Pressable>
    <Pressable onPress={sortByPr} style={[styles.table_row_view]}><Text style={[styles.table_row_text,styles.table_head_row_text]}>Pick Rate</Text></Pressable>
    <Pressable onPress={sortByGp} style={[styles.table_row_view]}><Text style={[styles.table_row_text,styles.table_head_row_text]}>Games</Text></Pressable>
    </>
    }
</View>
}

const styles = StyleSheet.create({
    table_head_row:{
        width:'100%'
    },
    table_row_role:{
        maxWidth:70,
        alignItems:'center',
      
    }, 
    table_head_row_text:{
        fontFamily:"Roboto-Bold" ,
    },

    table_row:{
        flexDirection: 'row',
        height:60,
        
    },
    table_row_view:{
        flex: 1, 
        justifyContent:'center',
        display:'flex',
        
       
    },
    table_row_text:{
        textAlign:'center',
        color:"rgb(242, 230, 255)",
        fontFamily:"Roboto-Medium",
        
    }
})


export {styles}