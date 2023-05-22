import { useState } from "react";
import LayoutBasic from "../../components/LayoutBasic";
import StepName from "../steps/StepName";
import StepAvatar from "../steps/StepAvatar";

const steps = {
  1: StepName,
  2: StepAvatar,
};

const Activate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  const nextHandler = () => {
    if (step < 2) {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <>
      <LayoutBasic>
        <Step onNext={nextHandler} />
      </LayoutBasic>
    </>
  );
};

export default Activate;
