import type { CollectionEntry } from 'astro:content';

type NameEntry = CollectionEntry<'names'>;

export function getParent(entry: NameEntry, all: NameEntry[]): NameEntry | undefined {
  const parentId = entry.data.parent?.id;
  return parentId === undefined ? undefined : all.find((other) => other.id === parentId);
}

export function getRootSiblings(entry: NameEntry, all: NameEntry[]): NameEntry[] {
  const root = entry.data.root;
  if (root === undefined) return [];

  return all
    .filter((other) => other.id !== entry.id && other.data.root === root)
    .sort((a, b) => a.data.name.localeCompare(b.data.name));
}

export function getRelated(entry: NameEntry, all: NameEntry[]): NameEntry[] {
  const parentId = entry.data.parent?.id;

  const related = all.filter((other) => {
    if (other.id === entry.id) return false;
    const isChild = other.data.parent?.id === entry.id;
    const isSibling = parentId !== undefined && other.data.parent?.id === parentId;
    return isChild || isSibling;
  });

  return related.sort((a, b) => a.data.name.localeCompare(b.data.name));
}
