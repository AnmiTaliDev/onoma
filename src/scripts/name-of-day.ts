import { renderPickerCard, type PickerEntry } from './picker-card';

function hashDate(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function initNameOfDay(root: HTMLElement, entries: PickerEntry[]) {
  if (entries.length === 0) return;
  const today = new Date().toISOString().slice(0, 10);
  const pick = entries[hashDate(today) % entries.length];
  root.innerHTML = renderPickerCard(pick);
}
