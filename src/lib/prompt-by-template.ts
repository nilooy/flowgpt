export enum TemplateEnum {
  FLOWCHART = "FLOWCHART",
  MINDMAP = "MINDMAP",
  TIMELINE = "TIMELINE",
  USERJOURNEY = "USERJOURNEY",
  CLASS = "CLASS",
  ENTITYRELATIONSHIP = "ENTITYRELATIONSHIP",
  SEQUENCE = "SEQUENCE",
  STATE = "STATE",
}

const commonRules = `- strict rules: do not add Note and do not explain the code and do not add any additional text except code, do not use 'end' syntax
        - do not use any parenthesis inside block`;

export const promptByTemplate = {
  [TemplateEnum.FLOWCHART]: (input: string) => `write flowchart about ${input} 
        ${commonRules}
        eg:  correct: C -->|true| D(setLoading), wrong: correct: C -->|true| D(setLoading=>true)
        eg:  correct: C -->|true| D(axios.post=>'/api/ask', input), wrong: C -->|true| D(axios.post('/api/ask', {input,}))
        eg: correct: J -->|text| L[Print 'number is not a prime number'] wrong: J -->|| L[Print 'number is not a prime number']
        `,

  [TemplateEnum.MINDMAP]: (input: string) => `write mindmap about ${input} 
        ${commonRules}
         syntax:
                
        `,
};
