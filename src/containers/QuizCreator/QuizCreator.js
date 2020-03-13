import React, {Component} from 'react'
import classes from './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import {createControl, validate, validateForm} from '../../Form/FormFramework'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'


function createFormControls() {
    return {
        question: createControl(
            {
                label: 'Введите вопрос',
                errorMessage: 'Вопрос не может быть пустым',
                value: ''
            },
            {
                required: true
            }
        ),
        option1: createControl(
            {
                label: 'Вариант 1',
                errorMessage: 'Значение не может быть пустым',
                id: 1,
                value: ''
            },
            {
                required: true
            }
        ),
        option2: createControl(
            {
                label: 'Вариант 2',
                errorMessage: 'Значение не может быть пустым',
                id: 2,
                value: ''
            },
            {
                required: true
            }
        ),
        option3: createControl(
            {
                label: 'Вариант 3',
                errorMessage: 'Значение не может быть пустым',
                id: 3,
                value: ''
            },
            {
                required: true
            }
        ),
        option4: createControl(
            {
                label: 'Вариант 4',
                errorMessage: 'Значение не может быть пустым',
                id: 4,
                value: ''
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
        isFormValid: false,
        formControls: createFormControls(),
        rightAnswerId: 1
    };

    submitHandler = event => {
        event.preventDefault();
    };

    addQuestionHandler = () => {
        let quiz = this.state.quiz.concat();
        let index = quiz.length + 1;
        let questionItem = {
            question: this.state.formControls.question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {
                    text: this.state.formControls.option1.value,
                    id: this.state.formControls.option1.id
                },
                {
                    text: this.state.formControls.option2.value,
                    id: this.state.formControls.option2.id
                },
                {
                    text: this.state.formControls.option3.value,
                    id: this.state.formControls.option3.id
                },
                {
                    text: this.state.formControls.option4.value,
                    id: this.state.formControls.option4.id
                }
            ]
        };
        quiz.push(questionItem);
        this.setState({
            quiz,
            formControls: createFormControls(),
            rightAnswerId: 1,
            isFormValid: false
        })
    };

    createQuizHandler = (event) => {
        event.preventDefault();
    };

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);
        formControls[controlName] = control;
        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
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
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type={'success'}
                            onClick={this.createQuizHandler}
                            disabled={this.state.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}
