'use client';

import { useWizard } from 'react-use-wizard';
import * as Yup from 'yup';
import { useState } from 'react';
import Image from 'next/image';
import PackageDetailsModal from '../../Modal/PackageDetailsModal';
import SubmissionSuccess from './SubmissionSuccess';
import { submitForm } from '@/lib/services/formService';
import { MultiStepFormData } from '../types';

const validationSchema = Yup.object().shape({
  additionalRequirements: Yup.string().optional(),
  questions: Yup.string().optional(),
  agreementAccepted: Yup.string()
    .oneOf(['true'], 'You must accept the terms and conditions to proceed')
    .required('You must accept the terms and conditions to proceed')
});

interface Props {
  formData: MultiStepFormData;
  updateFormData: (data: Partial<MultiStepFormData>) => void;
}

const FinalNotes = ({ formData, updateFormData }: Props) => {
  const { previousStep, activeStep, stepCount } = useWizard();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      
      setIsSubmitting(true);
      const result = await submitForm(formData);
      
      if (result.success) {
        setIsSubmitted(true);
      } else {
        setErrors({ submit: 'Failed to submit form. Please try again.' });
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setErrors(validationErrors);
      } else {
        console.error('Form submission error:', error);
        setErrors({ submit: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  if (isSubmitted) {
    return <SubmissionSuccess formData={formData} />;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-300 to-red-300">
      <div className="container mx-auto min-h-screen grid place-items-center px-4">
        <div className="flex flex-col md:flex-row h-[1024px] w-full lg:w-[1400px] bg-white font-roboto shadow-2xl rounded-2xl overflow-hidden">
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8 px-20 flex flex-col h-full">
            <div className="flex-1 flex flex-col">
              <h2 className="text-2xl font-bold mb-2 pt-24 font-roboto">Your Project Is Almost Ready</h2>
              <p className="text-base font-medium text-gray-400 mb-6 max-w-[85%]">
              Your Vision is Taking Shape. Add any final thoughts or special requests. We’re excited to bring your project to life!
              </p>
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                <div className="flex-1 pt-8">
                  <div className="grid grid-cols-1 gap-8">
                    <div>
                      <label className="block text-xs font-bold mb-2">Additional Requirements</label>
                      <textarea
                        name="additionalRequirements"
                        value={formData.additionalRequirements}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                        placeholder="Any additional requirements or specifications for your website?"
                      />
                      {errors.additionalRequirements && (
                        <p className="text-red-500 text-sm mt-2">{errors.additionalRequirements}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-2">Questions</label>
                      <textarea
                        name="questions"
                        value={formData.questions}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                        placeholder="Do you have any questions about the process or next steps?"
                      />
                      {errors.questions && (
                        <p className="text-red-500 text-sm mt-2">{errors.questions}</p>
                      )}
                    </div>

                    <div className="mt-8">
                      <div className="flex items-center p-3 border-0 rounded-lg hover:bg-gray-50">
                        <input
                          type="checkbox"
                          id="agreementAccepted"
                          name="agreementAccepted"
                          checked={formData.agreementAccepted === 'true'}
                          onChange={(e) => updateFormData({ agreementAccepted: e.target.checked.toString() })}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="agreementAccepted" className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">
                          I understand to the terms and conditions of the{' '}
                          <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="text-blue-600 hover:text-blue-700 font-medium underline focus:outline-none"
                          >
                            Elevate10+ package
                          </button>
                          , including the outlined scope of work, pricing, timeline, and payment terms.
                        </label>
                      </div>
                      {errors.agreementAccepted && (
                        <p className="text-red-500 text-sm mt-2">{errors.agreementAccepted}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-8 grid grid-cols-2 items-center">
                  <div className="text-xs text-gray-500 font-noto-jp">
                    Step {activeStep + 1} of {stepCount}
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={previousStep}
                      className="w-fit bg-gray-100 text-gray-700 text-sm py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={` bg-black text-white text-sm py-2 px-4 rounded-lg transition-colors ${
                        isSubmitting 
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-gray-700 '
                      }`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Let\'s create!'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 relative overflow-hidden">
            {/* Background Image */}
            <Image
              src="/images/wbs_designpros_12986_different_paint_color_splash_--v_6.1_a05de3a2-31ab-4c7f-8ca7-e3ccf36580e0.png"
              alt="Final Notes Background"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-700/20"></div>
            {/* Content */}
            <div className="absolute inset-0 flex items-end justify-center p-12">
              <div className="text-white text-left mb-12">
                <h1 className="text-3xl font-normal text-white mb-8 font-roboto tracking-wide leading-relaxed">
                  &ldquo;Their attention to detail and willingness to understand our needs made all the difference. We couldn&apos;t be happier.&rdquo;
                </h1>
                <div className="flex items-center space-x-4">
                  <Image 
                    src="https://randomuser.me/api/portraits/men/92.jpg" 
                    alt="Testimonial author" 
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-white font-medium">David Wilson</p>
                    <p className="text-gray-300">Founder, TechStart</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PackageDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default FinalNotes;
