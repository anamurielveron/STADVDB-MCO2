import {createPool} from "mysql2/promise";

import {
    DATABASE_LUZON,
    DATABASE_PHILIPPINES,
    DATABASE_VISMIN,
} from './config.js';

const POOL_LUZON = createPool(DATABASE_LUZON);
const POOL_PHILIPPINES = createPool(DATABASE_PHILIPPINES);
const POOL_VISMIN = createPool(DATABASE_VISMIN);

export {
    POOL_LUZON,
    POOL_PHILIPPINES,
    POOL_VISMIN,
};