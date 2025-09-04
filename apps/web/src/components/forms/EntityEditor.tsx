"use client";
import React, { useState } from "react";
import clsx from "clsx";
import type { FieldKey, FormMode } from "@domain/core/hooks";
import ReadOnlyView from "./ReadOnlyView";
import EditField from "./EditField";
import EntityForm from "./EntityForm";
import { DeleteButton } from "@components/buttons";

export type EntityEditorProps<T extends Record<string, unknown>> = {
    /** Titre de la section */
    title?: string;
    titleHeading?: string;
    requiredFields?: FieldKey<T>[];
    labelIcon?: (field: FieldKey<T>) => React.ReactNode;
    renderValue?: (field: FieldKey<T>, value: string) => React.ReactNode;
    extraButtons?: (field: FieldKey<T>, value: string) => React.ReactNode;
    deleteLabel?: string;
    className?: string;
    onClearField?: (field: FieldKey<T>, clear: (field: FieldKey<T>) => Promise<void>) => void;
    form: T;
    mode: FormMode;
    dirty: boolean;
    setFieldValue: (field: FieldKey<T>, value: unknown) => void;
    submit: () => Promise<boolean>;
    reset: () => void;
    setForm: React.Dispatch<React.SetStateAction<T>>;
    fields: FieldKey<T>[];
    labels: (field: FieldKey<T>) => string;
    updateEntity?: (field: FieldKey<T>, value: string) => Promise<void>;
    clearField?: (field: FieldKey<T>) => Promise<void>;
    deleteEntity?: () => Promise<void>;
    fieldAutoComplete?: Partial<Record<FieldKey<T>, string>>;
    // ✅ NOUVEAU :
    /** Attributs HTML à appliquer champ par champ (ex: id, placeholder, aria-*) */
    fieldPropsByKey?: Partial<Record<FieldKey<T>, React.InputHTMLAttributes<HTMLInputElement>>>;
    /** Attributs HTML pour le bouton de soumission (ex: aria-label, children pour le libellé) */
    submitButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
};

export default function EntityEditor<T extends Record<string, unknown>>(
    props: EntityEditorProps<T>
) {
    const {
        title,
        titleHeading,
        requiredFields = [],
        labelIcon,
        renderValue,
        extraButtons,
        deleteLabel,
        className,
        onClearField,
        form,
        mode,
        setFieldValue,
        submit,
        reset,
        fields,
        labels,
        updateEntity,
        clearField,
        fieldAutoComplete,
        deleteEntity,
        fieldPropsByKey,
        submitButtonProps,
    } = props;
    const [editModeField, setEditModeField] = useState<{
        field: FieldKey<T>;
        value: string;
    } | null>(null);

    const handleCancel = () => {
        reset();
    };

    const handleClearField = (field: FieldKey<T>) => {
        if (onClearField) {
            onClearField(field, async (f) => {
                await clearField?.(f);
            });
        } else {
            void clearField?.(field);
        }
    };

    return (
        <section className={clsx("entity-editor", className)}>
            <h1 className="entity-editor_title">{title}</h1>

            {mode === "edit" && !editModeField && (
                <ReadOnlyView<T>
                    titleHeading={titleHeading}
                    fields={fields}
                    data={form}
                    labels={labels}
                    labelIcon={labelIcon}
                    renderValue={renderValue}
                    extraButtons={extraButtons}
                    onEditField={setEditModeField}
                    onClearField={handleClearField}
                />
            )}

            {editModeField && (
                <EditField<T>
                    editModeField={editModeField}
                    setEditModeField={setEditModeField}
                    updateEntity={() =>
                        updateEntity
                            ? updateEntity(editModeField.field, editModeField.value).then(() =>
                                  setEditModeField(null)
                              )
                            : Promise.resolve()
                    }
                    labels={labels}
                />
            )}

            {mode === "create" && !editModeField && (
                <EntityForm<T>
                    formData={form}
                    fields={fields}
                    labels={labels}
                    setFieldValue={setFieldValue}
                    handleSubmit={() => submit().then(() => void 0)}
                    isEdit={false}
                    onCancel={handleCancel}
                    requiredFields={requiredFields}
                    fieldPropsByKey={fieldPropsByKey}
                    submitButtonProps={submitButtonProps}
                    fieldAutoComplete={fieldAutoComplete}
                />
            )}

            {mode === "edit" && !editModeField && deleteLabel && (
                <div className="entity-editor_delete-container">
                    <DeleteButton
                        onDelete={() => {
                            void deleteEntity?.();
                        }}
                        label={deleteLabel}
                    />
                </div>
            )}
        </section>
    );
}
