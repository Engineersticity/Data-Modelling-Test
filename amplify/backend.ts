import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { myFunction } from './functions/my-function/resource';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Fn, Stack } from 'aws-cdk-lib';

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
const getAppIdCustomResource = new iam.CfnRole(customStack, 'GetAppIdCustomResource', {
  assumeRolePolicyDocument: {
    Version: '2012-10-17',
    Statement: [{
      Effect: 'Allow',
      Principal: {
        Service: 'lambda.amazonaws.com'
      },
      Action: 'sts:AssumeRole'
    }]
  },
  managedPolicyArns: [
    'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'
  ],
  policies: [{
    policyName: 'GetAmplifyAppId',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [{
        Effect: 'Allow',
        Action: 'amplify:ListApps',
        Resource: '*'
      }]
    }
  }]
});

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
          Fn.ref('AWS::StackName').split('-')[2], // This should give us the App ID
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
