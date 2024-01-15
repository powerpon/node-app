const EventEmitter = require('./task1');

class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        this.emit('begin');
        let timer = Date.now();
        const response = await asyncFunc(...args);
        timer = Date.now() - timer;
        this.emit('end');
        console.log('Time taken to execute asyncFunc: ' + timer + 'ms');
        this.emit('data', await response.json());
    }
 }
 
 const withTime = new WithTime();
 
 withTime.on('begin', () => console.log('About to execute'));
 withTime.on('end', () => console.log('Done with execute'));
 
 console.log(withTime.rawListeners("end"));

 withTime.on('data', (data) => console.log(data));
 withTime.execute(fetch, 'https://jsonplaceholder.typicode.com/posts/1');

