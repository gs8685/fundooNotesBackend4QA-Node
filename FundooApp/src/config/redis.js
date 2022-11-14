import { createClient } from 'redis';

const client = createClient();

const redis = async () => {
  try {
    await client.connect();
    console.log('redis client connection established');
  } catch (error) {
    console.log(error);
  }
};

export default redis;
