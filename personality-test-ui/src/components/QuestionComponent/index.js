import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './styles.module.scss';

const QuestionComponent = ({ questionText, questionId, onChange, error }) => {
  const handleOnchange = (event) => {
    const newAnswer = event.target.value;
    onChange({ questionId: questionId, answer: newAnswer });
  }
  return (
    <div className={styles['question-container']}>
      <Form.Group>
        <Form.Label className={`d-flex justify-content-center ${styles.text}`}>{questionText}</Form.Label>
        <div className="d-flex justify-content-between align-items-center">
          <span className={styles.disagree}>Disagree</span>
          <div className="d-flex flex-grow-1 justify-content-between">
            {[1, 2, 3, 4, 5, 6, 7].map((degree) => (
              <Form.Check
                key={degree}
                type="radio"
                name={questionId}
                id={`option${degree}`}
                className="ml-2"
                onChange={handleOnchange}
                value={degree}
                required
              />
            ))}
          </div>
          <span className={styles.agree}>Agree</span>
        </div>
        {error && <p className="error">Please Select one of these options</p>}
      </Form.Group>
    </div>
  );
};

export default QuestionComponent;
