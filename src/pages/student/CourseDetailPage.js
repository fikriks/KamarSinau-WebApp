import React, { useState, useEffect, useCallback } from "react";
import { WrapperStudent } from "../../layout/student";
import { useAuthUser } from "react-auth-kit";
import { useParams } from "react-router-dom";
import "../../styles/Course.css";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

const CourseDetailPage = () => {
  const [modules, setModules] = useState([]);
  const [course, setCourse] = useState([]);
  const auth = useAuthUser();
  const { id } = useParams();

  const fetchModules = useCallback(async () => {
    try {
      const response = await fetch(
        `${apiUrl}/modules/course/${id}/student/${auth().id}`
      );
      const data = await response.json();

      let dataProgress = [];

      data.data.forEach((item, index) => {
        dataProgress[index] = item.Progresses;
      });

      setModules(data.data);
      setCourse(data.course);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  }, [auth, id]);

  useEffect(() => {
    fetchModules();
    // eslint-disable-next-line
  }, []);

  const addProgress = async (inputData) => {
    try {
      const response = await fetch(`${apiUrl}/progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      const responseJson = await response.json();
      if (responseJson.success) {
        alert("Berhasil menyelesaikan pelajaran ini");

        fetchModules();
      } else {
        console.error("Failed to add progress");
      }
    } catch (error) {
      console.error("Error add progress:", error);
    }
  };

  const handleButtonAnswerClick = async (event, answer, answered) => {
    const questionId = parseInt(event.target.id);

    if (answer === answered) {
      try {
        const response = await fetch(`${apiUrl}/questions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            questionId: questionId,
            userId: auth().id,
            answered: 1,
          }),
        });

        const responseJson = await response.json();
        if (responseJson.success) {
          alert("Selamat, jawaban anda benar");

          fetchModules();
        } else {
          console.error("Failed to add answer");
        }
      } catch (error) {
        console.error("Error add answer:", error);
      }
    } else {
      alert("Yahh, jawabannya salah");
    }
  };

  const handleMarkAsRead = async (event) => {
    event.preventDefault();

    let inputData = {
      userId: auth().id,
      moduleId: event.target.id,
      courseId: course.id,
      completed: 1,
    };

    addProgress(inputData);
  };

  return (
    <WrapperStudent>
      <div className="col-md-10">
        <div className="dasboard-right">
          <div>
            <h2>{course.courseName}</h2>
            <div className="accordion" id="accordionExample">
              {modules.map((module, index) => (
                <div key={index} className="accordion-item">
                  <h2 className="accordion-header" id={"heading-" + module.id}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={"#collapse-" + module.id}
                      aria-expanded="true"
                      aria-controls={"collapse-" + module.id}
                    >
                      {module.moduleName}
                    </button>
                  </h2>
                  <div
                    id={"collapse-" + module.id}
                    className="accordion-collapse collapse"
                    aria-labelledby={"heading-" + module.id}
                    data-bs-parent="#accordionExample"
                  >
                    <div
                      className="accordion-body"
                      dangerouslySetInnerHTML={{
                        __html: module.content,
                      }}
                    ></div>
                    {index === 0 ? (
                      <>
                        <h4
                          className="accordion-body
                    "
                        >
                          Soal
                        </h4>
                        {module.Course.Questions.map((question, index) => (
                          <div key={index} className="accordion-body">
                            <p
                              dangerouslySetInnerHTML={{
                                __html: question.question,
                              }}
                            ></p>
                            <button
                              className="btn btn-primary text-white"
                              onClick={(event) =>
                                handleButtonAnswerClick(
                                  event,
                                  question.answer,
                                  "A"
                                )
                              }
                              id={question.id}
                              disabled={
                                question.QuestionStudents.filter((item) => {
                                  return item.userId === auth().id;
                                }).length > 0
                                  ? true
                                  : false
                              }
                            >
                              A. {question.optionA}
                            </button>
                            <button
                              className="btn btn-primary text-white ms-2"
                              onClick={(event) =>
                                handleButtonAnswerClick(
                                  event,
                                  question.answer,
                                  "B"
                                )
                              }
                              id={question.id}
                              disabled={
                                question.QuestionStudents.filter((item) => {
                                  return item.userId === auth().id;
                                }).length > 0
                                  ? true
                                  : false
                              }
                            >
                              B. {question.optionB}
                            </button>
                          </div>
                        ))}{" "}
                      </>
                    ) : (
                      ""
                    )}
                    <button
                      className="btn btn-primary ms-2 text-white"
                      id={module.id}
                      onClick={handleMarkAsRead}
                      disabled={
                        module.Progresses.filter((item) => {
                          return item.userId === auth().id;
                        }).length > 0
                          ? true
                          : false
                      }
                    >
                      {module.Progresses.filter((item) => {
                        return item.userId === auth().id;
                      }).length > 0
                        ? "Telah Dipelajari"
                        : " Tandai Telah Dipelajari"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WrapperStudent>
  );
};

export default CourseDetailPage;
