document.getElementById('enable-notifications').addEventListener('click', () => {
    // Check if the permission has not been granted yet
    if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
            } else {
                console.log('Notification permission denied.');
            }
        });
    } else if (Notification.permission === 'granted') {
        console.log('Notification permission already granted.');
    } else {
        console.log('Notification permission was previously denied.');
    }
});  

document.getElementById('notify-btn').addEventListener('click', ()=> {                        
    if (Notification.permission === 'granted') {
        new Notification('Test Notification', {
            body: 'This is a test notification to check visibility!'
        });
    } else {
        console.log('Notification permission is not granted.');
    }
});

document.getElementById('worker-btn').addEventListener('click', ()=> {                        
    
    // Check if the browser supports Web Workers
    if (window.Worker) {
        // Create a new Web Worker
        const worker = new Worker('webWorker1.js');

        // Send a message to the worker (optional)
        worker.postMessage("Hello, worker!");

        // Listen for messages from the worker
        worker.onmessage = function(event) {
            console.log("Message from worker:", event.data);
            new Notification('Test Notification', {
                body: event.data
            }).onclick = function () {
                window.focus();
                console.log('Notification clicked!');
            };; 

            
        };
        

        // Error handling for the worker
        worker.onerror = function(error) {
            console.error("Error in worker:", error.message);
        };
    } else {
        console.log("Your browser doesn't support Web Workers.");
    }

});

document.getElementById('service-worker-btn').addEventListener('click', () => {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage('startTask');
    } else {
        console.log("Service Worker is not controlling this page.");
    }
});

document.getElementById('send-push').addEventListener('click', async () => {
    await fetch('http://127.0.0.1:5000/send-notification', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // new Notification(data.title, {
        //     body: data.body
        // });
    })
    .catch(error => console.error('Error sending notification:', error));
});