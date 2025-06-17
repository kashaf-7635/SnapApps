import {StyleSheet, View} from 'react-native';
import React from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ModalMessage from '../../ModalMessage';
import OutlinedButton from '../ui/OutlinedButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import {PlaceTheme} from '../../../utils/constants/theme';
import {useDispatch} from 'react-redux';
import {setImageUri} from '../../../store/redux/placesSlices';

const ImagePicker = ({refRBSheet}) => {
  const dispatch = useDispatch();
  const options = {
    mediaType: 'photo',
    includeBase64: true,
  };
  const openCamera = async () => {
    try {
      const result = await launchCamera(options);

      if (result.didCancel) {
        console.log('User cancelled camera');
        refRBSheet.current.close();
      } else if (result.errorCode) {
        ModalMessage('Camera Error!', result.errorMessage, 'error');
      } else {
        dispatch(setImageUri(result.assets[0].uri));
        refRBSheet.current.close();
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  const openGallery = async () => {
    try {
      const result = await launchImageLibrary(options);

      if (result.didCancel) {
        console.log('User cancelled camera');
        refRBSheet.current.close();
      } else if (result.errorCode) {
        ModalMessage('Camera Error!', result.errorMessage, 'error');
      } else {
        dispatch(setImageUri(result.assets[0].uri));
        refRBSheet.current.close();
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  return (
    <RBSheet
      ref={refRBSheet}
      useNativeDriver={false}
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
        },
        draggableIcon: {
          backgroundColor: '#000',
        },
        container: {
          backgroundColor: 'transparent',
          height: 200,
        },
      }}
      customModalProps={{
        animationType: 'slide',
        statusBarTranslucent: true,
      }}
      customAvoidingViewProps={{
        enabled: false,
      }}>
      <View style={s.main}>
        <OutlinedButton onPress={openCamera} icon={'camera'}>
          Camera
        </OutlinedButton>
        <OutlinedButton onPress={openGallery} icon={'image'}>
          Gallery
        </OutlinedButton>
      </View>
    </RBSheet>
  );
};

export default ImagePicker;

const s = StyleSheet.create({
  main: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: PlaceTheme.gray700,
    padding: 30,
    borderTopColor: PlaceTheme.primary800,
    borderTopWidth: 2,
    borderLeftColor: PlaceTheme.primary800,
    borderLeftWidth: 2,
    borderRightColor: PlaceTheme.primary800,
    borderRightWidth: 2,
  },
});
