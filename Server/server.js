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

const registerRoutes = require('./register');
app.use("/register", registerRoutes);

app.get("/", (req, res) => {
    
	// TODO: set content type (from EX1)
    res.header('Content-Type', 'application/json');
	
    res.status(200).send("EX4: This is a database-backed application which uses JWT");
});

app.get('/wallet', checkAuth, async (req, res) => {

    try{
        const userId = req.userData.userId;
        const result = await pool.query('SELECT wallet FROM users WHERE user_id = $1', [userId]);
        
        if(result.rows.length === 0){
            return res.status(401).json({message:`Invalid user ID`});
        } else {
            const balance = result.rows[0].wallet
            console.log(balance);
            res.json({ balance });
        }
    }catch(error){
        console.error('Error querying database:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/wallet/charge', checkAuth, async (req, res) => {

    try{
        const userId = req.userData.userId;
        const { amount } = req.body;
        const query = {
            text: 'UPDATE users SET wallet = wallet + $1 WHERE user_id = $2',
            values: [amount, userId],
          };
        
          pool.query(query, (err, result) => {
            if (err) {
              console.error('Error executing query:', err);
              res.status(500).json({ message: 'Failed to update wallet balance' });
            } else {
              if (result.rowCount === 1) {
                console.log('Wallet balance updated successfully');
                res.status(200).json({ message: 'Wallet balance updated successfully' });
              } else {
                console.error('User not found or no wallet balance updated');
                res.status(404).json({ message: 'User not found or no wallet balance updated' });
              }
            }
          });
    }catch(error){
        console.error('Error querying database:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/wallet/use', checkAuth, async (req, res) => {

    try{
        const userId = req.userData.userId;
        const { amount } = req.body;
        const query = {
            text: 'UPDATE users SET wallet = wallet - $1 WHERE user_id = $2',
            values: [amount, userId],
          };
        
          pool.query(query, (err, result) => {
            if (err) {
              console.error('Error executing query:', err);
              res.status(500).json({ message: 'Failed to update wallet balance' });
            } else {
              if (result.rowCount === 1) {
                console.log('Wallet balance updated successfully');
                res.status(200).json({ message: 'Wallet balance updated successfully' });
              } else {
                console.error('User not found or no wallet balance updated');
                res.status(404).json({ message: 'User not found or no wallet balance updated' });
              }
            }
          });
    }catch(error){
        console.error('Error querying database:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Code for all the stations
app.get('/stations',checkAuth, async (req, res) => {

    try{
        let stations = [];
        const result = await pool.query(`SELECT * FROM bike_stations`);
        stations = result.rows;
        res.json(stations);
    }catch(error){
        console.error('Error querying database:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/stations', async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        // Validate input data
        if (!name || !address || !latitude || !longitude) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        // Insert new station into the database
        const query = {
            text: 'INSERT INTO bike_stations (name, address, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *',
            values: [name, address, latitude, longitude],
        };

        const result = await pool.query(query);

        res.status(201).json({ message: 'Station created successfully', station: result.rows[0] });
    } catch (error) {
        console.error('Error creating station:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//routes for the categories

app.get('/categories',checkAuth, async (req, res) => {

    try{
        let categories = [];
        const result = await pool.query(`SELECT * FROM bike_categories`);
        categories = result.rows;
        res.json(categories);
    }catch(error){
        console.error('Error querying database:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//routes for the models

app.get('/models',checkAuth, async (req, res) => {

    try{
        let models = [];
        const result = await pool.query(`SELECT * FROM bike_models`);
        models = result.rows;
        res.json(models);
    }catch(error){
        console.error('Error querying database:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//routes for the bikes

app.get('/bikes',checkAuth, async (req, res) => {

    try{
        let bikes = [];
        const result = await pool.query(`SELECT * FROM individual_bikes`);
        bikes = result.rows;
        res.json(bikes);
    }catch(error){
        console.error('Error querying database:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//routes for assigned bikes to stations
app.get('/stations/:stationId/bikes',checkAuth, async (req, res) => {

    try {
        const stationId = req.params.stationId;

        // Validate stationId
        if (!stationId || isNaN(stationId)) {
            return res.status(400).json({ message: 'Invalid stationId' });
        }

        // Query to get bikes assigned to the specific station
        const query = {
            text: 'SELECT * FROM public.individual_bikes WHERE station_id = $1',
            values: [stationId],
        };

        const result = await pool.query(query);
        res.status(200).json({ bikes: result.rows });
    } catch (error) {
        console.error('Error getting bikes for the station:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/stations/:stationId/bike',checkAuth, async (req, res) => {

    try {
        const stationId = req.params.stationId;

        // Validate stationId
        if (!stationId || isNaN(stationId)) {
            return res.status(400).json({ message: 'Invalid stationId' });
        }

        // Query to get bikes assigned to the specific station
        const query = {
            text: 'SELECT bm.model_id as model_id, bc.category_id as category_id, ib.bike_id as id, bm.name as model_name, bc.name as category_name, bm.wheel_size, bm.manufacturer, bm.brake_type, bm.pph FROM individual_bikes ib, bike_models bm, bike_categories bc WHERE station_id = $1 AND ib.model_id = bm.model_id AND bm.category_id = bc.category_id',
            values: [stationId],
        };

        const result = await pool.query(query);
        res.status(200).json({ bikes: result.rows });
    } catch (error) {
        console.error('Error getting bikes for the station:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//routes for booking tickets
app.get('/booking-tickets',checkAuth, async (req, res) => {

    if(req.userData.isAdmin){
        console.log("reached admin");

        try{
            let tickets = [];
            const result = await pool.query(`SELECT * FROM tickets`);
            tickets = result.rows;
            res.json(tickets);
        }catch(error){
            console.error('Error querying database:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }else{
        console.log("reached user");
        try{
            let tickets = [];
            const userId = req.userData.userId;
            console.log(userId);
            const result = await pool.query(`SELECT * FROM tickets WHERE user_id = $1`, [userId]);
            tickets = result.rows;
            res.json(tickets);
        }catch(error){
            console.error('Error querying database:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});

app.post('/booking-tickets',checkAuth, async (req, res) => {
    const data = { category_id, end_time, model_id, price, start_time, status, user_id, station_id } = req.body.ticket;
    try {
        const result = await pool.query(`
            INSERT INTO tickets (user_id, model_id, category_id, start_time, end_time, price, status, station_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
            [user_id, model_id, category_id, start_time, end_time, price, status, station_id]);

        const ticket = result.rows[0];
        res.status(200).json(ticket);
    } catch (error) {
        console.error('Error inserting ticket into database:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.patch('/booking-tickets/:ticketId', checkAuth, async (req, res) => {
    const ticketId = req.params.ticketId;
    console.log(ticketId)
    const { status } = req.body;
    console.log(status);

    try {
        const result = await pool.query(`
            UPDATE tickets 
            SET status = $1
            WHERE ticket_id = $2
            RETURNING *`,
            [status, ticketId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const updatedTicket = result.rows[0];
        res.status(200).json(updatedTicket);
    } catch (error) {
        console.error('Error updating ticket status in database:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/booking-tickets/:ticketId',checkAuth, async (req, res) => {

    if(req.userData.isAdmin){
        try {
            const userId = req.userData.userId;
            const ticketId = req.params.ticketId;
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM tickets WHERE ticket_id = $1', [ticketId]);
            const user = result.rows[0];
    
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.status(200).json(user);
            }
    
        } catch (error) {
            console.error(`Error accessing database: `, error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }else{
    try {
        const userId = req.userData.userId;
        const ticketId = req.params.ticketId;
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM tickets WHERE ticket_id = $1 AND user_id = $2', [ticketId, userId]);
        const user = result.rows[0];

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(user);
        }

    } catch (error) {
        console.error(`Error accessing database: `, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
});

//routes for creating / managing users

app.get('/users/:userId',checkAuth, async (req, res) => {
    const userId = req.params.userId;
    if (req.userData.userId != userId && !req.userData.isAdmin) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users WHERE user_id = $1', [userId]);
        const user = result.rows[0];

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(user);
        }

    } catch (error) {
        console.error(`Error accessing database: `, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//reviews from specific station
app.get('/stations/:stationId/reviews',checkAuth, async (req, res) => {

    try{
        const stationId = req.params.stationId;

        // Validate stationId
        if (!stationId || isNaN(stationId)) {
            return res.status(400).json({ message: 'Invalid stationId' });
        }

        let reviews = [];
        const result = await pool.query('SELECT rating FROM reviews WHERE station_id = $1', [stationId]);
        reviews = result.rows;
        res.json(reviews);
    }catch(error){
        console.error('Error querying database:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/tickets/reviews',checkAuth, async (req, res) => {
    const data = { user_id, model_id, station_id, reviewText, rating } = req.body;
    console.log(data.ticket)
    try {
        const result = await pool.query(`
            INSERT INTO reviews (user_id, model_id, station_id, rating, comment)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [user_id, model_id, station_id, rating, reviewText]);

        const review = result.rows[0];
        res.status(200).json(review);
    } catch (error) {
        console.error('Error inserting review into database:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
  
let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:"+port);