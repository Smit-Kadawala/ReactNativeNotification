import {StyleSheet, Button, View} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';
import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import NotificationService from './NotificationService';

export default function App() {
  useEffect(() => {
    getFCMToken();
    requestPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('remoteMessage', JSON.stringify(remoteMessage));
      DisplayNotification(remoteMessage);
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  const getFCMToken = () => {
    messaging()
      .getToken()
      .then(token => {
        console.log('token=>>>', token);
      });
  };

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
  };

  //-------------------------------Remot Notification notifee

  async function DisplayNotification(remoteMessage) {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      },
    });
  }

  //-------------------------------Local Notification notifee

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  //-------------------------------Fier Base

  const sendNotification = async () => {
    console.log('sendNotification');
    let notificationData = {
      title: 'First Notification',
      body: 'Notification Body',
      token:
        'cppm_xBAT9aPAYfelBLAQh:APA91bHKUUxQQFMS2UqENiA2AxG_p23ErZSaibogrbBKPxKfbQeFnfTtAfN9Tgw_VNkWkrfF87juyrGReY8-XDW4Cri9ZuWwwckqRccy2Zqsz1RPzEwleOxegGlpf4x0VGdinq6Y_tHb',
    };
    await NotificationService.sendSingleDeviceNotification(notificationData);
  };

  const sendMultiNotification = async () => {
    console.log('sendMultiNotification');
    let notificationData = {
      title: 'First Multi Device Notification',
      body: 'Notification Body',
      token: [
        'cftHR2zMT4iMOUDaV2wtmm:APA91bHW9tvaGHWjvfFPB73lTAO78o0xFLHlUgNLwWtl4mHQhhq_G72tHkfbXB1aqG-rGjg3NO0NRYW5EcyyhLdnrhWn9kIDCCITueJbYe4m4L7RpAtQII8wWAzynNGsxafstgGpnXRf',
        'cppm_xBAT9aPAYfelBLAQh:APA91bHKUUxQQFMS2UqENiA2AxG_p23ErZSaibogrbBKPxKfbQeFnfTtAfN9Tgw_VNkWkrfF87juyrGReY8-XDW4Cri9ZuWwwckqRccy2Zqsz1RPzEwleOxegGlpf4x0VGdinq6Y_tHb',
        'cftHR2zMT4iMOUDaV2wtmm:APA91bHW9tvaGHWjvfFPB73lTAO78o0xFLHlUgNLwWtl4mHQhhq_G72tHkfbXB1aqG-rGjg3NO0NRYW5EcyyhLdnrhWn9kIDCCITueJbYe4m4L7RpAtQII8wWAzynNGsxafstgGpnXRf',
      ],
    };
    await NotificationService.sendMultiDeviceNotification(notificationData);
  };

  return (
    <View style={styles.bodyStyle}>
      <Button title="Send Notification" onPress={sendNotification} />
      <Button
        title="Send Multi Device Notification"
        onPress={sendMultiNotification}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bodyStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
