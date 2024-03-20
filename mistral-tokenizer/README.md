```bash
% ts-node main.ts
[ 1, 22557, 28725, 25200, 1650, 28808 ]
Hello, Mistral!
```

```ts
import { MistralTokenizer } from 'mistral-tokenizer-ts';

const tokenizer = new MistralTokenizer();

// Encode.
const tokens = tokenizer.encode("Hello, Mistral!");
console.log(tokens);

// Decode.
const decoded = tokenizer.decode(tokens);
console.log(decoded);
```