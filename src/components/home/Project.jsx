import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import ProjectCard from "./ProjectCard";
import { personalProjects } from "../../editable-stuff/config";

const dummyProject = {
   name: null,
   description: null,
   svn_url: null,
   stargazers_count: null,
   languages_url: null,
   pushed_at: null,
};
const Project = ({ heading, username, length, specfic }) => {
   const dummyProjectsArr = new Array(length + specfic.length).fill(dummyProject);

   const [projectsArray, setProjectsArray] = useState(personalProjects);

   return (
      <Jumbotron fluid id="projects" className="bg-light m-0">
         <Container className="">
            <h2 className="display-4 pb-5 text-center">{heading}</h2>
            <Row>
               {projectsArray.length
                  ? projectsArray.map((project, index) => (
                       <ProjectCard
                          key={`project-card-${index}`}
                          id={`project-card-${index}`}
                          value={project}
                       />
                    ))
                  : dummyProjectsArr.map((project, index) => (
                       <ProjectCard
                          key={`dummy-${index}`}
                          id={`dummy-${index}`}
                          value={project}
                       />
                    ))}
            </Row>
         </Container>
      </Jumbotron>
   );
};

export default Project;
