// src/components/ui/form/EntityForm.tsx
"use client";
import React, { type FormEvent } from "react";
import { UpdateButton, AddButton, CancelButton } from "@components/buttons";
import { type FieldKey } from "@entities/core/hooks";

type Props<T extends Record<string, unknown>> = {
    formData: Partial<T>;
    fields: FieldKey<T>[];
    labels: (field: FieldKey<T>) => string;
    setFieldValue: (field: FieldKey<T>, value: unknown) => void;
    handleSubmit: () => void;
    isEdit: boolean;
    onCancel: () => void;
    requiredFields: FieldKey<T>[];
};

export default function EntityForm<T extends Record<string, unknown>>({
    formData,
    fields,
    labels,
    setFieldValue,
    handleSubmit,
    isEdit,
    onCancel,
    requiredFields,
}: Props<T>) {
    return (
        <form
            onSubmit={(e: FormEvent) => {
                e.preventDefault();
                handleSubmit();
            }}
            className="entity-form"
        >
            {fields.map((field) => (
                <div key={String(field)} className="entity-form_field">
                    <label htmlFor={String(field)} className="entity-form_label">
                        {labels(field)}
                    </label>
                    <input
                        id={String(field)}
                        name={String(field)}
                        placeholder={labels(field)}
                        value={String(formData[field] ?? "")}
                        onChange={(e) => setFieldValue(field, e.target.value)}
                        required={requiredFields.includes(field)}
                        className="entity-form_input"
                    />
                </div>
            ))}

            <div className="entity-form_actions">
                {isEdit ? (
                    <>
                        <UpdateButton
                            onUpdate={handleSubmit}
                            label="Enregistrer"
                            className="min-w-[120px]"
                            size="medium"
                        />
                        <CancelButton
                            onCancel={onCancel}
                            label="Annuler"
                            className="min-w-[120px]"
                            size="medium"
                        />
                    </>
                ) : (
                    <AddButton
                        onAdd={handleSubmit}
                        label="Créer"
                        className="min-w-[120px]"
                        size="medium"
                    />
                )}
            </div>
        </form>
    );
}
