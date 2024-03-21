import https from 'https';
import readline from 'readline';
import dotenv from 'dotenv';
dotenv.config();

// Create a readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Ask a question
rl.question('What is your question? ', (question) => {
    // Define the payload
    const payload = JSON.stringify({
        "model": "mistral-small-latest",
        "messages": [
            {
                "role": "user",
                "content": question
            }
        ],
        "temperature": 0.7,
        "top_p": 1,
        "max_tokens": 512,
        "stream": true,
        "safe_prompt": false,
        "random_seed": 1337
    });

    // Define the options for the HTTP request
    const options = {
        hostname: 'api.mistral.ai',
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length,
        'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}` // replace with your actual API key
        }
    };

    // Create the HTTP request
    const req = https.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            const lines = chunk.split('\n');
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    // Check if the chunk contains "[DONE]"
                    if (line.trim() === 'data: [DONE]') {
                        process.stdout.write('\n');
                    } else {
                        // Parse the JSON string
                        let data;
                        try {
                            data = JSON.parse(line.slice(5)); // Remove the "data: " prefix
                        } catch(e) {
                            throw e;
                        }
                        // Check if the chunk contains a message
                        if (data.choices && data.choices[0].delta && data.choices[0].delta.content) {
                            // Print the message content to the same line in the terminal
                            process.stdout.write(data.choices[0].delta.content);
                        }
                    }
                }
            }
        });
        res.on('end', () => {
          process.stdout.write('\n');
          rl.close();
        });
    });
    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });
    // Write the payload to the request
    req.write(payload);
    
    // End the request
    req.end();
});


