import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from './../../components/FinishedQuiz/FinishedQuiz'


export default class Quiz extends Component {

    state = {
        results: {

        },
        isFinished: false,
        answerState: null,
        activeQuestion: 0,
        quiz: [
            {
                id: 1,
                question: 'Сколько будет 2+2',
                rightAnswerId:2,
                answers: [
                    {
                        text: '1',
                        id: 1
                    },
                    {
                        text: '2',
                        id: 2
                    },
                    {
                        text: '3',
                        id: 3
                    },
                    {
                        text: '4',
                        id: 4
                    }
                ]
            },
            {
                id: 2,
                question: 'Кокого цвета небо?',
                rightAnswerId:4,
                answers: [
                    {
                        text: 'Зеленое',
                        id: 1
                    },
                    {
                        text: 'Красное',
                        id: 2
                    },
                    {
                        text: 'Белое',
                        id: 3
                    },
                    {
                        text: 'Синее',
                        id: 4
                    }
                ]
            }
        ]
    };

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            let key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return;
            }
        }
        let question = this.state.quiz[this.state.activeQuestion];
        let results = this.state.results;
        if (question.rightAnswerId === answerId) {
            if (!results[this.state.quiz[this.state.activeQuestion].id]) {
                results[this.state.quiz[this.state.activeQuestion].id] = 'success';
            }
            this.setState({
                answerState: {[answerId] : 'success'},
                results: results
            });
            let timeout = window.setTimeout(() => {
                let nextActiveQuestion = this.state.activeQuestion + 1;
                if (!this.isQuizFinished()) {
                    this.setState({
                        activeQuestion: nextActiveQuestion
                    });
                } else {
                    this.setState({
                        isFinished: true
                    })
                }
                this.setState({
                    answerState: null
                });
                window.clearTimeout(timeout);
            }, 1000);
        } else {
            results[this.state.quiz[this.state.activeQuestion].id] = 'error';
            this.setState({
                answerState: {[answerId] : 'error'},
                results: results
            });
        }
    };

    isQuizFinished() {
        return this.state.activeQuestion + 1 > this.state.quiz.length - 1;
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.isFinished ?
                            <FinishedQuiz results={this.state.results} quiz={this.state.quiz}/> :
                            <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                questionNumber={this.state.activeQuestion + 1}
                                answerState={this.state.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}
