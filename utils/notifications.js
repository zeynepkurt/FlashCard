import AsyncStorage from "@react-native-community/async-storage";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";

const NOTIFICATION_KEY = "MobileFlashcards:notifications";

function createNotification() {
    const trigger = new Date(Date.now() + 60 * 60 * 1000 * 24);
    trigger.setMinutes(0);
    trigger.setSeconds(0);
  return {
    content: {
      title: "Take a quiz!",
      body: "👋 don't forget to take a quiz for today!",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: "high",
        sticky: false,
        vibrate: true,
      },
    },
    trigger
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

           

            Notifications.scheduleNotificationAsync(createNotification());
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}
