import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [pwdError, setPwdError] = useState(false);
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
      setemailError(true);
      return;
    } else {
      setemailError(false);
    }


    if (!confirmPasswordMatch(password, confirmPassword)) {
      setPwdError(true);
      return;
    } else {

      setLoading(true)
      setPwdError(false);
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
    <div className="">
    <div className="flex justify-center mt-48  text-sm">
      <form
        onSubmit={handleSubmit}
        className="w-[300px] shadow-xl rounded-xl px-8 py-7 space-y-4 hover:scale-110 transform transition duration-300 hover:shadow-xl"
      >
        <h1 className=" flex justify-center font-bold text-xl mb-2">Sign Up</h1>
        <p>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className=" pl-1 border-b-2 outline-none focus:border-pink w-full py-1"
            placeholder="First Name"
          />
        </p>

        <p>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className=" pl-1 border-b-2 outline-none focus:border-pink w-full py-1"
            placeholder="Last Name"
          />
          <br></br>
        <p>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" pl-1 border-b-2 mt-4 outline-none focus:border-pink py-1 w-full"
            placeholder="Email"
          />
          {emailError && (
            <h3 className="text-red-500 text-xs mt-1 py-1 rounded-xl bg-red pl-3">Invalid Email</h3>
          )}
        </p>
        </p>
        

        <p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-1 border-b-2 outline-none focus:border-pink py-1 w-full"
            placeholder="Password"
          />
        </p>

        <p>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className=" pl-1 border-b-2 outline-none focus:border-pink w-full py-1"
            placeholder="Confirm Password"
          />
          {pwdError && (
            <h3 className="text-red-500 text-xs mt-1 py-1 rounded-xl bg-red pl-3">Passwords do not match</h3>
          )}
        </p>

        <p className="text-center text-orange-300">
          Already have an account?{" "}
          <a href="/login" className="text-pink">
            Login
          </a>
        </p>

        <button
          type="submit"
          className="w-full py-1 px-10 my-5 rounded-3xl bg-peach hover:border hover:border-peach hover:bg-[#0000]"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default SignUp;
