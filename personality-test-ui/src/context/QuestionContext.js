import React, { createContext, useEffect, useReducer } from 'react';
import { fetchQuestions } from '../api';

export const QuestionContext = createContext();

const initialState = {
    questions: [],
    answers: {},
    email: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_QUESTIONS':
            return {
                ...state,
                questions: action.payload
            };
        case 'SET_ANSWERS':
            return {
                ...state,
                answers: {
                    ...state.answers,
                    [action.payload.questionId]: action.payload.answer
                }
            };
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.payload
            };
        default:
            return state;
    }
};

export const QuestionProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const response = await fetchQuestions();
                dispatch({ type: 'SET_QUESTIONS', payload: response });
            } catch (error) {
                // Handle error
            }
        };

        loadQuestions();
    }, []);

    return (
        <QuestionContext.Provider value={{ state, dispatch }}>
            {children}
        </QuestionContext.Provider>
    );
};
