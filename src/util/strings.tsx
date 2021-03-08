export const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.substring(1);
};

export const toSentence = (strs: string[]) => {
  if (strs.length === 0) return "";
  if (strs.length === 1) return strs[0];
  return strs.reduce((sentence, str, idx) =>
    idx === strs.length - 1 ? `${sentence} and ${str}` : `${sentence}, ${str}`
  );
};
