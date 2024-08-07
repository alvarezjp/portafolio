import React from "react";
import "./styleForm.css";
import { useState } from "react";
import emailjs from "emailjs-com";

const Form = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const formSubmit = (event) => {
    event.preventDefault();
    alert("Su mensaje fue enviado con exito");
    const serviceId = process.env.SERVICE;
    const templateId = process.env.TEMPLATE;
    const userId = process.env.USER;
    emailjs.send(serviceId, templateId, inputValue, userId).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        window.location.reload();
      },
      (err) => {
        console.error("FAILED...", err);
      }
    );
  };

  const changeValue = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  return (
    <form className="formContact" autoComplete="off" onSubmit={formSubmit}>
      <h2 className="formTitle">Formulario de contacto</h2>
      <div className="boxInput">
        <label htmlFor="name" className="labelForm">
          Nombre
        </label>
        <input
          type="text"
          name="name"
          value={inputValue.name}
          placeholder="Nombre"
          className="formInput"
          onChange={changeValue}
          required
        />
      </div>
      <div className="boxInput">
        <label htmlFor="email" className="labelForm">
          Correo electrónico
        </label>
        <input
          type="email"
          name="email"
          value={inputValue.email}
          onChange={changeValue}
          placeholder="correo@mail.com"
          className="formInput"
          required
        />
      </div>
      <div className="boxInput">
        <label htmlFor="comment" className="labelForm">
          Comentario
        </label>
        <textarea
          name="comment"
          placeholder="Escribe aqui..."
          className="formInput formTextArea"
          value={inputValue.comment}
          onChange={changeValue}
          required></textarea>
      </div>
      <button type="submit" className="formButton" >
        ENVIAR
      </button>
    </form>
  );
};

export default Form;
