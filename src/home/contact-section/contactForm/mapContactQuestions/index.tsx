import React from "react";
import InputCheckbox from "../../../../components/checkbox/inputCheckbox";

interface DrivingFormProps {
    locationState: boolean | null;
    onLocationChange: (condition: boolean | null) => void;
    hasPermit: boolean | null;
    supervisedDriving: boolean | null;
    onPermitChange: (condition: boolean | null) => void;
    onSupervisedChange: (condition: boolean | null) => void;
}

const MapQuestions: React.FC<DrivingFormProps> = ({
    locationState,
    onLocationChange,
    hasPermit,
    supervisedDriving,
    onPermitChange,
    onSupervisedChange,
}) => {
    const options = [
        {
            id: "location",
            question: "Vous résidez à moins de 50 km du havre ?",
            name: "reside_a_moins_50km",
            options: [
                {
                    id: "locationOk",
                    label: "Oui",
                    value: "oui",
                    condition: true,
                },
                {
                    id: "locationKo",
                    label: "Non",
                    value: "non",
                    condition: false,
                },
            ],
            state: locationState,
            onOptionChange: onLocationChange,
        },
        {
            id: "permit",
            question: "Avez-vous le permis de conduire ?",
            name: "permis_obtenu",
            options: [
                {
                    id: "permis-Ok",
                    label: "Oui",
                    value: "oui",
                    condition: true,
                },
                {
                    id: "permis-Ko",
                    label: "Non",
                    value: "non",
                    condition: false,
                },
            ],
            state: hasPermit,
            onOptionChange: onPermitChange,
        },
        {
            id: "supervised-Ok",
            question: "Conduite accompagnée ou supervisée ?",
            name: "conduite_accomp_supervisee",
            options: [
                { id: "AAC-Ok", label: "Oui", value: "oui", condition: true },
                { id: "AAC-Ko", label: "Non", value: "non", condition: false },
            ],
            state: supervisedDriving,
            onOptionChange: onSupervisedChange,
        },
    ];
    const handleInputClick = (
        onOptionChange: (condition: boolean | null) => void,
        state: boolean | null,
        condition: boolean
    ) => {
        onOptionChange(state === condition ? null : condition);
    };
    return (
        <div className="form-questions flx-c">
            {options.map((option) => (
                <div className="questions" key={option.id}>
                    <p>{option.question}</p>
                    <div className="response boolean-checkbox">
                        {option.options.map((opt) => (
                            <InputCheckbox
                                key={opt.id}
                                option={opt}
                                state={option.state}
                                handleInputClick={(condition) =>
                                    handleInputClick(
                                        option.onOptionChange,
                                        option.state,
                                        condition
                                    )
                                }
                                question={option.name}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MapQuestions;
