import React from "react";
import { EmployeeList } from ".";
import { makeRemoteLoadEmployeeList } from "../../data/factories/usecases";

export const makeEmployeeList: React.FC = () => {
  return <EmployeeList loadEmployeeList={makeRemoteLoadEmployeeList()} />;
};
