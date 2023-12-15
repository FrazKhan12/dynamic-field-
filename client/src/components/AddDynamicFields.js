import React, { useState, useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const DynamicInputFields = () => {
  const [inputFields, setInputFields] = useState([]);
  const [selectedType, setSelectedType] = useState("text");
  const [fieldLabel, setFieldLabel] = useState("");
  const [jsonData, setJsonData] = useState("");

  const handleAddField = () => {
    if (fieldLabel === "") {
      alert("Please enter a label for the input field.");
      return;
    }

    const newField = {
      type: selectedType,
      label: fieldLabel,
    };

    setInputFields([...inputFields, newField]);
    setFieldLabel("");
  };

  useEffect(() => {
    setJsonData(JSON.stringify(inputFields, null, 2));
  }, [inputFields]);
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
  return (
    <div className="max-w-2xl mx-auto my-8 flex">
      <div className="w-1/2 pr-4">
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

        <button
          className="bg-blue-500 text-white px-2 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          onClick={handleAddField}
        >
          <IoIosAddCircle />
        </button>
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
                        className="mt-4"
                      >
                        <div>
                          <label className="block mb-2">{field.label}</label>
                          <input
                            type={field.type}
                            placeholder={`Enter ${field.label}`}
                            className={`block ${
                              field.type === "checkbox" ? "" : "w-full"
                            } p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500`}
                          />
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

      {inputFields.length > 0 && (
        <div className="w-1/2">
          <h2 className="text-lg font-semibold mb-2">Generated JSON Data:</h2>
          <pre className="bg-gray-200 p-4 rounded-md overflow-x-auto">
            {jsonData}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DynamicInputFields;
