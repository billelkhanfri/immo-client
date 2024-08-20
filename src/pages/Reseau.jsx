import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/apiCalls/userApiCall"; // Assure-toi que le chemin est correct

function Reseau() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.allUsers);
  console.log(allUsers)

  useEffect(() => {
    dispatch(getAllUsers()); // Appel au thunk pour récupérer les utilisateurs
  }, [dispatch]);

  return (
    <div>
      <h2>Liste des Utilisateurs</h2>
      <ul>
        {allUsers &&allUsers.map((user) => (
          <li key={user.id}>{user.lastName}</li>
        ))}
      </ul>
    </div>
  );
}

export default Reseau;
