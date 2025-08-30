import { ValidationError } from "@formspree/react";

const FormSuite = ({ formData, errors, handleChange, state }) => {
    return (
        <div className="form suite">
            <label htmlFor="telephone">Téléphone{errors.telephone && errors.email && "*"}</label>
            <input
                type="tel"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                autoComplete="tel"
                aria-describedby={errors.telephone && errors.email ? "telephone-error" : undefined}
            />
            {errors.telephone && errors.email && (
                <p id="telephone-error" className="error-message">
                    {errors.telephone}
                </p>
            )}

            <ValidationError prefix="telephone" field="telephone" errors={state.errors} />

            <label htmlFor="message">
                Message
                {errors.message && "*"}
            </label>
            <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                autoComplete="off"
                aria-describedby={errors.message ? "message-error" : undefined}
                // required
            />
            {errors.message && (
                <p id="message-error" className="error-message">
                    {errors.message}
                </p>
            )}

            <ValidationError prefix="message" field="message" errors={state.errors} />
        </div>
    );
};

export default FormSuite;
