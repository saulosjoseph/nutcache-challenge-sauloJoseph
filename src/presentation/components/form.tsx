import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { FormModel } from "../../domain/models/form.model";
import { Validation } from "../models/validation";
type Props = {
  validation: Validation;
  handleGoBack: () => void;
  formData: FormModel;
  setFormState: (params: FormModel) => void;
  textActionButton: string;
};

const Form: React.FC<Props> = ({
  validation,
  handleGoBack,
  formData,
  setFormState,
  textActionButton,
}: Props) => {
  const validate = (field: string): void => {
    const error = validation.validate(field, formData);
    let auxFormData: FormModel = JSON.parse(JSON.stringify(formData));
    auxFormData = {
      ...auxFormData,
      [`${field}Error`]: error,
    };
    setFormState({
      ...auxFormData,
      isFormInvalid:
        !!auxFormData.birth_dateError ||
        !!auxFormData.cpfError ||
        !!auxFormData.emailError ||
        !!auxFormData.genderError ||
        !!auxFormData.nameError ||
        !!auxFormData.start_dateError ||
        !!auxFormData.teamError,
      [`${field}Error`]: error,
    });
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormState({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeGender = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormState({ ...formData, gender: e.target.value });
  };

  const onChangeTeam = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormState({ ...formData, team: e.target.value });
  };

  useEffect(() => validate("name"), [formData.name]);
  useEffect(() => validate("email"), [formData.email]);
  useEffect(() => validate("birth_date"), [formData.birth_date]);
  useEffect(() => validate("gender"), [formData.gender]);
  useEffect(() => validate("team"), [formData.team]);
  useEffect(() => validate("cpf"), [formData.cpf]);
  useEffect(() => validate("start_date"), [formData.start_date]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    handleGoBack();
  };

  return (
    <div>
      <form data-testid="form" onSubmit={handleSubmit}>
        <div className="pb-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={onChange}
          />
          <span className="ml-3">
            {formData.nameError && formData.nameError}
          </span>
        </div>
        <div className="pb-3">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={onChange}
          />
          <span className="ml-3">
            {formData.emailError && formData.emailError}
          </span>
        </div>
        <div className="pb-3">
          <p className="my-0">Birth date</p>
          <input
            type="date"
            name="birth_date"
            placeholder="Birth date"
            value={formData.birth_date}
            onChange={onChange}
          />
          <span className="ml-3">
            {formData.birth_dateError && formData.birth_dateError}
          </span>
        </div>
        <div className="pb-3">
          <select value={formData.gender || "gender"} onChange={onChangeGender}>
            <option value="gender" disabled>
              Gender
            </option>
            <option value="M">M</option>
            <option value="F">F</option>
          </select>
          <span className="ml-3">
            {formData.genderError && formData.genderError}
          </span>
        </div>
        <div className="pb-3">
          <p className="my-0">Start date</p>
          <input
            type="date"
            name="start_date"
            placeholder="Start date"
            value={formData.start_date}
            onChange={onChange}
          />
          <span className="ml-3">
            {formData.start_dateError && formData.start_dateError}
          </span>
        </div>
        <div className="pb-3">
          <select value={formData.team || "team"} onChange={onChangeTeam}>
            <option value="team" disabled>
              Team
            </option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="mobile">Mobile</option>
          </select>
          <span className="ml-3">
            {formData.teamError && formData.teamError}
          </span>
        </div>
        <div className="pb-3">
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={onChange}
          />
          <span className="ml-3">{formData.cpfError && formData.cpfError}</span>
        </div>
        <Button type="submit" disabled={formData.isFormInvalid}>
          {textActionButton}
        </Button>
      </form>
    </div>
  );
};

export default Form;
