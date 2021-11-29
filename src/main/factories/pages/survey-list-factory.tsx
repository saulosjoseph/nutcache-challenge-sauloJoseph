import React from "react";
import { EmployeeList } from "../../../presentation/pages";
import { makeRemoteLoadEmployeeList } from "../usecases";

export const makeEmployeeList: React.FC = () => {
  return <EmployeeList loadEmployeeList={makeRemoteLoadEmployeeList()} />;
};
