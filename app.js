const express = require('express');
const morgan = require('morgan');
const app = express();
const layout = require('./views/layout');
const { db, Page, User } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users');

db.authenticate().then(() => {
  console.log('connected to the database');
});

app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send(layout(''));
});

const PORT = 1234;
const init = async () => {
  await db.sync({ force: true });
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();
