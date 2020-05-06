import {
    FETCH_QUIES_START,
    FETCH_QUIES_SUCCESS,
    FETCH_QUIES_ERROR,
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_STATE, FINISH_QUIZ, QUIZ_NEXT_QUESTION, RESET_QUIZ, RETRY_QUIZ
} from "../actions/actionTypes";

const initialState = {
    quizes: [],
    loading: false,
    error: null,
    results: {},
    isFinished: false,
    answerState: null,
    activeQuestion: 0,
    quiz: null
};

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIES_START:
            return {
                ...state, loading: true
            };
        case FETCH_QUIES_SUCCESS:
            return {
                ...state, loading: false, quizes: action.quizes
            };
        case FETCH_QUIES_ERROR:
            return {
                ...state, loading: false, error: action.error
            };
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state, loading: false, quiz: action.quiz
            };
        case QUIZ_SET_STATE:
            return {
                ...state, answerState: action.answerState, results: action.results
            };
        case FINISH_QUIZ:
            return {
                ...state, isFinished: true
            };
        case QUIZ_NEXT_QUESTION:
            return {
                ...state, activeQuestion: action.question
            };
        case RESET_QUIZ:
            return {
                ...state, answerState: null
            };
        case RETRY_QUIZ:
            return {
                ...state,
                answerState: null,
                activeQuestion: 0,
                isFinished: false,
                results: {}
            };
        default:
            return state;
    }
}
