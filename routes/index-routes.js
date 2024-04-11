import {Router} from 'express';

import {getIndex} from '../controllers/index-controller.js';

const INDEX_ROUTES = Router();

INDEX_ROUTES.get('/', getIndex);

export {INDEX_ROUTES};