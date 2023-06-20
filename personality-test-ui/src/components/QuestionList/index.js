import React, { useContext } from 'react';
import QuestionComponent from '../QuestionComponent';
import { QuestionContext } from '../../context/QuestionContext';

const QuestionList = ({ error }) => {
  const { state: { questions, answers }, dispatch } = useContext(QuestionContext);
  const handleOnchange = (answer) => {
    dispatch({ type: 'SET_ANSWERS', payload: answer });
  }

  return (
    <div>
      {questions.map((question) => (
        <QuestionComponent
          key={question.id}
          questionId={question.id}
          questionText={question.question}
          onChange={handleOnchange}
          error={!answers[question.id] ? error : ''}
        />
      ))}
    </div>
  );
};

export default QuestionList;
