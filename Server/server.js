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


// Code for all the stations--------------------------------------------------------------------------------------------------------------------------

// route returns a list of all stations (no admin rights necessary)
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

//route creates a new station in the database (admin)
app.post('/stations', checkAuth, async (req, res) => {
    if(!req.userData.isAdmin){
        return res.status(403).json({ message: 'Forbidden' });
    }
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

//route deletes an exsiting station with given id (admin)
app.delete('/stations/:stationId', checkAuth, async (req, res) => {
    if(!req.userData.isAdmin){
        return res.status(403).json({ message: 'Forbidden' });
    }

    const stationId = req.params.stationId;

    try {
        // Checking for the existance
        const stationQuery = {
            text: 'SELECT * FROM bike_stations WHERE station_id = $1',
            values: [stationId]
        };
        const stationResult = await pool.query(stationQuery);

        if (stationResult.rows.length === 0) {
            return res.status(404).json({ message: 'Station not found' });
        }

        // Deleting the station
        const deleteQuery = {
            text: 'DELETE FROM bike_stations WHERE station_id = $1',
            values: [stationId]
        };
        await pool.query(deleteQuery);

        res.status(200).json({ message: 'Station deleted successfully' });
    } catch (error) {
        console.error('Error deleting station:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//route for updating an existent station (admin)
app.put('/stations/:stationId',checkAuth, async (req, res) => {

    if(!req.userData.isAdmin){
        return res.status(403).json({ message: 'Forbidden' });
    }

    const stationId = req.params.stationId;
    const { name, address, latitude, longitude } = req.body;

    try {
        // Check if the station exists
        const stationQuery = {
            text: 'SELECT * FROM bike_stations WHERE station_id = $1',
            values: [stationId]
        };
        const stationResult = await pool.query(stationQuery);

        if (stationResult.rows.length === 0) {
            return res.status(404).json({ message: 'Station not found' });
        }

        // Update the station
        const updateQuery = {
            text: 'UPDATE bike_stations SET name = $1, address = $2, latitude = $3, longitude = $4 WHERE station_id = $5',
            values: [name, address, latitude, longitude, stationId]
        };
        await pool.query(updateQuery);

        res.status(200).json({ message: 'Station updated successfully' });
    } catch (error) {
        console.error('Error updating station:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


//routes for the categories---------------------------------------------------------------------------------------------------------------------------

//returning a list with all categories
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

//creating a new category (admin)
app.post('/categories', checkAuth, async (req, res) => {
    if(!req.userData.isAdmin){
        return res.status(403).json({ message: 'Forbidden' });
    }
    try {
        const name = req.body.name;

        // Validate input data
        if (!name ) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        // Insert new category into the database
        const query = {
            text: 'INSERT INTO bike_categories (name) VALUES ($1) RETURNING *',
            values: [name],
        };

        const result = await pool.query(query);

        res.status(201).json({ message: 'Category created successfully', category: result.rows[0] });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//route for updating an existent category (admin)
app.put('/categories/:categoryId',checkAuth, async (req, res) => {

    if(!req.userData.isAdmin){
        return res.status(403).json({ message: 'Forbidden' });
    }

    const categoryId = req.params.categoryId;
    const { name } = req.body;

    try {
        // Check if the category exists
        const categoryQuery = {
            text: 'SELECT * FROM bike_categories WHERE category_id = $1',
            values: [categoryId]
        };
        const categoryResult = await pool.query(categoryQuery);

        if (categoryResult.rows.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Update the category
        const updateQuery = {
            text: 'UPDATE bike_categories SET name = $1 WHERE category_id = $2',
            values: [name, categoryId]
        };
        await pool.query(updateQuery);

        res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//route deletes an exsiting category with given id (admin)
app.delete('/categories/:categoryId', checkAuth, async (req, res) => {
    if(!req.userData.isAdmin){
        return res.status(403).json({ message: 'Forbidden' });
    }

    const categoryId = req.params.categoryId;

    try {
        // Checking for the existance
        const categoryQuery = {
            text: 'SELECT * FROM bike_categories WHERE category_id = $1',
            values: [categoryId]
        };
        const categoryResult = await pool.query(categoryQuery);

        if (categoryResult.rows.length === 0) {
            return res.status(404).json({ message: 'category not found' });
        }

        // Deleting the category
        const deleteQuery = {
            text: 'DELETE FROM bike_categories WHERE category_id = $1',
            values: [categoryId]
        };
        await pool.query(deleteQuery);

        res.status(200).json({ message: 'category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//routes for the models-----------------------------------------------------------------------------------------------------------------------------

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

//creating a new model (admin)
app.post('/models', checkAuth, async (req, res) => {
    if(!req.userData.isAdmin){
        return res.status(403).json({ message: 'Forbidden' });
    }
    try {
        const {name, category_id, description, wheel_size, manufacturer, brake_type, price} = req.body;

        // Validate input data
        if (!name || !category_id || !description || !wheel_size || !manufacturer || !brake_type || !price) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        // Insert new model into the database
        const query = {
            text: 'INSERT INTO bike_models (name, category_id, description, wheel_size, manufacturer, brake_type, price) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            values: [name, category_id, description, wheel_size, manufacturer, brake_type, price],
        };

        const result = await pool.query(query);

        res.status(201).json({ message: 'model created successfully', model: result.rows[0] });
    } catch (error) {
        console.error('Error creating model:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//route for updating an existent model (admin)
app.put('/models/:modelId',checkAuth, async (req, res) => {

    if(!req.userData.isAdmin){
        return res.status(403).json({ message: 'Forbidden' });
    }

    const modelId = req.params.modelId;
    const { name, category_id, description, wheel_size, manufacturer, brake_type, price} = req.body;

    try {
        // Check if the model exists
        const modelQuery = {
            text: 'SELECT * FROM bike_models WHERE model_id = $1',
            values: [modelId]
        };
        const modelResult = await pool.query(modelQuery);

        if (modelResult.rows.length === 0) {
            return res.status(404).json({ message: 'model not found' });
        }

        // Update the model
        const updateQuery = {
            text: 'UPDATE bike_models SET name = $1, category_id = $2, description = $3, wheel_size = $4, manufacturer = $5, brake_type = $6, price = $7 WHERE model_id = $8',
            values: [name, category_id, description, wheel_size, manufacturer, brake_type, price, modelId]
        };
        await pool.query(updateQuery);

        res.status(200).json({ message: 'model updated successfully' });
    } catch (error) {
        console.error('Error updating model:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//route deletes an exsiting model with given id (admin)
app.delete('/models/:modelId', checkAuth, async (req, res) => {
    if(!req.userData.isAdmin){
        return res.status(403).json({ message: 'Forbidden' });
    }

    const modelId = req.params.modelId;

    try {
        // Checking for the existance
        const modelQuery = {
            text: 'SELECT * FROM bike_models WHERE model_id = $1',
            values: [modelId]
        };
        const modelResult = await pool.query(modelQuery);

        if (modelResult.rows.length === 0) {
            return res.status(404).json({ message: 'model not found' });
        }

        // Deleting the model
        const deleteQuery = {
            text: 'DELETE FROM bike_models WHERE model_id = $1',
            values: [modelId]
        };
        await pool.query(deleteQuery);

        res.status(200).json({ message: 'model deleted successfully' });
    } catch (error) {
        console.error('Error deleting model:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//routes for the bikes----------------------------------------------------------------------------------------------------------------------------------

app.get('/bikes', checkAuth, async (req, res) => {

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

//creating a new bike (admin)
app.post('/bikes', checkAuth, async (req, res) => {
    if(!req.userData.isAdmin){
        return res.status(403).json({ message: 'Forbidden' });
    }
    try {
        const {model_id, unique_id, station_id, status} = req.body;

        // Validate input data
        if (!model_id || !unique_id || !station_id) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        // Insert new bike into the database
        const query = {
            text: 'INSERT INTO individual_bikes (model_id, unique_id, station_id, status) VALUES ($1, $2, $3, $4) RETURNING *',
            values: [model_id, unique_id, station_id, status],
        };

        const result = await pool.query(query);

        res.status(201).json({ message: 'bike created successfully', bike: result.rows[0] });
    } catch (error) {
        console.error('Error creating bike:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//route for updating an existent bike (admin)
app.put('/bikes/:bikeId',checkAuth, async (req, res) => {

    if(!req.userData.isAdmin){
        return res.status(403).json({ message: 'Forbidden' });
    }

    const bikeId = req.params.bikeId;
    const {model_id, unique_id, station_id, status } = req.body;

    try {
        // Check if the bike exists
        const bikeQuery = {
            text: 'SELECT * FROM individual_bikes WHERE bike_id = $1',
            values: [bikeId]
        };
        const bikeResult = await pool.query(bikeQuery);

        if (bikeResult.rows.length === 0) {
            return res.status(404).json({ message: 'bike not found' });
        }

        // Update the bike
        const updateQuery = {
            text: 'UPDATE individual_bikes SET model_id = $1, unique_id = $2, station_id = $3, status = $4 WHERE bike_id = $5',
            values: [model_id, unique_id, station_id, status, bikeId]
        };
        await pool.query(updateQuery);

        res.status(200).json({ message: 'bike updated successfully' });
    } catch (error) {
        console.error('Error updating bike:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//route deletes an exsiting bike with given id (admin)
app.delete('/bikes/:bikeId', checkAuth, async (req, res) => {
    if(!req.userData.isAdmin){
        return res.status(403).json({ message: 'Forbidden' });
    }

    const bikeId = req.params.bikeId;

    try {
        // Checking for the existance
        const bikeQuery = {
            text: 'SELECT * FROM individual_bikes WHERE bike_id = $1',
            values: [bikeId]
        };
        const bikeResult = await pool.query(bikeQuery);

        if (bikeResult.rows.length === 0) {
            return res.status(404).json({ message: 'bike not found' });
        }

        // Deleting the bike
        const deleteQuery = {
            text: 'DELETE FROM individual_bikes WHERE bike_id = $1',
            values: [bikeId]
        };
        await pool.query(deleteQuery);

        res.status(200).json({ message: 'bike deleted successfully' });
    } catch (error) {
        console.error('Error deleting bike:', error);
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

app.post('/stations/:stationId/bikes', async (req, res) => {

    const stationId = req.params.stationId;
    const  bikeId  = req.body.bike_id; 

    // Validate input parameters
    if (!bikeId) {
        return res.status(400).json({ error: 'Bike ID is required' });
    }

    try {
        // Check if the station exists
        const stationExistsQuery = 'SELECT * FROM bike_stations WHERE station_id = $1';
        const stationExistsResult = await pool.query(stationExistsQuery, [stationId]);
        if (stationExistsResult.rows.length === 0) {
            return res.status(404).json({ error: 'Station not found' });
        }

        // Insert the bike into the database with the specified station
        const status = 'Free'
        const insertBikeQuery = 'UPDATE individual_bikes SET station_id = $1, status = $2 WHERE bike_id = $3';
        await pool.query(insertBikeQuery, [stationId, status, bikeId]);

        return res.status(201).json({ message: 'Bike assigned to station successfully' });
    } catch (error) {
        console.error('Error assigning bike to station:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/stations/:stationId/bikes/:bikeId', async (req, res) => {

    const stationId = req.params.stationId;
    const bikeId = req.params.bikeId; 

    try {
        // Check if the station exists
        const stationExistsQuery = 'SELECT * FROM bike_stations WHERE station_id = $1';
        const stationExistsResult = await pool.query(stationExistsQuery, [stationId]);
        if (stationExistsResult.rows.length === 0) {
            return res.status(404).json({ error: 'Station not found' });
        }

        // Insert the bike into the database with the specified station
        const station = null
        const insertBikeQuery = 'UPDATE individual_bikes SET station_id = $1 WHERE bike_id = $2';
        await pool.query(insertBikeQuery, [station, bikeId]);

        return res.status(201).json({ message: 'Bike unassigned from station successfully' });
    } catch (error) {
        console.error('Error unassigning bike from station:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

//routes for booking tickets

//returnes all booking tickets of the user, admin gets all back
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

//creating a new ticket
app.post('/booking-tickets', checkAuth, async (req, res) => {
    try {
        const {user_id, model_id, category_id, start_time, end_time, price, status} = req.body;

        // Validate input data
        if (!user_id|| !model_id|| !category_id|| !start_time|| !end_time|| !price|| !status) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        // Insert new ticket into the database
        const query = {
            text: 'INSERT INTO tickets (user_id, model_id, category_id, start_time, end_time, price, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            values: [user_id, model_id, category_id, start_time, end_time, price, status],
        };

        const result = await pool.query(query);

        res.status(201).json({ message: 'ticket created successfully', ticket: result.rows[0] });
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//route for updating an existent ticket (admin)
app.put('/booking_tickets/:ticketId',checkAuth, async (req, res) => {

    const ticketId = req.params.ticketId;
    const {user_id, model_id, category_id, start_time, end_time, price, status } = req.body;

    try {
        // Check if the ticket exists
        const ticketQuery = {
            text: 'SELECT * FROM tickets WHERE ticket_id = $1',
            values: [ticketId]
        };
        const ticketResult = await pool.query(ticketQuery);

        if (ticketResult.rows.length === 0) {
            return res.status(404).json({ message: 'ticket not found' });
        }

        // Update the ticket
        const updateQuery = {
            text: 'UPDATE tickets SET user_id = $1, model_id = $2, category_id = $3, start_time = $4, end_time = $5, price = $6, status = $7 WHERE ticket_id = $8',
            values: [user_id, model_id, category_id, start_time, end_time, price, status]
        };
        await pool.query(updateQuery);

        res.status(200).json({ message: 'ticket updated successfully' });
    } catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//route deletes an exsiting ticket with given id (admin)
app.delete('/booking_tickets/:ticketId', checkAuth, async (req, res) => {

    const ticketId = req.params.ticket_id;

    try {
        // Checking for the existance
        const ticketQuery = {
            text: 'SELECT * FROM tickets WHERE ticket_id = $1',
            values: [ticketId]
        };
        const ticketResult = await pool.query(ticketQuery);

        if (ticketResult.rows.length === 0) {
            return res.status(404).json({ message: 'ticket not found' });
        }

        // Deleting the ticket
        const deleteQuery = {
            text: 'DELETE FROM tickets WHERE ticket_id = $1',
            values: [ticketId]
        };
        await pool.query(deleteQuery);

        res.status(200).json({ message: 'ticket deleted successfully' });
    } catch (error) {
        console.error('Error deleting ticket:', error);
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

//creating a new user
app.post('/users', async (req, res) => {
    try {
        const {email, password} = req.body;

        // Validate input data
        if (!email || !password) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        // Insert new user into the database
        const query = {
            text: 'INSERT INTO users (email, password, wallet) VALUES ($1, $2, $3) RETURNING *',
            values: [email, password, 0],
        };

        const result = await pool.query(query);

        res.status(201).json({ message: 'user created successfully'});
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//route for updating an existent user (admin)
app.put('/user/:userId',checkAuth, async (req, res) => {

    if (!req.userData.isAdmin) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    const userId = req.params.userId;
    const {email, password, wallet, isAdmin } = req.body;

    try {
        // Check if the user exists
        const userQuery = {
            text: 'SELECT * FROM users WHERE user_id = $1',
            values: [userId]
        };
        const userResult = await pool.query(userQuery);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'user not found' });
        }

        // Update the user
        const updateQuery = {
            text: 'UPDATE users SET email = $1, password = $2, wallet = $3, isAdmin = $4 WHERE user_id = $5',
            values: [email, password, wallet, isAdmin, userId]
        };
        await pool.query(updateQuery);

        res.status(200).json({ message: 'user updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//route deletes an exsiting user with given id
app.delete('/users/:userId', checkAuth, async (req, res) => {

    const userId = req.params.userId;
    const userIdReal = req.userData.userId;

    if(userId != userIdReal || !req.userData.isAdmin){
        return res.status(403).json({ message: 'Forbidden' });
    }

    try {
        // Checking for the existance
        const userQuery = {
            text: 'SELECT * FROM users WHERE user_id = $1',
            values: [userId]
        };
        const userResult = await pool.query(userQuery);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'user not found' });
        }

        // Deleting the user
        const deleteQuery = {
            text: 'DELETE FROM users WHERE user_id = $1',
            values: [userId]
        };
        await pool.query(deleteQuery);

        res.status(200).json({ message: 'user deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// routes for managing a users wallet
app.get('/users/:userId/wallet',checkAuth, async (req, res) => {
    const userId = req.params.userId;
    if (req.userData.userId != userId && !req.userData.isAdmin) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT wallet FROM users WHERE user_id = $1', [userId]);
        const wallet = result.rows[0];

        if (!wallet) {
            res.status(404).json({ message: 'THERE IS NO BALANCE OH NO' });
        } else {
            res.status(200).json(wallet);
        }

    } catch (error) {
        console.error(`Error accessing database: `, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/users/:userId/wallet',checkAuth, async (req, res) => {
    const userId = req.params.userId;
    if (req.userData.userId != userId) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    const new_balance = req.body.balance;

    if(!new_balance){
        return res.status(400).json({ message: 'Invalid input data' });
    }

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT wallet FROM users WHERE user_id = $1', [userId]);
        const wallet = parseFloat(result.rows[0].wallet);

        const new_wallet = wallet + new_balance;

        // Update the wallet
        const updateQuery = {
            text: 'UPDATE users SET wallet = $1 WHERE user_id = $2',
            values: [new_wallet, userId]
        };
        await pool.query(updateQuery);
        
        res.status(200).json({ message: 'balance added successfully' });

    } catch (error) {
        console.error(`Error accessing database: `, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.delete('/users/:userId/wallet',checkAuth, async (req, res) => {
    const userId = req.params.userId;
    if (req.userData.userId != userId) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    const new_balance = req.body.balance;

    if(!new_balance){
        return res.status(400).json({ message: 'Invalid input data' });
    }

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT wallet FROM users WHERE user_id = $1', [userId]);
        const wallet = parseFloat(result.rows[0].wallet);

        const new_wallet = wallet - new_balance;
        console.log(new_wallet);

        // Update the wallet
        const updateQuery = {
            text: 'UPDATE users SET wallet = $1 WHERE user_id = $2',
            values: [new_wallet, userId]
        };
        await pool.query(updateQuery);
        
        res.status(200).json({ message: 'withdrawn money successfully' });

    } catch (error) {
        console.error(`Error accessing database: `, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//routes for managing reviews

//route for returning reviews for a specific station
app.get('/stations/s:stationId/reviews',checkAuth, async (req, res) => {
    const stationId = req.params.stationId;

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM reviews WHERE station_id = $1', [stationId]);
        const reviews = result.rows;

        if (!reviews) {
            res.status(404).json({ message: 'No reviews' });
        } else {
            res.status(200).json(reviews);
        }

    } catch (error) {
        console.error(`Error accessing database: `, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//route for returning reviews for a specific model
app.get('/stations/m:modelId/reviews',checkAuth, async (req, res) => {
    const modelId = req.params.modelId;

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM reviews WHERE model_id = $1', [modelId]);
        const reviews = result.rows[0];

        if (!reviews) {
            res.status(404).json({ message: 'No reviews' });
        } else {
            res.status(200).json(reviews);
        }

    } catch (error) {
        console.error(`Error accessing database: `, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//route for writing  reviews

app.post("/booking-tickets/:ticketId/reviews", checkAuth, async(req, res) => {

    const { rating, comment } = req.body;
    const ticketId = req.params.ticketId;
    if (!rating || !comment) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Fetch ticket information based on ticketId
        const ticketQuery = {
            text: 'SELECT model_id, station_id, user_id FROM tickets WHERE ticket_id = $1',
            values: [ticketId]
        };
        const ticketResult = await pool.query(ticketQuery);
        const { model_id, station_id, user_id } = ticketResult.rows[0];

        if(user_id != req.userData.userId){
            return res.status(403).json({message: "cant review other tickets than your own"});
        }

        // Insert review into the database
        const insertQuery = {
            text: 'INSERT INTO reviews (rating, comment, model_id, station_id, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            values: [rating, comment, model_id, station_id, user_id]
        };
        const result = await pool.query(insertQuery);

        res.status(201).json({ message: 'Review added successfully', review: result.rows[0] });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

  
let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:"+port);