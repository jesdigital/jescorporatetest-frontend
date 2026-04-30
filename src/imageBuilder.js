import imageUrlBuilder from '@sanity/image-url';
import { client } from './client.js'; // Import your client file

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);