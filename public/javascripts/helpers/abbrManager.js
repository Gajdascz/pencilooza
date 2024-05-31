import abbreviations from './abbreviations.js';

const abbrToFullMap = {};

const getFullWord = (abbreviation) => abbrToFullMap[abbreviation] || abbreviation;

const mapAbbrToFull = (keyValueArray) => (abbrToFullMap[keyValueArray[0]] = keyValueArray[1]);

const mapAbbrsToFull = (keyValueArrays) => keyValueArrays.forEach(mapAbbrToFull);

const clearCache = () => Object.keys(abbrToFullMap).forEach((key) => delete abbrToFullMap[key]);

const expandObjectKeyAbbrs = (abbrObjsArr) =>
  abbrObjsArr.map((optionObj) =>
    Object.fromEntries(Object.entries(optionObj).map(([key, value]) => [getFullWord(key), value]))
  );

if (abbreviations && abbreviations.length > 0) mapAbbrsToFull(abbreviations);

export { mapAbbrsToFull, mapAbbrToFull, expandObjectKeyAbbrs, clearCache };
