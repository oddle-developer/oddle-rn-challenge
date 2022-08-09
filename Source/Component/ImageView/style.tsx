import { StyleSheet, Platform } from 'react-native';
import { Colors, Constants, Alert } from 'lybrid-common'

export default StyleSheet.create({

  wrapContainer: {
    width: '100%',
    marginTop: 5,
  },

  container: {
    width: '100%',
    height: 40,
    borderRadius: 4,
    backgroundColor: '#EFEFF4',
  },
  readOnly: {
    height: 30,
    borderRadius: 0,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFF4'
  },
  title: {
    color: '#515C6F',
    fontSize: Constants.FontSize.small,
    marginBottom: 2,
    marginTop: 5,
  },
  input: {
    flex: 1,
    padding: 0,
    margin: 5,
    color: "#515C6F", //update color
    fontSize: Constants.FontSize.medium,
  }
});
