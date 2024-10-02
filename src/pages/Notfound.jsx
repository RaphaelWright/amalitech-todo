import { Link } from "react-router-dom"

const Notfound = () => {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-7xl text-peach text-center mb-8">
          You don&apos;t have to be here...
        </h1>
        <Link to="/" className="text-3xl text-pink underline">
          Go back
        </Link>
      </div>
    );
  };
  

export default Notfound