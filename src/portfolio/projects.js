import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

import { Avatar } from "@material-ui/core";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 10,
  },
  paper: {
    height: 300,
    width: 300,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: 15,
    cursor: "pointer",

    "&:hover": {
      filter: "grayscale(100%)",
    },
  },
  control: {
    padding: 20,
  },
  square: {
    width: "100%",
    height: 150,
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
  },
  status: {
    padding: "5px 10px",
    fontSize: 16,
    fontWeight: 600,
    color: "#fff",
    borderRadius: 5,
  },
  technologies: {
    display: "flex",
    columnGap: 10,
  },
  technology: {
    background: "#f00",
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
    padding: "5px 15px",
    borderRadius: 25,
  },
});

const projects = [
  {
    name: "Project One",
    image:
      "https://media.istockphoto.com/photos/coming-soon-neon-sign-the-banner-shining-light-signboard-collection-picture-id1332167985?s=612x612",
    status: "In Progress",
    color: "#D79E34",
    technologies: ["React", "Django"],
  },
  {
    name: "Project Two",
    image:
      "https://media.istockphoto.com/photos/coming-soon-neon-sign-the-banner-shining-light-signboard-collection-picture-id1332167985?s=612x612",
    status: "In Progress",
    color: "#D79E34",
    technologies: ["React", "Django"],
  },
  {
    name: "Project One",
    image:
      "https://media.istockphoto.com/photos/coming-soon-neon-sign-the-banner-shining-light-signboard-collection-picture-id1332167985?s=612x612",
    status: "In Progress",
    color: "#D79E34",
    technologies: ["React", "Django"],
  },
  {
    name: "Project Two",
    image:
      "https://media.istockphoto.com/photos/coming-soon-neon-sign-the-banner-shining-light-signboard-collection-picture-id1332167985?s=612x612",
    status: "In Progress",
    color: "#D79E34",
    technologies: ["React", "Django"],
  },
  {
    name: "Project One",
    image:
      "https://media.istockphoto.com/photos/coming-soon-neon-sign-the-banner-shining-light-signboard-collection-picture-id1332167985?s=612x612",
    status: "In Progress",
    color: "#D79E34",
    technologies: ["React", "Django"],
  },
  {
    name: "Project Two",
    image:
      "https://media.istockphoto.com/photos/coming-soon-neon-sign-the-banner-shining-light-signboard-collection-picture-id1332167985?s=612x612",
    status: "In Progress",
    color: "#D79E34",
    technologies: ["React", "Django"],
  },
  {
    name: "Project One",
    image:
      "https://media.istockphoto.com/photos/coming-soon-neon-sign-the-banner-shining-light-signboard-collection-picture-id1332167985?s=612x612",
    status: "In Progress",
    color: "#D79E34",
    technologies: ["React", "Django"],
  },
  {
    name: "Project Two",
    image:
      "https://media.istockphoto.com/photos/coming-soon-neon-sign-the-banner-shining-light-signboard-collection-picture-id1332167985?s=612x612",
    status: "In Progress",
    color: "#D79E34",
    technologies: ["React", "Django"],
  },
];

class ProjectsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <section className="Section Projects">
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={6} justifyContent="center">
              {projects.map((project, index) => {
                return (
                  <Grid key={index} item>
                    <Link to={`/projects/${project.name}`}>
                      <Paper className={classes.paper}>
                        <Avatar
                          src={project.image}
                          variant="square"
                          className={classes.square}
                        />
                        <span className={classes.name}>{project.name}</span>
                        <span
                          className={classes.status}
                          style={{ background: project.color }}
                        >
                          {project.status}
                        </span>
                        <div className={classes.technologies}>
                          {project.technologies.map((technology) => {
                            return (
                              <span className={classes.technology}>
                                {technology}
                              </span>
                            );
                          })}
                        </div>
                      </Paper>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </section>
    );
  }
}

export default withStyles(useStyles)(ProjectsApp);
