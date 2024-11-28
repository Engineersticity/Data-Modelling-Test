// amplify/cdk-constructs/customLambda.ts
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export function createCustomLambda(scope: Construct, id: string, props: lambda.FunctionProps) {
  const lambdaFunction = new lambda.Function(scope, id, props);

  // Add the custom policy
  lambdaFunction.addToRolePolicy(
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['ssm:GetParameter', 'ssm:GetParameters'],
      resources: [
        `arn:aws:ssm:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:parameter/amplify/some-static-name/${process.env.ENV}/COMMON_*`
      ],
    })
  );

  return lambdaFunction;
}
