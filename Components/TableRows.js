import {styles as TableHeadstyles} from './TableHead';
import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import champ0 from '../static/champion0.png';
import champ1 from '../static/champion1.png';
import champ2 from '../static/champion2.png';
import champ3 from '../static/champion3.png';
import champ4 from '../static/champion4.png';
import champ5 from '../static/champion5.png';
import Midsvg from '../static/mid.svg';
import Topsvg from '../static/top.svg';
import Bottomsvg from '../static/bot.svg';
import Junglesvg from '../static/jung.svg';
import Supportsvg from '../static/supp.svg';

export default function TableRow({champ, dimensions, index}) {
  const laneImage = useState({
    supportlane: <Supportsvg height={25} width={25}></Supportsvg>,
    junglelane: <Junglesvg height={25} width={25}></Junglesvg>,
    midlane: <Midsvg height={25} width={25}></Midsvg>,
    toplane: <Topsvg height={25} width={25}></Topsvg>,
    botlane: <Bottomsvg height={25} width={25}></Bottomsvg>,
  });
  const champImage = useState({
    0: champ0,
    1: champ1,
    2: champ2,
    3: champ3,
    4: champ4,
    5: champ5,
  });
  const rowComp = ({item, index}) => {
    return (
      <View
        style={[
          index % 2 === 1 && styles.secondary_row,
          TableHeadstyles.table_row,
        ]}
        key={item.name}>
        <View
          style={[
            TableHeadstyles.table_row_view,
            TableHeadstyles.table_row_role,
          ]}>
          {laneImage[0][item.lane]}
        </View>
        <View style={[TableHeadstyles.table_row_view, styles.image_row]}>
          <View style={styles.image_container}>
            <Image
              style={[
                styles.champ_image,
                {
                  left: -(parseInt(item.image.column) - 1) * 48,
                  top: -(parseInt(item.image.row) - 1) * 48,
                },
              ]}
              source={champImage[0][item.image.image]}></Image>
          </View>
          <Text style={[TableHeadstyles.table_row_text, {marginLeft: 5}]}>
            {item.name}
          </Text>
        </View>
        <View style={TableHeadstyles.table_row_view}>
          <Text style={TableHeadstyles.table_row_text}>{item.tier}</Text>
        </View>
        <View style={TableHeadstyles.table_row_view}>
          <Text style={TableHeadstyles.table_row_text}>{item.win_rate}%</Text>
        </View>
        {dimensions.window.width > 650 && (
          <>
            <View style={TableHeadstyles.table_row_view}>
              <Text style={TableHeadstyles.table_row_text}>
                {item.ban_rate}%
              </Text>
            </View>
            <View style={TableHeadstyles.table_row_view}>
              <Text style={TableHeadstyles.table_row_text}>
                {item.pick_rate}%
              </Text>
            </View>
            <View style={TableHeadstyles.table_row_view}>
              <Text style={TableHeadstyles.table_row_text}>
                {item.games_played}
              </Text>
            </View>
          </>
        )}
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={champ}
        renderItem={rowComp}
        keyExtractor={item => item.name}
        initialNumToRender={10}
        maxToRenderPerBatch={3}
        windowSize={3}></FlatList>
    </View>
  );

  //     return<View style={TableHeadstyles.table_row}>
  //     <View style={TableHeadstyles.table_row_view}><Text style={TableHeadstyles.table_row_text}>1</Text></View>
  //     <View style={[TableHeadstyles.table_row_view,styles.image_row]}><View style={styles.image_container}><Image style={styles.champ_image} source={champ0} ></Image></View><Text style={[TableHeadstyles.table_row_text,{marginLeft:5}]}>Lulufdfdfd</Text></View>
  //     <View style={TableHeadstyles.table_row_view}><Text style={TableHeadstyles.table_row_text}>S+</Text></View>
  //     <View style={TableHeadstyles.table_row_view}><Text style={TableHeadstyles.table_row_text}>55.32%</Text></View>
  // </View>
}

const styles = StyleSheet.create({
  image_container: {
    maxWidth: 48,
    maxHeight: 48,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
  },
  image_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  champ_image: {},
  secondary_row: {
    backgroundColor: 'rgba(0, 0, 0, 0.233)',
  },
});
