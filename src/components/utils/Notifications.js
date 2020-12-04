import { Alert } from 'react-native';

export function successNotification(message) {

  Alert.alert('', message);
  // store.addNotification({
  //   message: message,
  //   type: "success",
  //   insert: "top",
  //   container: "top-right",
  //   animationOut: ["animated", "fadeOut"],
  //   dismiss: {
  //     duration: 4000,
  //     onScreen: true,
  //     showIcon: true,
  //   }
  // });
}

export function dangerNotification(message) {

  Alert.alert('App Namoro', message);
  // store.addNotification({
  //   message: message,
  //   type: "danger",
  //   insert: "top",
  //   container: "top-right",
  //   animationOut: ["animated", "fadeOut"],
  //   dismiss: {
  //     duration: 4000,
  //     onScreen: true,
  //     showIcon: true,
  //   },
  // });
}
