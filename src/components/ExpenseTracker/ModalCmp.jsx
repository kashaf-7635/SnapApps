import React, {useState, useEffect, useCallback} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import ButtonCmp from './ButtonCmp';
import Fonts from '../../utils/constants/fonts';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  addExpense,
  removeExpense,
} from '../../store/redux/expenseTrackingSlice';
import {dateFormatting} from '../../utils/helpers/date';
import InputCmp from './InputCmp';
import {
  deleteExpense,
  storeExpense,
  updateExpense,
} from '../../utils/axios/expense';
import {Expense} from '../../utils/constants/theme';

const ModalCmp = ({
  modalVisible,
  setModalVisible,
  itemId,
  setItemId,
  requestHandler,
}) => {
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expTracking.expenses) || [];
  const item = expenses.find(item => item.id === itemId) || {};

  const [inputs, setInputs] = useState({
    amount: {
      value: '',
      isValid: true,
    },
    date: {
      value: '',
      isValid: true,
    },
    description: {
      value: '',
      isValid: true,
    },
  });
  useEffect(() => {
    if (itemId && item) {
      setInputs({
        amount: {value: item?.amount.toString(), isValid: true},
        date: {value: dateFormatting(new Date(item?.date)), isValid: true},
        description: {value: item?.description, isValid: true},
      });
    }
  }, [itemId]);
  useEffect(() => {
    if (!modalVisible) {
      setInputs({
        amount: {value: '', isValid: true},
        date: {value: '', isValid: true},
        description: {value: '', isValid: true},
      });
      setItemId('');
    }
  }, [modalVisible]);
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs(currentInputs => {
      return {
        ...currentInputs,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  }
  const [open, setOpen] = useState(false);
  const handleAddExpense = async () => {
    const obj = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value).toString(),
      description: inputs.description.value,
    };
    const amountIsValid = obj.amount && !isNaN(obj.amount) && obj.amount > 0;
    const dateIsValid = obj.date && obj.date.toString() !== 'Invalid Date';
    const desIsValid = obj.description && obj.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !desIsValid) {
      setInputs(currInputs => ({
        amount: {value: currInputs.amount.value, isValid: amountIsValid},
        date: {value: currInputs.date.value, isValid: dateIsValid},
        description: {value: currInputs.description.value, isValid: desIsValid},
      }));
      return;
    }

    if (itemId) {
      requestHandler({
        requestFn: () => updateExpense(itemId, obj),
        successMessage: 'Updated Successfully!',
        onSuccess: async res => {
          dispatch(addExpense({...obj, id: itemId}));
          setItemId('');
        },
      });
    } else {
      requestHandler({
        requestFn: () => storeExpense(obj),
        successMessage: 'Added Successfully!',
        onSuccess: async id => {
          dispatch(addExpense({...obj, id}));
        },
      });
    }
    setModalVisible(false);
  };

  const handleDeleteExpense = async () => {
    requestHandler({
      requestFn: () => deleteExpense(itemId),
      successMessage: 'Deleted Successfully!',
      onSuccess: async res => {
        dispatch(removeExpense(itemId));
        setModalVisible(false);
        setItemId('');
      },
      onError: res => {},
    });
  };
  const formIsInValid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={s.centeredView}>
          <View style={s.titleView}>
            <Text style={s.titleText}>
              {itemId ? 'Update Your Expense' : 'Add New Expense'}
            </Text>
          </View>

          <View style={s.inner}>
            <View style={s.inputRow}>
              <View style={s.btn}>
                <InputCmp
                  invalid={!inputs.amount.isValid}
                  textInputConfig={{
                    keyboardType: 'numeric',
                    onChangeText: inputChangeHandler.bind(this, 'amount'),
                    value: inputs.amount.value,
                    placeholder: 'Amount',
                    placeholderTextColor: Expense.primary700,
                  }}
                />
              </View>
              <TouchableOpacity
                style={[
                  s.datePicker,
                  !inputs.date.isValid ? s.invalidInput : {},
                ]}
                onPress={() => setOpen(true)}>
                <Text style={s.pickerText}>
                  {inputs.date.value ? inputs.date.value : 'Date'}
                </Text>
              </TouchableOpacity>
            </View>
            <InputCmp
              invalid={!inputs.description.isValid}
              textInputConfig={{
                keyboardType: 'default',
                multiline: true,
                onChangeText: inputChangeHandler.bind(this, 'description'),
                value: inputs.description.value,
                placeholder: 'Description',
                placeholderTextColor: Expense.primary700,
              }}
            />

            <DatePicker
              modal
              open={open}
              date={new Date()}
              onConfirm={date => {
                setOpen(false);
                inputChangeHandler('date', dateFormatting(date));
              }}
              onCancel={() => {
                setOpen(false);
              }}
              mode="date"
            />
            {formIsInValid && (
              <Text style={s.errorText}>
                Invalid Input Values - please check your entered data!
              </Text>
            )}
            <View style={s.btsView}>
              <View style={s.btn}>
                <ButtonCmp
                  onPress={() => setModalVisible(false)}
                  style={s.cancelBtn}>
                  Cancel
                </ButtonCmp>
              </View>
              {itemId && (
                <View style={s.btn}>
                  <ButtonCmp style={s.deleteBtn} onPress={handleDeleteExpense}>
                    Delete
                  </ButtonCmp>
                </View>
              )}
              <View style={s.btn}>
                <ButtonCmp onPress={handleAddExpense}>
                  {itemId ? 'Update' : 'Add'}
                </ButtonCmp>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ModalCmp;

const s = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Expense.primary800,
  },
  inner: {
    width: '100%',
    padding: 10,
  },
  btsView: {
    flexDirection: 'row',
    padding: 20,
    gap: 5,
  },
  btn: {
    flex: 1,
  },
  cancelBtn: {
    backgroundColor: Expense.primary500,
  },
  titleView: {
    backgroundColor: Expense.primary500,
    width: '100%',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    fontFamily: Fonts.sansation.bold,
  },

  datePicker: {
    backgroundColor: Expense.primary100,
    borderRadius: 5,
    marginVertical: 5,
    padding: 10,
    paddingVertical: 15,
    flex: 1,
  },
  pickerText: {
    fontFamily: Fonts.sansation.bold,
    fontSize: 15,
    color: Expense.primary700,
  },
  deleteBtn: {
    backgroundColor: Expense.error500,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  errorText: {
    textAlign: 'center',
    color: Expense.accent500,
    margin: 8,
  },
  invalidInput: {
    borderColor: Expense.accent500,
    borderWidth: 2,
  },
});
