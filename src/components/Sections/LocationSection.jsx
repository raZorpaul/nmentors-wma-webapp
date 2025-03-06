import EditableField from "../EditableField/EditableField";

const LocationSection = ({ title, data, onUpdate, parentKey }) => {
  const handleFieldUpdate = (field, value) => {
    // Send the update with the parent key (e.g., location_of_residence or location_of_work)
    onUpdate({
      [parentKey]: {
        ...data, // Keep the existing data intact
        [field]: value, // Update only the specific field
      },
    });
  };

  return (
    <div>
      <h3>{title}</h3>
      <EditableField
        label="City"
        value={data.city || ""}
        onSave={(value) => handleFieldUpdate("city", value)}
      />
      {data.country === "Tanzania" && (
        <>
          <EditableField
            label="State"
            value={data.state || ""}
            onSave={(value) => handleFieldUpdate("state", value)}
          />
          <EditableField
            label="District"
            value={data.district || ""}
            onSave={(value) => handleFieldUpdate("district", value)}
          />
          <EditableField
            label="Ward"
            value={data.ward || ""}
            onSave={(value) => handleFieldUpdate("ward", value)}
          />
          <EditableField
            label="Street"
            value={data.street || ""}
            onSave={(value) => handleFieldUpdate("street", value)}
          />
        </>
      )}
    </div>
  );
};

export default LocationSection;
