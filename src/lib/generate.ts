import { OpenAI, OpenAIChat } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";

import { PromptTemplate } from "langchain/prompts";

// @ts-ignore
export const generate = async ({ input, selectedTemplate }) => {
  try {
    const model = new OpenAIChat({ temperature: 0.4, maxTokens: 1024, modelName: "gpt-3.5-turbo", verbose: true});

    const template =
      "{syntax} - {instructions} learn from syntax above and write {template} in mermaid syntax about {input}? Output format: ```mermaid\n CODE \n```";
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
    throw e;
  }
};
