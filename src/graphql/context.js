import * as sequelizeDB from '../db/models';
import * as results  from './results';

const context = async ({ req }) => {
    return {
        authUser: req.auth ? req.auth : null,
        db: sequelizeDB,
        results: results
    };
};

export default context;
