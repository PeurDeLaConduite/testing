import React from "react";
import { EditButton, DeleteButton } from "@components/buttons";
import { type FieldKey } from "@entities/core/hooks";

export type ReadOnlyViewProps<T extends Record<string, unknown>> = {
    /** Données partiellement définies */
    data: Partial<T>;
    /** Champs à afficher */
    fields: FieldKey<T>[];
    /** Libellé affiché pour chaque champ */
    labels: (field: FieldKey<T>) => string;
    /** Callback sur le bouton d'édition */
    onEditField: (edit: { field: FieldKey<T>; value: string }) => void;
    /** Callback sur le bouton de suppression */
    onClearField?: (field: FieldKey<T>) => void;
    /** Titre de la section */
    title2?: string;
    /** Permet d'injecter des icônes spécifiques */
    renderIcon?: (field: FieldKey<T>) => React.ReactNode;
    /** Permet d'injecter des boutons supplémentaires */
    extraButtons?: (field: FieldKey<T>, value: string) => React.ReactNode;
    /** Rendu personnalisé de la valeur */
    renderValue?: (field: FieldKey<T>, value: string) => React.ReactNode;
};

export default function ReadOnlyView<T extends Record<string, unknown>>({
    data,
    fields,
    labels,
    onEditField,
    onClearField,
    title2,
    renderIcon,
    extraButtons,
    renderValue,
}: ReadOnlyViewProps<T>) {
    return (
        <div className="read-only-view">
            <h2 className="read-only-view_title">{title2}</h2>
            <div className="read-only-view_list">
                {fields.map((field) => {
                    const raw = data[field];
                    const value = raw === undefined || raw === null ? "" : String(raw);
                    return (
                        <div key={String(field)} className="read-only-view_item">
                            <div className="read-only-view_item-header">
                                <label className="read-only-view_label" htmlFor={field}>
                                    {renderIcon?.(field)} <span>{labels(field)}</span>
                                </label>
                                <div className="read-only-view_actions">
                                    {extraButtons?.(field, value)}
                                    <EditButton
                                        onClick={() => onEditField({ field, value })}
                                        className="!w-8 !h-8"
                                        color="#1976d2"
                                    />
                                    {onClearField && value && (
                                        <DeleteButton
                                            onClick={() => onClearField(field)}
                                            className="!w-8 !h-8"
                                        />
                                    )}
                                </div>
                            </div>
                            <div>
                                {renderValue ? (
                                    renderValue(field, value)
                                ) : value ? (
                                    <p className="read-only-view_value">{value}</p>
                                ) : (
                                    <p className="read-only-view_value read-only-view_value--empty">
                                        Information non disponible
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
