"use client";
import React, { useState } from "react";
import Image from "next/image";

import { useWizard } from "react-use-wizard";
import * as Yup from "yup";

import { MultiStepFormData } from '../types';

interface Props {
  formData: MultiStepFormData;
  updateFormData: (data: Partial<MultiStepFormData>) => void;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  jobTitle?: string;
  businessName?: string;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Required.')
    .min(2, 'First name must be at least 2 characters'),
  lastName: Yup.string()
    .required('Please enter your last name')
    .min(2, 'Last name must be at least 2 characters'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Please enter your email address'),
  phone: Yup.string()
    .optional()
    .matches(/^[0-9+\-\s()]*$/, 'Please enter a valid phone number'),
  jobTitle: Yup.string().optional(),
  businessName: Yup.string().optional(),
});

const ContactDetails: React.FC<Props> = ({ formData, updateFormData }) => {
  const { nextStep, activeStep, stepCount } = useWizard();
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({}); // Clear all errors
      nextStep(); // Move to the next step
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: FormErrors = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path as keyof FormErrors] = error.message;
          }
        });
        setErrors(validationErrors);
        console.log('Validation errors:', validationErrors); // For debugging
      }
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    updateFormData({ [name]: value });

    // Clear the specific error
    setErrors(prev => ({ ...prev, [name]: "" }));

    // Validate just this field
    try {
      await validationSchema.validateAt(name, updatedData);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setErrors(prev => ({ ...prev, [name]: err.message }));
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-300 to-red-300">
      <div className="container mx-auto min-h-screen grid place-items-center px-4">
        <div className="flex flex-col md:flex-row h-[1024px] w-full lg:w-[1400px] bg-white font-roboto shadow-2xl rounded-2xl overflow-hidden">
          {/* Form Section */}
          <div className="w-full md:w-[42%] p-8 px-20 flex flex-col h-full">
            <div className="flex-1 flex flex-col">
              <h2 className="text-2xl font-bold mb-2 pt-24 font-roboto">
                Let&apos;s work together
              </h2>
              <p className="text-base font-medium text-gray-400 mb-6 max-w-[85%]">
              We help businesses grow and stand out in the market. Our team will work with you to bring your ideas to life.
              </p>
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                <div className="flex-1 pt-8">
                  <div className="grid grid-cols-2 gap-6 gap-y-8">
                    <div>
                      <label className="block text-xs font-bold mb-2">
                        First name*
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="First name"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-2">
                        Last name*
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Last name"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.lastName}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <label className="block text-xs font-bold mb-2">
                        Email*
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Email address"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <label className="block text-xs font-bold mb-2">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="+1 (555) 000-0000"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <label className="block text-xs font-bold mb-2">
                        Job Title / Role
                      </label>
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className="w-full p-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="What is your role in the organization?"
                      />
                      {errors.jobTitle && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.jobTitle}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <label className="block text-xs font-bold mb-2">
                        Business name
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        className="w-full p-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your business name"
                      />
                      {errors.businessName && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.businessName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-8 grid grid-cols-2 items-center">
                  <div className="text-xs text-gray-500 font-noto-jp">
                    Step {activeStep + 1} of {stepCount}
                  </div>
                  <div className="flex justify-end">
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
              src="/images/wbs_designpros_12986_different_paint_color_splash_--v_6.1_a05de3a2-31ab-4c7f-8ca7-e3ccf36580e0.png"
              alt="Office Meeting"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-700/20"></div>
            {/* Content */}
            <div className="absolute inset-0 flex items-end justify-center p-12">
              <div className="text-white text-left mb-12">
                <h1 className="text-4xl font-normal text-white mb-2 font-roboto tracking-normal leading-relaxed w-[80%]">
                  Introducing <b>Elevate10+</b> by atem.
                </h1>
                <p className="text-base">
                  Elevate10+ by atem., is the perfect package for businesses -
                  ready to grow their online presence.
                </p>
                {/* Why choose Elevate10+? */}
                <div className="grid grid-cols-3 gap-8 mt-8 text-sm">
                  <div>
                    <h3 className="font-medium text-white mb-2">
                      Why Choose Elevate10+?
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      {/* list-disc list-decimal */}
                      <li>
                        Affordable and transparent pricing (€450 for 10
                        development hours)
                      </li>
                      <li>Fast delivery in just 2–3 working weeks</li>
                      <li>
                        Flexibility to add extra hours if needed (€50/hour)
                      </li>
                    </ul>

                    <h3 className="font-medium text-white my-2 mt-4">Partners</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="text-lg text-yellow-400">
                        Actias<b>Luna</b>{" "}
                        <span className="text-white underline text-xs">
                          www.actiasluna.eu
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-2">
                      Monthly Maintenance
                    </h3>
                    <p className="text-gray-300">
                      Plus, with our monthly maintenance plan (€30/month), your
                      website stays fresh and secure, giving you peace of mind
                      to focus on what you do best.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-2 flex items-center gap-0">
                      Our Services
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>Brand Strategy</li>
                      <li>Website Development</li>
                      <li>Marketing Assets</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-center space-x-4 pt-12">
                  {/* <Image
                    src="/images/signature1.png"
                    alt="Testimonial author"
                    width={348}
                    height={48}
                    className="rounded-full"
                  /> */}
                  <div>
                    <p className="text-white font-medium">Louis Collins</p>
                    <p className="text-gray-300 text-xs">Developer</p>
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

export default ContactDetails;
