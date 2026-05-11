import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'pvb75b15', // Replace with your project ID
  dataset: 'production', // Or your specific dataset name
  useCdn: true,   
  apiVersion: '2026-04-30', // Use today's date
  useCdn: false,
});