export const uppersnakeCasetoSentence = str => {
  let sentence = '';
  str.split('_').forEach(val => {
    const rem = val.slice(1).toLowerCase();
    sentence += ` ${val[0] + rem}`;
  });
  return sentence;
};
