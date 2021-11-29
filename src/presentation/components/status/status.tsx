import "./status-styles.scss";

import React, { useEffect } from "react";
import { Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import { UseContext } from "../../../data/infra/context";

const Status: React.FC = () => {
  const [state] = UseContext();
  useEffect(() => {}, [state.isLoading, state.isError]);
  return (
    <div>
      <Modal
        animation={false}
        backdrop="static"
        show={state.isLoading || state.isError}
        fullscreen={true}
        dialogClassName="main-modal"
        centered
      >
        <Modal.Body>
          <Container>
            <Row className="justify-content-md-center">
              <Col md="auto">
                {state.isLoading && <Spinner animation="border" />}

                {state.isError && <p>{state.mainError}</p>}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Status;
