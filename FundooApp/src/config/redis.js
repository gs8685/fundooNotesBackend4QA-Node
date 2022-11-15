import { createClient } from 'redis';

export const client = createClient();

export const redis = async () => {
  try {
    await client.connect();
    console.log('redis client connection established');
  } catch (error) {
    console.log(error);
  }
};
