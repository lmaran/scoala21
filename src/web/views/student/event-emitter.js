//  a mix between these techniques:
// https://stackoverflow.com/a/25833162
// https://dev.to/usamaashraf/using-events-in-nodejs-the-right-way-449b
var MyEventTarget = function(options) {
    // Create a DOM EventTarget object
    var target = document.createTextNode(null);

    // Pass EventTarget interface calls to DOM EventTarget object
    this.addEventListener = target.addEventListener.bind(target);
    this.removeEventListener = target.removeEventListener.bind(target);
    this.dispatchEvent = target.dispatchEvent.bind(target);

    // Room your your constructor code
};

// Create an instance of your event target
const eventEmitter = new MyEventTarget();

export default eventEmitter;
