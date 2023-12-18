import React, {useState} from "react";
import { WrapperAdmin } from "../../layout/admin";
import { useAuthUser } from "react-auth-kit";
import { Col, Form, Row, Button } from "react-bootstrap";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

const Profile = () => {
  const auth = useAuthUser();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const updateProfile = async (userData) => {
    try {
        const id = auth().id;
        const response = await fetch(
          `${apiUrl}/users/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );
        
        const responseJson = await response.json();

        if (responseJson.success) {
            alert("Berhasil mengubah profil");
        } else {
            console.error("Failed to delete user");
        }
    } catch (error) {
            console.error("Error updating profile:", error);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        updateProfile(userData);
    };

  return (
    <WrapperAdmin>
      <div className="col-md-10">
        <div className="profile-right">
          <h1>Profil Saya</h1>
          <p>Perbarui Profil Anda </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2" className="form-label">
                Nama
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name"
                  defaultValue={auth().name}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2" className="form-label">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  defaultValue={auth().email}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
            <div className="mt-2 d-flex justify-content-center align-items-center">
              <Button className="btn3 fw-bold" type="submit">
                Simpan Perubahan
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </WrapperAdmin>
  );
};

export { Profile as AdminProfile };
