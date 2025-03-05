// sections/LocationSection.jsx
import EditableField from "../EditableField/EditableField";

const LocationSection = ({ title, data, onUpdate }) => {
  const handleFieldUpdate = (field, value) => {
    onUpdate({
      ...data,
      [field]: value,
    });
  };

  return (
    <div>
      <h3>{title}</h3>
      <EditableField
        label="City"
        value={data.city}
        onSave={(value) => handleFieldUpdate("city", value)}
      />
      {data.country === "Tanzania" && (
        <>
          <EditableField
            label="State"
            value={data.state}
            onSave={(value) => handleFieldUpdate("state", value)}
          />
          <EditableField
            label="District"
            value={data.district}
            onSave={(value) => handleFieldUpdate("district", value)}
          />
          <EditableField
            label="Ward"
            value={data.ward}
            onSave={(value) => handleFieldUpdate("ward", value)}
          />
          <EditableField
            label="Street"
            value={data.street}
            onSave={(value) => handleFieldUpdate("street", value)}
          />
        </>
      )}
    </div>
  );
};

export default LocationSection;
