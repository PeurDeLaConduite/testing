// src/components/ui/form/EntityForm.tsx
"use client";
import React, { type FormEvent } from "react";
import { UpdateButton, AddButton, CancelButton } from "@components/buttons";
import { type FieldKey } from "@domain/core/hooks";

type Props<T extends Record<string, unknown>> = {
    formData: Partial<T>;
    fields: FieldKey<T>[];
    labels: (field: FieldKey<T>) => string;
    setFieldValue: (field: FieldKey<T>, value: unknown) => void;
    handleSubmit: () => void;
    isEdit: boolean;
    onCancel: () => void;
    requiredFields: FieldKey<T>[];

    // ✅ NOUVEAU :
    fieldPropsByKey?: Partial<Record<FieldKey<T>, React.InputHTMLAttributes<HTMLInputElement>>>;
    submitButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    fieldAutoComplete?: Partial<Record<FieldKey<T>, string>>;
};

export default function EntityForm<T extends Record<string, unknown>>({
    formData,
    fields,
    labels,
    setFieldValue,
    handleSubmit,
    fieldAutoComplete = {},
    isEdit,
    onCancel,
    requiredFields,
    fieldPropsByKey, // ✅
    submitButtonProps, // ✅
}: Props<T>) {
    return (
        <form
            onSubmit={(e: FormEvent) => {
                e.preventDefault();
                handleSubmit();
            }}
            className="entity-form"
        >
            {fields.map((field) => {
                const extra = fieldPropsByKey?.[field] ?? {};
                const htmlId = (extra.id as string) ?? String(field);

                return (
                    <div key={String(field)} className="entity-form_field">
                        <label htmlFor={htmlId} className="entity-form_label">
                            {labels(field)}
                        </label>
                        <input
                            id={htmlId}
                            name={String(field)}
                            autoComplete={fieldAutoComplete[field] ?? "off"}
                            placeholder={String(extra.placeholder ?? labels(field))}
                            aria-describedby={extra["aria-describedby"] as string | undefined}
                            value={String(formData[field] ?? "")}
                            onChange={(e) => setFieldValue(field, e.target.value)}
                            required={requiredFields.includes(field)}
                            className="entity-form_input"
                            {...extra} // ⚠️ en dernier pour permettre la surcharge
                        />
                    </div>
                );
            })}

            <div className="entity-form_actions">
                {isEdit ? (
                    <>
                        <UpdateButton
                            onUpdate={handleSubmit}
                            label={
                                submitButtonProps?.children
                                    ? String(submitButtonProps.children)
                                    : "Enregistrer"
                            }
                            // className="min-w-[120px]"
                            size="medium"
                            aria-label={submitButtonProps?.["aria-label"]}
                        />
                        <CancelButton
                            onCancel={onCancel}
                            label="Annuler"
                            // className="min-w-[120px]"
                            size="medium"
                        />
                    </>
                ) : (
                    <AddButton
                        onAdd={handleSubmit}
                        label={
                            submitButtonProps?.children
                                ? String(submitButtonProps.children)
                                : "Créer"
                        }
                        // className="min-w-[120px]"
                        size="medium"
                        aria-label={submitButtonProps?.["aria-label"]}
                    />
                )}
            </div>
        </form>
    );
}
