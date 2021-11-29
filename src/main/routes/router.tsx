import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { EmployeeList } from "../../presentation/pages";
import { makeRemoteLoadEmployeeList } from "../factories/usecases/remote-load-employee-list-factory";
import { ContextProvider } from "../../infra/context";

const Router: React.FC = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <EmployeeList loadEmployeeList={makeRemoteLoadEmployeeList()} />
            }
          />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
};

export default Router;
