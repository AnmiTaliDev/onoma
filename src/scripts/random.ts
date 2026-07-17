import { renderPickerCard, type PickerEntry } from './picker-card';

export function initRandomPicker(root: HTMLElement, entries: PickerEntry[]) {
  const genderSelect = root.querySelector<HTMLSelectElement>('[data-gender]');
  const originSelect = root.querySelector<HTMLSelectElement>('[data-origin]');
  const button = root.querySelector<HTMLButtonElement>('[data-pick]');
  const result = root.querySelector<HTMLElement>('[data-result]');
  if (!button || !result) return;

  let lastId: string | undefined;

  button.addEventListener('click', () => {
    const gender = genderSelect?.value ?? 'any';
    const origin = originSelect?.value ?? 'any';

    const matches = entries.filter(
      (e) => (gender === 'any' || e.gender === gender) && (origin === 'any' || e.origin === origin),
    );

    if (matches.length === 0) {
      result.innerHTML = '<p class="picker-empty">No names match that combination yet.</p>';
      return;
    }

    const candidates = matches.length > 1 ? matches.filter((e) => e.id !== lastId) : matches;
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    lastId = pick.id;
    result.innerHTML = renderPickerCard(pick);
  });
}
