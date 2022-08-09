import { Alert, Keyboard } from 'react-native';
import Languages from './Languages'
let lastMessage = null;
let visible = false;

function stringFormat(input: any): string {
  if (typeof input === 'string' || input instanceof String) {
    return input.toString();
  } else {
    return JSON.stringify(input);
  }
}

function AlertUtils(title: string, message: string, button1: string | null = null, action1: any = null, button2: string | null = null, action2: any = null, button3: string | null = null, action3: any = null) {
  // Keyboard.dismiss()
  lastMessage = stringFormat(message);
  if (visible) {
    return
  }
  visible = true;
  if (button3) {
    button1 = stringFormat(button1);
    button2 = stringFormat(button2);
    button3 = stringFormat(button3);
    Alert.alert(
      title,
      message,
      [{
        text: button1,
        onPress: () => {
          action1 && action1();
          visible = false;
        }
      },
      {
        text: button2,
        onPress: () => {
          action2 && action2();
          visible = false;
        }
      },
      {
        text: button3,
        onPress: () => {
          action3 && action3();
          visible = false;
        }
      }]
      ,
      {
        onDismiss: () => { visible = false },
        cancelable: false
      }
    );
  } else if (button2) {
    button1 = stringFormat(button1);
    button2 = stringFormat(button2);
    Alert.alert(
      title,
      message,
      [{
        text: button1,
        onPress: () => {
          action1 && action1();
          visible = false;
        }
      },
      {
        text: button2,
        onPress: () => {
          action2 && action2();
          visible = false;
        }
      }]
      ,
      {
        onDismiss: () => { visible = false },
        cancelable: false
      }
    );
  } else if (button1) {
    button1 = stringFormat(button1);
    Alert.alert(
      title,
      message,
      [{
        text: button1,
        onPress: () => {
          action1 && action1();
          visible = false;
        }
      }]
      ,
      {
        onDismiss: () => { visible = false },
        cancelable: false
      }
    );
  } else {
    Alert.alert(
      title,
      message,
      [{
        text: Languages.get('system.dialog.ok'),
        onPress: () => {
          visible = false;
        }
      }]
      ,
      {
        onDismiss: () => { visible = false },
        cancelable: false
      }
    );
  }
};
export default AlertUtils;
