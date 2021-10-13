import { Avatar } from "@material-ui/core";
import React from "react";
import { GitHub, Gitlab } from "react-feather";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar/jamal.jpg";

class HomeApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [
        "Python",
        "Django",
        "PostgreSQL",
        "Apache Airflow",
        "Dash Python",
        "React",
        "Javascript",
        "SASS",
      ],
    };
  }

  render() {
    const { skills } = this.state;
    return (
      <section className="Section Home">
        <div className="Grid Profile__Intro Flex JustifySpaceBetween AlignCenter">
          <div className="Intro Flex AlignCenter">
            <Avatar className="Avatar" src={avatar} />
            <span className="name">Jamal Derrick</span>
            <span className="desired-profession">Data Engineer</span>
            <div className="WhereILive Flex">
              <a
                className="Flex JustifyCenter AlignCenter"
                href="https://github.com/jamalderrick6"
                target="_blank"
                style={{ backgroundColor: "#24292e" }}
                rel="noreferrer"
              >
                <GitHub />
              </a>
              <a
                className="Flex JustifyCenter AlignCenter"
                href="https://gitlab.com/derrick_jamal"
                target="_blank"
                style={{ backgroundColor: "#e24329" }}
                rel="noreferrer"
              >
                <Gitlab />
              </a>
            </div>
          </div>
          <div className="FavoriteQuote">
            <span>
              “Live as if you were to die tomorrow. Learn as if you were to live
              forever.” -: Mahatma Gandhi
            </span>
          </div>
        </div>
        <div className="Grid Profile__Summary Flex JustifyCenter AlignCenter">
          <div className="Skills">
            {skills.map((skill, index) => {
              return (
                <div className="Skill Flex JustifyCenter AlignCenter">
                  {skill}
                </div>
              );
            })}
          </div>
          <div>
            <Link
              to={"/projects"}
              className="Direct__Button Flex AlignCenter JustifySpaceAround"
            >
              View my projects
              <svg
                class="HoverArrow"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                aria-hidden="true"
              >
                <g fill-rule="evenodd">
                  <path class="HoverArrow__linePath" d="M0 5h7"></path>
                  <path class="HoverArrow__tipPath" d="M1 1l4 4-4 4"></path>
                </g>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default HomeApp;
