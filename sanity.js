import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Налаштування клієнта
const client = createClient({
  projectId: "osnct36l",
  dataset: "production",
  useCdn: true,
  apiVersion: "2022-03-07",
});

// Налаштування builder для створення URL зображень
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;
