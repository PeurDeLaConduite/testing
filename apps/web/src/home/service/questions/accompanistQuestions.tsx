"use client";
import React from "react";
import dynamic from "next/dynamic";
import AccompanistData from "./dataQuestions/accompanistDataQuestions";
import { useDriving } from "../../../utils/context/DrivingContext";

const AccQuestions: React.FC = () => {
    const { isAccompanist, setIsAccompanist, hasPermit, supervisedDriving } = useDriving();

    const onAccompanistChange = (value: boolean | null) => {
        if (value !== null) setIsAccompanist(value);
        // Sinon, tu ignores le null (aucune maj d'état)
    };

    return (
        <>
            {hasPermit === true && supervisedDriving === true && (
                <AccompanistData
                    isAccompanist={isAccompanist}
                    onAccompanistChange={onAccompanistChange}
                />
            )}
        </>
    );
};

export default dynamic(() => Promise.resolve(AccQuestions), {
    ssr: false,
});
