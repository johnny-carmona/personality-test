const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
export const fetchQuestions = () => {
  return fetch(`${BASE_API_URL}/questions`)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching questions:', error);
      throw error;
    });
};

export const saveAnswers = (answers) => {
  return fetch(`${BASE_API_URL}/answers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(answers)
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error saving answers:', error);
      throw error;
    });
};

export const fetchAnswers = (email) => {
  return fetch(`${BASE_API_URL}/answers/${email}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching answers:', error);
      throw error;
    });
};

