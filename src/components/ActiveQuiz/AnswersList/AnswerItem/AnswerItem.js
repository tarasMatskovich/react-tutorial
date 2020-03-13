import React from 'react'
import classes from './AnswerItem.css'

const AnswerItem = props => {

    const classesArray = [classes.AnswerItem];


    if (null !== props.answerState) {
        classesArray.push(classes[props.answerState]);
    }

    return (
      <li className={classesArray.join(' ')} onClick={() => {props.onAnswerClick(props.answer.id)}}>
          {props.answer.text}
      </li>
    );
};

export default AnswerItem;
