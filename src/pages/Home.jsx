import { Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllReferrals } from "../redux/apiCalls/referralApiCall";
import {
  Card,
  CardHeader,
  CardMedia,
  Avatar,
  IconButton,
  Skeleton,
  Box,
} from '@mui/material';


import MoreVertIcon from '@mui/icons-material/MoreVert';

function Home(props) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { referrals } = useSelector((state) => state.referrals);
  const { loading = false} = props;
  const cards = Array.from({ length: 9 });
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



<Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {cards.map((_, index) => (
        <Card key={index} sx={{ maxWidth: 345,width:300, m: 2 }}>
          <CardHeader
            avatar={
              !loading ? (
                <Skeleton animation="wave" variant="circular" width={40} height={40} />
              ) : (
                <Avatar
                  alt="Ted talk"
                  src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
                />
              )
            }
            action={
              !loading ? null : (
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              )
            }
            title={
              !loading ? (
                <Skeleton
                  animation="wave"
                  height={10}
                  width="80%"
                  style={{ marginBottom: 6 }}
                />
              ) : (
                'Ted'
              )
            }
            subheader={
              !loading ? (
                <Skeleton animation="wave" height={10} width="40%" />
              ) : (
                '5 hours ago'
              )
            }
          />
          {!loading ? (
            <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
          ) : (
            <CardMedia
              component="img"
              height="140"
              image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
              alt="Nicola Sturgeon on a TED talk stage"
            />
          )}
        </Card>
      ))}
    </Box>
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
