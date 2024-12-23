"use client";

import { useWizard } from "react-use-wizard";
import * as Yup from "yup";
import { useState } from "react";
import Image from "next/image";
import { MultiStepFormData } from "../types";

const validationSchema = Yup.object().shape({
  designStyle: Yup.string().optional(),
  websiteExamples: Yup.string().optional(),
});

interface Props {
  formData: MultiStepFormData;
  updateFormData: (data: Partial<MultiStepFormData>) => void;
}

const DesignPreferences = ({ formData, updateFormData }: Props) => {
  const { nextStep, previousStep, activeStep, stepCount } = useWizard();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      nextStep();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-300 to-red-300">
      <div className="container mx-auto min-h-screen grid place-items-center px-4">
        <div className="flex flex-col md:flex-row h-[1024px] w-full lg:w-[1400px] bg-white font-roboto shadow-2xl rounded-2xl overflow-hidden">
          {/* Form Section */}
          <div className="w-full md:w-[42%] p-8 px-20 flex flex-col h-full">
            <div className="flex-1 flex flex-col">
              <h2 className="text-2xl font-bold mb-2 pt-24 font-roboto">
                Style & Examples
              </h2>
              <p className="text-base font-medium text-gray-400 mb-6 max-w-[85%]">
                Tell us about your design preferences to help us create designs
                that matches your style.
              </p>
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                <div className="flex-1 pt-8">
                  <div className="grid grid-cols-1 gap-8">
                    <div>
                      <label className="block text-xs font-bold mb-2">
                        Brand Guidelines/Preferences
                      </label>
                      <textarea
                        name="designStyle"
                        value={formData.designStyle}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                        placeholder="What colors or styles match your business? (e.g., modern, minimalist, bold, traditional)"
                      />
                      {errors.designStyle && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.designStyle}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-2">
                        Inspiration (Similar projects/companies you admire)
                      </label>
                      <textarea
                        name="websiteExamples"
                        value={formData.websiteExamples}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                        placeholder="Share links to websites you like or find inspiring"
                      />
                      {errors.websiteExamples && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.websiteExamples}
                        </p>
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
              src="/images/jesuscrisis_a_group_of_happy_tech_customers_using_orange_blue_a_913e2a1d-1a9f-4802-88a3-b31c12e7d0f3.png"
              alt="Design Background"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent"></div>
            {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-orange-700/0"></div> */}
            {/* Content */}
            <div className="absolute inset-0 flex items-end justify-center p-12">
              <div className="text-white text-center mb-2">
                {/* <h1 className="text-xs font-normal text-white leading-relaxed tracking-wide font-roboto shadow-none max-w-xl">
                Your brand&apos;s essence with designs crafted to perfection and attention to detail - atem.
                </h1> */}
                <h1 className="text-3xl max-w-xl font-normal text-white mb-8 font-roboto tracking-wide leading-relaxed">
                  &ldquo;The one thing that you have that nobody else has is
                  you. Your voice, your mind, , your story, your vision.&rdquo;
                </h1>

                {/* <div className="flex items-center space-x-4">
                  <Image 
                    src="https://randomuser.me/api/portraits/women/68.jpg" 
                    alt="Testimonial author" 
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                 <div>
                    <p className="text-white font-medium">Emily Rodriguez</p>
                    <p className="text-gray-300">Creative Director, Design Hub</p>
                  </div>  
                </div>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPreferences;
