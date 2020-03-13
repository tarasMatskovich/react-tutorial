import React, {Component} from 'react'
import classes from './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'

export default class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    };

    loginHandler = () => {

    };

    registerHandler = () => {

    };

    validateControl(control) {
        let value = control.value;
        let validation = control.validation;
        if (!validation)
            return true;
        let isValid = true;
        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.email) {
            isValid = is.email(value) && isValid;
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }
        return isValid;
    }

    onChangeHandler = (event,controlName) => {
        let formControls = {...this.state.formControls};
        const control = {...formControls[controlName]}
        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control)
        formControls[controlName] = control;
        let isFormValid = true;
        Object.keys(formControls).map((name) => {
            isFormValid = formControls[name].valid && isFormValid;
            return null;
        });
        this.setState({
            formControls,
            isFormValid
        })
    };

    submitHandler = (event) => {
        event.preventDefault();
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            let control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={(event) => {
                        this.onChangeHandler(event,controlName)
                    }}
                />
            )
        });
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>

                    <form className={classes.AuthForm} onSubmit={this.submitHandler}>
                        {
                            this.renderInputs()
                        }
                        <Button
                            type={'success'}
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Войти
                        </Button>
                        <Button
                            type={'primary'}
                            onClick={this.registerHandler}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}
