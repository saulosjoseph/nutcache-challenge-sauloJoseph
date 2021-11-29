import React from "react";
import { InitialStateModel } from "../../../domain/entitys";

const initialState: InitialStateModel = {
  employeeList: [],
  isLoading: false,
  isError: false,
  mainError: "",
};

// Global app context.
type StateT = typeof initialState;
type StateGetSetT = [StateT, React.Dispatch<React.SetStateAction<StateT>>];

const MyContext = React.createContext<StateGetSetT | undefined>(undefined);

type ContextProviderProps = {
  children: React.ReactNode;
};

function ContextProvider({ children }: ContextProviderProps) {
  const contextGetSet = React.useState(initialState);
  return (
    <MyContext.Provider value={contextGetSet}>{children}</MyContext.Provider>
  );
}

type SetPartialStateT = (newVals: Partial<StateT>) => void;
export type UseMyContextT = [StateT, SetPartialStateT];

function UseContext(): UseMyContextT {
  const [state, setState] = React.useContext(MyContext) as StateGetSetT;
  function setPartialState(newVals: Partial<StateT>) {
    setState({ ...state, ...newVals });
  }
  return [state, setPartialState];
}

export { ContextProvider, UseContext };
