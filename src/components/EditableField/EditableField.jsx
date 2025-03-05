// EditableField.jsx
import { useState } from "react";
import {
  Button,
  StructuredListCell,
  StructuredListRow,
  TextInput,
} from "@carbon/react";
import { Edit } from "@carbon/icons-react";
import "./EditableField.scss";

const EditableField = ({ label, value, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [isChanged, setIsChanged] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setTempValue(value);
    setIsChanged(false);
  };

  const handleSave = () => {
    onSave(tempValue);
    setIsEditing(false);
    setIsChanged(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempValue(value);
    setIsChanged(false);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setTempValue(newValue);
    setIsChanged(newValue !== value);
  };

  return (
    <StructuredListRow className="editable-field-row">
      <StructuredListCell className="label-cell" noWrap>
        {label}
      </StructuredListCell>
      <StructuredListCell className="value-cell">
        {isEditing ? (
          <div className="edit-container">
            <div className="edit-header">
              <span>Update your {label}</span>
            </div>
            <TextInput
              id={label.toLowerCase()}
              value={tempValue}
              onChange={handleChange}
              labelText={label}
              hideLabel
              className="edit-input"
            />
            <div className="button-container">
              <Button kind="secondary" onClick={handleCancel} size="md">
                Cancel
              </Button>
              <Button
                kind="primary"
                onClick={handleSave}
                size="md"
                disabled={!isChanged}
              >
                Update
              </Button>
            </div>
          </div>
        ) : (
          <div className="display-container">
            <span className="field-value">{value}</span>
            <Button
              kind="ghost"
              renderIcon={Edit}
              onClick={handleEdit}
              hasIconOnly
              tooltipPosition="bottom"
              iconDescription="Edit"
              size="sm"
            />
          </div>
        )}
      </StructuredListCell>
    </StructuredListRow>
  );
};

export default EditableField;
