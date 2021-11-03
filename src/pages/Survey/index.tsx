import React, { useState, useEffect } from "react";
import QuestionsServices from "../../entities/questions";
import DataInformation from "../../services/data.json";
import { Question } from "../../components/Question";

export const Survey = () => {
  const [Data, setData] = useState<QuestionsServices[]>([]);
  const [IsFinalized, setIsFinalized] = useState(false);
  const [EndMessage, setEndMessage] = useState("");
  const [HashApplication, setHashApplication] = useState("");
  const LocalStorageNameItem = "QResults";
  const [visibleControl, setVisibleControl] = useState(false);

  const getQuastions = async () => {
    try {
      const uniqueHash = Math.floor(Date.now() * Math.random()).toString(36);
      setHashApplication(uniqueHash);

      setData(DataInformation as QuestionsServices[]);

      if (!localStorage.getItem(LocalStorageNameItem)) {
        localStorage.setItem(
          LocalStorageNameItem,
          JSON.stringify([
            {
              id: uniqueHash,
              response: [],
            },
          ] as unknown as string)
        );

        return;
      }

      const LocalData = JSON.parse(
        localStorage.getItem(LocalStorageNameItem) as unknown as string
      ) as { id: string; response: [] }[];
      LocalData.push({
        id: uniqueHash,
        response: [],
      });
      localStorage.setItem(LocalStorageNameItem, JSON.stringify(LocalData));
    } catch (error: any) {
      console.log(error || "Unxpected error");
    }
  };

  useEffect(() => {
    getQuastions();
  }, []);

  return (
    <>
      {IsFinalized ? (
        <h1>{EndMessage}</h1>
      ) : (
        Data.map((dados, index) => (
          <Question
            key={index}
            data={dados}
            setterFinalized={setIsFinalized}
            setMessageFinalized={setEndMessage}
            hashAplication={HashApplication}
            setVisibleControl={setVisibleControl}
            visibleControl={visibleControl}
          />
        ))
      )}
    </>
  );
};
