// utils/educationTransformer.js

/**
 * Ensures education data is correctly formatted before sending to API
 * @param {Array|Object} educationData - The education data to format
 * @returns {Array} Properly formatted education array
 */
export const formatEducationData = (educationData) => {
  // Ensure we have an array
  const educationArray = Array.isArray(educationData)
    ? educationData
    : (educationData ? [educationData] : []);

  // Ensure each item has required fields with proper types
  return educationArray.map(item => ({
    level: item.level || "",
    institution: item.institution || "",
    location: item.location || "",
    start_year: typeof item.start_year === 'number' ? item.start_year : new Date().getFullYear(),
    end_year: typeof item.end_year === 'number' ? item.end_year : new Date().getFullYear(),
    degree: item.degree || "",
    certifications: Array.isArray(item.certifications) ? item.certifications : [],
    // Add any other required fields from your API
  }));
};

/**
 * Use this function before sending data to the API
 */
export const prepareProfileForUpdate = (profileData) => {
  return {
    ...profileData,
    education: formatEducationData(profileData.education)
  };
};