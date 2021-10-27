const express = require('express');
const emailApi = require('./api/email_api')
var cors = require('cors')



const app = express();
const port = 3000 || process.env.PORT;

app.use(cors());

app.options('*',cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/email_api", emailApi);

app.get('/', (req, res) => {
  res.send();
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  return;
});

app.listen(port, () => {
  console.log(`Example API listening at http://localhost:${port}`)
});
