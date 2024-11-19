/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCollection = /* GraphQL */ `
  mutation CreateCollection(
    $condition: ModelCollectionConditionInput
    $input: CreateCollectionInput!
  ) {
    createCollection(condition: $condition, input: $input) {
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
export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $condition: ModelCustomerConditionInput
    $input: CreateCustomerInput!
  ) {
    createCustomer(condition: $condition, input: $input) {
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
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $condition: ModelTodoConditionInput
    $input: CreateTodoInput!
  ) {
    createTodo(condition: $condition, input: $input) {
      createdAt
      enterTodo
      id
      updatedAt
      __typename
    }
  }
`;
export const deleteCollection = /* GraphQL */ `
  mutation DeleteCollection(
    $condition: ModelCollectionConditionInput
    $input: DeleteCollectionInput!
  ) {
    deleteCollection(condition: $condition, input: $input) {
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
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $condition: ModelCustomerConditionInput
    $input: DeleteCustomerInput!
  ) {
    deleteCustomer(condition: $condition, input: $input) {
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
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $condition: ModelTodoConditionInput
    $input: DeleteTodoInput!
  ) {
    deleteTodo(condition: $condition, input: $input) {
      createdAt
      enterTodo
      id
      updatedAt
      __typename
    }
  }
`;
export const updateCollection = /* GraphQL */ `
  mutation UpdateCollection(
    $condition: ModelCollectionConditionInput
    $input: UpdateCollectionInput!
  ) {
    updateCollection(condition: $condition, input: $input) {
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
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $condition: ModelCustomerConditionInput
    $input: UpdateCustomerInput!
  ) {
    updateCustomer(condition: $condition, input: $input) {
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
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $condition: ModelTodoConditionInput
    $input: UpdateTodoInput!
  ) {
    updateTodo(condition: $condition, input: $input) {
      createdAt
      enterTodo
      id
      updatedAt
      __typename
    }
  }
`;
