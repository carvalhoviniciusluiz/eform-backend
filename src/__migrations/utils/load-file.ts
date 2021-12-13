import { readFileSync } from 'fs';

export const ReadFile = (path: string) => {
  return readFileSync(path, 'utf-8');
};
