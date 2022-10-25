import { customAlphabet } from 'nanoid';

// ~352 years needed, in order to have a 1% probability of at least one collision
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 12);

export const generatePublicId = () => nanoid();
