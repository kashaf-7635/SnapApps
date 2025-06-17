import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import PlaceItem from './PlaceItem';
import {PlaceTheme} from '../../../utils/constants/theme';
import {useNavigation} from '@react-navigation/native';

const PlacesList = ({places}) => {
  const navigation = useNavigation();
  function selectPlaceHandler(id) {
    navigation.navigate('PlaceDetails', {placeId: id});
  }
  return (
    <View style={s.list}>
      <FlatList
        data={places}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return <PlaceItem place={item} onSelect={selectPlaceHandler} />;
        }}
        ListEmptyComponent={() => {
          return (
            <View style={s.center}>
              <Text style={s.emptyList}>No Data Found!!</Text>
            </View>
          );
        }}
        ItemSeparatorComponent={() => {
          return <View style={{paddingVertical: 5}}></View>;
        }}
      />
    </View>
  );
};

export default PlacesList;

const s = StyleSheet.create({
  list: {
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 25,
  },

  emptyList: {
    color: PlaceTheme.primary200,
    padding: 20,
    fontSize: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
