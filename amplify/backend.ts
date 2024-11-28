// amplify/backend.ts
import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { myFunction } from './functions/my-function/resource';
import * as iam from 'aws-cdk-lib/aws-iam';

const backend = defineBackend({
  auth,
  data,
  myFunction,
  // secondFunction,
  // thirdFunction
});


// Function to apply custom policy
const applyCustomPolicy = (functionConstruct: any) => {
  functionConstruct.addToRolePolicy(
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['ssm:GetParameter', 'ssm:GetParameters'],
      resources: [
        `arn:aws:ssm:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:parameter/amplify/some-static-name/${process.env.ENV}/COMMON_*`
      ],
    })
  );
};

// Apply custom policy to all functions
applyCustomPolicy(backend.myFunction.resources.lambda);
// applyCustomPolicy(backend.secondFunction.resources.lambda);
// applyCustomPolicy(backend.thirdFunction.resources.lambda);

export default backend;







