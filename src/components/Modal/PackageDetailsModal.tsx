import React from 'react';

interface PackageDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PackageDetailsModal: React.FC<PackageDetailsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black opacity-40 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full p-8 transform transition-all">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Elevate10+ Design Details</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-blue-600">Elevate10+ (10 Development Hours) – €450</h3>
                <ul className="mt-3 space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Custom website design tailored to your brand
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Mobile-friendly and responsive setup
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Basic SEO to help your site get found on Google
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Basic Analytics integration to track your visitors
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    CMS (like HyGraph) setup for easy updates
                  </li>
                </ul>
                <p className="mt-2 text-gray-600">Additional hours are billed at €50/hour.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">Delivery</h4>
                <p className="text-gray-600">Your website will be ready in 2–3 working weeks.</p>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-xl font-semibold text-blue-600">Maintenance – €30/month</h3>
                <p className="mt-2 text-gray-600">To keep the site fresh and running smoothly:</p>
                <ul className="mt-3 space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    1 hour of monthly development support
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Ongoing performance monitoring and security updates
                  </li>
                </ul>
                <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-700 font-medium">
                    Bonus: If clients don&apos;t use all their maintenance hours, they can roll them over for up to 3 months!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailsModal;
