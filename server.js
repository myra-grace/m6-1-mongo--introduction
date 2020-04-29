'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = process.env.PORT || 8000;

const { getCollection } = require('./exercises/exercise1-2');
const { createGreeting, getGreeting, findMore, deleteGreeting, updateGreeting } = require('./exercises/exercise-2');


express()
  .use(morgan('tiny'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // exercise 1
  .get('/ex-1/:dbName/:collection', getCollection)

  // exercise 2
  .post('/ex-2/greeting/:_id', createGreeting)
  .get('/ex-2/greeting/:_id', getGreeting)
  .get('/ex-2/greeting/', findMore)
  .delete('/ex-2/greeting/:_id', deleteGreeting)
  .put('/ex-2/greeting/:_id', updateGreeting)

  // handle 404s
  .use((req, res) => res.status(404).type('txt').send('🤷‍♂️'))

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
