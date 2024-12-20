'use client';

import { useWizard } from 'react-use-wizard';
import * as Yup from 'yup';
import { useState } from 'react';
import Image from 'next/image';
import { PenNib, FileText, TwitterLogo, Sparkle, ImageSquare, Video } from '@phosphor-icons/react';
import { MultiStepFormData } from '../types';

const validationSchema = Yup.object().shape({
  contentTypes: Yup.string().optional(),
  otherContentType: Yup.string().optional(),
  needsContentHelp: Yup.string().optional(),
  specialRequirements: Yup.string().optional(),
});

interface Props {
  formData: MultiStepFormData;
  updateFormData: (data: Partial<MultiStepFormData>) => void;
}

const ContentLogistics = ({ formData, updateFormData }: Props) => {
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
          <div className="w-full md:w-1/2 p-8 px-20 flex flex-col h-full">
            <div className="flex-1 flex flex-col">
              <h2 className="text-2xl font-bold mb-2 pt-24 font-roboto">Content & Logistics</h2>
              <p className="text-base font-medium text-gray-400 mb-6 max-w-[85%]">
                Let us know about your content needs and any special requirements for your website.
              </p>
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                <div className="flex-1 pt-8">
                  <div className="grid grid-cols-1 gap-8">
                    <div className="mb-1">
                      <label className="block text-xs font-bold mb-4">What type of content do you need for your project?</label>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { name: 'Written content', icon: PenNib },
                          { name: 'Photos/Images', icon: ImageSquare },
                          { name: 'Videos', icon: Video },
                          { name: 'Logo design', icon: FileText },
                          { name: 'Social media', icon: TwitterLogo },
                          { name: 'Other', icon: Sparkle }
                        ].map(({ name, icon: Icon }) => (
                          <button
                            key={name}
                            type="button"
                            onClick={() => {
                              const currentTypes = formData.contentTypes ? formData.contentTypes.split(',') : [];
                              const newTypes = currentTypes.includes(name)
                                ? currentTypes.filter(t => t !== name)
                                : [...currentTypes, name];
                              updateFormData({ contentTypes: newTypes.join(',') });
                            }}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                              formData.contentTypes?.includes(name)
                                ? 'bg-blue-50 border-2 border-blue-500 text-blue-700'
                                : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-blue-50'
                            }`}
                          >
                            <Icon className="w-6 h-6 mb-2" weight={formData.contentTypes?.includes(name) ? "fill" : "regular"} />
                            <span className="text-sm font-medium">{name}</span>
                          </button>
                        ))}
                      </div>

                      {formData.contentTypes?.includes('Other') && (
                        <div className="mt-4">
                          <input
                            type="text"
                            name="otherContentType"
                            value={formData.otherContentType || ''}
                            onChange={handleChange}
                            placeholder="Please specify other services needed"
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center p-3 border-0 rounded-lg hover:bg-gray-50">
                        <input
                          type="checkbox"
                          id="needsContentHelp"
                          name="needsContentHelp"
                          checked={formData.needsContentHelp === 'true'}
                          onChange={(e) => updateFormData({ needsContentHelp: e.target.checked.toString() })}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="needsContentHelp" className="ml-3 text-xs font-medium text-gray-700 cursor-pointer">
                          I need help with creating content
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-2">Special Requirements</label>
                      <textarea
                        name="specialRequirements"
                        value={formData.specialRequirements}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                        placeholder="Any special features or requirements for your website? (e.g., multilingual support, accessibility needs)"
                      />
                      {errors.specialRequirements && (
                        <p className="text-red-500 text-sm mt-2">{errors.specialRequirements}</p>
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
          <div className="w-full md:w-1/2 relative overflow-hidden">
            {/* Background Image */}
            <Image
              src="/images/wbs_designpros_12986_different_paint_color_splash_--v_6.1_a05de3a2-31ab-4c7f-8ca7-e3ccf36580e0.png"
              alt="Content Background"
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
                  &ldquo;Their content strategy transformed our website into a powerful marketing tool. The results speak for themselves.&rdquo;
                </h1>
                <div className="flex items-center space-x-4">
                  <Image 
                    src="https://randomuser.me/api/portraits/men/45.jpg" 
                    alt="Testimonial author" 
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-white font-medium">Alex Thompson</p>
                    <p className="text-gray-300">Marketing Director, Growth Co</p>
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

export default ContentLogistics;
