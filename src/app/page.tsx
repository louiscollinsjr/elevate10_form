
import MultiStepForm from '@/components/MultiStepForm';

export const metadata = {
  title: 'Web Design Project Form',
  description: 'Start your web design project by filling out our detailed questionnaire',
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <MultiStepForm />
    </div>
  );
}