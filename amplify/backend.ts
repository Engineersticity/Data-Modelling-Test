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

const applyCustomPolicy = (functionConstruct: any) => {
  const stack = Stack.of(functionConstruct);
  
  // Get the Amplify App ID and environment from CDK context or environment variables
  const amplifyAppId = stack.node.tryGetContext('amplifyAppId') || process.env.AMPLIFY_APP_ID;
  const amplifyEnv = stack.node.tryGetContext('amplifyEnv') || process.env.AMPLIFY_ENV;

  if (!amplifyAppId || !amplifyEnv) {
    throw new Error('AMPLIFY_APP_ID and AMPLIFY_ENV must be provided via CDK context or environment variables');
  }

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
