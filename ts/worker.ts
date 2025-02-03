self.onmessage = function(event) {
    const data = event.data;
    console.log('Worker received:', data);

    // Simulate a heavy computation
    let result = 0;
    for (let i = 0; i < 1e6; i++) {
        result += i;
    }

    self.postMessage(result); // Send result back to the main thread
};


self.onmessage = (event: MessageEvent): void => {
	
}