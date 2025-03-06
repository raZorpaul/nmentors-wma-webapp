// sections/HobbiesSection.jsx
import EditableField from "../EditableField/EditableField";

const HobbiesSection = ({ data = [], title, onUpdate }) => {
  const handleUpdateHobbies = (hobbiesString) => {
    const hobbiesArray = hobbiesString.split(",").map((hobby) => hobby.trim());
    if (hobbiesArray.length > 3) {
      alert("Maximum 3 hobbies allowed");
      return;
    }
    // Pass the hobbies field as an object
    onUpdate({ hobbies: hobbiesArray });
  };

  return (
    <>
      <h3>{title}</h3>
      <EditableField
        label="Hobbies (maximum 3)"
        value={Array.isArray(data) ? data.join(", ") : ""}
        onSave={handleUpdateHobbies}
      />
    </>
  );
};

export default HobbiesSection;