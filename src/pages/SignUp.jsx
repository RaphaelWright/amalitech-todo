import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function confirmPasswordMatch(password, confirmPassword) {
    if (password.length < 6 || confirmPassword.length < 6) {
      alert("Password must be at least 6 characters long");
    }
    return password === confirmPassword;
  }

  function resetForm() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Invalid Email");
      return;
    }


    if (!confirmPasswordMatch(password, confirmPassword)) {
      alert("Passwords do not match");
      return;
    } else {

      setLoading(true)
      try {
        const response = await fetch(
          "https://user-auth-server.onrender.com/api/v1/user/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({ firstName, lastName, email, password }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Signup Failed");
        } 

        navigate('/login')

        
      } catch (err) {
        console.log(err || "Signup was not successful");
      } finally {
        resetForm();
        setLoading(false);
      }

      
    }
  };

  useEffect(
    () => resetForm()
    ,[])

  return (
    <div className="flex justify-center mt-48  text-sm">
      <form
        onSubmit={handleSubmit}
        className="w-[300px] shadow shadow-orange-400 rounded-xl px-8 py-7 space-y-4 hover:scale-110 transform transition duration-300"
      >
        <h1 className=" flex justify-center font-bold text-xl mb-2">Sign Up</h1>
        <p>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className=" pl-1 border-b-2 outline-none focus:border-orange-400 w-full py-1"
            placeholder="First Name"
          />
        </p>

        <p>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className=" pl-1 border-b-2 outline-none focus:border-orange-400 w-full py-1"
            placeholder="Last Name"
          />
        </p>

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

        <p>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className=" pl-1 border-b-2 outline-none focus:border-orange-400 w-full py-1"
            placeholder="Confirm Password"
          />
        </p>

        <p className="text-center text-orange-300">
          Already have an account?{" "}
          <a href="/login" className="text-orange-400">
            Login
          </a>
        </p>

        <button
          type="submit"
          className="w-full border py-1 px-10 my-5 rounded-3xl bg-orange-300 hover:border hover:border-orange-400 hover:bg-white"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
