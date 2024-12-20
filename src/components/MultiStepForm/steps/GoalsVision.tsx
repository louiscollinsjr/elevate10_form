'use client';

import { useWizard } from 'react-use-wizard';
import * as Yup from 'yup';
import { useState } from 'react';

const validationSchema = Yup.object().shape({
  goals: Yup.string().required('Please describe your goals'),
  targetAudience: Yup.string().required('Target audience is required'),
  preferredFeatures: Yup.string().required('Please list your preferred features'),
  inspirationWebsites: Yup.string(),
});

interface Props {
  formData: any;
  updateFormData: (data: any) => void;
}

const GoalsVision = ({ formData, updateFormData }: Props) => {
  const { nextStep, previousStep } = useWizard();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const stepData = {
      goals: formData.goals,
      targetAudience: formData.targetAudience,
      preferredFeatures: formData.preferredFeatures,
      inspirationWebsites: formData.inspirationWebsites,
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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          What are your main goals for this website?
        </label>
        <textarea
          name="goals"
          value={formData.goals}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g., Increase online sales, showcase portfolio, improve brand awareness..."
        />
        {errors.goals && (
          <p className="mt-1 text-sm text-red-600">{errors.goals}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Who is your target audience?
        </label>
        <textarea
          name="targetAudience"
          value={formData.targetAudience}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g., Small business owners, young professionals, tech enthusiasts..."
        />
        {errors.targetAudience && (
          <p className="mt-1 text-sm text-red-600">{errors.targetAudience}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          What features would you like to include?
        </label>
        <textarea
          name="preferredFeatures"
          value={formData.preferredFeatures}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g., Contact form, blog section, product catalog..."
        />
        {errors.preferredFeatures && (
          <p className="mt-1 text-sm text-red-600">{errors.preferredFeatures}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Any websites that inspire you? (Optional)
        </label>
        <textarea
          name="inspirationWebsites"
          value={formData.inspirationWebsites}
          onChange={handleChange}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="List website URLs that you like..."
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

export default GoalsVision;
