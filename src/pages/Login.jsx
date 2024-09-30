import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const handleSubmit =async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Invalid Email");
      return;
    }

    setLoading(true);


    try {

      const login_response = await fetch('https://user-auth-server.onrender.com/api/v1/user/login', {
        method: "POST",
        headers: {   
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify({email, password}),
      });

      const data = await login_response.json();

      if (!login_response.ok) {
        throw new Error(data.message || 'Login Failed');
      } 

      localStorage.setItem("token", data.token);

      navigate('/todo')

    } catch (err) {
      console.log(err.message || 'Login was not successful');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className = "flex justify-center mt-48">
      
      <form onSubmit={handleSubmit} className="w-[300px] shadow shadow-orange-400 rounded-xl px-8 py-7 space-y-4 hover:scale-110 transform transition duration-300">
        <h1 className=" flex justify-center font-bold text-xl mb-2">Sign In</h1>
 
        
        <p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" pl-1 border-b-2 outline-none focus:border-orange-400 py-1 w-full"
            placeholder="Email"
          />
        </p>
        
        <p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-1 border-b-2 outline-none focus:border-orange-400 py-1 w-full"
            placeholder="Password"
          />
        </p>

        <button type="submit" className="w-full border py-1 px-10 my-5 rounded-3xl bg-orange-300 hover:border hover:border-orange-400 hover:bg-white">{loading? "Signing In..." : "Sign In"}</button>
      </form>
    </div>
  );
};

export default Login;
