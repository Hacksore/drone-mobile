import * as AWSCognito from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk/global';
import got from 'got';
import {
  AUTH_CLIENT_ID,
  AUTH_REGION_ID,
  AUTH_IDENTITY_POOL_ID,
  AUTH_USER_POOL_ID,
  DRONE_ACCOUNT_BASE_URL
} from './constants';

export const getSessionToken = ({ username, password }): Promise<string> => {
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AWSCognito.AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const poolData = {
      UserPoolId: AUTH_USER_POOL_ID,
      ClientId: AUTH_CLIENT_ID,
    };
    const userPool = new AWSCognito.CognitoUserPool(poolData);
    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new AWSCognito.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        AWS.config.region = AUTH_REGION_ID;

        const credentials: any = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: AUTH_IDENTITY_POOL_ID,
          Logins: {
            [`cognito-idp.${AUTH_REGION_ID}.amazonaws.com/${poolData.UserPoolId}`]: result
              .getIdToken()
              .getJwtToken(),
          },
        });
        
        credentials.refresh(error => {
          if (error) {
            return;
          }
          const accessToken = Object.values(credentials.params.Logins)[0] as string;

          resolve(accessToken);
        });
      },
      onFailure: function (err) {
        reject(err);
      },
    });
  });
};

export const apiRequest = async ({ path, body, accessToken}) => {

  const response: any = await got({
    url: `${DRONE_ACCOUNT_BASE_URL}${path}`,
    method: 'POST',
    body: JSON.stringify(body),
    throwHttpErrors: false,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      'x-drone-api': accessToken,
    },
  });

  return {
    statusCode: response.statusCode,
    result: response.body
  };

}
