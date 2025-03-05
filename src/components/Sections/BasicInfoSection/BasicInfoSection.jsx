// sections/BasicInfoSection.jsx
import EditableField from "../../EditableField/EditableField.jsx";
const BasicInfoSection = ({ data, onUpdate }) => {
  const handleFieldUpdate = (field, value) => {
    onUpdate({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className={'basic-info-section'}>
      <h3>Basic Information</h3>
      <EditableField
        label="Name"
        value={data.name}
        onSave={(value) => handleFieldUpdate("name", value)}
      />
      <EditableField
        label="Email"
        value={data.email}
        onSave={(value) => handleFieldUpdate("email", value)}
      />
      <EditableField
        label="Phone"
        value={data.phone}
        onSave={(value) => handleFieldUpdate("phone", value)}
      />
      <EditableField
        label="Country"
        value={data.country}
        onSave={(value) => handleFieldUpdate("country", value)}
      />
      {data.country === "Tanzania" ? (
        <EditableField
          label="NIDA"
          value={data.nida}
          onSave={(value) => handleFieldUpdate("nida", value)}
        />
      ) : (
        <EditableField
          label="Passport Number"
          value={data.passport_no}
          onSave={(value) => handleFieldUpdate("passport_no", value)}
        />
      )}
    </div>
  );
};

export default BasicInfoSection;
