import { useState, Dispatch, SetStateAction } from 'react';
import { INITIAL_FORM_DATA, INITIAL_ERRORS, FormData, FormErrors } from '../constants/formDefaults';

interface UseFormDataReturn {
  formData: FormData;
  errors: FormErrors;
  handleChange: (name: keyof FormData) => (value: string) => void;
  resetForm: () => void;
  validateStep2: () => boolean;
  setFormData: Dispatch<SetStateAction<FormData>>;
  setErrors: Dispatch<SetStateAction<FormErrors>>;
}

export const useFormData = (): UseFormDataReturn => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>(INITIAL_ERRORS);

  const handleChange = (name: keyof FormData) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name in errors) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const resetForm = (): void => {
    setFormData(INITIAL_FORM_DATA);
    setErrors(INITIAL_ERRORS);
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {
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
