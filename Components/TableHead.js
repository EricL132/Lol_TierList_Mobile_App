import React from 'react'
import { View,Text,StyleSheet } from 'react-native'
export default function TableHead({dimensions}){
    return <View style={[styles.table_row,styles.table_head_row]}>
    <View style={[styles.table_row_role,styles.table_row_view]}><Text style={[styles.table_row_text,styles.table_head_row_text]}>Role</Text></View>
    <View style={styles.table_row_view}><Text style={[styles.table_row_text,styles.table_head_row_text]}>Champion</Text></View>
    <View style={styles.table_row_view}><Text style={[styles.table_row_text,styles.table_head_row_text]}>Tier</Text></View>
    <View style={styles.table_row_view}><Text style={[styles.table_row_text,styles.table_head_row_text]}>Win Rate</Text></View>
    {dimensions.window.width>650&&
    <>
    <View style={styles.table_row_view}><Text style={[styles.table_row_text,styles.table_head_row_text]}>Ban Rate</Text></View>
    <View style={styles.table_row_view}><Text style={[styles.table_row_text,styles.table_head_row_text]}>Pick Rate</Text></View>
    <View style={styles.table_row_view}><Text style={[styles.table_row_text,styles.table_head_row_text]}>Games</Text></View>
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