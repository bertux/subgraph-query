// Step 1:  Import the Dependencies
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import moment, { Moment } from 'moment';
import { writeFile } from 'fs/promises'; // For modern Promise-based file system access

// Step 2:  Define your Query
function getThisWeekStartTimestamp(): number {
  const today: Moment = moment.utc();

  // Adjust to the beginning of the week (Sunday by default)
  const startOfWeek: Moment = today.startOf('week');

  // Get the timestamp in seconds since epoch (Unix timestamp)
  // const timestamp: number = (startOfWeek.valueOf()/1000)+(3*24*3600);
  const timestamp: number = startOfWeek.valueOf() / 1000;

  return timestamp;
}

const timestamp = getThisWeekStartTimestamp();
const timestamp_gt = timestamp + (3 * 24 * 3600);
const timestamp_lt = timestamp - (12 * 3600);
console.log('Timestamp of middle of this lottery week:', timestamp_lt);
console.log('Timestamp of end of this lottery week:', timestamp_gt);

export const BLOCK_QUERY = `
  query MyQuery($timestamp_gte: BigInt, $timestamp_lt: BigInt) {
    blocks(
      where: {timestamp_gte: $timestamp_gte, timestamp_lt: $timestamp_lt}
      first: 1
      orderBy: timestamp
      orderDirection: desc
    ) {
      number
    }
  }
`;

// Step 3: Set your Endpoint
const endpoint = 'https://subgraph.arthera.net/subgraphs/name/arthera/mainnet-blocks';

// Step 4: Create an ApolloClient
const client = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
});

async function executeQuery() {
// Step 5: Execute the Query
  let response = await client.query({ query: gql(BLOCK_QUERY), variables: { timestamp_gte: timestamp_lt-10, timestamp_lt: timestamp_lt } });
  const number = response?.data?.blocks[0]?.number;
  response = await client.query({ query: gql(BLOCK_QUERY), variables: { timestamp_gte: timestamp_lt-10, timestamp_lt: timestamp_gt } });
  const number2 = response?.data?.blocks[0]?.number;
// Step 6:  Print the Result
  try {
    console.log('Block number of middle of this lottery week:', number);
    console.log('Block number of end of this lottery week:', number2);
    await writeFile('subgraph-data.txt', number + '-' + number2);
  } catch (error) {
    console.error('Error writing to file:', error);
  }
}

executeQuery();
