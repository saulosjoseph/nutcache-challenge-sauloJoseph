/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import CardComponent from "../../components/card";
import { LoadEmployeeList } from "../../../domain/usecases";
import { makeRemoteDeleteEmployee } from "../../../data/factories/usecases";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../../components/header";
import { UseContext } from "../../../data/infra/context";
import Status from "../../components/status/status";

type Props = {
  loadEmployeeList: LoadEmployeeList;
};

const EmployeeList: React.FC<Props> = ({ loadEmployeeList }: Props) => {
  const [state, setState] = UseContext();

  const load = (): void => {
    setState({ isLoading: true });
    loadEmployeeList
      .loadAll()
      .then((employeeList) => {
        setState({ isLoading: false, employeeList });
      })
      .catch((e: Error) => {
        setState({
          isLoading: false,
          isError: true,
          mainError: e.message,
        });
      });
  };
  useEffect(() => {
    load();
  }, []);

  return (
    <div className="justify-content-md-center">
      <Status />
      <Header onClose={load} />
      <Container>
        <Row xs={1} md={2}>
          {state.employeeList.map(
            (employee) =>
              employee._id && (
                <Col key={employee._id}>
                  <CardComponent
                    employee={employee}
                    deletemployee={makeRemoteDeleteEmployee(employee._id)}
                    onClose={load}
                  />
                </Col>
              )
          )}
        </Row>
      </Container>
    </div>
  );
};

export default EmployeeList;
