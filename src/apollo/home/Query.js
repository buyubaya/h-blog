import gql from "graphql-tag";


export const moneyCategoriesQuery = gql`
    query moneyCategories($moneyType: Int){
        moneyCategories(moneyType: $moneyType){
            id
            name
        }
    }
`;