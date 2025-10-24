import GradingAssignmentForm from '../components/Form';
// import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center pb-30 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <GradingAssignmentForm />
    </div>
  );
}
