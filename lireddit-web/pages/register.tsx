import React from "react";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  return (
    <form onSubmit={() => console.log(5)}>
      <div>
        <input placeholder="username" type="text" value={5} />
        <p></p>
      </div>

      <div>
        <input placeholder="password" type="password" value={-2} />
        <p></p>
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
