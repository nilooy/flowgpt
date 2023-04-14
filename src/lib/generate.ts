import { OpenAI } from "langchain/llms";
import { BaseChain, LLMChain, loadQAMapReduceChain } from "langchain/chains";
import { Document } from "langchain/document";
import { TextLoader } from "langchain/document_loaders";

import { MarkdownTextSplitter } from "langchain/text_splitter";
import { PromptTemplate } from "langchain";

export const generate = async ({ input, selectedTemplate }) => {
  try {
    const model = new OpenAI({ temperature: 0.9 });

    const template =
      "{syntax} - {instructions} learn from syntax above and write {template} in mermaid syntax about {input}?";
    const prompt = new PromptTemplate({
      template,
      inputVariables: ["template", "input", "syntax", "instructions"],
    });

    const chain = new LLMChain({ llm: model, prompt });

    // @ts-ignore
    const syntaxDoc = await import(
      `./syntax/${selectedTemplate.toLowerCase()}.md`
    );

    const res = await chain.call({
      template: selectedTemplate,
      input,
      syntax: syntaxDoc.default,
      instructions: `
      - use different shapes, colors and also use icons when possible as mentioned in the doc.
      - strict rules: do not add Note and do not explain the code and do not add any additional text except code, 
      - do not use 'end' syntax
      - do not use any parenthesis inside block
      `,
    });

    return res;
  } catch (e) {
    console.log("openai:debug", e?.response?.data);
    throw e;
  }
};
