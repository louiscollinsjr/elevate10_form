'use client';

import { useWizard } from 'react-use-wizard';
import * as Yup from 'yup';
import { useState } from 'react';

const validationSchema = Yup.object().shape({
  pagesNeeded: Yup.array().min(1, 'Please select at least one page'),
  contentReadiness: Yup.string().required('Please select content readiness status'),
  hostingNeeds: Yup.string().required('Please specify your hosting needs'),
});

interface Props {
  formData: any;
  updateFormData: (data: any) => void;
}

const commonPages = [
  'Home',
  'About',
  'Services',
  'Products',
  'Portfolio',
  'Blog',
  'Contact',
  'FAQ',
  'Testimonials',
];

const ContentLogistics = ({ formData, updateFormData }: Props) => {
  const { nextStep, previousStep } = useWizard();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const stepData = {
      pagesNeeded: formData.pagesNeeded,
      contentReadiness: formData.contentReadiness,
      hostingNeeds: formData.hostingNeeds,
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

  const handlePageChange = (page: string) => {
    const currentPages = formData.pagesNeeded || [];
    const updatedPages = currentPages.includes(page)
      ? currentPages.filter((p: string) => p !== page)
      : [...currentPages, page];
    
    updateFormData({ pagesNeeded: updatedPages });
    if (errors.pagesNeeded) {
      setErrors(prev => ({ ...prev, pagesNeeded: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pages Needed (Select all that apply)
        </label>
        <div className="grid grid-cols-2 gap-4">
          {commonPages.map((page) => (
            <div key={page} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.pagesNeeded?.includes(page)}
                onChange={() => handlePageChange(page)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">{page}</label>
            </div>
          ))}
        </div>
        {errors.pagesNeeded && (
          <p className="mt-1 text-sm text-red-600">{errors.pagesNeeded}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Content Readiness
        </label>
        <select
          name="contentReadiness"
          value={formData.contentReadiness}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select content status</option>
          <option value="ready">Content is ready</option>
          <option value="in-progress">Content is being prepared</option>
          <option value="need-help">Need help with content creation</option>
          <option value="not-started">Haven't started content preparation</option>
        </select>
        {errors.contentReadiness && (
          <p className="mt-1 text-sm text-red-600">{errors.contentReadiness}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Hosting Needs
        </label>
        <select
          name="hostingNeeds"
          value={formData.hostingNeeds}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select hosting preference</option>
          <option value="need-both">Need domain and hosting</option>
          <option value="need-hosting">Have domain, need hosting</option>
          <option value="need-domain">Have hosting, need domain</option>
          <option value="have-both">Have both domain and hosting</option>
          <option value="not-sure">Not sure</option>
        </select>
        {errors.hostingNeeds && (
          <p className="mt-1 text-sm text-red-600">{errors.hostingNeeds}</p>
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

export default ContentLogistics;
