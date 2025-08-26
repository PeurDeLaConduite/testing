// src/entities/core/hooks/useModelForm.ts
"use client";
import { useCallback, useMemo, useRef, useState } from "react";

export type FormMode = "create" | "edit";
export type FieldKey<T> = keyof T & string;
export interface UseModelFormOptions<F, E = Record<string, unknown>> {
    initialForm: F;
    initialExtras?: E;
    mode?: FormMode;
    validate?: (form: F) => Promise<boolean> | boolean;
    create: (form: F) => Promise<string>;
    update: (form: F) => Promise<string>;
    syncRelations?: (id: string, form: F) => Promise<void>;
    /** 🔄 Optionnel : fonction pour recharger la vérité serveur et hydrater le form */
    load?: () => Promise<F | null>;
}

export interface UseModelFormResult<F, E> {
    form: F;
    extras: E;
    mode: FormMode;
    dirty: boolean;
    saving: boolean;
    error: unknown;
    message: string | null;
    handleChange: <K extends keyof F>(field: K, value: F[K]) => void;
    submit: () => Promise<void>;
    reset: () => void;
    setForm: React.Dispatch<React.SetStateAction<F>>;
    setExtras: React.Dispatch<React.SetStateAction<E>>;
    setMode: React.Dispatch<React.SetStateAction<FormMode>>;
    setMessage: React.Dispatch<React.SetStateAction<string | null>>;
    adoptInitial: (next: F, mode?: FormMode) => void;
    /** 🔄 Appelle `options.load()` et met à jour le form + baseline */
    refresh: () => Promise<void>;
}

function deepEqual(a: unknown, b: unknown) {
    try {
        return JSON.stringify(a) === JSON.stringify(b);
    } catch {
        return false;
    }
}

export default function useModelForm<
    F extends Record<string, unknown>,
    E extends Record<string, unknown> = Record<string, unknown>,
>(options: UseModelFormOptions<F, E>): UseModelFormResult<F, E> {
    const {
        initialForm,
        initialExtras,
        mode: initialMode = "create",
        validate,
        create,
        update,
        syncRelations,
        load,
    } = options;

    const initialRef = useRef(initialForm);
    const [form, setForm] = useState<F>(initialForm);
    const [extras, setExtras] = useState<E>((initialExtras as E) ?? ({} as E));
    const [mode, setMode] = useState<FormMode>(initialMode);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<unknown>(null);
    const [message, setMessage] = useState<string | null>(null);

    const dirty = useMemo(() => !deepEqual(form, initialRef.current), [form]);

    const handleChange = useCallback(<K extends keyof F>(field: K, value: F[K]) => {
        setForm((f) => ({ ...f, [field]: value }));
    }, []);

    const reset = useCallback(() => {
        setForm(initialRef.current);
        setMode(initialMode);
        setError(null);
    }, [initialMode]);

    const adoptInitial = useCallback((next: F, nextMode: FormMode = "edit") => {
        initialRef.current = next;
        setForm(next);
        setMode(nextMode);
        setError(null);
        setMessage(null);
    }, []);

    const refresh = useCallback(async () => {
        if (!load) return;
        try {
            const next = await load();
            if (next) {
                adoptInitial(next, "edit");
            }
        } catch (e) {
            setError(e);
        }
    }, [load, adoptInitial]);

    const submit = useCallback(async () => {
        setSaving(true);
        setError(null);
        try {
            if (validate) {
                const valid = await validate(form);
                if (!valid) {
                    setSaving(false);
                    return;
                }
            }
            const id = mode === "create" ? await create(form) : await update(form);
            if (syncRelations) {
                await syncRelations(id, form);
            }
            // 🔄 Tente de recharger depuis la source de vérité si possible
            if (load) {
                await refresh();
            } else {
                setMode("edit");
                initialRef.current = form; // baseline = dernier form sauvegardé
            }
        } catch (e) {
            setError(e);
        } finally {
            setSaving(false);
        }
    }, [form, mode, validate, create, update, syncRelations, load, refresh]);

    return {
        form,
        extras,
        mode,
        dirty,
        saving,
        error,
        message,
        handleChange,
        submit,
        reset,
        setForm,
        setExtras,
        setMode,
        setMessage,
        adoptInitial,
        refresh,
    };
}
