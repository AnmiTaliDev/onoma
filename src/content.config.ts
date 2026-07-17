import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const names = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/data/names' }),
  schema: z.object({
    name: z.string(),
    gender: z.enum(['female', 'male', 'unisex']),
    origin: z.string(),
    meaning: z.string(),
    description: z.string(),
    parent: reference('names').optional(),
    root: z.string().optional(),
    pronunciation: z.string().optional(),
    variants: z.array(z.string()).optional(),
  }),
});

export const collections = { names };
