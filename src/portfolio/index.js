import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navigation from '../assets/navigation/navigation';

import HomeApp from './home';
import ProjectsApp from './projects'
import BlogApp from './blog'
import ContactApp from './contact'

class PorfolioComponents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="Rendered__Components">
                <Router>
                    <Navigation />

                    <Switch>
                        <Route path='/'><HomeApp/></Route>
                        <Route path='/projects'><ProjectsApp/></Route>
                        <Route path='/blog'><BlogApp/></Route>
                        <Route path='/contact'><ContactApp/></Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default PorfolioComponents;