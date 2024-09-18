import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

const steps = [
  "envoyé",
  "en attente",
  "attribué",
  "pourparlers",
  "mandat",
  "compromis",
  "acte",
];

function StepperComponent({ referral }) {
  // Function to check if the step is "attribué" and rejected
  const isStepFailed = (step) => {
    return step === 2 && referral?.status === "rejeté";  // Mark the 3rd step (attribué) as failed only if rejected
  };

  // Find the index of the current referral status in the steps array
  const activeStepIndex =referral?.status !== "rejeté"? steps.indexOf(referral?.status) : 2;

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
