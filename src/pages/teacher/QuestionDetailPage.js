import React, { useState, useEffect, useCallback } from "react";
import { WrapperTeacher } from "../../layout/teacher";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import { Col, Form, Row, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../styles/Quill.css";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

const QuestionDetailPage = () => {
  const [questionData, setQuestionData] = useState([]);
  const [editorHtml, setEditorHtml] = useState([]);
  const [questionOptionA, setQuestionOptionA] = useState([]);
  const [questionOptionB, setQuestionOptionB] = useState([]);
  const [questionAnswer, setQuestionAnswer] = useState([]);
  const [questionId, setQuestionId] = useState([]);
  const [submitBtn, setSubmitBtn] = useState(true);
  const { id } = useParams();

  const fetchQuestions = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/questions/course/${id}`);
      const data = await response.json();
      setQuestionData(data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line
  }, []);

  const handleDescriptionChange = (event) => {
    setEditorHtml(event);
  };

  const handleQuestionOptionAChange = (event) => {
    setQuestionOptionA(event.target.value);
  };

  const handleQuestionOptionBChange = (event) => {
    setQuestionOptionB(event.target.value);
  };

  const handleQuestionAnswerChange = (event) => {
    setQuestionAnswer(event.target.value);
  };

  const updateQuestion = async (inputData) => {
    try {
      const response = await fetch(`${apiUrl}/questions/${questionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      const responseJson = await response.json();
      if (responseJson.success) {
        alert("Berhasil mengedit soal");

        setQuestionOptionA("");
        setQuestionOptionB("");
        setEditorHtml("");
        setQuestionAnswer("");
        setQuestionId("");

        fetchQuestions();
      } else {
        console.error("Failed to update question");
      }
    } catch (error) {
      console.error("Error updating Question:", error);
    }
  };

  const columns = [
    {
      name: "Soal",
      selector: (row) => row.question,
    },
    {
      name: "Opsi A",
      selector: (row) => row.optionA,
    },
    {
      name: "Opsi B",
      selector: (row) => row.optionB,
    },
    {
      name: "Jawaban",
      selector: (row) => row.answer,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button
            onClick={handleButtonEditClick}
            id={row.id}
            className="btn btn-danger text-white"
          >
            Edit
          </button>
        </>
      ),
    },
  ];

  const handleButtonEditClick = async (event) => {
    const itemId = parseInt(event.target.id);
    let data = questionData.find((item) => item.id === itemId);

    setEditorHtml(data.question);
    setQuestionOptionA(data.optionA);
    setQuestionOptionB(data.optionB);
    setQuestionAnswer(data.answer);
    setQuestionId(data.id);

    setSubmitBtn(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let inputData = {
      question: editorHtml,
      optionA: questionOptionA,
      optionB: questionOptionB,
      answer: questionAnswer,
      courseId: id,
    };

    await updateQuestion(inputData);
  };

  const QuestionsQuill = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const selectedValue = Array.isArray(questionAnswer)
    ? questionAnswer[0]
    : questionAnswer;

  const formatsQuill = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  return (
    <WrapperTeacher>
      <div className="col-md-10">
        <div className="dasboard-right">
          <div>
            <h2>Data Soal</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Control type="hidden" name="courseId" value={id} />
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2" className="form-label text-dark">
                  Soal
                </Form.Label>
                <Col sm="10">
                  <ReactQuill
                    theme="snow"
                    Questions={QuestionsQuill}
                    formats={formatsQuill}
                    value={editorHtml}
                    onChange={handleDescriptionChange}
                    readOnly={submitBtn}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2" className="form-label text-dark">
                  Opsi A
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="optionA"
                    placeholder="Opsi A"
                    value={questionOptionA}
                    onChange={handleQuestionOptionAChange}
                    disabled={submitBtn}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2" className="form-label text-dark">
                  Opsi B
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="optionB"
                    placeholder="Opsi B"
                    value={questionOptionB}
                    onChange={handleQuestionOptionBChange}
                    disabled={submitBtn}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2" className="form-label text-dark">
                  Opsi B
                </Form.Label>
                <Col sm="10">
                  <Form.Select
                    value={selectedValue}
                    onChange={handleQuestionAnswerChange}
                    disabled={submitBtn}
                  >
                    <option value="">-- Pilih --</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                  </Form.Select>
                </Col>
              </Form.Group>
              <div className="mt-2">
                <Button
                  className="btn3 fw-bold text-white"
                  type="submit"
                  disabled={submitBtn}
                >
                  Simpan
                </Button>
              </div>
            </Form>
            <DataTable columns={columns} data={questionData} />
          </div>
        </div>
      </div>
    </WrapperTeacher>
  );
};

export default QuestionDetailPage;
