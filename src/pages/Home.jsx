import { Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllReferrals } from "../redux/apiCalls/referralApiCall";

function Home() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { referrals } = useSelector((state) => state.referrals);
  useEffect(() => {
    dispatch(getAllReferrals());
  }, []);

  return (
    <>
      {" "}
      <Container>
        {user ? (
          <>
            <Typography
              variant="h2"
              sx={{ mx: 4, textAlign: "center", color: "primary.main" }}
            >
              Accueil 
            </Typography>
            {/* <Typography
              variant="h5"
              component={"h2"}
              sx={{ textAlign: { xs: "center", md: "start" } }}
            >
              Mes offres recommandées
            </Typography>
            {referrals?.map((referral) => (
              <UserOffersCard
                key={referral.id}
                offer={referral}
              />
            ))} */}
          </>
        ) : (
          <Typography
            variant="h2"
            sx={{ mx: 4, textAlign: "center", color: "primary.main" }}
          >
            Accueil non connecté
          </Typography>
        )}
        <Typography
          component={"div"}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        ></Typography>
      </Container>
    </>
  );
}

export default Home;
