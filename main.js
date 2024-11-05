// Check if Service Workers are supported
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
        console.error('Service Worker registration failed:', error);
    });
}


// Check if Service Workers are supported
if ('push_serviceWorker' in navigator) {
    navigator.serviceWorker.register('/push_service-worker.js')
    .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
        console.error('Service Worker registration failed:', error);
    });
}


// Replace with your actual VAPID public key
const publicVapidKey = 'BB8-OAi7-s0mIuCTdRROifjlbZGtJ7q4_ix2D44OwJ2do7wISVWlhoNsPKVJIx4lPbcgpVBjf9fNzYBVzGWyy6Q';

navigator.serviceWorker.ready.then(async (registration) => {
    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    // Send subscription to your server
    await fetch('http://127.0.0.1:5000/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'Content-Type': 'application/json'
        }
    });
});

// Helper function to convert the VAPID key
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
}

