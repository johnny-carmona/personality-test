import { useContext, useEffect, useState } from "react";
import ResultBox from "../../components/ResultBox";
import { QuestionContext } from "../../context/QuestionContext";
import { fetchAnswers } from "../../api";
import "./styles.scss";

export default function Results() {
  const { state: { email } } = useContext(QuestionContext);

  const [answerResults, setAnswerResults] = useState(null);
  useEffect(() => {
    async function fetchAnswersResult(email) {
      try {
        const response = await fetchAnswers(email);
        setAnswerResults(response);
      } catch (error) {
        // Handle error
      }
    }
    fetchAnswersResult(email);

  }, []);

  function getResultText() {
    let resultText = '';
    answerResults && Object.keys(answerResults).forEach((key) => {
      resultText = answerResults[key] > 0 ? resultText + key[0] : resultText + key[1];
    });
    return resultText;
  }

  return (
    <div className="results-page">
      <div>
        <h1>Your Perspective</h1>
        <h2>Your Perspective Type is {getResultText()}</h2>
      </div>
      <div>
        <ResultBox leftText="Introversion(I)" rightText="Extroversion(E)" value={answerResults?.EI} />
        <ResultBox leftText="Sensing (S)" rightText="Intuition (N)" value={answerResults?.SN} />
        <ResultBox leftText="Thinking (T)" rightText="Feeling (F)" value={answerResults?.TF} />
        <ResultBox leftText="Judging (J)" rightText="Perceiving (P)" value={answerResults?.JP} />
      </div>
    </div>
  );
}