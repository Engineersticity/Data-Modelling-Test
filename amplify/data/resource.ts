import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Todo: a
    .model({
      enterTodo: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  Customer: a
    .model({
      customerId: a.id().required(),
      // fields can be of various scalar types,
      // such as string, boolean, float, integers etc.
      name: a.string(),
      // fields can be of custom types
      location: a.customType({
        // fields can be required or optional
        lat: a.float().required(),
        long: a.float().required(),
      }),
      // fields can be enums
      engagementStage: a.enum(["PROSPECT", "INTERESTED", "PURCHASED"]),
      collectionId: a.id(),
      collection: a.belongsTo("Collection", "collectionId")
      // Use custom identifiers. By default, it uses an `id: a.id()` field
    })
    .identifier(["customerId"])
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

