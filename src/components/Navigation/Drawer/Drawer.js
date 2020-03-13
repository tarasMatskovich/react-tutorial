import React from 'react'
import classes from './Drawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import {NavLink} from "react-router-dom";

const links = [
    {
        to: '/',
        label: 'Спосок тестов',
        exact: true
    },
    {
        to: '/auth',
        label: 'Авторизация',
        exact: false
    },
    {
        to: '/quiz-creator',
        label: 'Создать тест',
        exact: false
    }
];

class Drawer extends React.Component {
    render() {
        let cls = [
          classes.Drawer
        ];
        if (!this.props.isOpen) {
            cls.push(classes.close);
        }
        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {
                            this.renderLinks()
                        }
                    </ul>
                </nav>
                {
                    this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null
                }
            </React.Fragment>
        )
    }

    handleClick = () => {
      this.props.onClose();
    };

    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.handleClick}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }
}

export default Drawer;
