// This code runs inside the Web Worker
self.onmessage = function(event) {
    //console.log("Message received in worker:", event.data);
    var sum = 0;
    for (var i=1;i<10000000000;i++){
        sum++;
    }
    self.postMessage("Hello from the worker! the sum is "+sum);
};
