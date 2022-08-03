// Synchronus code : 
// code is executed line by line
// each line of code waits for the previous line to finish
// long running operations block code execution

// Asynchronous code :
// executed after a that task runs in background finishes
// it is non-blocking
// eg : callback function,addEventListener (they alone do not make the code asynchronous)
// img.src = 'source' // image can load in background

// AJAX 
// Asynchronous Javascript and XML
// it allows us to communicate with remote web servers in an asynchronous way.
// with ajax calls, we can request some data from a web server dynamically.

// API 
// eg: DOM API, GeolocationAPI, OnlineAPI ( APPLICATION RUNNING ON SERVER, THAT RECIEVES REQUESTS FOR DATA, AND SENDS DATA BACK AS RESPONSE )
// API uses JSON data format.

// CallBack Hell
// nested callbacks is called Callback hell.
// to execute aysnchronous tasks in sequence.

// Promises 
// help us Escape callback hell
// An object that is used as a placeholder for the future result of an asynchronous opration. (container for future value) => response coming from AJAX call.
// we can chain promises for a sequence of asynchronous operations => Escape callback hell
// Life cycle of promises : 
// 1. pending  => 2. settled ( fulfilled: success, rejected: error )
