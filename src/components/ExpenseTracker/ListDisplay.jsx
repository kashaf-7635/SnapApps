import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import ExpenseCard from './ExpenseCard';
import ModalCmp from './ModalCmp';
import {useNavigation} from '@react-navigation/native';
import Icon from '@react-native-vector-icons/entypo';
import {dateFormatting} from '../../utils/helpers/date';
import LoadingOverlay from './LoadingOverlay';
import {useRequest} from '../../hooks/useRequest';

const ListDisplay = ({expenses}) => {
  const navigation = useNavigation();
  const {isLoading, requestHandler} = useRequest();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [itemId, setItemId] = useState('');

  const handleItemClick = id => {
    setItemId(id);
    setIsAddModalVisible(true);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({tintColor}) => {
        return (
          <TouchableOpacity
            style={s.plusIcon}
            onPress={() => setIsAddModalVisible(true)}>
            <Icon name="plus" color={tintColor} size={30} />
          </TouchableOpacity>
        );
      },
      headerLeft: ({tintColor}) => {
        return (
          <TouchableOpacity
            style={s.plusIcon}
            onPress={() => navigation.toggleDrawer()}>
            <Icon name="menu" size={30} color={tintColor} />
          </TouchableOpacity>
        );
      },
    });
  }, [navigation]);

  if (isLoading) {
    return <LoadingOverlay />;
  }
  return (
    <>
      <View style={s.list}>
        <FlatList
          data={expenses}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <ExpenseCard
                description={item.description}
                amount={item.amount}
                date={dateFormatting(new Date(item.date))}
                onPress={() => handleItemClick(item.id)}
              />
            );
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

      <ModalCmp
        modalVisible={isAddModalVisible}
        setModalVisible={setIsAddModalVisible}
        itemId={itemId}
        setItemId={setItemId}
        requestHandler={requestHandler}
      />
    </>
  );
};

export default ListDisplay;

const s = StyleSheet.create({
  plusIcon: {
    paddingHorizontal: 15,
  },
  list: {
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 25,
  },

  emptyList: {
    color: 'white',
    padding: 20,
    fontSize: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
