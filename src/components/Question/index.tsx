import React, { useState } from "react";
import Questions from "../../entities/questions";
import * as Component from "./style";
import DataQuestions from "../../services/data.json";

interface IProps {
  data: Questions;
  setterFinalized: React.Dispatch<React.SetStateAction<boolean>>;
  setMessageFinalized: React.Dispatch<React.SetStateAction<string>>;
  hashAplication: string;
  setVisibleControl: React.Dispatch<React.SetStateAction<boolean>>;
  visibleControl: boolean;
}

export interface IDataFromLocalStorage {
  id: string;
  response: [
    {
      question?: number;
      value?: string;
    }
  ];
}

export const Question: React.FC<IProps> = ({
  data,
  setterFinalized,
  setMessageFinalized,
  hashAplication,
  visibleControl,
  setVisibleControl,
}) => {
  const [PossibleErrorMessage, setPossibleErrorMessage] = useState("");
  const LocalStorageNameItem = "QResults";

  const [SelectInputValue, setSelectInputValue] = useState("");
  const [InputValue, setInputValue] = useState("");

  const SaveWithOutValidationInputs = (source: number, value: string) => {
    let insideLocalStorage: IDataFromLocalStorage[] = JSON.parse(
      localStorage.getItem(LocalStorageNameItem) as unknown as string
    ) as unknown as IDataFromLocalStorage[];

    let session: IDataFromLocalStorage = {} as IDataFromLocalStorage;

    insideLocalStorage.map((dados) => {
      if (dados.id == hashAplication) {
        session = dados;
      }
    });

    let existQuestion: { question: number; value: string } =
      session?.response.find((r) => r.question == source) as {
        question: number;
        value: string;
      };

    if (existQuestion) {
      existQuestion.value = value;
      localStorage.setItem(
        LocalStorageNameItem,
        JSON.stringify(insideLocalStorage as unknown as string)
      );

      return;
    }

    session?.response.push({
      question: source,
      value: value,
    });

    localStorage.setItem(
      LocalStorageNameItem,
      JSON.stringify(insideLocalStorage as unknown as string)
    );

    if (session?.response.length == DataQuestions.length) {
      setMessageFinalized("Thanks for your time to submit their response 😁");
      setterFinalized(true);
    }
  };

  const Validation = (value: string, source: number): void => {
    setPossibleErrorMessage("");
    switch (source) {
      case 1:
        if ((value as unknown as number) > 100) {
          setPossibleErrorMessage("The limit is 100");
          return;
        }

        if ((value as unknown as number) < 18) {
          SaveWithOutValidationInputs(source, value);
          setMessageFinalized(`I wanted to thank you for your time`);
          setterFinalized(true);
          return;
        }

        SaveWithOutValidationInputs(source, value);
        break;

      case 2:
        if (value == "") {
          setPossibleErrorMessage("Please choose an option");
          return;
        }

        SaveWithOutValidationInputs(source, value);
        break;

      case 3:
        SaveWithOutValidationInputs(source, value);
        break;

      case 4:
        SaveWithOutValidationInputs(source, value);
        if (value == "yes") {
          setVisibleControl(true);

          return;
        }

        if (value == "no") {
          setVisibleControl(false);
          setMessageFinalized(
            `We are targeting more experienced clients, thank you for your interest`
          );
          setterFinalized(true);
        }
        break;

      case 5:
      case 6:
      case 7:
        SaveWithOutValidationInputs(source, value);
        break;

      case 8:
        let splitValue = value.split("|");
        let validatedPattern_1 = false;

        if (splitValue[1]) {
          let model = "";
          if (splitValue[1].toLowerCase().startsWith("m")) {
            model = splitValue[1].substr(1, 3);
          } else {
            model = splitValue[1].substr(0);
          }

          var count = (model.match(/\d/g) || []).length;
          if (count === 3) {
            validatedPattern_1 = true;
          }
        }
        let validatedPattern_2 = false;
        if (
          splitValue[1].toLowerCase().startsWith("x") ||
          splitValue[1].toLowerCase().startsWith("z")
        ) {
          var count = (splitValue[1].toLowerCase().match(/\d/g) || []).length;
          if (count === 1) {
            validatedPattern_2 = true;
          }
        }

        if (validatedPattern_1 || validatedPattern_2) {
          SaveWithOutValidationInputs(source, value);
        } else {
          if (splitValue[1]) {
            setPossibleErrorMessage("Model not found");
          }
        }
        break;

      default:
        alert("This question not exists");
        break;
    }
  };

  return (
    <Component.ContainerStyled
      style={{
        border:
          PossibleErrorMessage !== ""
            ? "solid 1px red"
            : "solid 1px transparent",
        display: (() => {
          if (data.QuestionId > 4 && !visibleControl) {
            return "none";
          }

          return "block";
        })(),
      }}
    >
      <div className="Header">
        <h1>{data.QuestionId} - Question</h1>
      </div>
      <div className="ContainerInformation">
        {data.QuestionText}
        <div className="InputContent">
          {(() => {
            switch (data.QuestionFieldType) {
              case "input":
                return (
                  <input
                    type={data.QuestionDataType}
                    onBlur={(e) => Validation(e.target.value, data.QuestionId)}
                  />
                );
                break;

              case "dropdown":
                return (
                  <select
                    onChange={(e) =>
                      Validation(e.target.value, data.QuestionId)
                    }
                  >
                    <option value="">Select a option</option>
                    {data.Options
                      ? data.Options.map((dados) => (
                          <option
                            key={`${dados.OptionText}${dados.OptionId}${data.QuestionId}`}
                            value={dados.OptionValue}
                          >
                            {dados.OptionText}
                          </option>
                        ))
                      : false}
                  </select>
                );
                break;

              case "radio":
                return (
                  <div className="ContainerRadio">
                    {data.Options
                      ? data.Options.map((dados) => (
                          <label>
                            <input
                              key={`${dados.OptionText}${dados.OptionId}${data.QuestionId}`}
                              type={data.QuestionFieldType}
                              onClick={(e) =>
                                Validation(dados.OptionValue, data.QuestionId)
                              }
                              name={dados.QuestionId as unknown as string}
                              value={dados.OptionValue}
                            />
                            {dados.OptionText}
                          </label>
                        ))
                      : false}
                  </div>
                );
                break;
              case "special":
                return (
                  <>
                    <select
                      onChange={(e) => {
                        setSelectInputValue(e.target.value);
                        Validation(
                          `${e.target.value}|${InputValue}`,
                          data.QuestionId
                        );
                      }}
                      value={SelectInputValue}
                    >
                      <option value="">Select a option</option>
                      {data.Options
                        ? data.Options.map((dados) => (
                            <option
                              key={`${dados.OptionText}${dados.OptionId}${data.QuestionId}`}
                              value={dados.OptionValue}
                            >
                              {dados.OptionText}
                            </option>
                          ))
                        : false}
                    </select>
                    <br />
                    <span>Model:</span>
                    <input
                      type="text"
                      value={InputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onBlur={(e) =>
                        Validation(
                          `${SelectInputValue}|${e.target.value}`,
                          data.QuestionId
                        )
                      }
                    />
                  </>
                );
                break;

              default:
                return <small>Input type not provider.</small>;
                break;
            }
          })()}
        </div>
      </div>
      <div className="ErrorMessage">
        <p>{PossibleErrorMessage}</p>
      </div>
    </Component.ContainerStyled>
  );
};
