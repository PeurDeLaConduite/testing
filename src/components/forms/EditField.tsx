import { UpdateButton, BackButton } from "@components/buttons";
import React from "react";
import type { FieldKey } from "@entities/core/hooks";
import { autocompleteFor } from "@utils/autocomplete";

export type EditFieldProps<T extends Record<string, unknown>> = {
    editModeField: { field: FieldKey<T>; value: string };
    setEditModeField: React.Dispatch<
        React.SetStateAction<{ field: FieldKey<T>; value: string } | null>
    >;
    updateEntity: () => void;
    labels: (field: FieldKey<T>) => string;
    autoComplete?: string;
};

export default function EditField<T extends Record<string, unknown>>({
    editModeField,
    setEditModeField,
    updateEntity,
    labels,
    autoComplete,
}: EditFieldProps<T>) {
    const { field, value } = editModeField;
    const inputId = React.useId();

    const ac = autocompleteFor<T>(field, autoComplete);
    return (
        <fieldset className="edit-field">
            <legend className="edit-field_legend">
                Modifier mon {labels(field).toLowerCase()} :
            </legend>

            <label htmlFor="edit-field" className="visually-hidden">
                {labels(field)}
            </label>
            <input
                id="edit-field"
                name={String(field)}
                autoComplete={ac}
                className="edit-field_input"
                value={value}
                placeholder={labels(field)}
                title={labels(field)}
                onChange={(e) =>
                    setEditModeField((prev) => (prev ? { ...prev, value: e.target.value } : null))
                }
            />

            <div className="edit-field_actions">
                <BackButton
                    onBack={() => setEditModeField(null)}
                    label="Retour"
                    className="flex-1 ml-2"
                    size="medium"
                />
                <UpdateButton
                    onUpdate={updateEntity}
                    label="Sauvegarder"
                    className="flex-1 mr-2"
                    size="medium"
                />
            </div>
        </fieldset>
    );
}
