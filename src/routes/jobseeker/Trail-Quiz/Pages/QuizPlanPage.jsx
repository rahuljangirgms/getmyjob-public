import React from "react";
import HeroSection from "./../components/HeroSection";
import PricingCard from "./../../../../components/JobSeekerComponents/ReusableComponents/PricingCard";
import { useNavigate } from 'react-router-dom';

function QuizPlanPage() {

  const navigate = useNavigate();
  // Example feature sets
  const featuresPaid = [
    { text: "Aptitude + Technical Skills Test", included: true },
    { text: " View pass/fail status", included: true },
    { text: "Unlimited retakes", included: true },
    { text: "Skill badge", included: true },
    { text: "Skill badge visibility for recruiters", included: true },
  ];

  const featuresUnPaid = [
    { text: "Aptitude + Technical Skills Test", included: true },
    { text: " View pass/fail status", included: true },
    { text: "Unlimited retakes", included: true },
    { text: "Skill badge", included: false },
    { text: "Skill badge visibility for recruiters", included: false },
  ];

  const handleChoosePaidPlan = () => {
    // alert("Plan chosen!");
    navigate("/jobseeker/trail-quiz/quiz-topic");
  };

  const handleChooseUnpaidPlan = () => {
    alert("Plan chosen!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 flex-col mt-20 lg:mt-0">
      <HeroSection />

      <div className="flex w-full justify-center gap-4 flex-col lg:flex-row p-6">
        <PricingCard
          planName="Free Plan"
          price="0"
          frequency="/month"
          features={featuresUnPaid}
          buttonText="Choose plan"
          onClick={handleChoosePaidPlan}
        />
        <PricingCard
          planName="Standard plan"
          price="500"
          frequency="/month"
          features={featuresPaid}
          buttonText="Choose plan"
          onClick={handleChoosePaidPlan}
        />
      </div>
    </div>
  );
}

export default QuizPlanPage;
