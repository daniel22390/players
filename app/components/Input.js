import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  primaryColor,
  terciaryColor,
  quartenaryColor
} from '../style/default'

const Input = (props) => {

  const { 
    style, 
    onChangeText = () => { },
    value = "",
    placeholder = "",
    type = null,
    icon = null
  } = props;

  return (
    <View style={styles.searchSection}>
      { icon &&
        <View style={{width: 40, alignItems: 'center'}}>
          <Icon style={styles.icon} name={props.icon} size={20} color={terciaryColor}/>
        </View>
      }
      <TextInput
        style={{...styles.input, ...style}}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={quartenaryColor}
        secureTextEntry={type == "password" ? true : false}
        selectionColor={quartenaryColor}
        autoCompleteType={type}
        // keyboardType={type == "email" ? "email-address": null}
        >
      </TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    color: terciaryColor,
    flex: 1
  },
  searchSection: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: primaryColor,
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  icon: {
    marginRight: 15
  }
});

export default Input;