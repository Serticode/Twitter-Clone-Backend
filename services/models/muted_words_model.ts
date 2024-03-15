import { MutedWordsDocument } from "database/models/mute/muted_words";

export interface UserMutedWordParams {
  userID: string;
  mutedWord: string;
}
export interface UserMutedWordsResult {
  result: string;
}

export interface GetMutedWordsParams {
  userID: string;
}

export interface GetMutedWordsResult {
  result: MutedWordsDocument[];
}
