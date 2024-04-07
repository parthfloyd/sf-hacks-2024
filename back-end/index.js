const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

const authRoute = require('./routes/auth.route');
const profileRoute = require('./routes/profile.route');
const llmRoute = require('./routes/llm.route');

app.use(express.json());
app.use(cors());
app.use('/auth',authRoute);
app.use('/api',profileRoute);
app.use('/llm', llmRoute);

app.listen(port, (err) => {
    if(err){
        process.exit(1);
    }
    console.log(`Server is running on port ${port}`);
});