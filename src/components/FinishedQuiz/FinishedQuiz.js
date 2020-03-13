import React from 'react'
import classes from './FinishedQuiz.css'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'

const FinishedQuiz = props => {
    let correctAnswersCount = 0;
    Object.keys(props.results).forEach(function(key) {
        if ('success' === props.results[key]) {
            correctAnswersCount++;
        }
    });
    return (
    <div className={classes.FinishedQuiz}>
        <ul>
            {
                props.quiz.map((question, index) => {
                    let cls = [
                        'fa',
                        props.results[question.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[question.id]]
                    ];
                    return (
                        <li key={index}>
                            <strong>{index + 1}.</strong>&nbsp;
                            {question.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                })
            }
        </ul>

        <p>Правильно {correctAnswersCount} из {props.quiz.length}</p>

        <div>
            <Button onClick={props.onRetry} type={'primary'}>
                Повторить
            </Button>
            <Link to={'/'}>
                <Button type={'success'}>
                    Перейти в список тестов
                </Button>
            </Link>
        </div>
    </div>
    );
};

export default FinishedQuiz;
