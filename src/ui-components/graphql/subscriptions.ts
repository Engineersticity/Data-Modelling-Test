/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCollection = /* GraphQL */ `
  subscription OnCreateCollection(
    $filter: ModelSubscriptionCollectionFilterInput
  ) {
    onCreateCollection(filter: $filter) {
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
export const onCreateCustomer = /* GraphQL */ `
  subscription OnCreateCustomer($filter: ModelSubscriptionCustomerFilterInput) {
    onCreateCustomer(filter: $filter) {
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
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
      createdAt
      enterTodo
      id
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCollection = /* GraphQL */ `
  subscription OnDeleteCollection(
    $filter: ModelSubscriptionCollectionFilterInput
  ) {
    onDeleteCollection(filter: $filter) {
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
export const onDeleteCustomer = /* GraphQL */ `
  subscription OnDeleteCustomer($filter: ModelSubscriptionCustomerFilterInput) {
    onDeleteCustomer(filter: $filter) {
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
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
      createdAt
      enterTodo
      id
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCollection = /* GraphQL */ `
  subscription OnUpdateCollection(
    $filter: ModelSubscriptionCollectionFilterInput
  ) {
    onUpdateCollection(filter: $filter) {
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
export const onUpdateCustomer = /* GraphQL */ `
  subscription OnUpdateCustomer($filter: ModelSubscriptionCustomerFilterInput) {
    onUpdateCustomer(filter: $filter) {
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
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
      createdAt
      enterTodo
      id
      updatedAt
      __typename
    }
  }
`;
