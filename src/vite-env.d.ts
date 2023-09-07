/// <reference types="vite/client" />

type LangType = 'ja' | 'hi' | 'es' | 'fr' | 'ur'

type WordType = {
    word: string,
    meaning: string,
    options: string[]
}

type StateType = {
    loading: boolean,
    result: string[],
    words: WordType[],
    error?: string,
}

type FetchedDataType = {
    translations: {
        text: string;
    }[]
}