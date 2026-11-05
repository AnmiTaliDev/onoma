import type { CollectionEntry } from 'astro:content';

type NameEntry = CollectionEntry<'names'>;

export interface TreeNode {
  entry: NameEntry;
  children: TreeNode[];
}

export interface Family {
  roots: string[];
  size: number;
  trees: TreeNode[];
}

function byName(a: NameEntry, b: NameEntry): number {
  return a.data.name.localeCompare(b.data.name);
}

function buildTree(entry: NameEntry, childrenOf: Map<string, NameEntry[]>): TreeNode {
  const children = (childrenOf.get(entry.id) ?? []).sort(byName);
  return { entry, children: children.map((child) => buildTree(child, childrenOf)) };
}

export function buildFamilies(all: NameEntry[]): { families: Family[]; standalone: NameEntry[] } {
  const group = new Map<string, string>(all.map((e) => [e.id, e.id]));

  function find(id: string): string {
    let current = id;
    while (group.get(current) !== current) current = group.get(current)!;
    return current;
  }

  function union(a: string, b: string) {
    group.set(find(a), find(b));
  }

  const firstWithRoot = new Map<string, string>();
  for (const entry of all) {
    if (entry.data.parent) union(entry.id, entry.data.parent.id);
    const root = entry.data.root;
    if (root === undefined) continue;
    const first = firstWithRoot.get(root);
    if (first === undefined) firstWithRoot.set(root, entry.id);
    else union(entry.id, first);
  }

  const members = new Map<string, NameEntry[]>();
  for (const entry of all) {
    const key = find(entry.id);
    members.set(key, [...(members.get(key) ?? []), entry]);
  }

  const childrenOf = new Map<string, NameEntry[]>();
  for (const entry of all) {
    const parentId = entry.data.parent?.id;
    if (parentId === undefined) continue;
    childrenOf.set(parentId, [...(childrenOf.get(parentId) ?? []), entry]);
  }

  const families: Family[] = [];
  const standalone: NameEntry[] = [];

  for (const list of members.values()) {
    if (list.length === 1) {
      standalone.push(list[0]);
      continue;
    }
    const roots = [...new Set(list.flatMap((e) => (e.data.root ? [e.data.root] : [])))];
    const trees = list
      .filter((e) => e.data.parent === undefined)
      .sort(byName)
      .map((e) => buildTree(e, childrenOf));
    families.push({ roots, size: list.length, trees });
  }

  families.sort(
    (a, b) =>
      b.size - a.size || a.trees[0].entry.data.name.localeCompare(b.trees[0].entry.data.name),
  );
  standalone.sort(byName);

  return { families, standalone };
}
