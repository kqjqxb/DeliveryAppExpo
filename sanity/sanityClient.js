import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: 'osnct36l', // Replace with your project ID
  dataset: 'production', // Replace with your dataset
  useCdn: true, // Use CDN for faster responses
  apiVersion: '2022-03-07', // Use a specific API version date
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
export default client;
