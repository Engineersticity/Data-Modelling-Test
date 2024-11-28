import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { myFunction } from './functions/my-function/resource';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cr from 'aws-cdk-lib/custom-resources';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Fn, Stack, CustomResource } from 'aws-cdk-lib';

const backend = defineBackend({
  auth,
  data,
  myFunction,
  // ... other functions
});

// Create a new stack for custom resources
const customStack = backend.createStack('CustomResourceStack');

const amplifyEnv = "dev";

// Create a custom resource to get the Amplify App ID
const getAppIdRole = new iam.Role(customStack, 'GetAppIdRole', {
  assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
  managedPolicies: [
    iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')
  ],
});

getAppIdRole.addToPolicy(new iam.PolicyStatement({
  effect: iam.Effect.ALLOW,
  actions: ['amplify:ListApps'],
  resources: ['*']
}));

const getAppIdProvider = new cr.Provider(customStack, 'GetAppIdProvider', {
  onEventHandler: new lambda.Function(customStack, 'GetAppIdHandler', {
    runtime: lambda.Runtime.NODEJS_20_X,
    handler: 'index.handler',
    code: lambda.Code.fromInline(`
      const AWS = require('aws-sdk');
      exports.handler = async (event) => {
        const amplify = new AWS.Amplify();
        const apps = await amplify.listApps().promise();
        const appId = apps.apps[0].appId;
        return { physicalResourceId: appId, data: { appId } };
      };
    `),
    role: getAppIdRole,
  }),
});

const appIdResource = new CustomResource(customStack, 'AppIdResource', {
  serviceToken: getAppIdProvider.serviceToken,
});

const amplifyAppId = appIdResource.getAttString('appId');

const applyCustomPolicy = (functionConstruct: any) => {
  const stack = Stack.of(functionConstruct);
  
  functionConstruct.addToRolePolicy(
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['ssm:GetParameter', 'ssm:GetParameters'],
      resources: [
        Fn.join('', [
          'arn:aws:ssm:',
          stack.region,
          ':',
          stack.account,
          ':parameter/amplify/',
          amplifyAppId,
          '/',
          amplifyEnv,
          '/COMMON_*'
        ])
      ],
    })
  );
};

applyCustomPolicy(backend.myFunction.resources.lambda);
// ... apply to other functions

export default backend;
