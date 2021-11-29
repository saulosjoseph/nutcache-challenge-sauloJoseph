import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UseContext } from "../../data/infra/context";
import { FormModel } from "../../domain/entitys/form.model";

import { makeRemoteAddEmployee } from "../../data/factories/usecases";
import { makeFormValidation } from "../../validation/form-validation-factory";

import Form from "./form";

type Props = {
  onClose: any;
};

const Header: React.FC<Props> = ({ onClose }: Props) => {
  const initialFormState: FormModel = {
    isFormInvalid: true,
    name: "",
    nameError: "Required field",
    birth_date: "",
    birth_dateError: "Required field",
    gender: "",
    genderError: "Required field",
    email: "",
    emailError: "Required field",
    cpf: "",
    cpfError: "Required field",
    start_date: "",
    start_dateError: "Required field",
    team: "",
  };
  const [show, setShow] = useState(false);
  const [formData, setFormState] = useState<FormModel>(initialFormState);
  const [, setContext] = UseContext();

  const handleClose = () => {
    setFormState(initialFormState);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const action = () => {
    handleClose();
    setContext({ isLoading: true });
    makeRemoteAddEmployee()
      .add({
        name: formData.name,
        email: formData.email,
        birth_date: formData.birth_date,
        gender: formData.gender,
        cpf: formData.cpf,
        start_date: formData.start_date,
        team: formData.team,
      })
      .then(() => {
        onClose();
      })
      .catch((error: Error) => {
        setContext({ isLoading: false, mainError: error.message });
      });
  };

  return (
    <div>
      <div className="p-5 d-flex flex-row-reverse">
        <Button variant="primary" className="mr-1" onClick={handleShow}>
          Register
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register new employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            handleGoBack={action}
            validation={makeFormValidation()}
            formData={formData}
            setFormState={setFormState}
            textActionButton="Register"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Header;
