import {StyleSheet, Text, TouchableOpacity, Modal, View} from 'react-native';
import React from 'react';
import Fonts from '../../utils/constants/fonts';
import {useDispatch} from 'react-redux';
import {
  getToken,
  removeToken,
  removeUid,
} from '../../utils/helpers/async-storage';
import {logout} from '../../store/redux/authSlice';
import {MainApp} from '../../utils/constants/theme';

const LogoutCmp = ({modalVisible, setModalVisible}) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await removeToken();
    await removeUid();

    dispatch(logout());
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.text}>Are you sure want to logout?</Text>
            <View style={styles.btns}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.btn}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout} style={styles.btn}>
                <Text style={styles.btnText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default LogoutCmp;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: MainApp.primary100,
    alignItems: 'center',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: MainApp.primary800,
    fontSize: 20,
    fontFamily: Fonts.poppins.bold,
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  btn: {
    flex: 1,
    backgroundColor: MainApp.primary800,
    borderRadius: 10,
    padding: 6,
    marginTop: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.poppins.bold,
    textAlign: 'center',
  },
});
