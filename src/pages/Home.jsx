import { useAuth } from "../context/authContext"

const Home = () => {
  const {session}= useAuth();
  console.log(session)
  return (
    <div>Home</div>
  )
}

export default Home