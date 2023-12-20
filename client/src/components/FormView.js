// FormPreview.js
import React, { useState } from "react";
import { useSelector } from "react-redux";

const FormPreview = () => {
  const { inputs } = useSelector((state) => state.inputs);
  const [values, setValues] = useState();
  console.log(inputs);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (values === undefined || values === null) {
      alert("there are no fields to fill");
    } else {
      console.log(values);
    }
  };
  const handleChange = (label, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [label]: value,
    }));
  };
  return (
    <div className="container mx-auto w-full">
      <h2>Form Preview</h2>
      <form onSubmit={handleSubmit}>
        {inputs.map((field, index) => (
          <div key={index}>
            <label className="block my-2  bg-transparent border-none focus:outline-none focus:border-blue-500">
              {field.label}
            </label>
            <input
              onChange={(e) => handleChange(field.label, e.target.value)}
              value={values?.value}
              className={` ${
                field.type === "checkbox" ? "" : "w-full"
              } p-2 border border-gray-300 
        } rounded-md focus:outline-none focus:border-blue-500`}
              type={field.type}
              placeholder={field.placeholder}
              required={field.require}
            />
          </div>
        ))}
        <button
          className="p-2 bg-blue-500 text-white border rounded mt-3"
          type="submit"
        >
          {" "}
          Submit{" "}
        </button>
      </form>
    </div>
  );
};

export default FormPreview;
