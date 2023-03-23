/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-var */
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var api = require('./api/routes');
var handleForm = require('./api/form');
var formData = require('./api/formData');
require('./db/mongoose')
const cors = require('cors')

var mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';

var app = express();
app.use(cors({
  origin: true,
  allowedHeaders: ['Content-Type']
}))
// set the view engine to ejs
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
// app.engine('ejs', require('ejs').renderFile);

app.set('port', (process.env.PORT || isProduction ? 8080 : 5005));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

if (isProduction) {
  app.use(express.static(`${__dirname}/../dist`));
}

app.use('/api/', api);

function fixLabelLink(data) {
  const task_data = data.task_data.map(x => ({ ...x }));
  for (let i = 0; i < task_data.length; i++) {
    if (data.task_data[i].label) {
      task_data[i].label = task_data[i].label.replace(/"/g, '\\"');
    }
    if (data.task_data[i].component) {
      task_data[i].component = {};
    }
  }
  return { task_data };
}

app.route('/api/form/')
  .get((req, res) => {
    const data = fixLabelLink(formData.data);
    // console.log('get form: ', data);
    // console.log('get form answers: ', formData.answers);
    res.render('index', {
      data: JSON.stringify(data),
      answers: JSON.stringify(formData.answers),
    });
  })
  .post(handleForm);

// console.log('NODE_ENV', process.env.NODE_ENV, `${__dirname}/../dist`);

// 404 catch-all handler (middleware)
app.use(function (req, res) {
  res.status(404);
  res.render('404');
});

app.put('/api/updateData', async (req, res) => {
  const { _id, newData } = req.body;
  try {
    // Find the form with the specific ID
    const form = await FormCreate.findOne({ _id });

    // Merge the updated data with the existing data
    const updatedData = { ...form.task_data, ...newData };

    // Save the updated data to the database
    await FormCreate.updateOne({ _id }, { task_data: updatedData });

    // Send a success response
    res.send('Data updated successfully');
  } catch (e) {
    // Send an error response
    res.status(400).send('Error updating data');
  }
});


// 500 error handler (middleware)
app.use(function (err, req, res, next) {
  res.status(500);
  res.render('500', { error: err });
});

app.listen(app.get('port'), function () {
  console.log(
    `Express started on http://localhost:${app.get(
      'port',
    )}; press Ctrl-C to terminate.`,
  );
});
