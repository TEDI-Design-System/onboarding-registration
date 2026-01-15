import { Dispatch, SetStateAction } from 'react';
import { FormData } from '../constants/formDefaults';

interface DynamicListItem {
  [key: string]: string;
}

interface UseDynamicListReturn<T extends DynamicListItem> {
  items: T[];
  addItem: (newItem: T) => void;
  removeItem: (index: number) => void;
  updateItem: (index: number, field: string, value: string) => void;
}

export const useDynamicList = <T extends DynamicListItem>(
  formData: FormData,
  setFormData: Dispatch<SetStateAction<FormData>>,
  listKey: keyof FormData
): UseDynamicListReturn<T> => {
  const addItem = (newItem: T): void => {
    setFormData(prev => ({
      ...prev,
      [listKey]: [...(prev[listKey] as T[]), newItem]
    }));
  };

  const removeItem = (index: number): void => {
    setFormData(prev => ({
      ...prev,
      [listKey]: (prev[listKey] as T[]).filter((_, i) => i !== index)
    }));
  };

  const updateItem = (index: number, field: string, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [listKey]: (prev[listKey] as T[]).map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  return {
    items: formData[listKey] as T[],
    addItem,
    removeItem,
    updateItem
  };
};
