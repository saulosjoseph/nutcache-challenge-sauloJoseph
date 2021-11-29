import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { EmployeeModel } from "../../domain/models";
import { DeleteEmployee } from "../../domain/usecases";
import { makeFormValidation } from "../../main/factories/validation";
import { makeRemoteEditEmployee } from "../../main/factories/usecases";
import { FormModel } from "../../domain/models/form.model";
import Form from "./form";
import { UseContext } from "../../infra/context";

type Props = {
  employee: EmployeeModel;
  deletemployee: DeleteEmployee;
  onClose: () => void;
};

const CardComponent: React.FC<Props> = ({
  employee,
  deletemployee,
  onClose,
}: Props) => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormState] = useState<FormModel>({
    isFormInvalid: true,
    ...employee,
  });
  const [, setContext] = UseContext();

  const editFormAction = () => {
    handleCloseEdit();
    setContext({ isLoading: true });
    makeRemoteEditEmployee()
      .edit({
        _id: employee._id,
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleRemove = () => {
    handleClose();
    setContext({ isLoading: true });
    if (!employee._id) {
      return;
    }
    deletemployee.delete(employee._id).then(() => {
      onClose();
    });
  };

  return (
    <div className="p-1">
      <Card style={{ width: "20rem" }}>
        <Card.Body>
          <Card.Title> {employee.name} </Card.Title>
          <Card.Subtitle className="mb-5 text-muted">
            {employee.team}
          </Card.Subtitle>

          <ListGroup variant="flush" className="mb-5">
            <ListGroup.Item>Gender: {employee.gender}</ListGroup.Item>
            <ListGroup.Item>Email: {employee.email}</ListGroup.Item>
            <ListGroup.Item>CPF: {employee.cpf}</ListGroup.Item>
            <ListGroup.Item>Start date: {employee.start_date}</ListGroup.Item>
            <ListGroup.Item>Birth date: {employee.birth_date}</ListGroup.Item>
          </ListGroup>

          <Card.Link href="#" onClick={handleShowEdit}>
            Edit
          </Card.Link>
          <Card.Link href="#" onClick={handleShow}>
            Remove
          </Card.Link>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove employee?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            handleGoBack={editFormAction}
            validation={makeFormValidation()}
            formData={formData}
            setFormState={setFormState}
            textActionButton="Edit"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CardComponent;
