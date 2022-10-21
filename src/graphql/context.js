import * as sequelizeDB from '../db/models';
import * as results  from './results';
import * as paymentGateway  from '../paymentgateway';

const context = async ({ req }) => {
    return {
        authUser: req.auth ? req.auth : null,
        db: sequelizeDB,
        paymentGateway,
        results: results
    };
};

export default context;
