import {showMessage} from 'react-native-flash-message';

const ModalMessage = (title, description = '', type = 'info') => {
  let backgroundColor = 'white';
  let textColor = 'black';

  if (type === 'success') {
    textColor = '#155724';
  } else if (type === 'error') {
    textColor = '#721c24';
  } else if (type === 'warning') {
    textColor = '#856404';
  }

  showMessage({
    message: title,
    description: description,
    type: 'default',
    backgroundColor,
    color: textColor,
    floating: true,
    position: 'center',
    style: {
      alignSelf: 'center',
      width: '90%',
      padding: 20,
      borderRadius: 10,
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    titleStyle: {fontWeight: 'bold', fontSize: 18},
    textStyle: {fontSize: 14},
    duration: 3000,
  });
};

export default ModalMessage;
