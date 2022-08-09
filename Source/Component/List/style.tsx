import { StyleSheet } from 'react-native';
import { Colors, Constants } from 'lybrid-common'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.Background,
  },
  text: {
    fontSize: Constants.FontSize.medium,
    color: Colors.buttonText
  }
});
