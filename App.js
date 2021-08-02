import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  StatusBar,
  Dimensions,
} from 'react-native';
import TableHead from './Components/TableHead';
import Header from './Components/Header';
import Allsvg from './static/all.svg';
import Midsvg from './static/mid.svg';
import Topsvg from './static/top.svg';
import Bottomsvg from './static/bot.svg';
import Junglesvg from './static/jung.svg';
import Supportsvg from './static/supp.svg';
import plat from './static/plat.png';

import TableRow from './Components/TableRows';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};


const window = Dimensions.get("window");

const App = () => {
  const [selectedLane, setSelectedLane] = useState('');
  const [tier_list, set_tier_list] = useState();
  const [original_list, set_original_list] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [dimensions,setDimensions] = useState({window})
  const onRefresh = useCallback(async() => {
    setRefreshing(true);
    await getList().then(()=>{
      setRefreshing(false)
      setSelectedLane('')
    })

  }, []);
  const tiers = useState([
    'S+',
    'S',
    'S-',
    'A+',
    'A',
    'A-',
    'B+',
    'B',
    'B-',
    'C+',
    'C',
    'C-',
    'D+',
    'D',
    'D-',
  ]);
  const changeLane = lane => {
    setSelectedLane(lane);
    if (lane === '') {
      return set_tier_list(
        [...original_list].sort(
          (a, b) => tiers.indexOf(a.tier) - tiers.indexOf(b.tier),
        ),
      );
    }
    set_tier_list(
      [...original_list]
        .filter(champ => champ.lane === `${lane}lane`)
        .sort((a, b) => tiers.indexOf(a.tier) - tiers.indexOf(b.tier)),
    );
  };
  function getList() {
    return new Promise((resolve)=>{
      fetch('https://league.erics.software/api/getlist')
      .then(res => res.json())
      .then(data => {
        data.sort((a, b) => a.rank - b.rank);
        set_original_list(data);
        set_tier_list(data);
        resolve()
      });
    })
   
  }
  useEffect(() => {
    getList();
    const dimensionsLis = Dimensions.addEventListener('change',({window})=>{
      setDimensions({window})
    })
    return ()=> dimensionsLis?.remove();
  }, []);

  function doSort(sorted) {
    if (JSON.stringify(sorted) === JSON.stringify(tier_list)) {
      set_tier_list(sorted.reverse());
    }
    set_tier_list(sorted);
  }
  function SortByRole() {
    const roles = [
      "toplane",
      "junglelane",
      "midlane",
      "botlane",
      "supportlane",
    ];
    const sorted = [...tier_list].sort(
      (a, b) => roles.indexOf(a.lane) - roles.indexOf(b.lane)
    );
    doSort(sorted);
  }
  function SortByName() {
    const sorted = [...tier_list].sort((a, b) => a.name.localeCompare(b.name));
    doSort(sorted);
  }
  function SortByTier() {
    const sorted = [...tier_list].sort(
      (a, b) => tiers[0].indexOf(a.tier) - tiers[0].indexOf(b.tier)
    );
    doSort(sorted);
  }
  function SortByWr() {
    const sorted = [...tier_list].sort((a, b) => b.win_rate - a.win_rate);
    doSort(sorted);
  }

  function SortByPr() {
    const sorted = [...tier_list].sort((a, b) => b.pick_rate - a.pick_rate);
    doSort(sorted);
  }
  function SortByBr() {
    const sorted = [...tier_list].sort((a, b) => b.ban_rate - a.ban_rate);
    doSort(sorted);
  }
  function SortByGp() {
    const sorted = [...tier_list].sort(
      (a, b) => parseInt(b.games_played) - parseInt(a.games_played)
    );
    doSort(sorted);
  }
  return (
    
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        hidden={true} />
        <View style={styles.body}>
          <Header></Header>
          <View style={styles.lane_container}>
            <TouchableHighlight
              onPress={() => {
                changeLane('');
              }}
              style={[
                selectedLane == '' && {backgroundColor: 'rgb(153, 102, 255)'},
                {padding: 10},
              ]}>
              <Allsvg height={25} width={25}></Allsvg>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                changeLane('top');
              }}
              style={[
                selectedLane == 'top' && {
                  backgroundColor: 'rgb(153, 102, 255)',
                },
                {padding: 10},
              ]}>
              <Topsvg height={25} width={25}></Topsvg>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                changeLane('jungle');
              }}
              style={[
                selectedLane == 'jungle' && {
                  backgroundColor: 'rgb(153, 102, 255)',
                },
                {padding: 10},
              ]}>
              <Junglesvg height={25} width={25}></Junglesvg>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                changeLane('mid');
              }}
              style={[
                selectedLane == 'mid' && {
                  backgroundColor: 'rgb(153, 102, 255)',
                },
                {padding: 10},
              ]}>
              <Midsvg height={25} width={25}></Midsvg>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                changeLane('bot');
              }}
              style={[
                selectedLane == 'bot' && {
                  backgroundColor: 'rgb(153, 102, 255)',
                },
                {padding: 10},
              ]}>
              <Bottomsvg height={25} width={25}></Bottomsvg>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                changeLane('support');
              }}
              style={[
                selectedLane == 'support' && {
                  backgroundColor: 'rgb(153, 102, 255)',
                },
                {padding: 10},
              ]}>
              <Supportsvg height={25} width={25}></Supportsvg>
            </TouchableHighlight>
          </View>
          <View style={styles.options_bar}>
            <View style={styles.option_container}>
              <Image style={styles.rank_image} source={plat}></Image>
              <Text style={styles.option_container_text}>Platnium+</Text>
            </View>
            <View style={styles.option_container}>
              <Text style={styles.option_container_text}>Ranked Solo</Text>
            </View>
            <View style={styles.option_container}>
              <Text style={styles.option_container_text}>11.15</Text>
            </View>
          </View>

    
          <View style={styles.table_container}>
            <TableHead dimensions={dimensions} sortByRow={SortByRole} sortByName={SortByName} sortByTier={SortByTier} sortByWr={SortByWr} sortByBr={SortByWr} sortByPr={SortByPr} sortByGp={SortByGp} ></TableHead>
                  <RefreshControl
      style={{flex: 1}}
      refreshing={refreshing}
      onRefresh={onRefresh}>
            {tier_list && <TableRow champ={tier_list} dimensions={dimensions}></TableRow>}
            </RefreshControl>
          </View>
         
        </View>
      </SafeAreaView>
   
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#0c0c0e',
    flex: 1,
  },
  body: {
    flex: 1,
    padding: 20,
  },
  lane_container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgb(28, 30, 34)',
    alignSelf: 'flex-start',
    borderRadius: 6,
    overflow: 'hidden',
  },
  rank_image: {
    width: 20,
    height: 20,
  },
  options_bar: {
    marginVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 400,
  },
  option_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 7,

    borderRadius: 5,
    backgroundColor: 'rgb(28, 30, 34)',
  },
  option_container_text: {
    color: 'rgb(242, 230, 255)',
    marginHorizontal: 8,
    fontFamily: 'Roboto-Bold',
  },
  table_container: {
    overflow: 'hidden',
    borderRadius: 5,
    backgroundColor: 'rgb(28, 30, 34)',
    flex: 1,
  },
});
export default App;
