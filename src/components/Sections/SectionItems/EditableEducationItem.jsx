// components/EditableEducationItem.jsx
import { useState } from "react";
import {
  Button,
  Select,
  SelectItem,
  NumberInput,
  TextInput,
} from "@carbon/react";
import { TrashCan, Edit } from "@carbon/icons-react";

const EDUCATION_LEVELS = [
  "Middle School",
  "High School",
  "Undergraduate",
  "Postgraduate",
  "PhD",
  "Certification",
];

const EditableEducationItem = ({ data, onUpdate, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(data);

  const handleSave = () => {
    onUpdate(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(data);
    setIsEditing(false);
  };

  return (
    <div className="education-item">
      {isEditing ? (
        <>
          <Select
            id="level"
            labelText="Level"
            value={tempData.level}
            onChange={(e) =>
              setTempData({ ...tempData, level: e.target.value })
            }
          >
            {EDUCATION_LEVELS.map((level) => (
              <SelectItem key={level} value={level} text={level} />
            ))}
          </Select>
          <TextInput
            id="institution"
            labelText="Institution"
            value={tempData.institution}
            onChange={(e) =>
              setTempData({ ...tempData, institution: e.target.value })
            }
          />
          <TextInput
            id="location"
            labelText="Location"
            value={tempData.location}
            onChange={(e) =>
              setTempData({ ...tempData, location: e.target.value })
            }
          />
          <NumberInput
            id="start-year"
            label="Start Year"
            value={tempData.start_year}
            onChange={(e) =>
              setTempData({ ...tempData, start_year: parseInt(e.target.value) })
            }
          />
          <NumberInput
            id="end-year"
            label="End Year"
            value={tempData.end_year}
            onChange={(e) =>
              setTempData({ ...tempData, end_year: parseInt(e.target.value) })
            }
          />
          {["Undergraduate", "Postgraduate", "PhD"].includes(tempData.level) && (
            <TextInput
              id="degree"
              labelText="Degree"
              value={tempData.degree}
              onChange={(e) =>
                setTempData({ ...tempData, degree: e.target.value })
              }
            />
          )}
          <div>
            <Button kind="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </>
      ) : (
        <>
          <div>
            <h4>{data.level}</h4>
            <p>{data.institution}</p>
            <p>{data.location}</p>
            <p>
              {data.start_year} - {data.end_year}
            </p>
            {data.degree && <p>{data.degree}</p>}
          </div>
          <div>
            <Button
              kind="ghost"
              renderIcon={Edit}
              onClick={() => setIsEditing(true)}
              hasIconOnly
              tooltipPosition="bottom"
              iconDescription="Edit"
              size="sm"
            />
            <Button
              kind="danger"
              renderIcon={TrashCan}
              onClick={onRemove}
              hasIconOnly
              tooltipPosition="bottom"
              iconDescription="Remove"
              size="sm"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default EditableEducationItem;
