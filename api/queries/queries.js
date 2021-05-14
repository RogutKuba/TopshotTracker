import { gql } from '@apollo/client'

export const GET_INDEXDATA = gql`
    query listAllStarIndices {
    listAllStarIndices(limit: 1000) {
        items 
        {
            time
            value
        }
    }
}
`;

export const GET_MARKETDEALS = gql`
    query listDeals {
        listDeals(limit: 50) {
            items {
                average_price
                id
                listing_link
                listing_details
                listing_price
                moment_details
                percent_difference
                uuid
                timestamp
            }
        }
    }
`