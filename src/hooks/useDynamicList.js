export const useDynamicList = (formData, setFormData, listKey) => {
  const addItem = (newItem) => {
    setFormData(prev => ({
      ...prev,
      [listKey]: [...prev[listKey], newItem]
    }));
  };

  const removeItem = (index) => {
    setFormData(prev => ({
      ...prev,
      [listKey]: prev[listKey].filter((_, i) => i !== index)
    }));
  };

  const updateItem = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [listKey]: prev[listKey].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  return {
    items: formData[listKey],
    addItem,
    removeItem,
    updateItem
  };
};
