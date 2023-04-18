import { useState } from "react";
import LayoutBasic from "../../components/LayoutBasic";
import StepEmail from "../steps/StepEmail";
import StepOTP from "../steps/StepOTP";

const steps = {
  1: StepEmail,
  2: StepOTP,
};

const Authenticate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  const nextHandler = () => {
    if (step < 2) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const prevHandler = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  return (
    <>
      <LayoutBasic>
        <Step onNext={nextHandler} onPrev={prevHandler} />
      </LayoutBasic>
    </>
  );
};

export default Authenticate;
