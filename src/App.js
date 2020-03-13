import React from 'react';
import Layout from './hoc/Layout/Layout'
import './App.css';
import {Route, Switch} from 'react-router-dom'
import Quiz from './containers/Quiz/Quiz'
import QuizList from './containers/QuizList/QuizList'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import Auth from './containers/Auth/Auth'

function App() {
  return (
    <div className="App">
      <Layout>
          <Switch>
              <Route path='/auth' component={Auth}/>
              <Route path='/quiz-creator' component={QuizCreator}/>
              <Route path='/quiz/:id' component={Quiz}/>
              <Route path='/' component={QuizList}/>
          </Switch>
      </Layout>
    </div>
  );
}

export default App;
