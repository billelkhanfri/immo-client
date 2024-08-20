import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Button,
  Divider,
  Grid,
  CardMedia,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getReferral } from "../redux/apiCalls/referralApiCall"; // Update the path according to your project structure

function formatDate(dateString) {
  const date = new Date(dateString);

  // Extract day, month, and year from the Date object
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  // Return the formatted date string
  return `${day}/${month}/${year}`;
}

function Offer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { referral } = useSelector((state) => state.referrals);

  const date = referral?.createdAt;
  const formattedDate = formatDate(date);

  useEffect(() => {
    dispatch(getReferral(id));
  }, [id]);

  return (
    <Container sx={{ background: "white", borderRadius: 2, padding: 2 }}>
      <Button
        onClick={() => navigate(-1)}
        aria-label="Cliquer pour revenir en arrière"
        sx={{
          borderRadius: 2,
          border: "1px solid",
          ":hover": {
            backgroundColor: "primary.main",
            color: "white",
          },
        }}
      >
        <ArrowBackIosNewIcon />
      </Button>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          {/* Offer Title */}
          <Typography
            variant="h4"
            component={"h2"}
            sx={{
              mt: 2,
              color: "primary.main",
            }}
          >
            {referral?.commentaire}
          </Typography>
          {/* Subtitle category */}
          <Typography component={"div"} sx={{ display: "flex", gap: 1, my: 1 }}>
            <Typography variant="subtitle1">
              {referral?.sender.organisation}
            </Typography>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography variant="subtitle1">{referral?.lieu}</Typography>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography variant="subtitle1">
              {referral?.typeDeReferral}
            </Typography>
          </Typography>
          {/* Offer informations */}
          <Typography variant="h5" paddingTop={5} paddingBottom={2}>
            Descriptif de l'offre
          </Typography>
          <Typography variant="body1">{referral?.commentaire}</Typography>
          <Typography variant="h5" paddingTop={5} paddingBottom={2}>
            Informations complémentaires
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum
            repudiandae dolores rerum laboriosam sapiente officia repellat!
            Nisi, asperiores totam ipsum, excepturi, atque laborum vel provident
            ea fugit iure perferendis debitis!
          </Typography>
          <Typography variant="h5" paddingTop={5} paddingBottom={2}>
            Bienvenue chez {referral?.sender.organisation}
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
            quisquam distinctio, aliquid consectetur ipsa dicta fuga eligendi
            deserunt libero tempora ipsum eius hic ea provident nihil est vitae.
            Beatae, deserunt?
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Card>
            {/* <CardMedia sx={{ height: 140 }} /> */}
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <Typography variant="h5">{referral?.commentaire}</Typography>
              <Typography variant="subtitle1">
                {referral?.sender.organisation}
              </Typography>
              <Button variant="contained" sx={{ width: "100%" }}>
                Postuler
              </Button>
              <Typography variant="caption">
                Publiée le {formattedDate} - Ref : REF
                {referral?.id.substring(0, 8)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Offer;
