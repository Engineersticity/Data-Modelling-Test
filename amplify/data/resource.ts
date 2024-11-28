import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { myFunction } from "../functions/my-function/resource";
const schema = a.schema({

  myFunction: a
    .query()
    .arguments({
      name: a.string(),
    })
    .returns(a.string())
    .handler(a.handler.function(myFunction))
    .authorization((allow) => [allow.publicApiKey()]),

  Todo: a
    .model({
      enterTodo: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
    Customer: a
    .model({
      customerId: a.id().required(),
      name: a.string(),
      location: a.customType({
        lat: a.float().required(),
        long: a.float().required(),
      }),
      engagementStage: a.enum(["PROSPECT", "INTERESTED", "PURCHASED"]),
      collectionId: a.id(),
      collection: a.belongsTo("Collection", "collectionId"),
      userProfile: a.hasOne("UserProfile", "customerId"), // Add this line
    })
    .identifier(["customerId"])
    .authorization((allow) => [allow.publicApiKey()]),

  UserProfile: a
    .model({
      customerId: a.id().required(),
      customerProfile: a.belongsTo("Customer", "customerId"),
      addresses: a.ref('Address').array(),
      primaryAddressIndex: a.integer(),
      createdAt: a.datetime(),
      updatedAt: a.datetime()
    })
    .authorization((allow) => [allow.publicApiKey()]),
  Collection: a
    .model({
      customers: a.hasMany("Customer", "collectionId"), // setup relationships between types
      tags: a.string().array(), // fields can be arrays
      representativeId: a.id().required(),
      // customize secondary indexes to optimize your query performance
    })
    .secondaryIndexes((index) => [index("representativeId")])
    .authorization((allow) => [allow.publicApiKey()]),

  Address: a.customType({
    line1: a.string().required(),
    line2: a.string(),
    city: a.string().required(),
    state: a.string().required(),
    country: a.string().required(),
    pincode: a.string().required(),
    isPrimary: a.boolean().default(false)
  })

});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

