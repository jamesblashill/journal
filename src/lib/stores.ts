import { writable } from 'svelte/store';
import { browser } from '$app/env';
import { v4 as uuid } from 'uuid';

const ENTRIES_KEY = 'DDD_Entries';

export type Entry = {
  id: string;
  date: number;
  text: string;
};

function createEntries() {
  const { subscribe, set, update } = writable<Entry[]>([]);
  if (browser) {
    set(JSON.parse(localStorage[ENTRIES_KEY] || []));
    subscribe((currentEntries) => {
      localStorage[ENTRIES_KEY] = JSON.stringify(currentEntries);
    });
  }

  function create(text: string) {
    const newEntry = {
      id: uuid(),
      text,
      date: Date.now()
    };
    update((currentEntries) => [newEntry, ...currentEntries]);
  }

  return {
    subscribe,
    create
  };
}

export const entries = createEntries();
