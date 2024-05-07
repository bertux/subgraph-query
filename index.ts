// Step 1:  Import the Dependencies
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

// Step 2:  Define your Query
export const NFT_QUERY = `query info($address:ID!) { nftcollector(id: $address) { nftsFromCollection(where: {collection_: {id: "0x50B51701B68Dd798eEc4FF40526689eff2540069"}}) { collection { id }}}}`;

// Step 3: Set your Endpoint
const endpoint = 'https://subgraph.arthera.net/subgraphs/name/nfts2me/factory';

// Step 4: Create an ApolloClient
const client = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
});

async function executeQuery() {
// Step 5: Execute the Query
  let response = await client.query({ query: gql(NFT_QUERY), variables: { address: '0x476E2651BF97dE8a26e4A05a9c8e00A6EFa1390c' } });
// Step 6:  Print the Result
  const data = response?.data;
  const value = function (data) { if (data?.nftcollector?.nftsFromCollection?.length > 0) { return 1; } return 0; }(data);
  console.log(value);
}

executeQuery();