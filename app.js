// Import necessary modules
import dotenv from 'dotenv';
import {engine} from 'express-handlebars';
import express from 'express';
import {fileURLToPath} from 'url';
import path from 'path';

import {router} from './routes/index-routes.js';

// Create an instance of the Express application
const app = express();

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine('handlebars', engine());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware configuration
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
