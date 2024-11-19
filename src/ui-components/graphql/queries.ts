/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCollection = /* GraphQL */ `
  query GetCollection($id: ID!) {
    getCollection(id: $id) {
      createdAt
      customers {
        nextToken
        __typename
      }
      id
      representativeId
      tags
      updatedAt
      __typename
    }
  }
`;
export const getCustomer = /* GraphQL */ `
  query GetCustomer($customerId: ID!) {
    getCustomer(customerId: $customerId) {
      collection {
        createdAt
        id
        representativeId
        tags
        updatedAt
        __typename
      }
      collectionId
      createdAt
      customerId
      engagementStage
      location {
        lat
        long
        __typename
      }
      name
      updatedAt
      __typename
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      createdAt
      enterTodo
      id
      updatedAt
      __typename
    }
  }
`;
export const listCollectionByRepresentativeId = /* GraphQL */ `
  query ListCollectionByRepresentativeId(
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
    $representativeId: ID!
    $sortDirection: ModelSortDirection
  ) {
    listCollectionByRepresentativeId(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      representativeId: $representativeId
      sortDirection: $sortDirection
    ) {
      items {
        createdAt
        id
        representativeId
        tags
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listCollections = /* GraphQL */ `
  query ListCollections(
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        id
        representativeId
        tags
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $customerId: ID
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCustomers(
      customerId: $customerId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        collectionId
        createdAt
        customerId
        engagementStage
        name
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        enterTodo
        id
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
