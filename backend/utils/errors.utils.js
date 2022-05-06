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
  if (err.code == 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Email déjà existant";
  return errors;
};

module.exports.signInErrors = (err) => {
  const errors = { email: "", password: "" };
  if (err.message.includes("email")) errors.email = "Email Inconnu";
  if (err.message.includes("password"))
    errors.password = "Password non reconnu";
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

module.exports.uploadErrors = (err) => {
  const errors = { format: "", maxSize: "" };

  if (err.message.includes("invalid file"))
    errors.format = "format incompatible";

  if (err.message.includes("max size"))
    errors.maxSize = "fichier plus grand que 5Mo";

  return errors;
};
