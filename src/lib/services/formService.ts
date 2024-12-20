import { collection, addDoc, serverTimestamp, Timestamp, FieldValue } from 'firebase/firestore';
import { db } from '../firebase';
import { MultiStepFormData } from '@/components/MultiStepForm/types';

interface FormSubmissionData {
  // Contact Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  businessName: string;

  // Project Details
  projectGoals: string;
  targetAudience: string;
  uniqueSellingPoints: string;

  // Design Preferences
  designStyle: string;
  websiteExamples: string;

  // Content Requirements
  contentTypes: string[];  // Convert from comma-separated string
  needsContentHelp: boolean;  // Convert from string
  otherContentType: string;
  specialRequirements: string;

  // Additional Information
  additionalNotes: string;

  // Metadata
  submittedAt: FieldValue | Timestamp;
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'cancelled';
  agreementAccepted: boolean;  // Convert from string
}

export type FormSubmissionResult = {
  success: boolean;
  id?: string;
  error?: Error;
};

export const submitForm = async (formData: MultiStepFormData): Promise<FormSubmissionResult> => {
  try {
    // Transform the data for Firestore
    const submissionData: FormSubmissionData = {
      // Contact Information
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      jobTitle: formData.jobTitle,
      businessName: formData.businessName,

      // Project Details
      projectGoals: formData.projectGoals,
      targetAudience: formData.targetAudience,
      uniqueSellingPoints: formData.uniqueSellingPoints,

      // Design Preferences
      designStyle: formData.designStyle,
      websiteExamples: formData.websiteExamples,

      // Content Requirements
      contentTypes: formData.contentTypes ? formData.contentTypes.split(',').map(type => type.trim()) : [],
      needsContentHelp: formData.needsContentHelp === 'true',
      otherContentType: formData.otherContentType,
      specialRequirements: formData.specialRequirements,

      // Additional Information
      additionalNotes: formData.additionalNotes,

      // Metadata
      submittedAt: serverTimestamp(),
      status: 'new',
      agreementAccepted: formData.agreementAccepted === 'true'
    };

    const docRef = await addDoc(collection(db, 'formSubmissions'), submissionData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting form:', error);
    return { success: false, error: error instanceof Error ? error : new Error('Unknown error') };
  }
};
