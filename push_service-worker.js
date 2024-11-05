self.addEventListener('push', function(event) {
    const data = event.data ? event.data.text() : 'Default notification message';
    event.waitUntil(
        self.registration.showNotification('Push Notification aa', {
            body: data,
            //icon: '/path/to/icon.png' // Optional icon
        })
    );
});
