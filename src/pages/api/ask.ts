import {OpenAI} from "langchain";
import {NextApiRequest, NextApiResponse} from "next";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import {ChatOpenAI} from "langchain/chat_models";

const chat = new ChatOpenAI({ temperature: 0, });
const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9 });

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { input } = req.body;

    if (!input) {
        return res.status(400).json({ message: 'No input in the request' });
    }

    // OpenAI recommends replacing newlines with spaces for best results
    const sanitizedInput = input.trim().replaceAll('\n', ' ');

    try {
        // const ans = await model.call(
        //     sanitizedInput
        // );
        //

        const ans = await chat.call([
            new SystemChatMessage(
                `You are a flowchart maker with markdown in mermaid syntax
                `
            ),
            new HumanChatMessage(
                `write flowchart about ${sanitizedInput} - strict rules: do not add Note and do not explain the code and do not add any additional text except code, do not use 'end' syntax`
            ),
        ]);

        const text = ans.text.replaceAll('```', '')
            .replaceAll(`"`, `'`)
            .replaceAll(`end[End]`, `ends[End]`)
            .replace('mermaid', '')



        // console.log(ans);

        return res.status(200).json({text})
    }
    catch (e) {
        throw e
        return res.status(400).json(e)
    }
}