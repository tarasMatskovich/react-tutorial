import axios from '../../transport/transport'
import {
    FETCH_QUIES_ERROR,
    FETCH_QUIES_START,
    FETCH_QUIES_SUCCESS,
    FETCH_QUIZ_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_SET_STATE, RESET_QUIZ, RETRY_QUIZ
} from "./actionTypes";

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart());
        try {
            let response = await axios.get('/quizes.json');
            let quizes = [];
            Object.keys(response.data).forEach((id, index) => {
                quizes.push({
                    id: id,
                    name: `Тест №${index + 1}`
                })
            });
            dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}


export function fetchQuizesStart() {
    return {
        type: FETCH_QUIES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIES_ERROR,
        error: e
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart());
        try {
            let response = await axios.get('/quizes/' + quizId + '.json');
            let quiz = response.data;
            dispatch(fetchQuizSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz: quiz
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz;
        if (state.answerState) {
            let key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'success') {
                return;
            }
        }
        let question = state.quiz[state.activeQuestion];
        let results = state.results;
        if (question.rightAnswerId === answerId) {
            if (!results[state.quiz[state.activeQuestion].id]) {
                results[state.quiz[state.activeQuestion].id] = 'success';
            }
            dispatch(quizSetState({[answerId] : 'success'}, results));
            let timeout = window.setTimeout(() => {
                let nextActiveQuestion = state.activeQuestion + 1;
                if (!isQuizFinished(state)) {
                    dispatch(quizNextQuestion(nextActiveQuestion));
                } else {
                    dispatch(finishQuiz());
                }
                dispatch(resetQuiz());
                window.clearTimeout(timeout);
            }, 1000);
        } else {
            results[state.quiz[state.activeQuestion].id] = 'error';
            dispatch(quizSetState({[answerId] : 'error'}, results));
        }
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}

export function quizNextQuestion(question) {
    return {
        type: QUIZ_NEXT_QUESTION,
        question: question
    }
}

export function resetQuiz() {
    return {
        type: RESET_QUIZ
    }
}

function isQuizFinished(state) {
    return state.activeQuestion + 1 > state.quiz.length - 1;
}

export function retryQuiz() {
    return {
        type: RETRY_QUIZ
    }
}
