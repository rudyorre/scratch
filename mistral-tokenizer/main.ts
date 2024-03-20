import { MistralTokenizer } from 'mistral-tokenizer-ts';

const tokenizer = new MistralTokenizer();

// Encode.
const tokens = tokenizer.encode("Hello, Mistral!");
console.log(tokens);

// Decode.
const decoded = tokenizer.decode(tokens);
console.log(decoded);
