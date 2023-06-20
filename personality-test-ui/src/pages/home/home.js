import './styles.scss';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom'; // import useHistory hook
import { QuestionContext } from '../../context/QuestionContext';
import QuestionList from '../../components/QuestionList';
import { saveAnswers } from '../../api';

export default function Home() {
  const { state: { answers, email, questions }, dispatch } = useContext(QuestionContext);
  const [error, setError] = useState('');
  const history = useHistory(); // initialize useHistory hook

  function handleEmailChange(event) {
    const newEmail = event.target.value;
    dispatch({ type: 'SET_EMAIL', payload: newEmail });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || Object.keys(answers).length < questions.length) {
      setError('Please enter your email');
      return;
    }
    saveAnswers({ answers, email });
    history.push('/results'); // navigate to results page
  };


  return (

    <div className="home-page">
      <h1>Discover Your Perspective</h1>
      <h2>Complete the 7 min test and get a detailed report of your lenses on the world.</h2>
      <form onSubmit={handleSubmit}>
        <div className="content">
          <QuestionList error={error} />
          <div className="form-group email-container">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} placeholder='you@example.com' />
            {error && !email && <p className="error">{error}</p>}
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  );
}