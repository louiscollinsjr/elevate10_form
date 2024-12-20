'use client';

import { useWizard } from 'react-use-wizard';
import * as Yup from 'yup';
import { useState } from 'react';

const validationSchema = Yup.object().shape({
  colorTheme: Yup.string().required('Please select a color theme'),
  stylePreferences: Yup.array().min(1, 'Please select at least one style preference'),
  avoidElements: Yup.string(),
});

interface Props {
  formData: any;
  updateFormData: (data: any) => void;
}

const styleOptions = [
  'Modern & Minimal',
  'Bold & Creative',
  'Professional & Corporate',
  'Playful & Fun',
  'Elegant & Luxurious',
  'Natural & Organic',
];

const DesignPreferences = ({ formData, updateFormData }: Props) => {
  const { nextStep, previousStep } = useWizard();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const stepData = {
      colorTheme: formData.colorTheme,
      stylePreferences: formData.stylePreferences,
      avoidElements: formData.avoidElements,
    };

    try {
      await validationSchema.validate(stepData, { abortEarly: false });
      nextStep();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleStyleChange = (style: string) => {
    const currentStyles = formData.stylePreferences || [];
    const updatedStyles = currentStyles.includes(style)
      ? currentStyles.filter((s: string) => s !== style)
      : [...currentStyles, style];
    
    updateFormData({ stylePreferences: updatedStyles });
    if (errors.stylePreferences) {
      setErrors(prev => ({ ...prev, stylePreferences: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Preferred Color Theme
        </label>
        <select
          name="colorTheme"
          value={formData.colorTheme}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select a color theme</option>
          <option value="light">Light & Bright</option>
          <option value="dark">Dark & Bold</option>
          <option value="neutral">Neutral & Professional</option>
          <option value="colorful">Colorful & Vibrant</option>
          <option value="monochrome">Monochrome</option>
        </select>
        {errors.colorTheme && (
          <p className="mt-1 text-sm text-red-600">{errors.colorTheme}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Style Preferences (Select all that apply)
        </label>
        <div className="grid grid-cols-2 gap-4">
          {styleOptions.map((style) => (
            <div key={style} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.stylePreferences?.includes(style)}
                onChange={() => handleStyleChange(style)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">{style}</label>
            </div>
          ))}
        </div>
        {errors.stylePreferences && (
          <p className="mt-1 text-sm text-red-600">{errors.stylePreferences}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Elements to Avoid (Optional)
        </label>
        <textarea
          name="avoidElements"
          value={formData.avoidElements}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="List any design elements you'd like to avoid..."
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={previousStep}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Previous
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next Step
        </button>
      </div>
    </form>
  );
};

export default DesignPreferences;
