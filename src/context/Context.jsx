import { createContext, useState } from "react";
import run from "../config/geminiAPI";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setinput] = useState("");
  const [recentPrompt, setrecentPrompt] = useState("");
  const [prevPrompts, setprevPrompts] = useState([]);
  const [showResult, setshowResult] = useState(false);
  const [loading, setloading] = useState(false);
  const [resultData, setresultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setresultData((prev) => prev + nextWord);
    }, 80 * index);
  };

  const newChat = () => {
    setloading(false);
    setshowResult(false);
  };

  const onSent = async (prompt) => {
    setresultData("");
    setloading(true);
    setshowResult(true);
    let res = "";
    if (prompt !== undefined) {
      res = await run(prompt);
      setrecentPrompt(prompt);
    } else {
      setprevPrompts((prev) => [...prev, input]);
      setrecentPrompt(input);
      res = await run(input);
    }

    let responseArray = res.split("**");
    let newResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponse3 = newResponse2.split("##").join("");

    let newResponse_array = newResponse3.split(" ");

    for (let i = 0; i < newResponse_array.length; i++) {
      const nextWord = newResponse_array[i];
      delayPara(i, nextWord + " ");
    }
    setloading(false);
    setinput("");
  };

  const contextValue = {
    prevPrompts,
    setprevPrompts,
    onSent,
    setrecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setinput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;





