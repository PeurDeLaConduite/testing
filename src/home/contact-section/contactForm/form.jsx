import { ValidationError } from "@formspree/react";

const Form = ({ formData, errors, handleChange, state }) => {
    return (
        <div className="form">
            <label htmlFor="prenom">Prénom{errors.prenom && "*"}</label>
            <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                aria-describedby="prenom-error"
                autoComplete="given-name"
            />
            {errors.prenom && (
                <p id="prenom-error" className="error-message">
                    {errors.prenom}
                </p>
            )}
            <ValidationError prefix="prenom" field="prenom" errors={state.errors} />

            <label htmlFor="nom">Nom{errors.nom && "*"}</label>
            <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                aria-describedby="nom-error"
                autoComplete="family-name"
                // required
            />
            {errors.nom && (
                <p id="nom-error" className="error-message">
                    {errors.nom}
                </p>
            )}
            <ValidationError prefix="Nom" field="nom" errors={state.errors} />

            <label htmlFor="email">E-mail{errors.email && errors.telephone && "*"}</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                aria-describedby="email-error"
                autoComplete="email"
                // required
            />
            {errors.email && (
                <p id="email-error" className="error-message">
                    {errors.email}
                </p>
            )}
            <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>
    );
};

export default Form;
