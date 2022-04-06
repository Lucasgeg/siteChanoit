module.exports.signUpErrors = (err) => {
  let errors = {
    email: "",
    password: "",
    prenom: "",
    nom: "",
    birthday: "",
    birthCity: "",
    secu: "",
  };

  if (err.message.includes("email")) errors.email = "Email incorrect";
  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractère minimum";
  if (err.message.includes("pre")) errors.prenom = "Le prenom est obligatoire";
  if (err.message.includes("nom")) errors.nom = "Le nom est obligatoire";
  if (err.message.includes("birthday"))
    errors.birthday = "La date de naissance est obligatoire";
  if (err.message.includes("birthCity"))
    errors.birthCity = "La ville de naissance est obligatoire";
  if (err.message.includes("secu"))
    errors.secu =
      "Le numéro de sécurité sociale doit faire exactement 15 caractère";
  return errors;
};

module.exports.updateError = (err) => {
  let errors = {
    password: "",
    secu: "",
    email: "",
  };
  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractère minimum";
  if (err.message.includes("secu"))
    errors.secu =
      "Le numéro de sécurité sociale doit faire 15 caractères exactement";
  if (err.message.includes("email"))
    errors.email = "L'adresse email est invalide";
  return errors;
};
