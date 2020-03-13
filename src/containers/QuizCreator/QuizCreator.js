import React, {Component} from 'react'
import classes from './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import {createControl} from '../../Form/FormFramework'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'


function createFormControls() {
    return {
        question: createControl(
            {
                label: 'Введите вопрос',
                errorMessage: 'Вопрос не может быть пустым',
            },
            {
                required: true
            }
        ),
        option1: createControl(
            {
                label: 'Вариант 1',
                errorMessage: 'Значение не может быть пустым',
                id: 1
            },
            {
                required: true
            }
        ),
        option2: createControl(
            {
                label: 'Вариант 2',
                errorMessage: 'Значение не может быть пустым',
                id: 2
            },
            {
                required: true
            }
        ),
        option3: createControl(
            {
                label: 'Вариант 3',
                errorMessage: 'Значение не может быть пустым',
                id: 3
            },
            {
                required: true
            }
        ),
        option4: createControl(
            {
                label: 'Вариант 4',
                errorMessage: 'Значение не может быть пустым',
                id: 4
            },
            {
                required: true
            }
        ),
    };
}

export default class QuizCreator extends Component {

    state = {
        quiz: [],
        formControls: createFormControls(),
        rightAnswerId: 1
    };

    submitHandler = event => {
        event.preventDefault();
    };

    addQuestionHandler = () => {

    };

    createQuizHandler = () => {

    };

    changeHandler = (value, controlName) => {
    };

    renderControls() {
        return Object.keys(this.state.formControls).map((name, index) => {
            let control = this.state.formControls[name];
            return (
                <React.Fragment key={index}>
                    <Input
                        key={index}
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value,name)}
                    />
                    { index === 0 ? <hr key={index + 10}/> : null}
                </React.Fragment>
            )
        });
    }

    selectChangeHandler = (event) => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    };

    render() {
        const select = <Select
           label={'Выберите правильный ответ'}
           value={this.state.rightAnswerId}
           onChange={this.selectChangeHandler}
           options={[
               {text: '1', value: 1},
               {text: '2', value: 2},
               {text: '3', value: 3},
               {text: '4', value: 4},
           ]}
        />;
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form
                        onSubmit={this.submitHandler}
                    >

                        {
                            this.renderControls()
                        }

                        { select }

                        <Button
                            type={'primary'}
                            onClick={this.addQuestionHandler}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type={'success'}
                            onClick={this.createQuizHandler}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}
