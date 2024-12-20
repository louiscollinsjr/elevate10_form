'use client';

import React from 'react';
import Image from 'next/image';
import { MultiStepFormData } from '../types';

interface Props {
  formData: MultiStepFormData;
}

const SubmissionSuccess = ({ formData }: Props) => {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-gray-100 relative hidden md:block">
          <div className="absolute inset-0">
            <Image
              src="/images/savant76_posthuman_dystopia_line_drawing_man_with_computer_head_43f20b1b-4eb8-4014-8da2-4803af4ca88a.png"
              alt="Success"
              layout="fill"
              objectFit="cover"
              quality={100}
              className="rounded-r-lg"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/0"></div>
          </div>

          {/* Quote */}
          <div className="absolute inset-0 flex items-end justify-center p-6 md:p-12">
            <div className="text-white text-center md:text-left mb-8 md:mb-12 w-full max-w-3xl">
              <h1 className="text-2xl md:text-3xl font-normal text-red-400 mb-6 md:mb-8 font-oi tracking-wide leading-relaxed">
                &ldquo;We&apos;re excited to start bringing your vision to life!&rdquo;
              </h1>
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-auto">
                  <Image
                    src="/images/signature1.png"
                    alt="Team Member"
                    width={448}
                    height={48}
                    className="w-full md:w-auto"
                  />
                </div>
                <div className="text-center md:text-left">
                  <p className="font-medium text-black">atem. Team</p>
                  <p className="text-sm text-black">Web Design & Development</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-8 px-20 flex flex-col h-screen bg-[#f9D617]">
          <div className="flex-1 flex flex-col">
            <div className="pt-24 text-center">
              {/* Success Icon */}
              {/* <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div> */}
              
              <h2 className="text-4xl font-roboto font-bold mb-4">Thank You, {formData.firstName}!</h2>
              <p className="text-black mb-8 max-w-lg mx-auto">
                Your project request has been successfully submitted. We&apos;ll review your requirements and get back to you within 24 hours.
              </p>

              {/* Next Steps */}
              <div className="bg-[#0071C9] p-6 rounded-xl mb-8 px-12 pb-12 max-w-lg mx-auto">
                <h3 className="font-semibold text-white mb-4 text-3xl text-left">Next Steps:</h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-blue-600 text-sm font-semibold">1</span>
                    </span>
                    <span className="text-white">
                      We&apos;ll review your project requirements in detail
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-blue-600 text-sm font-semibold">2</span>
                    </span>
                    <span className="text-white">
                      Our team will reach out to schedule an initial consultation
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-blue-600 text-sm font-semibold">3</span>
                    </span>
                    <span className="text-white">
                      We&apos;ll create a detailed project timeline and begin development
                    </span>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="text-center">
                <p className="text-gray-600 mb-2">Have any questions?</p>
                <p className="text-gray-800 font-medium">
                  Email us at{' '}
                  <a href="mailto:hello@atem.gdn" className="text-blue-600 hover:text-blue-700">
                    hello@atem.gdn
                  </a>
                </p>
                <p className="text-gray-800 font-medium">
                  Visit us at{' '}
                  <a href="https://atem.gdn" className="text-blue-600 hover:text-blue-700">
                    atem.gdn
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
