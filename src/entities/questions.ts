import Options from "./options";

export default class Questions {
  QuestionId: number;
  QuestionText: string;
  Options?: Array<Options>;
  QuestionDataType: string;
  QuestionFieldType: string;

  constructor(
    questionId: number,
    QuestionText: string,
    options: Array<Options>,
    questionDataType: string,
    questionFieldType: string
  ) {
    this.QuestionId = questionId;
    this.QuestionText = QuestionText;
    this.Options = options;
    this.QuestionDataType = questionDataType;
    this.QuestionFieldType = questionFieldType;
  }
}
