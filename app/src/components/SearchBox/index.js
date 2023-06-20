import React, { useState } from "react";
import { Button, Input, Form, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./SearchBox.css";

const Sign = ({ title, labels, inputs, submit, onSubmit }) => {
  const navigate = useNavigate();

  const handle_submit = async (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div>
      <Form className="sign-form" onSubmit={handle_submit}>
        <div>
          <h1>{title}</h1>
          <div className="inputs-container" onChange={handle_change}>
            {inputs &&
              inputs.map((input, index) => (
                <div key={index}>
                  <Label>{labels[index]}</Label>
                  <Input key={index} {...input} />
                </div>
              ))}
          </div>
          <Button className="mt-3" color="info" size="lg">
            {submit}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Sign;
