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
  // Find the index of the current status in the steps array
  const baseSteps = referral?.status === "rejecté" ? [...steps, "rejeté"] : steps;

  const activeStepIndex = baseSteps.indexOf(referral?.status);
  const isStepFailed = (step) => {
    return step === "rejecté";
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStepIndex}>
        {baseSteps.map((label, index) => {
          const labelProps = {};
          if (isStepFailed(activeStepIndex)) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Alert message
              </Typography>
            );

            labelProps.error = true;
          }

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}

export default StepperComponent;
