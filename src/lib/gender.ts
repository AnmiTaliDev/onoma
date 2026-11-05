import type { CollectionEntry } from 'astro:content';

export type Gender = CollectionEntry<'names'>['data']['gender'];

export const genderMeta: Record<
  Gender,
  {
    labelKey: 'gender.female' | 'gender.male' | 'gender.unisex';
    shape: 'circle' | 'square' | 'triangle';
  }
> = {
  female: { labelKey: 'gender.female', shape: 'circle' },
  male: { labelKey: 'gender.male', shape: 'square' },
  unisex: { labelKey: 'gender.unisex', shape: 'triangle' },
};
