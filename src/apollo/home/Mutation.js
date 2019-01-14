import gql from "graphql-tag";


export const removeMoneyCategoryMutation = gql`
    mutation removeMoneyCategory($id: ID!){
        removeMoneyCategory(id: $id)
    }
`;

export const addMoneyCategoryMutation = gql`
    mutation addMoneyCategory($name: String!, $moneyType: Int!, $userId: ID!){
        addMoneyCategory(name: $name, moneyType: $moneyType, userId: $userId)
    }
`;

export const updateMoneyCategoryMutation = gql`
    mutation updateMoneyCategory($id: ID!, $name: String){
        updateMoneyCategory(id: $id, name: $name)
    }
`;