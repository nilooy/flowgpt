import { OpenAI } from "langchain";
import { NextApiRequest, NextApiResponse } from "next";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { ChatOpenAI } from "langchain/chat_models";
import { sanitizeText } from "@/lib/helpers";
import { promptByTemplate, TemplateEnum } from "@/lib/prompt-by-template";
import { generate } from "@/lib/generate";

const chat = new ChatOpenAI({ temperature: 0 });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { input, selectedTemplate = TemplateEnum.FLOWCHART } = req.body;

  if (!input) {
    return res.status(400).json({ message: "No input in the request" });
  }

  // NOTE: OpenAI recommends replacing newlines with spaces for best results

  try {
    const ans = await generate({ input, selectedTemplate });

    // TODO: implement langchain parsed answer
    const text = ans.text
      .replaceAll("```", "")
      .replaceAll(`"`, `'`)
      .replaceAll(`end[End]`, `ends[End]`)
      .replace("mermaid", "");

    return res.status(200).json({ text });
  } catch (e) {
    throw e;

    return res.status(400).json(e);
  }
}
