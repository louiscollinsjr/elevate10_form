'use client';

import { Wizard } from 'react-use-wizard';
import { useState } from 'react';
import ContactDetails from './steps/ContactDetails';
import GoalsVision from './steps/GoalsVision';
import DesignPreferences from './steps/DesignPreferences';
import ContentLogistics from './steps/ContentLogistics';
// import BudgetTimeline from './steps/BudgetTimeline';
import FinalNotes from './steps/FinalNotes';
import { MultiStepFormData } from './types';

const MultiStepForm: React.FC = () => {
  const [formData, setFormData] = useState<MultiStepFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    businessName: '',
    projectGoals: '',
    targetAudience: '',
    uniqueSellingPoints: '',
    designStyle: '',
    websiteExamples: '',
    domainWebsite: '',
    socialMediaLinks: '',
    contentTypes: '',
    needsContentHelp: 'false',
    otherContentType: '',
    specialRequirements: '',
    budget: '',
    timeline: '',
    launchDate: '',
    additionalNotes: '',
    agreementAccepted: 'false'
  });

  const updateFormData = (newData: Partial<MultiStepFormData>) => {
    setFormData((prevData) => {
      const filteredData = Object.fromEntries(
        Object.entries(newData).filter(([, value]) => value !== undefined)
      ) as MultiStepFormData;
      return {
        ...prevData,
        ...filteredData,
      };
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-full w-full">
        <Wizard>
          <ContactDetails formData={formData} updateFormData={updateFormData} />
          <GoalsVision formData={formData} updateFormData={updateFormData} />
          <DesignPreferences formData={formData} updateFormData={updateFormData} />
          <ContentLogistics formData={formData} updateFormData={updateFormData} />
          {/* <BudgetTimeline formData={formData} updateFormData={updateFormData} /> */}
          <FinalNotes formData={formData} updateFormData={updateFormData} />
        </Wizard>
      </div>
    </div>
  );
};

export default MultiStepForm;
