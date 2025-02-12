import { defineFunction } from '@aws-amplify/backend';

export const myFunction = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'my-function',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts'
});



