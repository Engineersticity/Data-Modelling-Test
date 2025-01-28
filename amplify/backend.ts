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

// Create a new stack for custom resources if needed
const customStack = backend.createStack('CustomResourceStack');

const amplifyEnv = "dev"; // You might want to make this dynamic

const getTagValue = (stack: Stack, key: string): string | undefined => {
  const tags = stack.tags.all();
  const tag = tags.find(t => t.key === key);
  return tag ? tag.value : undefined;
};

const applyCustomPolicy = (functionConstruct: any) => {
  const stack = Stack.of(functionConstruct);
  
  // Get the Amplify App ID from stack tags
  const amplifyAppId = getTagValue(stack, 'amplify:app-id');

  if (!amplifyAppId) {
    throw new Error('Could not find amplify:app-id tag on the stack');
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
