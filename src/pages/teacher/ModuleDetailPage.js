import React, { useState, useEffect, useCallback } from "react";
import { WrapperTeacher } from "../../layout/teacher";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import { Col, Form, Row, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import '../../styles/Quill.css'

const ModuleDetailPage = () => {
  const [moduleData, setModuleData] = useState([]);
  const [editorHtml, setEditorHtml] = useState([]);
  const [moduleName, setModuleName] = useState([]);
  const [methodName, setMethodName] = useState("");
  const [moduleId, setModuleId] = useState([]);
  const { id } = useParams(); 

  const fetchModules = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/modules/course/${id}`
      );
      const data = await response.json();
      setModuleData(data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchModules();
    setMethodName("POST");
    // eslint-disable-next-line
  }, []);

  const handleDescriptionChange = (event) => {
    setEditorHtml(event);
  };

  const handleNameChange = (event) => {
    setModuleName(event.target.value);
  };

   const createModule = async (inputData) => {
     try {
       const response = await fetch(`http://localhost:3000/api/v1/modules`, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(inputData),
       });

       const responseJson = await response.json();
       if (responseJson.success) {
         alert("Berhasil menambahkan modul");
         
         setEditorHtml("");
         setModuleName("");

         fetchModules();
       } else {
         console.error("Failed to delete user");
       }
     } catch (error) {
       console.error("Error creating module:", error);
     }
   };

   const updateModule = async (inputData) => {
     try {
       const response = await fetch(`http://localhost:3000/api/v1/modules/${moduleId}`, {
         method: "PUT",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(inputData),
       });

       const responseJson = await response.json();
       if (responseJson.success) {
         alert("Berhasil mengedit modul");

         setMethodName("POST");
         setModuleName("");
         setEditorHtml("");
         setModuleId("");

         fetchModules();
       } else {
         console.error("Failed to delete user");
       }
     } catch (error) {
       console.error("Error updating module:", error);
     }
   };

   const deleteModule = async (id) => {
     try {
       const response = await fetch(
         `http://localhost:3000/api/v1/modules/${id}`,
         {
           method: "DELETE",
         }
       );

       const responseJson = await response.json();
       if (responseJson.success) {
         fetchModules();
       } else {
         console.error("Failed to delete user");
       }
     } catch (error) {
       console.error("Error deleting user:", error);
     }
   };

  const columns = [
    {
      name: "Nama Modul",
      selector: (row) => row.moduleName,
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
         <button
          onClick={handleButtonDeleteClick}
          id={row.id}
          className="btn bg-danger text-white"
        >
          Hapus
        </button>
        </>
      ),
    },
  ];

  const handleButtonEditClick = async (event) => {
    const itemId = parseInt(event.target.id);
    let data = moduleData.find((item) => item.id === itemId);

    setMethodName("PUT");
    setModuleName(data.moduleName);
    setEditorHtml(data.content)
    setModuleId(data.id);
  };

  const handleButtonDeleteClick = async (event) => {
    const result = window.confirm("Apakah yakin ingin menghapus data ini?");
    if (result) {
      let moduleId = event.target.id;
      await deleteModule(moduleId);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    let inputData = {
      moduleName: moduleName,
      content: editorHtml,
      courseId: id,
    };

    if(methodName === "POST"){
      await createModule(inputData);
    } else {
      await updateModule(inputData);
    }
  };

  const modulesQuill = {
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
            <h2>Data Modul</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} className="mb-3">
                <Form.Control type="hidden" name="courseId" value={id}/>
                <Form.Label column sm="2" className="form-label text-dark">
                  Nama Modul
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={moduleName}
                    onChange={handleNameChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2" className="form-label text-dark">
                  Konten
                </Form.Label>
                <Col sm="10">
                  <ReactQuill
                    theme="snow"
                    modules={modulesQuill}
                    formats={formatsQuill}
                    value={editorHtml}
                    onChange={handleDescriptionChange}
                  />
                </Col>
              </Form.Group>
              <div className="mt-2">
                <Button className="btn3 fw-bold text-white" type="submit">
                  Simpan
                </Button>
              </div>
            </Form>
            <DataTable columns={columns} data={moduleData} />
          </div>
        </div>
      </div>
    </WrapperTeacher>
  );
};

export default ModuleDetailPage;
