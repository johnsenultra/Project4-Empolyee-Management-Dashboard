import { initializeApp } from 'firebase/app';

//Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG-InD4jDK0ATOJ2Iyydkn03mvEjRtdgI",
  authDomain: "employeerecords-601e6.firebaseapp.com",
  projectId: "employeerecords-601e6",
  storageBucket: "employeerecords-601e6.appspot.com",
  messagingSenderId: "109672792141",
  appId: "1:109672792141:web:805775bedf76e735b79c04"
};

 // Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;