// Import necessary modules
import dotenv from 'dotenv';
import {engine} from 'express-handlebars';
import express from 'express';
import {fileURLToPath} from 'url';
import path from 'path';

import {INDEX_ROUTES} from './routes/index-routes.js';
import {APPOINTMENTS_ROUTES} from './routes/appointments-routes.js';

// Create an instance of the Express application
const app = express();

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine('.hbs', engine({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(INDEX_ROUTES);
app.use(APPOINTMENTS_ROUTES);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
