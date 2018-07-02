const app = require('./app.js');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const PORT = 3003;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  //Check if work id is died
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });

} else {
  // This is Workers can share any TCP connection
  // It will be initialized using express
  console.log(`Worker ${process.pid} started`);

  app.get('/cluster', (req, res) => {
    let worker = cluster.worker.id;
    res.send(`Running on worker with id ==> ${worker}`);
  });

  app.listen(PORT, () => console.log(`listening on port ${PORT}!`));
}

// const app = require('./app.js');
// const PORT = 3003;

// app.listen(PORT, () => console.log(`listening on port ${PORT}!`));
