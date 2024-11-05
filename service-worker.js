self.addEventListener('install', (event) => {    
    console.log('Service Worker installed');    
    self.skipWaiting(); // Skip waiting and activate immediately
});

self.addEventListener('activate', (event) => {        
    console.log('Service Worker activated');
    self.clients.claim(); // Take control of all pages immediately
});

self.addEventListener('start', (event) => {
    console.log('Service Worker started');
    //self.skipWaiting(); // Skip waiting and activate immediately
});

// Example function that performs a background task
function performBackgroundTask() {
    return new Promise((resolve) => {
        // Simulate a task, like fetching or processing data
        setTimeout(() => {
            console.log('Background task completed');
            resolve('Task finished successfully');
        }, 5000); // Simulate a 5-second task
    });
}

// Listen for a custom event to trigger the background task
self.addEventListener('message', (event) => {
    if (event.data === 'startTask') {
        performBackgroundTask().then((result) => {
            // Show a notification upon task completion
            self.registration.showNotification('Task Completed', {
                body: result,
                //icon: '/path/to/icon.png' // Optional icon
            });
        });
    }
});
