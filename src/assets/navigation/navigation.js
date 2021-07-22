import React from 'react';
import {Link} from 'react-router-dom'
import { Avatar } from "@material-ui/core";
import avatar from '../avatar/jamal.jpg'

class Navigation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            links: [
                {name : 'Home', path: '/'},
                {name : 'Projects', path: '/projects'},
                {name : 'Blog', path: '/blog'},
                {name : 'Contact', path: '/contact'},
            ]
        }
    }

    render(){
        return(
            <section className="Navigation">
                <div className="Container">
                    <div className="Content-Container Flex JustifySpaceBetween AlignCenter">
                        <div className="Porfolio-Logo Flex AlignCenter">
                            <Avatar src={avatar}/>
                            <span>JDerrick</span>
                        </div>
                        <div className="NavLinks Flex AlignCenter">
                            {
                                this.state.links.map((link, index) => {
                                    return(
                                        <Link className="Link Flex AlignCenter JustifyCenter" to={link.path}>{link.name}</Link>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
            </section>
        )
    }
}

export default Navigation