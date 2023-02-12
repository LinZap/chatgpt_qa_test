import { Configuration, OpenAIApi } from "openai"
import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import dotenv from "dotenv"

dotenv.config()
const configuration = new Configuration({
    organization: "org-g9CHnpViYW5YMJYj2ucCFrK3",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const rl = readline.createInterface({ input, output });


rl.on('line', function (answer) {
    Ask(answer)
}).on('close', function () {
    rl.close();
    process.exit(0);
});


function Ask(answer) {

    (async () => {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: answer,
            // temperature: 0.5,
            max_tokens: 100,
            logit_bias: {"50256": -100},
            // top_p: 0.1,
            // frequency_penalty: 1,
            // presence_penalty: 1,
            //stop: "\n",
            // logprobs: null,
            //echo: true
        })
        response.data.choices.forEach(choice => {
            console.log('\x1b[33m%s\x1b[0m',choice.text.trim())
        });
            
    })();

}