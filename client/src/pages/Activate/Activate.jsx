import { useState } from "react";
import LayoutBasic from "../../components/LayoutBasic";

const steps = {
  // 1: StepEmail,
  // 2: StepOTP,
};

const Activate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  const nextHandler = () => {
    if (step < 2) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  return <div>Activate</div>;
};

export default Activate;
