
import MultiStepForm from '@/components/MultiStepForm';

export const metadata = {
  title: 'Introducing Elevate10+ by atem.',
  description: 'Start your web design project by filling out our startup form.',
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <MultiStepForm />
    </div>
  );
}