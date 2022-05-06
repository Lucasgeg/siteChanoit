import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForms";

const Log = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  const handleModal = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  return (
    <div className="connectionform">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModal}
            id="register"
            className={signUpModal ? "active-btn" : null}
          >
            s'inscrire
          </li>
          <li
            onClick={handleModal}
            id="login"
            className={signInModal ? "active-btn" : null}
          >
            Se connecter
          </li>
        </ul>
        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
    </div>
  );
};

export default Log;
