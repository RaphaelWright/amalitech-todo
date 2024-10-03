import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import TopBar from "../components/TopBar";
import useToken from "../hooks/useToken";

const Login = () => {

  const { token, setToken, isTokenExpired } = useToken();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email) && !/^\s*$/.test(email); // Check for spaces only
  };

  const validatePassword = (password) => {
    return password.length >= 6 && !/^\s*$/.test(password); // Check password length and for spaces only
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);

    if (!validatePassword(password)) {
      setLoginError(true);
      return;
    }
    setLoginError(false);

    setLoading(true);

    try {
      const response = await fetch(
        "https://user-auth-server.onrender.com/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login Failed");
      }
      localStorage.setItem("token", data.token);
      setToken(data.token)
      
      navigate("/todo");
    } catch (err) {
      console.error(err.message || "Login was not successful");
      setLoginError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired) {
      logout();
    } else {
      navigate("/todo");
    }
  }, [navigate]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="">
      <TopBar />
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-[300px] bg-white shadow-xl rounded-xl px-8 py-7 space-y-4 hover:scale-105 transform transition duration-300"
      >
        <h1 className="text-center font-bold text-2xl mb-6">Sign In</h1>

        <div className="space-y-1">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-1 border-b-2 outline-none focus:border-pink w-full py-1"
            placeholder="Email"
          />
          {emailError && (
            <p className="text-pink border rounded-xl text-center text-xs mt-1">
              Invalid Email
            </p>
          )}
        </div>

        <div className="relative space-y-1">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-1 border-b-2 outline-none focus:border-pink w-full py-1"
            placeholder="Password"
          />
          <span
            onClick={toggleShowPassword}
            className="absolute right-2 top-2 cursor-pointer"
          >
            {showPassword ? <EyeOff size={20} strokeWidth={1.5} /> : <Eye size={20} strokeWidth={1.5} />}
          </span>
        </div>

        {loginError && (
          <p className="text-pink text-center rounded-xl border text-sm">
            Invalid Email or Password
          </p>
        )}

        <button
          type="submit"
          className="w-full py-1 px-10 my-5 rounded-3xl bg-peach hover:border hover:border-peach hover:bg-[#0000]"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default Login;
