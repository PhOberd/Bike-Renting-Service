let cfg = require('./config.json')

let express = require('express');
let cors = require('cors')
const app = express();
app.use(express.static('public')); // host public folder
app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *

app.use((req, res, next)=>{
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

const pool = require('./pool.js');

let bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies

const checkAuth = require('./check_auth');

const loginRoutes = require('./login');
app.use("/login", loginRoutes);

app.get("/", (req, res) => {
    
	// TODO: set content type (from EX1)
    res.header('Content-Type', 'text/html');
	
    res.status(200).send("EX4: This is a database-backed application which uses JWT");
});

// TODO: the rest of the route handlers are mostly the same as in EX3 with important differences

app.get('/products',checkAuth, async (req, res) => {
	// write your code here to output the list of products as JSON

    try{
        let users = [];
        const result = await pool.query(`SELECT * FROM users`);
        users = result.rows;
        res.json(users);
    }catch(error){
        console.error('Error querying database:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
  
let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:"+port);