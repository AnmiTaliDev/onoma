export interface PickerEntry {
  id: string;
  name: string;
  gender: 'female' | 'male' | 'unisex';
  origin: string;
  meaning: string;
}

const SHAPE: Record<PickerEntry['gender'], string> = {
  female: '<circle cx="8" cy="8" r="7" />',
  male: '<rect x="1.5" y="1.5" width="13" height="13" />',
  unisex: '<polygon points="8,1 15,15 1,15" />',
};

const GENDER_LABEL: Record<PickerEntry['gender'], string> = {
  female: 'Female',
  male: 'Male',
  unisex: 'Unisex',
};

export function renderPickerCard(entry: PickerEntry): string {
  return `
    <a href="/names/${entry.id}/" class="picker-card">
      <span class="picker-gender">
        <svg viewBox="0 0 16 16" width="10" height="10" aria-hidden="true" style="fill: var(--${entry.gender})">${SHAPE[entry.gender]}</svg>
        <span>${GENDER_LABEL[entry.gender]}</span>
      </span>
      <span class="picker-name">${entry.name}</span>
      <span class="picker-origin">${entry.origin}</span>
      <span class="picker-meaning">${entry.meaning}</span>
    </a>
  `;
}
