import React from "react";

const DynamicField = ({ field, onContentChange, onKeyDown }) => {
  return (
    <div>
      <input
        type="text"
        value={field.label}
        onChange={(e) => onContentChange(e)}
        className="block w-full bg-transparent border-none focus:outline-none focus:border-blue-500"
      />

      <input
        required={field.require}
        type={field.type}
        placeholder={field.placeholder}
        className={`block ${
          field.type === "checkbox" ? "" : "w-full"
        } p-2 border border-gray-300 
        } rounded-md focus:outline-none focus:border-blue-500`}
        onKeyDown={field.type === "email" ? onKeyDown : null}
      />
    </div>
  );
};

export default DynamicField;
