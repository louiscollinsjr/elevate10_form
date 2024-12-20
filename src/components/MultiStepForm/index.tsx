'use client';

import { useWizard, Wizard } from 'react-use-wizard';
import { useState } from 'react';
import * as Yup from 'yup';
import ContactDetails from './steps/ContactDetails';
import GoalsVision from './steps/GoalsVision';
import DesignPreferences from './steps/DesignPreferences';
import ContentLogistics from './steps/ContentLogistics';
import BudgetTimeline from './steps/BudgetTimeline';
import FinalNotes from './steps/FinalNotes';

const MultiStepForm = () => {
  const [formData, setFormData] = useState({
    // Contact Details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    
    // Goals & Vision
    projectGoals: '',
    targetAudience: '',
    uniqueSellingPoints: '',
    
    // Design Preferences
    designStyle: '',
    colorPreferences: '',
    websiteExamples: '',
    
    // Content & Logistics
    contentPlan: '',
    contentCreation: '',
    existingAssets: '',
    
    // Budget & Timeline
    budget: '',
    timeline: '',
    launchDate: '',
    
    // Final Notes
    additionalNotes: '',
  });

  const handleUpdateFormData = (newData: any) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-full w-full">
        <Wizard>
          <ContactDetails formData={formData} updateFormData={handleUpdateFormData} />
          <GoalsVision formData={formData} updateFormData={handleUpdateFormData} />
          <DesignPreferences formData={formData} updateFormData={handleUpdateFormData} />
          <ContentLogistics formData={formData} updateFormData={handleUpdateFormData} />
          <BudgetTimeline formData={formData} updateFormData={handleUpdateFormData} />
          <FinalNotes formData={formData} updateFormData={handleUpdateFormData} />
        </Wizard>
      </div>
    </div>
  );
};

export default MultiStepForm;
