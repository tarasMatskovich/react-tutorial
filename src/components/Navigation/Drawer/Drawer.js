import React from 'react'
import classes from './Drawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import {NavLink} from "react-router-dom";

class Drawer extends React.Component {
    render() {
        let cls = [
          classes.Drawer
        ];
        if (!this.props.isOpen) {
            cls.push(classes.close);
        }
        let links = [
            {
                to: '/',
                label: 'Спосок тестов',
                exact: true
            }
        ];
        if (this.props.isAuthenticated) {
            links.push({
                to: '/quiz-creator',
                label: 'Создать тест',
                exact: false
            });
            links.push({
                to: '/logout',
                label: 'Выйти',
                exact: false
            })
        } else {
            links.push({
                to: '/auth',
                label: 'Авторизация',
                exact: false
            })
        }
        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {
                            this.renderLinks(links)
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

    renderLinks(links) {
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
