import React, { useState, useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdUpdate } from "react-icons/md";
import { IoDuplicate } from "react-icons/io5";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const DynamicInputFields = () => {
  const [inputFields, setInputFields] = useState([]);
  const [selectedType, setSelectedType] = useState("text");
  const [fieldLabel, setFieldLabel] = useState("");
  const [fieldPlaceholder, setFieldLabelPlaceholder] = useState("");
  const [jsonData, setJsonData] = useState("");
  const [indexed, setIndexed] = useState(null);
  const [validationType, setValidationType] = useState("none");
  const [required, setRequired] = useState(false);

  const handleAddField = () => {
    if (fieldLabel === "") {
      alert("Please enter a label for the input field.");
      return;
    }

    const newField = {
      type: selectedType,
      label: fieldLabel,
      placeholder: fieldPlaceholder,
      validate: validationType,
      require: required,
    };

    setInputFields([...inputFields, newField]);
    setFieldLabel("");
    setFieldLabelPlaceholder("");
  };

  const handleUpdateField = () => {
    if (indexed === null) {
      alert("Please add label");
    }

    const updatedFields = [...inputFields];
    updatedFields[indexed].type = selectedType;
    updatedFields[indexed].label = fieldLabel;
    updatedFields[indexed].placeholder = fieldPlaceholder;
    updatedFields[indexed].validate = validationType;
    updatedFields[indexed].require = required;

    setInputFields(updatedFields);
    setIndexed(null);
    setFieldLabel("");
  };

  const handleEdit = (index) => {
    setIndexed(index);
    setSelectedType(inputFields[index].type);
    setFieldLabel(inputFields[index].label);
    setValidationType(inputFields[index].validate);
  };

  const handleDelete = (index) => {
    const updatedFields = [...inputFields];
    updatedFields.splice(index, 1);
    setInputFields(updatedFields);
  };

  const handleClone = (index) => {
    const cloneFields = { ...inputFields[index] };
    setInputFields([...inputFields, cloneFields]);
  };

  const handleDragAndDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.draggableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderFields = [...inputFields];
      const fieldsSourceIndex = source.index;
      const fieldsDestinationIndex = destination.index;

      const [removedField] = reorderFields.splice(fieldsSourceIndex, 1);
      reorderFields.splice(fieldsDestinationIndex, 0, removedField);
      return setInputFields(reorderFields);
    }
  };

  const handleContentChange = (e, index) => {
    const updatedFields = [...inputFields];
    updatedFields[index].label = e.target.value;
    setInputFields(updatedFields);
  };
  useEffect(() => {
    setJsonData(JSON.stringify(inputFields, null, 2));
  }, [inputFields]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (isValidEmail(e.target.value)) {
        alert("Email is valid!");
      } else {
        alert("Email is not valid!");
      }
    }
  };

  return (
    <div className="w-full mx-auto my-8 flex justify-between">
      <div className=" w-full pr-4">
        <div className=" w-full gap-5 flex justify-evenly items-start">
          <div className="w-1/2">
            <label className="block mb-2">
              Select Input Type:
              <select
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="checkbox">Checkbox</option>
                <option value="email"> Email</option>
                <option value="date"> Date</option>
              </select>
            </label>
            <label className="block mb-2">
              Validation Type:
              <select
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={validationType}
                onChange={(e) => setValidationType(e.target.value)}
              >
                <option value="none">None</option>
                <option value="email">Email</option>
              </select>
            </label>
            <label className="block mb-2">
              Required:
              <select
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={required}
                onChange={(e) => setRequired(e.target.value)}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </label>

            <label className="block mb-2">
              Input Label:
              <input
                type="text"
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={fieldLabel}
                onChange={(e) => setFieldLabel(e.target.value)}
              />
            </label>

            <label className="block mb-2">
              Input placeholder:
              <input
                type="text"
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={fieldPlaceholder}
                onChange={(e) => setFieldLabelPlaceholder(e.target.value)}
              />
            </label>

            <button
              className="bg-blue-500 text-white px-2 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
              onClick={indexed === null ? handleAddField : handleUpdateField}
            >
              {indexed === null ? <IoIosAddCircle /> : <MdUpdate />}
            </button>
          </div>
          <div className="w-1/2 bg-gray-200 p-4 rounded-md overflow-x-auto">
            <h2 className="text-lg font-semibold mb-2">
              Generated Input Data:
            </h2>
            <DragDropContext onDragEnd={handleDragAndDrop}>
              <Droppable droppableId="ROOT" type="group">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {inputFields.map((field, index) => (
                      <Draggable
                        draggableId={`field-${index}`}
                        index={index}
                        key={`field-${index}`}
                      >
                        {(provided) => (
                          <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <div>
                              <input
                                type="text"
                                value={field.label}
                                onChange={(e) => handleContentChange(e, index)}
                                className="block w-full bg-transparent  border-none focus:outline-none focus:border-blue-500"
                              />

                              <input
                                required={field.require}
                                type={field.type}
                                placeholder={field.placeholder}
                                className={`block ${
                                  field.type === "checkbox" ? "" : "w-full"
                                } p-2 border ${
                                  isValidEmail
                                    ? "border-gray-300"
                                    : "border-red-600"
                                } rounded-md focus:outline-none focus:border-blue-500`}
                                onKeyDown={
                                  field.type === "email" ? handleKeyDown : null
                                }
                              />
                              <div className="flex gap-2 mt-2">
                                <button
                                  onClick={() => handleEdit(index)}
                                  className="bg-green-500 hover:bg-green-700 p-2 rounded-full text-white"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => handleClone(index)}
                                  className="bg-green-500 hover:bg-green-700 p-2 rounded-full text-white"
                                >
                                  <IoDuplicate />
                                </button>
                                <button
                                  onClick={() => handleDelete(index)}
                                  className="bg-red-500 hover:bg-red-700 p-2 rounded-full text-white"
                                >
                                  <MdDelete />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>

      <div className="w-1/2">
        <pre className="bg-gray-200 p-4 rounded-md overflow-x-auto">
          <h2 className="text-lg font-semibold mb-2">Generated JSON Data:</h2>
          {jsonData}
        </pre>
      </div>
    </div>
  );
};

export default DynamicInputFields;
