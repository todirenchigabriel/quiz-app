const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('App started on port ' + port));

app.use(express.static(path.resolve(__dirname, './client/build')));

app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
);
