'use client';

import { useWizard } from 'react-use-wizard';
import * as Yup from 'yup';
import { useState } from 'react';

const validationSchema = Yup.object().shape({
  deadline: Yup.string().required('Please specify your desired timeline'),
  budget: Yup.string().required('Please select a budget range'),
  maintenanceOption: Yup.string().required('Please select a maintenance option'),
});

interface Props {
  formData: any;
  updateFormData: (data: any) => void;
}

const BudgetTimeline = ({ formData, updateFormData }: Props) => {
  const { nextStep, previousStep } = useWizard();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const stepData = {
      deadline: formData.deadline,
      budget: formData.budget,
      maintenanceOption: formData.maintenanceOption,
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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
          Desired Timeline
        </label>
        <select
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select timeline</option>
          <option value="1-month">Within 1 month</option>
          <option value="2-3-months">2-3 months</option>
          <option value="3-6-months">3-6 months</option>
          <option value="6-plus-months">6+ months</option>
          <option value="flexible">Flexible</option>
        </select>
        {errors.deadline && (
          <p className="mt-1 text-sm text-red-600">{errors.deadline}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Budget Range
        </label>
        <select
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select budget range</option>
          <option value="under-5k">Under $5,000</option>
          <option value="5k-10k">$5,000 - $10,000</option>
          <option value="10k-20k">$10,000 - $20,000</option>
          <option value="20k-plus">$20,000+</option>
          <option value="not-sure">Not sure / Need consultation</option>
        </select>
        {errors.budget && (
          <p className="mt-1 text-sm text-red-600">{errors.budget}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Maintenance Plan
        </label>
        <select
          name="maintenanceOption"
          value={formData.maintenanceOption}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select maintenance option</option>
          <option value="monthly">Monthly maintenance plan</option>
          <option value="quarterly">Quarterly maintenance</option>
          <option value="as-needed">As-needed maintenance</option>
          <option value="none">No maintenance needed</option>
          <option value="discuss">Need to discuss options</option>
        </select>
        {errors.maintenanceOption && (
          <p className="mt-1 text-sm text-red-600">{errors.maintenanceOption}</p>
        )}
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

export default BudgetTimeline;
