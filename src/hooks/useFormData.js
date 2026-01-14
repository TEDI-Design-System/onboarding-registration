import { useState } from 'react';
import { INITIAL_FORM_DATA, INITIAL_ERRORS } from '../constants/formDefaults';

export const useFormData = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  const handleChange = (name) => (value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors(INITIAL_ERRORS);
  };

  const validateStep2 = () => {
    const newErrors = {
      projectName: !formData.projectName.trim(),
      client: !formData.client.trim(),
      contractor: !formData.contractor.trim(),
      projectManager: !formData.projectManager.trim()
    };

    setErrors(prev => ({ ...prev, ...newErrors }));
    return !Object.values(newErrors).some(hasError => hasError);
  };

  return {
    formData,
    errors,
    handleChange,
    resetForm,
    validateStep2,
    setFormData,
    setErrors
  };
};
