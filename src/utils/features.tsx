import axios from "axios";
import _ from "lodash";
import { generate } from "random-words";

const generateMCQ = (meaning: { Text: string }[], idx: number): string[] => {
  const correntAns: string = meaning[idx].Text;
  const allMeaningExceptForCorrect = meaning.filter(
    (i) => i.Text !== correntAns
  );

  const incorrentOptions: string[] = _.sampleSize(
    allMeaningExceptForCorrect,
    3
  ).map((i) => i.Text);

  const mcqOptions = _.shuffle([...incorrentOptions, correntAns]);

  return mcqOptions;
};

export const translateWords = async (
  params: LangType
): Promise<WordType[] | undefined> => {
  try {
    const rapidApi = import.meta.env.VITE_RAPID_API;

    const words = generate(8).map((i) => ({
      Text: i,
    }));

    const response = await axios.post(
      "https://microsoft-translator-text.p.rapidapi.com/translate",
      words,
      {
        params: {
          "to[0]": params,
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": rapidApi,
          "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
      }
    );

    const receive: FetchedDataType[] = response.data;
    const arr: WordType[] = receive.map((i, index) => {
      const options: string[] = generateMCQ(words, index);

      return {
        word: i.translations[0].text,
        meaning: words[index].Text,
        options,
      };
    });
    return arr;
  } catch (error) {
    console.log(error);
  }
};

export const countMatchingElements = (
  arr1: string[],
  arr2: string[]
): number => {
  if (arr1.length !== arr2.length) throw new Error("Array are not equal");

  let matchCount = 0;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) matchCount++;
  }

  return matchCount;
};

export const fetchAudio = async (
  text: string,
  language: LangType
): Promise<string | undefined> => {
  const rapidApi = import.meta.env.VITE_RAPID_API;
  const key = import.meta.env.VITE_MICROSOFT_API;

  try {
    const encodedParams = new URLSearchParams({
      src: text,
      r: "0",
      c: "mp3",
      f: "8khz_8bit_mono",
      b64: "true",
    });

    if (language === "ja") encodedParams.set("hl", "ja-jp");
    else if (language === "es") encodedParams.set("hl", "es-es");
    else if (language === "fr") encodedParams.set("hl", "fr-fr");
    else encodedParams.set("hl", "hi-in");

    const { data }: { data: string } = await axios.post(
      "https://voicerss-text-to-speech.p.rapidapi.com/",
      encodedParams,
      {
        params: {
          key,
        },
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": rapidApi,
          "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
