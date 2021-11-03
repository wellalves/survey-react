export default class Options {
    OptionId: number;
    QuestionId: number;
    OptionText: string;
    OptionValue: string;
  
    constructor(
      optionId: number,
      questionId: number,
      optionText: string,
      optionValue: string
    ) {
      this.OptionId = optionId;
      this.QuestionId = questionId;
      this.OptionText = optionText;
      this.OptionValue = optionValue;
    }
  }
  