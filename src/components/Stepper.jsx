import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


const steps = [
  "envoyé",
  "en attente",
  "attribué",
  "pourparlers",
  "mandat",
  "compromis",
  "acte",
];

function StepperComponent({ referral, attributedReferral, requested}) {
  // Function to check if the step is "attribué" and rejected
  const isStepFailed = (step) => {
    return step === 1 && attributedReferral?.status === "rejected";  
  };

  // // Find the index of the current referral status in the steps array
  // const activeStepIndex =referral?.status !== "rejeté"? steps.indexOf(referral?.status) : 2;
  //   // Find the index of the current referral status in the steps array
    const activeStepIndex = attributedReferral?.status ==="pending" || requested?.status ==="pending"?  1: steps.indexOf(referral?.status);

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStepIndex}>
        {steps.map((label, index) => {
          const labelProps = {};

          // Check if the current step has failed (attribué and rejected)
          if (isStepFailed(index)) {
            label = "non attribué"; // Change label to "non attribué"
            labelProps.error = true; // Apply error styling
          }

         

          return (
            <Step key={label} >
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}

export default StepperComponent;
