const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { DATABASE, PORT } = require('./config');
const app = express();

app.use(morgan(':method :url :res[location] :status'));

app.use(bodyParser.json());

// ADD ENDPOINTS HERE
// app.get('/', (req, res)=>
//   knex('hackernews').select().then((response)=> res.json(response))
// );
app.post('/api/stories', (req, res) =>{
  // res.json(req.body);
  const requiredFields = ['title', 'url'];
  for (let i=0; i < requiredFields.length; i++){
    const field = requiredFields[i];
    if (!(field in req.body)){
      const message = `missing ${field} in request!`;
      console.error(message);
      return res.status(401);
    }
  }
  knex('hackernews').insert({title: req.body.title, url: req.body.url}, ['id', 'title'])
  .then((end) => res.json(end));
});

app.get('/api/stories', (req, res)=>{
  knex('hackernews').select().orderBy('votes', 'desc').limit(20).then((response)=> res.json(response));
})
app.put('/api/stories/:id', (req, res)=>{
  let voteId = req.params.id;
  knex('hackernews',['title','url']).select().where('id', '=', voteId)
  .increment('votes', '1')
  .then(res.status(204).send())
})


let server;
let knex;
function runServer(database = DATABASE, port = PORT) {
  return new Promise((resolve, reject) => {
    try {
      knex = require('knex')(database);
      server = app.listen(port, () => {
        console.info(`App listening on port ${server.address().port}`);
        resolve();
      });
    }
    catch (err) {
      console.error(`Can't start server: ${err}`);
      reject(err);
    }
  });
}

function closeServer() {
  return knex.destroy().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing servers');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => {
    console.error(`Can't start server: ${err}`);
    throw err;
  });
}

module.exports = { app, runServer, closeServer };
