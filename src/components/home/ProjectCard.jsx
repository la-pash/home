import React, { useState, useEffect, useCallback } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { icons } from "../../editable-stuff/config";

const ProjectCard = ({ value }) => {
   const { name, description, url, languages, state } = value;
   return (
      <Col md={6}>
         <Card className="card shadow-lg p-3 mb-5 bg-white rounded">
            <Card.Body>
               <Card.Title as="h5">{name || <Skeleton />} </Card.Title>
               <Card.Text>
                  {!description ? "" : description || <Skeleton count={3} />}{" "}
               </Card.Text>
               {url ? <CardButtons svn_url={url} /> : <Skeleton count={2} />}
               <hr />
               {/* {languages.map((val) => (
                  <span key={val}>
                     <i className={`fab fa-${val}`} />
                  </span>
               ))} */}
               {state ?
                   <i class={icons.complete}>  Live</i>:
                    <i class={icons.inProgress}>  In Progress</i>}
            </Card.Body>
         </Card>
      </Col>
   );
};

const CardButtons = ({ svn_url }) => {
   return (
      <>
         <a href={svn_url} className="btn btn-outline-secondary mr-3">
            <i class="fas fa-link" />    Details
         </a>
      </>
   );
};


const CardFooter = ({ star_count, url, pushed_at }) => {
   const [updated_at, setUpdated_at] = useState("0 mints");

   const handleUpdatetime = useCallback(() => {
      const date = new Date(pushed_at);
      const nowdate = new Date();
      const diff = nowdate.getTime() - date.getTime();
      const hours = Math.trunc(diff / 1000 / 60 / 60);

      if (hours < 24) {
         if (hours < 1) return setUpdated_at("just now");
         let measurement = hours === 1 ? "hour" : "hours";
         return setUpdated_at(`${hours.toString()} ${measurement} ago`);
      } else {
         const options = { day: "numeric", month: "long", year: "numeric" };
         const time = new Intl.DateTimeFormat("en-US", options).format(date);
         return setUpdated_at(`on ${time}`);
      }
   }, [pushed_at]);

   useEffect(() => {
      handleUpdatetime();
   }, [handleUpdatetime]);

   return (
      <p className="card-text">
         <a
            href={url + "/stargazers"}
            target=" _blank"
            className="text-dark text-decoration-none"
         >
            <span className="text-dark card-link mr-4">
               <i className="fab fa-github" /> Stars{" "}
               <span className="badge badge-dark">{star_count}</span>
            </span>
         </a>
         <small className="text-muted">Updated {updated_at}</small>
      </p>
   );
};

export default ProjectCard;
