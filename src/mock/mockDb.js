// src/mock/mockDb.js
import { sampleUsers } from "./sampleUsers";

const KEY = "uyzn_demo_users_v1";

export function loadDb() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : structuredClone(sampleUsers);
  } catch {
    return structuredClone(sampleUsers);
  }
}

export function saveDb(db) {
  localStorage.setItem(KEY, JSON.stringify(db));
}

export function resetDb() {
  localStorage.removeItem(KEY);
}
