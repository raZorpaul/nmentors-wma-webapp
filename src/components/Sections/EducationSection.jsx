// sections/EducationSection.jsx
import { Button } from "@carbon/react";
import { Add } from "@carbon/icons-react";
import EditableEducationItem from "./SectionItems/EditableEducationItem.jsx";

const EducationSection = ({ data, onUpdate }) => {
  const handleAddEducation = () => {
    onUpdate([
      ...data,
      {
        level: "",
        institution: "",
        location: "",
        start_year: new Date().getFullYear(),
        end_year: new Date().getFullYear(),
        degree: "",
        certifications: [],
      },
    ]);
  };

  const handleUpdateEducation = (index, updatedItem) => {
    const newData = [...data];
    newData[index] = updatedItem;
    onUpdate(newData);
  };

  const handleRemoveEducation = (index) => {
    const newData = data.filter((_, i) => i !== index);
    onUpdate(newData);
  };

  return (
    <>
      <h3>Education</h3>
      {data.map((item, index) => (
        <EditableEducationItem
          key={index}
          data={item}
          onUpdate={(updatedItem) => handleUpdateEducation(index, updatedItem)}
          onRemove={() => handleRemoveEducation(index)}
        />
      ))}
      <Button
        kind="ghost"
        renderIcon={Add}
        onClick={handleAddEducation}
        size="sm"
      >
        Add Education
      </Button>
    </>
  );
};

export default EducationSection;
