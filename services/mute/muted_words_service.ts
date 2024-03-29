import { MutedWordsModel } from "../../database/models/mute/muted_words";
import {
  GetMutedWordsParams,
  GetMutedWordsResult,
  UserMutedWordParams,
  UserMutedWordsResult,
} from "../models/muted_words_model";

//!
//!
export default class MutedWordsService {
  //!
  //!
  public async muteAWord(
    params: UserMutedWordParams
  ): Promise<UserMutedWordsResult> {
    try {
      const { userID, mutedWord } = params;

      const userDoc = await MutedWordsModel.findOne({ userID });

      if (!userDoc) {
        const newUserDoc = new MutedWordsModel({
          userID,
          mutedWords: [mutedWord],
        });

        await newUserDoc.save();
      } else {
        if (!userDoc.mutedWords.includes(mutedWord)) {
          userDoc.mutedWords.push(mutedWord);
          await userDoc.save();
        }
      }

      return { result: "Word muted successfully" };
    } catch (error) {
      console.error("Error muting word:", error);
      return { result: "Could not mute word, try again" };
    }
  }

  public async getMutedWords(
    params: GetMutedWordsParams
  ): Promise<GetMutedWordsResult> {
    const { userID } = params;

    try {
      const mutedWords = await MutedWordsModel.find({ userID });

      return { result: mutedWords };
    } catch (error) {
      console.error("Error fetching Interests:", error);
      throw error;
    }
  }
}
