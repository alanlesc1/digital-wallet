import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import { awsAccessKeyId, awsSecretAccessKeyId, awsSecretsManagerRegion, awsSecretsManagerSecretId }
    from '../config/environment';
import Cache from '../cache';

const cacheService = new Cache(60 * 60 * 24); // 24 hours

const secretsManagerClient = new SecretsManagerClient({
    region: awsSecretsManagerRegion,
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKeyId
});

const secretsManager = async (keyName) => {
    const key = 'secretsManager_' + awsSecretsManagerSecretId + '_' + keyName;

    return await cacheService.get(key, async () => {
        let data = await secretsManagerClient.send(
            new GetSecretValueCommand({ SecretId: awsSecretsManagerSecretId })
        );

        if ('SecretString' in data) {
            let secret = JSON.parse(data.SecretString);
            
            if (keyName) {
                return Buffer.from(secret[keyName], 'base64').toString('utf-8');                
            } else {
                return secret;
            }
        } else {
            return Buffer.from(data.SecretBinary, 'base64').toString('utf-8'); 
        }
    });
}

export { secretsManager };
