import { emailTransporter, verificationCodeEmailOptions } from './email.js';
import { nodeEnv } from '../config/environment';
import * as resultsFactory from '../graphql/results';

module.exports.generateNewVerification = async (user) => {
    const newVerificationCode = Math.floor(1000 + Math.random() * 9000);

    user.set({
        verificationCode: newVerificationCode,
        verificationCodeExp: user.sequelize.literal("current_timestamp + (5 * interval '1 minute')"),
    });

    await user.save();

    const emailOptions = {
        ...verificationCodeEmailOptions,
        to: user.email,
        text: `Seu código de verificação é ${newVerificationCode}`
    }

    if (!nodeEnv.test) {
        emailTransporter.sendMail(emailOptions, function (err, data) {
            if (err) {
                throw new Error(err);
            }
        });
    }
};

module.exports.verifyCode = async (user, verificationCode) => {
    if (user.verificationCode === verificationCode) {
        // TODO: configure timezone properly
        const [results] = await user.sequelize.query("SELECT now()");
        const now = results[0].now;

        if (user.verificationCodeExp > now) {
            user.isUserVerified = true;
            await user.save();
            return true;
        } else {
            throw resultsFactory.create(resultsFactory.UserVerificationResultError, resultsFactory.messages.verificationCodeExpired);
        }
    } else {
        throw resultsFactory.create(resultsFactory.UserVerificationResultError, resultsFactory.messages.verificationCodeIsInvalid);
    }
};
