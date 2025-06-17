import admin from 'firebase-admin';
import serviceAccount from '../react-native-practice-4d665-firebase-adminsdk-fbsvc-5976bf84af.json' with { type: 'json' };


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const sendNotifications = (deviceToken)=>{
const message = {
  token: deviceToken,
  notification: {
    title: 'Hello!',
    body: 'Sent from Node.js with ES modules',
  },
};

admin
  .messaging()
  .send(message)
  .then((response) => console.log('Successfully sent:', response))
  .catch((error) => console.error('Error sending:', error));
}





