'use client';

import { useWizard } from 'react-use-wizard';
import * as Yup from 'yup';
import { useState } from 'react';
import Image from 'next/image';

interface FormData {
  projectGoals: string;
  targetAudience: string;
  uniqueSellingPoints: string;
  [key: string]: string;
}

interface Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

interface FormErrors {
  [key: string]: string | undefined;
  projectGoals?: string;
  targetAudience?: string;
  uniqueSellingPoints?: string;
}

const validationSchema = Yup.object().shape({
  projectGoals: Yup.string().optional(),
  targetAudience: Yup.string().optional(),
  uniqueSellingPoints: Yup.string().optional(),
});

const GoalsVision: React.FC<Props> = ({ formData, updateFormData }) => {
  const { nextStep, previousStep, activeStep, stepCount } = useWizard();
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      nextStep();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: FormErrors = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-300 to-red-300">
      <div className="container mx-auto min-h-screen grid place-items-center px-4">
        <div className="flex flex-col md:flex-row h-[1024px] w-full lg:w-[1400px] bg-white font-roboto shadow-2xl rounded-2xl overflow-hidden">
          {/* Form Section */}
          <div className="w-full md:w-[42%] p-8 px-20 flex flex-col h-full">
            <div className="flex-1 flex flex-col">
              <h2 className="text-2xl font-bold mb-2 pt-24 font-roboto">Project Goals and Vision</h2>
              <p className="text-base font-medium text-gray-400 mb-6 max-w-[85%]">
              Tell us about what you want to achieve.
              </p>
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                <div className="flex-1 pt-8">
                  <div className="grid grid-cols-1 gap-8">
                    <div>
                      <label className="block text-xs font-bold mb-2">Project Goals</label>
                      <textarea
                        name="projectGoals"
                        value={formData.projectGoals}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                        placeholder="What are the main objectives you want to achieve with your project? What problems do you need to solve?"
                      />
                      {errors.projectGoals && (
                        <p className="text-red-500 text-sm mt-2">{errors.projectGoals}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-2">Who are your main customers?</label>
                      <textarea
                        name="targetAudience"
                        value={formData.targetAudience}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                        placeholder="Who is your target audience?Describe your ideal customers or website visitors."
                      />
                      {errors.targetAudience && (
                        <p className="text-red-500 text-sm mt-2">{errors.targetAudience}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-2">Unique Selling Points</label>
                      <textarea
                        name="uniqueSellingPoints"
                        value={formData.uniqueSellingPoints}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                        placeholder="What makes your business unique? What sets you apart from competitors?"
                      />
                      {errors.uniqueSellingPoints && (
                        <p className="text-red-500 text-sm mt-2">{errors.uniqueSellingPoints}</p>
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
                      className="w-fit bg-black text-white text-sm py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-[58%] relative overflow-hidden">
            {/* Background Image */}
            <Image
              src="/images/faqmarketing1023_russian_woman_at_laptop_approximately_45-50_ye_115ad605-e8aa-4c8c-a72c-88948008c73b.png"
              alt="Vision Background"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-700/20"></div> */}
            {/* Content */}
            <div className="absolute inset-0 flex items-end justify-left p-12">
              <div className="text-white text-left mb-12">
                <h1 className="text-3xl max-w-xl font-normal text-white mb-8 font-roboto tracking-wide leading-relaxed">
                  &ldquo;The one thing that you have that nobody else has is you. Your voice, your mind, , your story, your vision.&rdquo;
                </h1>
                <div className="flex items-center space-x-4">
                  {/* <Image 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Testimonial author" 
                    width={48}
                    height={48}
                    className="rounded-full"
                  /> */}
                  <div>
                    <p className="text-white font-medium">Neil Gaiman</p>
                    <p className="text-gray-300">Writer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsVision;
