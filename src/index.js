const express = require('express');
const routes = require('./routes');
const cors = require('cors');
require('dotenv/config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(process.env.PORT || 8080, () => {
	console.log(`Server running in port ${process.env.PORT || 8080}`);
	
	console.log('*************************************')
	console.log(process.env.EMAIL_USER)
	console.log(process.env.EMAIL_PASS)
});