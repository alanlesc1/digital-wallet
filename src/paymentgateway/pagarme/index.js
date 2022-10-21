import axios from 'axios';
import { secretsManager } from '../../aws';
import { nodeEnv } from '../../config/environment';
import * as db from '../../db/models';

const ENDPOINT_CUSTOMERS = "https://api.pagar.me/1/customers";
const ENDPOINT_CARDS = "https://api.pagar.me/1/cards";

const getApiKey = async () => nodeEnv.production ?
  await secretsManager('API_KEY_PROD') :
  await secretsManager('API_KEY_TEST');

const getUrl = async endpoint => `${endpoint}?api_key=` + await getApiKey();

const getHeaders = () => {
  return { accept: 'application/json', 'content-type': 'application/json' };
}

export const createCustomer = async (user, data) => {
  const method = 'POST';
  const endpoint = ENDPOINT_CUSTOMERS;

  // TODO: move to the model file
  const [results] = await db.sequelize.query("SELECT AD_Table_ID FROM AD_Table WHERE TableName='c_user'");
  const AD_Table_ID = results[0].ad_table_id;

  // save request
  const pgmRequest = await db.MPGMRequest.create({
    requestDate: new Date(),
    method: method,
    url: endpoint,
    jsonRequest: JSON.stringify(data),
    AD_Table_ID: AD_Table_ID,
    Record_ID: user.C_User_ID,
  });

  const options = {
    method: method,
    url: await getUrl(endpoint),
    headers: getHeaders(),
    data
  };

  return axios
    .request(options)
    .then(function (response) {
      pgmRequest.jsonResponse = JSON.stringify(response.data);
      pgmRequest.save();
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
}

export const createCard = async (userWallet, data) => {
  const method = 'POST';
  const endpoint = ENDPOINT_CARDS;

  // TODO: move to the model file
  const [results] = await db.sequelize.query("SELECT AD_Table_ID FROM AD_Table WHERE TableName='c_userwallet'");
  const AD_Table_ID = results[0].ad_table_id;

  // save request
  const pgmRequest = await db.MPGMRequest.create({
    requestDate: new Date(),
    method: method,
    url: endpoint,
    jsonRequest: JSON.stringify(data),
    AD_Table_ID: AD_Table_ID,
    Record_ID: userWallet.C_UserWallet_ID,
  });

  const options = {
    method: method,
    url: await getUrl(endpoint),
    headers: getHeaders(),
    data
  };

  return axios
    .request(options)
    .then(function (response) {
      pgmRequest.jsonResponse = JSON.stringify(response.data);
      pgmRequest.save();
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
} 
