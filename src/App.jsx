import { Button } from "@mui/material";
import supabase from "./config/supabaseClient";
import { useAuth } from "./context/authContext";

const App = () => {
  console.log(supabase);
  const { session } = useAuth();
  console.log(session)
  return (
    <div>
      App
      <Button variant="contained">Hello WOrd</Button>
    </div>
  );
};

export default App;
