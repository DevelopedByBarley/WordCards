export const replaceWordInSentence = (word: string, sentence: string) => {
  return sentence.replace(/_{1,}/g, word);
}