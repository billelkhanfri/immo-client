import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { createReferral } from "../../redux/apiCalls/referralApiCall";
import { useNavigate } from "react-router-dom";

function CreateOffer() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const { clientNom, clientEmail, clientTelephone, ...referralData } = data;

    // Construct clientInfo object
    referralData.clientInfo = {
      nom: clientNom,
      email: clientEmail,
      telephone: clientTelephone,
    };

    dispatch(createReferral(referralData));
    navigate("/mes-offres");
  };

  return (
    <Container sx={{ backgroundColor: "#FFFFFF", borderRadius: 2, padding: 2 }}>
      <Typography
        variant="h2"
        sx={{ mx: 4, textAlign: "center", color: "primary.main" }}
      >
        Créer une offre
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          mt: 4,
          mx: "auto",
          textAlign: "center",
          color: "primary.main",
          maxWidth: "30rem",
          width: "90%",
          marginY: 2,
        }}
      >
        <TextField
          fullWidth
          label="Type de Referral"
          {...register("typeDeReferral", { required: true })}
          error={!!errors.typeDeReferral}
          helperText={
            errors.typeDeReferral ? "Type de Referral is required" : ""
          }
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Nature du Contact"
          {...register("natureDuContact", { required: true })}
          error={!!errors.natureDuContact}
          helperText={
            errors.natureDuContact ? "Nature du Contact is required" : ""
          }
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Lieu"
          {...register("lieu", { required: true })}
          error={!!errors.lieu}
          helperText={errors.lieu ? "Lieu is required" : ""}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Commentaire"
          {...register("commentaire", { required: true })}
          error={!!errors.commentaire}
          helperText={errors.commentaire ? "Commentaire is required" : ""}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Honnoraire"
          type="number"
          {...register("honnoraire", { required: true })}
          error={!!errors.honnoraire}
          helperText={errors.honnoraire ? "Honnoraire is required" : ""}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Prix du bien"
          type="number"
          {...register("price", { required: true })}
          error={!!errors.price}
          helperText={errors.price ? "Price is required" : ""}
          sx={{ mb: 2 }}
        />

        {/* New Client Information Fields */}
        <TextField
          fullWidth
          label="Nom du Client"
          {...register("clientNom", { required: true })}
          error={!!errors.clientNom}
          helperText={errors.clientNom ? "Nom du Client is required" : ""}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email du Client"
          type="email"
          {...register("clientEmail", { required: true })}
          error={!!errors.clientEmail}
          helperText={errors.clientEmail ? "Email du Client is required" : ""}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Téléphone du Client"
          type="tel"
          {...register("clientTelephone")}
          sx={{ mb: 2 }}
        />

        {/* Optional receiverId Field */}
        <TextField
          fullWidth
          label="Receiver ID"
          {...register("receiverId")}
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Créer un Referral
        </Button>
      </Box>
    </Container>
  );
}

export default CreateOffer;
