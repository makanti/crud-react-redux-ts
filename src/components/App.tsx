import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import { appReducer } from './../flux/appReducer';
import { StudentsListPage } from './student/list/StudentsListPage';
import { NewStudentPage } from './student/new/NewStudentPage';
import { StudentDetailsPage } from './student/details/StudentDetailsPage';
import { StudentEditPage } from './student/edit/StudentEditPage';
import ReduxToastr from 'react-redux-toastr';

const store = createStore(
    appReducer, 
    applyMiddleware(ReduxThunk)
);
const history = syncHistoryWithStore(hashHistory, store);

export class App extends React.Component<any, any> {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Router history={history}>
                        <Route path="/" component={StudentsListPage} />
                        <Route path="students" component={StudentsListPage} />
                        <Route path="students/new" component={NewStudentPage} />
                        <Route path="students/details/:id" component={StudentDetailsPage} />
                        <Route path="students/edit/:id" component={StudentEditPage} />                    
                    </Router>
                    <ReduxToastr />
                </div>
            </Provider>
        );
    }
}
