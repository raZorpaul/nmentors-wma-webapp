import { Button } from "@carbon/react";
import { Add } from "@carbon/icons-react";
import EditableEducationItem from "./SectionItems/EditableEducationItem.jsx";

const EducationSection = ({ data, onUpdate }) => {
  const handleAddEducation = () => {
    // Add a new education item with default values
    const newEducationItem = {
      level: "",
      institution: "",
      location: "",
      start_year: new Date().getFullYear(),
      end_year: new Date().getFullYear(),
      degree: "",
      certifications: [],
    };

    // Ensure `data` is an array and append the new item
    onUpdate({
      education: [...(data || []), newEducationItem], // Safely handle undefined or empty `data`
    });
  };

  const handleUpdateEducation = (index, updatedItem) => {
    // Update a specific education item
    const newData = [...data];
    newData[index] = updatedItem;

    // Send the updated education array
    onUpdate({
      education: newData,
    });
  };

  const handleRemoveEducation = (index) => {
    // Remove an education item by index
    const newData = data.filter((_, i) => i !== index);

    // Send the updated education array
    onUpdate({
      education: newData,
    });
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
