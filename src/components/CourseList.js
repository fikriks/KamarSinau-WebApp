import React from "react";
import { Link } from "react-router-dom";

const CourseList = ({ Courses }) => {
  if (Courses.length) {
    return (
      <section className="modules-list">
        {Courses.map((course) => (
           <article className="module-item">
            <h3 className="module-item__title"><Link to={`/courses/${course.id}`}>{course.courseName}</Link></h3>
            <p className="module-item__createdAt">{course.createdAt}</p>
            <p className="module-item__body">{course.description}</p>
        </article>
        ))}
      </section>
    );
  } else {
    return (
      <div className="modules-list__empty-message">
        Tidak ada Pelajaran ...{" "}
      </div>
    );
  }
}

export default CourseList;
