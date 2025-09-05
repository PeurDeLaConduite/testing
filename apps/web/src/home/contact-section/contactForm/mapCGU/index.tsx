import React from "react";
import InputCheckbox from "@packages/ui/components/checkbox/inputCheckbox";

interface DrivingFormProps {
    cguState: boolean | null;
    onCguChange: (condition: boolean | null) => void;
    newEvent: boolean | null;
    onNewEventChange: (condition: boolean | null) => void;
}

type Option = {
    id: string;
    label: string;
    value: string;
    condition: boolean;
};

type Question = {
    id: string;
    question: string;
    name: string;
    options: Option[];
    state: boolean | null;
    onOptionChange: (condition: boolean | null) => void;
};

const MapQuestions: React.FC<DrivingFormProps> = ({
    cguState,
    onCguChange,
    newEvent,
    onNewEventChange,
}) => {
    const options: Question[] = [
        {
            id: "cgu",
            question: "J'ai lu et accepté les conditions d'utilisation.",
            name: "conditions_utilisation", // 🔥 Correction ici
            options: [
                {
                    id: "cguOk",
                    label: "Oui",
                    value: "oui",
                    condition: true,
                },
            ],
            state: cguState,
            onOptionChange: onCguChange,
        },
        {
            id: "newEvent",
            question: "Je souhaite être informé des prochains évènements.",
            name: "info_evenements", // 🔥 Correction ici
            options: [
                {
                    id: "newEventOk",
                    label: "Oui",
                    value: "oui",
                    condition: true,
                },
            ],
            state: newEvent,
            onOptionChange: onNewEventChange,
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
            {options.map((option: Question) => (
                <div className="questions" key={option.id}>
                    <div className="response boolean-checkbox">
                        {option.options.map((opt: Option) => (
                            <InputCheckbox
                                key={opt.id}
                                option={opt}
                                state={option.state}
                                handleInputClick={(condition: boolean) =>
                                    handleInputClick(option.onOptionChange, option.state, condition)
                                }
                                question={option.name}
                            />
                        ))}
                    </div>
                    <p>{option.question}</p>
                </div>
            ))}
        </div>
    );
};

export default MapQuestions;
