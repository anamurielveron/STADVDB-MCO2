import {config} from 'dotenv';

config();

const {
    DATABASE_HOST = 'ccscloud.dlsu.edu.ph',
    DATABASE_NAME_MAIN = 'Philippines',
    DATABASE_NAME_SLAVE1 = 'Luzon',
    DATABASE_NAME_SLAVE2 = 'VisMin',
    DATABASE_PASSWORD = 'password',
    DATABASE_PORT_MAIN = 20096,
    DATABASE_PORT_SLAVE1 = 20097,
    DATABASE_PORT_SLAVE2 = 20098,
    DATABASE_USERNAME = 'username',
} = process.env;

const DATABASE_DEFAULT = {
    host: DATABASE_HOST,
    password: DATABASE_PASSWORD,
    user: DATABASE_USERNAME,
}

const DATABASE_LUZON = {
    ...DATABASE_DEFAULT,
    database: DATABASE_NAME_SLAVE1,
    port: DATABASE_PORT_SLAVE1,
};

const DATABASE_PHILIPPINES = {
    ...DATABASE_DEFAULT,
    database: DATABASE_NAME_MAIN,
    port: DATABASE_PORT_MAIN,
};

const DATABASE_VISMIN = {
    ...DATABASE_DEFAULT,
    database: DATABASE_NAME_SLAVE2,
    port: DATABASE_PORT_SLAVE2,
};

export {
    DATABASE_LUZON,
    DATABASE_PHILIPPINES,
    DATABASE_VISMIN,
};