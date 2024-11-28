import type { Schema } from "../../data/resource"

export const handler: Schema["myFunction"]["functionHandler"] = async (event) => {
    const amplifyAppId = process.env.AWS_AMPLIFY_APP_ID;
    console.log('Amplify App ID:', amplifyAppId);
    // arguments typed from `.arguments()`
    const { name } = event.arguments
    // return typed from `.returns()`
    return `Hello, ${name}!`
}