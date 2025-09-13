// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

// Firebase config (replace with your own)
const firebaseConfig = {
  apiKey: "AIzaSyC7QVhaR95hO_dUYcP7dJ__2DW0blpMKFI",
  authDomain: "la-mesa-cafe-system.firebaseapp.com",
  databaseURL: "https://la-mesa-cafe-system-default-rtdb.firebaseio.com",
  projectId: "la-mesa-cafe-system",
  storageBucket: "la-mesa-cafe-system.appspot.com",
  messagingSenderId: "234244615396",
  appId: "1:234244615396:web:87725489a3f70fbbabd0f1",
  measurementId: "G-9CL7KJTYVB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Reference to orders in Realtime Database
const ordersRef = ref(db, 'orders'); // same path as your main site

const ordersList = document.getElementById('ordersList');

// Realtime listener
onValue(ordersRef, (snapshot) => {
  ordersList.innerHTML = '';
  const data = snapshot.val();
  if (data) {
    Object.keys(data).forEach(key => {
      const order = data[key];
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${order.name}</strong> - Total: ₱${order.total}
        <div>Items: ${order.items.map(i => `${i.name} x${i.qty}`).join(', ')}</div>
        <div>Note: ${order.note || '—'}</div>
      `;
      ordersList.appendChild(li);
    });
  } else {
    ordersList.innerHTML = '<li>No orders yet.</li>';
  }
});
