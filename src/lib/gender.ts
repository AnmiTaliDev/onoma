import type { CollectionEntry } from 'astro:content';

export type Gender = CollectionEntry<'names'>['data']['gender'];

export const genderMeta: Record<
  Gender,
  {
    color: string;
    labelKey: 'gender.female' | 'gender.male' | 'gender.unisex';
    shape: 'circle' | 'square' | 'triangle';
  }
> = {
  female: { color: 'var(--female)', labelKey: 'gender.female', shape: 'circle' },
  male: { color: 'var(--male)', labelKey: 'gender.male', shape: 'square' },
  unisex: { color: 'var(--unisex)', labelKey: 'gender.unisex', shape: 'triangle' },
};
