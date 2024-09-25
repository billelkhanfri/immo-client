import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoIcon from "@mui/icons-material/Info";
import HistoryIcon from "@mui/icons-material/History";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { getUserByID, deleteUser } from "../redux/apiCalls/userApiCall";
import { logoutUser } from "../redux/apiCalls/authApiCall";
import {
 
  uploadProfilePicture, deleteProfilePicture
 
} from "../redux/apiCalls/profileApiCall";
import { getAllReferrals } from "../redux/apiCalls/referralApiCall";
// import SentByUser from "../components/SentByUser";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Profil() {
  const { register, handleSubmit } = useForm(); // React Hook Form
  const navigate = useNavigate(); // React Router hooks
  const dispatch = useDispatch(); // Redux dispatch function
  const { userByID } = useSelector((state) => state.user); // Redux user state selectors
  const { referrals } = useSelector((state) => state.referrals);
  const { id } = useParams(); // React Router hooks

  // State variables
  const [imgPreview, setImgPreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
    const [openProfil, setOpenProfil] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [value, setValue] = useState(0);
  const [handleProfil, setHandleProfil] = useState(false);
  const [password, setPassword] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Modal handlers
  const handleOpenProfil = () => setOpenProfil(true);
  const handleCloseProfil = () => setOpenProfil(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  // Image handling
const handleImg = (e) => {
  const file = e.target.files[0];
  setImgPreview(URL.createObjectURL(file));
  setSelectedFile(file); // Save file for form submission
};

// Form submission handler
const onSubmit = async () => {
  const formDataObj = new FormData();
  formDataObj.append("image", selectedFile); // Use the file, not imgPreview
  await dispatch(uploadProfilePicture(formDataObj));
  dispatch(getUserByID(id));


};

 

  const handleDeletePicture = async () => {
    setImgPreview("");
    await dispatch(deleteProfilePicture(id));
    dispatch(getUserByID(id));
  };

  // Delete user handler
  const handleDelete = () => {
    dispatch(deleteUser(id));
    dispatch(logoutUser());
    handleCloseDelete();
    navigate("/");
  };

  // Fetch user data on component mount
  useEffect(() => {
    dispatch(getUserByID(id));
  }, [id]);

  // Fetch referral data on component mount
  useEffect(() => {
    dispatch(getAllReferrals());
  }, []);

  // Filter referrals to include only those with senderId matching userId
  const filteredReferrals =
    referrals?.filter((referral) => referral.senderId === userByID?.user.id) ||
    [];

  // Determine which referrals to display
  const displayedReferrals = showAll
    ? filteredReferrals
    : filteredReferrals.slice(0, 3);

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: "primary.main",
          minHeight: { xs: "140px", md: "200px" },
          alignContent: "flex-end",
          width: { sx: "100vw" },
          height: "auto",
          borderTopLeftRadius: { sx: 0, md: "12px" },
          borderTopRightRadius: { sx: 0, md: "12px" },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            gap: 1,
            mx: 4,
          }}
        >
          <Avatar
            alt={
              userByID?.firstName + "" + userByID?.lastName + "profil picture"
            }
            src={userByID ? userByID?.profile.imageUrl : imgPreview}
            sx={{
              width: { xs: "100px", lg: "150px" },
              height: { xs: "100px", lg: "150px" },
              border: "2px solid white",
              position: "absolute",
              transition: "all ease-in-out 0.3s",
              "&:hover": {
                cursor: "pointer",
                filter: "brightness(80%)",
              },
            }}
            onClick={handleOpenProfil}
          />

          <Modal
            open={openProfil}
            onClose={handleCloseProfil}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" component="h2">
                Modifier l'avatar
              </Typography>
              <Avatar
                alt={`${userByID?.firstName} ${userByID?.lastName} profil picture`}
                src={imgPreview ? imgPreview : userByID?.profile.image}
                sx={{
                  width: { xs: "100px", md: "150px" },
                  height: { xs: "100px", md: "150px" },
                  border: "2px solid white",
                }}
              />
              <Typography
                sx={{
                  mt: 2,
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
                component={"div"}
              >
               <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-2">
  <TextField type="file" {...register("photo")} onChange={handleImg} />
  <Button value="Update" type="submit" variant="contained" color="primary">Modifier</Button>
</form>

                <Button
                  onClick={handleDeletePicture}
                  variant="outlined"
                  color="primary"
                  sx={{
                    "&:hover": {
                      backgroundColor: "error.main",
                      color: "white",
                    },
                  }}
                >
                  Supprimer
                </Button>
              </Typography>
            </Box>
          </Modal>

          <div className="ml-20 md:ml-28 lg:ml-40 text-2xl md:text-4xl text-white">
            {userByID?.firstName} {userByID?.lastName}
          </div>
        </Typography>
      </Container>
      <ToastContainer />
      <Grid
        container
        rowSpacing={1}
        justifyContent={"center"}
        sx={{ my: 4 }}
        maxWidth="lg"
        mx="auto"
      >
        <Grid item xs={12} md={6}>
          <Card
            variant="outlined"
            sx={{
              mr: { sx: 0, md: 1 },
              my: 2,
              padding: 4,
              background: "white",
              borderRadius: 2,
            }}
          >
            {handleProfil ? (
              <Typography>Modifier de profile</Typography>
            ) : (
              <Typography
                fontWeight={"bold"}
              >{`Bonjour ${userByID?.user.firstName} :)`}</Typography>
            )}
            {handleProfil ? (
              <CardContent>
                <form noValidate>
                  <Stack spacing={1}>
                    <TextField
                      label="Nom"
                      type="text"
                      defaultValue={userByID?.user.lastName}
                    />
                    <Divider />
                    <TextField
                      label="Prénom"
                      type="text"
                      defaultValue={userByID?.user.firstName}
                    />
                    <Divider />
                    <TextField
                      label="Adresse e-mail"
                      type="email"
                      defaultValue={userByID?.user.email}
                    />
                    <Divider />
                    <TextField
                      label="CPI / RSAC"
                      type="text"
                      defaultValue={userByID?.user.cpi}
                    />
                    <Divider />
                    <TextField
                      label="Téléphone"
                      defaultValue={userByID?.user.telephone}
                    />
                    <Divider />
                    <TextField
                      label="Organisation"
                      type="text"
                      defaultValue={userByID?.user.organisation}
                    />
                    <Divider />
                    <TextField
                      label="Secteur"
                      type="text"
                      defaultValue={userByID?.user.secteur}
                    />
                  </Stack>
                </form>
              </CardContent>
            ) : (
              <CardContent>
                <Stack spacing={1}>
                  <Typography>
                    Nom : {userByID?.user.firstName} {userByID?.user.lastName}
                  </Typography>
                  <Divider />
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    Adresse e-mail : {userByID?.user.email}
                    {userByID?.user.isEmailVerified ? (
                      ""
                    ) : (
                      <Tooltip
                        title={
                          userByID?.user.isEmailVerified
                            ? ""
                            : "Cette e-mail n'est pas vérifié"
                        }
                        placement="right"
                      >
                        {userByID?.user.isEmailVerified ? (
                          ""
                        ) : (
                          <IconButton sx={{ padding: 0, marginLeft: 1 }}>
                            <ErrorOutlineIcon />
                          </IconButton>
                        )}
                      </Tooltip>
                    )}
                  </Typography>
                  <Divider />
                  <Typography>CPI / RSAC : {userByID?.user.cpi}</Typography>
                  <Divider />
                  <Typography>
                    Téléphone : {userByID?.user.telephone}
                  </Typography>
                  <Divider />
                  <Typography>
                    Organisation : {userByID?.user.organisation}
                  </Typography>
                  <Divider />
                  <Typography>Secteur : {userByID?.user.secteur}</Typography>
                </Stack>
              </CardContent>
            )}
            {handleProfil ? (
              <Typography
                component={"div"}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => setHandleProfil(!handleProfil)}
                >
                  Modifier le profil
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setHandleProfil(!handleProfil)}
                >
                  Annuler
                </Button>
              </Typography>
            ) : (
              <Typography
                component={"div"}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => setHandleProfil(!handleProfil)}
                >
                  Modifier le profil
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleOpenDelete}
                  sx={{
                    "&:hover": {
                      backgroundColor: "error.main",
                      color: "white",
                    },
                  }}
                >
                  Supprimer le profil
                </Button>
                <Modal
                  open={openDelete}
                  onClose={handleCloseDelete}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 400,
                      bgcolor: "background.paper",
                      borderRadius: 2,
                      boxShadow: 24,
                      p: 4,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography color={"error"}>
                      Voulez-vous supprimer votre profil ?
                    </Typography>
                    <TextField
                      type="password"
                      label="Mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      fullWidth
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleDelete}
                      sx={{
                        "&:hover": {
                          backgroundColor: "error.main",
                          color: "white",
                        },
                      }}
                    >
                      Supprimer le profil
                    </Button>
                  </Box>
                </Modal>
              </Typography>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              ml: { sx: 0, md: 1 },
              my: 2,
              padding: 4,
              borderRadius: 2,
            }}
          >
            <Box>
              <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              >
                <BottomNavigationAction label="A propos" icon={<InfoIcon />} />
                <BottomNavigationAction
                  label="Ma recherche"
                  icon={<HistoryIcon />}
                />
                <BottomNavigationAction
                  label="Mes Offres"
                  icon={<BusinessCenterIcon />}
                />
              </BottomNavigation>
            </Box>
            <Box mt={2}>
              {value === 0 && (
                <Typography variant="h6">{userByID?.profile.about}</Typography>
              )}
              {value === 1 && (
                <Typography variant="h6">Ma recherche</Typography>
              )}
              {/* {value === 2 && <SentByUser />} */}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Profil;
