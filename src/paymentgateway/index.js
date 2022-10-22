import * as pagarme from "./pagarme"
import * as db from '../db/models';

export const createCustomer = async (user) => {
    // TODO: change this static data
    const data = {
        name: user.name,
        email: user.email,
        phone_numbers: ['+5511999999999'],
        external_id: user.C_User_ID.toString(),
        type: 'individual',
        country: "br",
        documents: [{
            number: "00639014984",
            type: "cpf",
        }]
    };

    const result = await pagarme.createCustomer(user, data);

    return {
        PGM_CustomerId: result.id,
    };
}

export const createCard = async (userWallet, data) => {
    const user = await db.MUser.findByPk(userWallet.C_User_ID);

    // if the customer is not created yet, create it before creating the card
    if (!user.PGM_CustomerID) {
        const result = await createCustomer(user);
        user.PGM_CustomerId = result.PGM_CustomerId;
        await user.save();
    }

    data.customer_id = user.PGM_CustomerId;

    const result = await pagarme.createCard(userWallet, data);

    return {
        isValid: result.valid,
        PGM_CardId: result.id,
        cardBrand: result.brand,
        cardFirstDigits: result.first_digits,
        cardLastDigits: result.last_digits,
        cardHolderName: result.holder_name,
    }
}