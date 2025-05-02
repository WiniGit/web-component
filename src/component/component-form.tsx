import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import { CSSProperties, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "./text/text";
import { TextField } from "./text-field/text-field";
import { Winicon } from "./wini-icon/winicon";
import { TextArea } from "./text-area/text-area";
import { DateTimePicker } from "./date-time-picker/date-time-picker";
import { CustomCkEditor5 } from "./ck-editor/ckeditor";
import { Select1 } from "./select1/select1";
import { SelectMultiple } from "./input-multi-select/input-multi-select";
import { Switch } from "./switch/switch";
import { Rating } from "./rating/rating";
import { Checkbox } from "./checkbox/checkbox";
import { RadioButton } from "./radio-button/radio-button";
import { ImportFile } from "./import-file/import-file";
import { CkEditorUploadAdapter } from "../controller/config";
import { Util } from "../controller/utils";

interface DateRangeProps {
    start?: Date,
    end?: Date,
    /** type: 1: daily, 2: weekly, 3: monthly */
    repeatData?: { type: 1 | 2 | 3, value: Array<string | number> }
}

interface SimpleFormProps {
    id?: string,
    label?: string,
    labelElement?: ReactNode,
    placeholder?: string,
    methods: UseFormReturn<FieldValues, any, undefined>,
    name: string,
    className?: string,
    style?: CSSProperties,
    disabled?: boolean,
    required?: boolean,
}

interface TextFieldFormProps extends SimpleFormProps {
    type?: React.HTMLInputTypeAttribute | "money",
    maxLength?: number,
    readOnly?: boolean,
    autoFocus?: boolean,
    suffix?: ReactNode,
    prefix?: ReactNode,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onBlur?: React.FocusEventHandler<HTMLInputElement>,
    onFocus?: React.FocusEventHandler<HTMLInputElement>,
    textFieldStyle?: CSSProperties,
    textFieldClassName?: string,
}

export function TextFieldForm({ style = {}, textFieldStyle = {}, ...params }: TextFieldFormProps) {
    const { t } = useTranslation()

    return <div id={params.id} className={params.className ?? 'col'} style={{ gap: '0.8rem', overflow: 'visible', width: '100%', ...style }}>
        {params.labelElement ?? (params.label ? <div className="row" style={{ gap: '0.4rem', minWidth: "16rem" }}>
            <Text className={"label-3"}>{params.label}</Text>
            {params.required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
        </div> : null)}
        <TextField
            className={params.textFieldClassName ?? "body-3"}
            autoFocus={params.autoFocus}
            style={{ width: '100%', flex: params.className?.includes('row') ? 1 : undefined, ...(params.type === 'money' ? { ...textFieldStyle, height: '4rem', padding: '0 0 0 1.6rem' } : textFieldStyle) }}
            placeholder={params.placeholder ? params.placeholder : params.label ? `${t("input")} ${params.label.toLowerCase()}` : ''}
            suffix={!params.suffix && params.type === 'money' ?
                <div className="row" style={{ padding: '0 1.6rem', height: '100%', background: 'var(--neutral-main-background-color,light-dark(#EFEFF0, #313135))', borderLeft: '1px solid var(--neutral-bolder-border-color,light-dark(#D7D7DB, #494950))', borderRadius: '0 0.8rem 0.8rem 0' }} >
                    <Text className="button-text-3" style={{ color: 'var(--neutral-text-subtitle-color,light-dark(#61616B, #A2A2AA))' }}>VND</Text>
                </div> : params.suffix}
            prefix={params.prefix}
            disabled={params.disabled}
            readOnly={params.readOnly}
            type={params.type === 'money' ? 'text' : params.type}
            name={params.name}
            register={params.methods.register(params.name, {
                required: params.required,
                onBlur: params.type === 'money' ? (ev) => {
                    let newPrice = ev.target.value.trim().replaceAll(',', '')
                    ev.target.type = "text"
                    if (!isNaN(parseFloat(newPrice))) {
                        ev.target.value = Util.money(parseFloat(newPrice))
                    } else {
                        ev.target.value = ''
                    }
                } : params.onBlur,
                onChange: params.onChange,
            }) as any}
            onFocus={params.type === 'money' ? (ev: any) => {
                ev.target.value = ev.target.value.replaceAll(',', '')
                ev.target.type = "number"
            } : params.onFocus}
            maxLength={params.maxLength}
            onComplete={(ev: any) => { ev.target.blur() }}
            helperText={convertErrors(params.methods.formState.errors, params.name) && (convertErrors(params.methods.formState.errors, params.name)?.message?.length ? convertErrors(params.methods.formState.errors, params.name)?.message : `${t("input")} ${(params.placeholder ? params.placeholder : params.label ? `${params.label}` : t('value')).toLowerCase()}`)}
        />
    </div>
}

interface InputPasswordFormProps extends SimpleFormProps {
    maxLength?: number,
    readOnly?: boolean,
    autoFocus?: boolean,
    prefix?: ReactNode,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onBlur?: React.FocusEventHandler<HTMLInputElement>,
    onFocus?: React.FocusEventHandler<HTMLInputElement>,
    textFieldStyle?: CSSProperties,
    textFieldClassName?: string,
}

export const InputPasswordForm = (params: InputPasswordFormProps) => {
    const [isShowPass, setIsShowPass] = useState<boolean>(false)

    return <TextFieldForm
        {...params}
        type={isShowPass ? "text" : "password"}
        suffix={<Winicon src={`outline/user interface/${isShowPass ? "view" : "hide"}`} size={"1.4rem"} onClick={() => { setIsShowPass(!isShowPass) }} />}
    />
}

interface TextAreaFormProps extends SimpleFormProps {
    type?: React.HTMLInputTypeAttribute | "money",
    maxLength?: number,
    readOnly?: boolean,
    autoFocus?: boolean,
    suffix?: ReactNode,
    prefix?: ReactNode,
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>,
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>,
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement>,
    textAreaStyle?: CSSProperties,
    textAreaClassName?: string,
}

export function TextAreaForm(params: TextAreaFormProps) {
    const { t } = useTranslation()

    return <div id={params.id} className={params.className ?? 'col'} style={{ gap: '0.8rem', overflow: 'visible', width: '100%', height: '10rem', ...(params.style ?? {}) }}>
        {params.labelElement ?? (params.label ? <div className="row" style={{ gap: '0.4rem', minWidth: "16rem" }}>
            <Text className={"label-3"}>{params.label}</Text>
            {params.required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
        </div> : null)}
        <TextArea
            {...params}
            className={params.textAreaClassName ?? "body-3"}
            register={params.methods.register(params.name, {
                required: params.required,
                onBlur: params.onBlur,
                onChange: params.onChange
            }) as any}
            style={{ width: '100%', height: '100%', flex: 1, ...(params.textAreaStyle ?? {}) }}
            placeholder={params.placeholder ? params.placeholder : params.label ? `${t("input")} ${params.label.toLowerCase()}` : ''}
            helperText={convertErrors(params.methods.formState.errors, params.name) && (convertErrors(params.methods.formState.errors, params.name)?.message?.length ? convertErrors(params.methods.formState.errors, params.name)?.message : `${t("input")} ${(params.placeholder ? params.placeholder : params.label ? `${params.label}` : t('value')).toLowerCase()}`)}
        />
    </div>
}

interface DateTimePickerFormProps extends SimpleFormProps {
    type?: "date" | "datetime",
    pickOnly?: boolean,
    autoFocus?: boolean,
    suffix?: ReactNode,
    prefix?: ReactNode,
    onChange?: (ev?: Date | DateRangeProps) => void,
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>,
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement>,
    textAreaStyle?: CSSProperties,
    textAreaClassName?: string,
}

export function DateTimePickerForm(params: DateTimePickerFormProps) {
    const _covertErrors = useMemo(() => params.name ? convertErrors(params.methods.formState.errors, params.name) : undefined, [params.name, params.methods.formState.errors?.[params.name!]])
    const { t } = useTranslation()

    return <Controller
        name={params.name}
        control={params.methods.control}
        rules={{ required: params.required }}
        render={({ field }) => {
            return <div className={params.className ?? 'col'} style={{ gap: '0.8rem', overflow: 'visible', width: '100%', ...(params.style ?? {}) }}>
                {params.labelElement ?? (params.label ? <div className="row" style={{ gap: '0.4rem', minWidth: "16rem" }}>
                    <Text className={"label-3"}>{params.label}</Text>
                    {params.required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
                </div> : null)}
                <DateTimePicker
                    style={{ width: '100%', flex: params.className?.includes('row') ? 1 : undefined }}
                    className="body-3"
                    placeholder={params.placeholder ? params.placeholder : params.label ? `${t("choose")} ${params.label.toLowerCase()}` : ''}
                    value={field.value}
                    disabled={params.disabled}
                    pickerType={params.type}
                    pickOnly={params.pickOnly}
                    onChange={(date) => {
                        field.onChange(date);
                        if (params.onChange) params.onChange(date);
                    }}
                    helperText={_covertErrors && (_covertErrors?.message?.length ? _covertErrors?.message : `${(params.placeholder ? params.placeholder : params.label ? `${t("choose")} ${params.label}` : t('value')).toLowerCase()}`)}
                />
            </div>
        }}
    />
}

interface CKEditorFormProps extends SimpleFormProps {
    ckEditorUploadPlugin?: Array<any>,
    customConfig?: { [p: string]: any }
}

export function CKEditorForm(params: CKEditorFormProps) {
    const _covertErrors = useMemo(() => params.name ? convertErrors(params.methods.formState.errors, params.name) : undefined, [params.name, params.methods.formState.errors?.[params.name!]])
    const { t } = useTranslation()
    return <Controller
        name={params.name}
        control={params.methods.control}
        rules={{ required: params.required }}
        render={({ field }) => {
            return <div className={params.className ?? 'col'} style={{ gap: '0.8rem', overflow: 'visible', width: '100%', ...(params.style ?? {}) }}>
                {params.labelElement ?? (params.label ? <div className="row" style={{ gap: '0.4rem', minWidth: "16rem" }}>
                    <Text className={"label-3"}>{params.label}</Text>
                    {params.required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
                </div> : null)}
                <CustomCkEditor5
                    style={params.className?.includes("row") ? { flex: 1, overflow: "hidden visible" } : undefined}
                    value={field.value}
                    disabled={params.disabled}
                    customConfig={params.customConfig as any}
                    extraPlugins={params.ckEditorUploadPlugin ?? [function (editor: { plugins: { get: (arg0: string) => { (): any; new(): any; createUploadAdapter: (loader: any) => CkEditorUploadAdapter; }; }; }) {
                        editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
                            return new CkEditorUploadAdapter(loader);
                        };
                    }]}
                    onBlur={(_: any, editor: any) => { field.onChange(editor.getData()) }}
                    placeholder={params.placeholder ? params.placeholder : params.label ? `${t("input")} ${params.label.toLowerCase()}` : ''}
                    helperText={_covertErrors && (_covertErrors?.message?.length ? _covertErrors?.message : `${t("input")} ${(params.placeholder ? params.placeholder : params.label ? `${params.label}` : t('value')).toLowerCase()}`)} />
            </div>;
        }}
    />
}

interface Select1FormProps extends SimpleFormProps {
    options: Array<{ id: string | number, name: string, [p: string]: any }>
    handleSearch?: (e: string) => Promise<Array<any>>,
    handleLoadmore?: ((onLoadMore: boolean, ev: React.UIEvent<HTMLDivElement, UIEvent>) => void),
    readonly?: boolean,
    onChange?: (v?: { id: string | number, name: string, [p: string]: any }) => void,
    select1Style?: CSSProperties;
    prefix?: ReactNode
}

export function Select1Form(params: Select1FormProps) {
    const _covertErrors = useMemo(() => params.name ? convertErrors(params.methods.formState.errors, params.name) : undefined, [params.name, params.methods.formState.errors?.[params.name!]])
    const { t } = useTranslation()

    return <Controller
        name={params.name}
        control={params.methods.control}
        rules={{ required: params.required }}
        render={({ field }) => {
            return <div className={params.className ?? 'col'} style={{ gap: '0.8rem', overflow: 'visible', width: '100%', ...(params.style ?? {}) }}>
                {params.labelElement ?? (params.label ? <div className="row" style={{ gap: '0.4rem', minWidth: "16rem" }}>
                    <Text className={"label-3"}>{params.label}</Text>
                    {params.required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
                </div> : null)}
                <Select1
                    readOnly={params.readonly}
                    className="body-3"
                    style={{ width: '100%', padding: "0 1.6rem", height: '4rem', flex: params.className?.includes('row') ? 1 : undefined, ...(params.select1Style ?? {}) }}
                    placeholder={params.placeholder ? params.placeholder : params.label ? `${t("choose")} ${params.label.toLowerCase()}` : ''}
                    value={field.value}
                    options={params.options}
                    disabled={params.disabled}
                    onChange={(ev: any) => {
                        field.onChange(ev?.id);
                        if (params.onChange) params.onChange(ev as any);
                    }}
                    prefix={params.prefix}
                    suffix={params.required || [undefined, null, ''].includes(field.value) || params.disabled ? undefined : <Winicon src="outline/user interface/c-remove" size={"1.4rem"} onClick={() => field.onChange(undefined)} />}
                    handleLoadmore={params.handleLoadmore}
                    handleSearch={params.handleSearch}
                    helperText={_covertErrors && (_covertErrors?.message?.length ? _covertErrors?.message : `${(params.placeholder ? params.placeholder : params.label ? `${t("choose")} ${params.label}` : 'value').toLowerCase()}`)} />
            </div>;
        }}
    />
}

interface SelectMultipleFormProps extends SimpleFormProps {
    options: Array<{ id: string | number, name: string, [p: string]: any }>,
    handleLoadmore?: ((onLoadMore: boolean, ev: React.UIEvent<HTMLDivElement, UIEvent>) => void),
    readonly?: boolean,
    onChange?: (v?: Array<string | number>) => void,
    select1Style?: CSSProperties;
    prefix?: ReactNode
}

export function SelectMultipleForm(params: SelectMultipleFormProps) {
    const _covertErrors = useMemo(() => params.name ? convertErrors(params.methods.formState.errors, params.name) : undefined, [params.name, params.methods.formState.errors?.[params.name!]])
    const { t } = useTranslation()

    return <Controller
        name={params.name}
        control={params.methods.control}
        rules={{ required: params.required }}
        render={({ field }) => {
            return <div className={params.className ?? 'col'} style={{ gap: '0.8rem', overflow: 'visible', width: '100%', ...(params.style ?? {}) }}>
                {params.labelElement ?? (params.label ? <div className="row" style={{ gap: '0.4rem', minWidth: "16rem" }}>
                    <Text className={"label-3"}>{params.label}</Text>
                    {params.required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
                </div> : null)}
                <SelectMultiple
                    className="body-3"
                    prefix={params.prefix}
                    style={{ width: '100%', borderRadius: '0.8rem', flex: params.className?.includes('row') ? 1 : undefined }}
                    placeholder={params.placeholder ? params.placeholder : params.label ? `${t("choose")} ${params.label.toLowerCase()}` : ''}
                    value={typeof field.value === "string" ? undefined : field.value}
                    options={params.options as any}
                    disabled={params.disabled}
                    onChange={(listValue: any) => {
                        field.onChange(listValue);
                        if (params.onChange) params.onChange(listValue);
                    }}
                    handleLoadmore={params.handleLoadmore}
                    helperText={_covertErrors && (_covertErrors?.message?.length ? _covertErrors?.message : `${(params.placeholder ? params.placeholder : params.label ? `${t("choose")} ${params.label}` : t('value')).toLowerCase()}`)} />
            </div>;
        }}
    />
}

interface SwitchFormProps extends SimpleFormProps {
    onChange?: (v: boolean) => void,
    size?: string | number,
}

export function SwitchForm(params: SwitchFormProps) {
    return <Controller
        name={params.name}
        control={params.methods.control}
        render={({ field }) => <div className={params.className ?? 'row'} style={{ gap: '0.8rem', ...(params.style ?? {}) }}>
            <Switch name={params.name} value={field.value} disabled={params.disabled} size={params.size} onChange={(newValue) => {
                field.onChange(newValue)
                if (params.onChange) params.onChange(newValue)
            }} />
            {params.labelElement ?? <Text className={"label-3"} maxLine={1}>{params.label}</Text>}
        </div>}
    />
}

interface RateFormProps extends SimpleFormProps {
    onChange?: (v: number) => void,
    size?: string | number,
}

export function RateForm(params: RateFormProps) {
    return <Controller
        name={params.name}
        control={params.methods.control}
        render={({ field }) => <div className="row" style={{ gap: '0.8rem', ...(params.style ?? {}) }}>
            {params.labelElement ?? <Text className={"label-3"} maxLine={1}>{params.label}</Text>}
            <Rating value={field.value} size={params.size} onChange={(newValue: any) => {
                field.onChange(newValue)
                if (params.onChange) params.onChange(newValue)
            }} />
        </div>}
    />
}

interface CheckboxFormProps extends SimpleFormProps {
    onChange?: (v: boolean) => void,
    size?: string | number,
    radius?: string | number,
}

export function CheckboxForm(params: CheckboxFormProps) {
    return <label className="row" style={{ gap: '0.8rem', ...(params.style ?? {}) }}>
        <Checkbox value={params.methods.watch(params.name)} disabled={params.disabled} size={params.size} onChange={(newValue) => {
            params.methods.setValue(params.name, newValue)
            if (params.onChange) params.onChange(newValue)
        }} style={{ borderRadius: params.radius ?? '0.4rem' }} />
        {params.labelElement ?? <Text className={"label-4"} maxLine={1}>{params.label}</Text>}
    </label>
}

interface RadioButtonFormProps extends SimpleFormProps {
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    size?: string | number,
    value?: string
}

export function RadioButtonForm(params: RadioButtonFormProps) {
    return <label className={`row ${params.className ?? ""}`} style={{ gap: "0.8rem", ...(params.style ?? {}) }}>
        <Controller
            name={params.name}
            control={params.methods.control}
            render={({ field }) => <RadioButton
                value={params.value}
                disabled={params.disabled}
                size={params.size ?? '1.6rem'}
                name={params.name}
                checked={field.value === params.value}
                onChange={(ev) => {
                    field.onChange(ev.target.value)
                    if (params.onChange) params.onChange(ev)
                }}
            />}
        />
        {params.label ? <Text className="label-4" maxLine={1}>{params.label}</Text> : null}
    </label>
}

interface GroupRadioButtonFormProps extends SimpleFormProps {
    options: Array<{ id: string | number, name: string, [p: string]: any }>,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
}

export function GroupRadioButtonForm(params: GroupRadioButtonFormProps) {
    return <div className={params.className ?? "col"} style={{ gap: '0.8rem', width: '100%', ...(params.style ?? {}) }}>
        {params.labelElement ?? (params.label ? <div className="row" style={{ gap: '0.4rem', minWidth: "16rem" }}>
            <Text className={"label-3"}>{params.label}</Text>
            {params.required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
        </div> : null)}
        <div className="row" style={{ gap: '1.6rem', flex: 1, flexWrap: 'wrap' }}>
            {params.options?.map(e => {
                return <RadioButtonForm
                    key={e.id}
                    label={e.name}
                    name={params.name}
                    value={`${e.id}`}
                    size={'1.8rem'}
                    onChange={params.onChange}
                    methods={params.methods}
                />
            })}
        </div>
    </div>
}

interface ImportFileFormProps extends SimpleFormProps {
    multiple?: boolean,
    maxSize?: number,
    allowType?: Array<string>,
    onChange?: (a?: Array<File> | Array<{ [p: string]: any }>) => void,
    title?: string,
    subTitle?: string,
    direction?: 'row' | 'column'
}

export function ImportFileForm(params: ImportFileFormProps) {
    const _covertErrors = useMemo(() => params.name ? convertErrors(params.methods.formState.errors, params.name) : undefined, [params.name, params.methods.formState.errors?.[params.name!]])
    const { t } = useTranslation()

    return <Controller
        name={params.name}
        control={params.methods.control}
        rules={{ required: params.required }}
        render={({ field }) => {
            return <div className={params.className ?? 'col'} style={{ gap: '0.8rem', overflow: 'visible', width: '100%', ...(params.style ?? {}) }}>
                {params.labelElement ?? (params.label ? <div className="row" style={{ gap: '0.4rem', minWidth: "16rem" }}>
                    <Text className={"label-3"}>{params.label}</Text>
                    {params.required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
                </div> : null)}
                <ImportFile maxSize={params.maxSize} multiple={params.multiple} label={params.title} subTitle={params.subTitle} allowType={params.allowType} value={field.value} disabled={params.disabled}
                    style={{ width: '100%', borderStyle: 'dashed', maxWidth: '100%', flex: params.className?.includes("row") ? 1 : undefined }} className={`${params.className ?? ''} ${params.direction ?? 'row'}`}
                    onChange={(ev: any) => {
                        field.onChange(ev);
                        if (params.onChange) params.onChange(ev);
                    }}
                    helperText={_covertErrors && (_covertErrors?.message?.length ? _covertErrors?.message : `${(params.label ? `${t("upload")} ${params.label}` : t('file')).toLowerCase()}`)} />
            </div>;
        }}
    />
}

interface RangeFormProps extends SimpleFormProps {
    endName: string,
    type?: 'number' | "money" | "daterange" | "datetimerange",
    placeholderStart?: string,
    placeholderEnd?: string,
}

/** type: number | date | date-time | money */
export function RangeForm(params: RangeFormProps) {
    const { t } = useTranslation()

    return <div className={`input-range-container ${params.className ?? 'col'}`} style={{ gap: '0.8rem', width: '100%', ...(params.style ?? {}) }} >
        {params.labelElement ?? (params.label ? <div className="row" style={{ gap: '0.4rem', minWidth: "16rem" }}>
            <Text className={"label-3"}>{params.label}</Text>
            {params.required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
        </div> : null)}
        <div className="row" style={{ gap: '0.8rem', width: '100%', flex: params.className?.includes('row') ? 1 : undefined }}>
            {
                params.type === 'number' || params.type === 'money' ? <>
                    <TextField
                        style={{ width: '100%', flex: 1, ...(params.type === 'money' ? { height: '4rem', padding: '0 0 0 1.6rem' } : {}) }}
                        placeholder={params.placeholderStart ?? t('from')}
                        disabled={params.disabled}
                        type={params.type === 'number' ? 'number' : 'text'}
                        name={params.name}
                        suffix={params.type === 'money' ?
                            <div className="row" style={{ padding: '0 1.6rem', height: '100%', background: 'var(--neutral-main-background-color,light-dark(#EFEFF0, #313135))', borderLeft: '1px solid var(--neutral-bolder-border-color,light-dark(#D7D7DB, #494950))', borderRadius: '0 0.8rem 0.8rem 0' }} >
                                <Text className="button-text-3" style={{ color: 'var(--neutral-text-subtitle-color,light-dark(#61616B, #A2A2AA))' }}>VND</Text>
                            </div> : undefined}
                        onFocus={params.type === 'money' ? (ev) => {
                            ev.target.value = ev.target.value.replaceAll(',', '')
                            ev.target.type = "number"
                        } : undefined}
                        register={params.methods.register(params.name, {
                            onBlur: (ev) => {
                                const newValue = parseFloat(ev.target.value)
                                ev.target.type = "text"
                                if (!isNaN(newValue)) {
                                    if (params.methods.getValues(params.endName)?.length) {
                                        const endValue = parseFloat(params.methods.getValues(params.endName).replace(/,/g, ''))
                                        if (endValue < newValue) {
                                            params.methods.setError(params.name, { message: 'From value must be less than To value' })
                                        }
                                    }
                                    if (params.type === 'money') ev.target.value = Util.money(newValue)
                                } else {
                                    ev.target.value = ""
                                }
                            },
                        }) as any}
                        helperText={(convertErrors(params.methods.formState.errors, params.name) || convertErrors(params.methods.formState.errors, params.endName)) && (convertErrors(params.methods.formState.errors, params.name)?.message?.length ? convertErrors(params.methods.formState.errors, params.name)?.message : `Please input ${params.label?.toLowerCase() ?? 'value'}`)}
                    />
                    <Winicon src={"fill/arrows/arrow-right"} size={"1.6rem"} />
                    <TextField
                        style={{ width: '100%', flex: 1, ...(params.type === 'money' ? { height: '4rem', padding: '0 0 0 1.6rem' } : {}) }}
                        placeholder={params.placeholderEnd ?? t('to')}
                        disabled={params.disabled}
                        type={params.type === 'number' ? 'number' : 'text'}
                        name={params.endName}
                        suffix={params.type === 'money' ?
                            <div className="row" style={{ padding: '0 1.6rem', height: '100%', background: 'var(--neutral-main-background-color,light-dark(#EFEFF0, #313135))', borderLeft: '1px solid var(--neutral-bolder-border-color,light-dark(#D7D7DB, #494950))', borderRadius: '0 0.8rem 0.8rem 0' }} >
                                <Text className="button-text-3" style={{ color: 'var(--neutral-text-subtitle-color,light-dark(#61616B, #A2A2AA))' }}>VND</Text>
                            </div> : undefined}
                        onFocus={params.type === 'money' ? (ev) => {
                            ev.target.value = ev.target.value.replace(/,/g, '')
                            ev.target.type = "number"
                        } : undefined}
                        register={params.methods.register(params.endName, {
                            onBlur: (ev) => {
                                const newValue = parseFloat(ev.target.value)
                                ev.target.type = "text"
                                if (!isNaN(newValue)) {
                                    if (params.methods.getValues(params.name)?.length) {
                                        const startValue = parseFloat(params.methods.getValues(params.name).replace(/,/g, ''))
                                        if (startValue > newValue) {
                                            params.methods.setError(params.name, { message: 'From value must be less than To value' })
                                        }
                                    }
                                    if (params.type === 'money') ev.target.value = Util.money(newValue)
                                } else {
                                    ev.target.value = ""
                                }
                            },
                        }) as any}
                    />
                </> : <DateTimePicker
                    style={{ width: '100%', flex: params.className?.includes('row') ? 1 : undefined }}
                    className="body-3"
                    placeholder={params.placeholder ? params.placeholder : params.label ? `${t("choose")} ${params.label.toLowerCase()}` : ''}
                    value={params.methods.watch(params.name)}
                    endValue={params.methods.watch(params.endName)}
                    disabled={params.disabled}
                    pickerType={params.type}
                    onChange={(date: any) => {
                        params.methods.setValue(params.name, date?.start)
                        params.methods.setValue(params.endName, date?.end)
                    }}
                />
            }
        </div>
    </div>
}

interface GroupCheckboxFormFrops extends SimpleFormProps {
    dataType: 'string' | 'list',
    options: Array<{ id: string | number, name: string, [p: string]: any }>,
    onChange?: (v: Array<{ id: string | number, name: string, [p: string]: any }>) => void
}

/** dataType: string | list */
export function GroupCheckboxForm(params: GroupCheckboxFormFrops) {
    return <Controller
        name={params.name}
        control={params.methods.control}
        render={({ field }) => <div className={params.className ?? 'col'} style={{ gap: '0.8rem', width: '100%', alignItems: 'start', ...(params.style ?? {}) }}>
            {params.labelElement ?? (params.label ? <div className="row" style={{ gap: '0.4rem', minWidth: "16rem" }}>
                <Text className={"label-3"}>{params.label}</Text>
                {params.required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
            </div> : null)}
            <div className="row" style={{ gap: '1.6rem', flex: 1, flexWrap: 'wrap' }}>
                {params.options.map(e => {
                    return <label key={e.id} className="row" style={{ gap: '0.8rem' }}>
                        <Checkbox
                            disabled={params.disabled}
                            size={'1.6rem'}
                            value={(params.dataType === 'string' ? (field.value?.split(',') ?? []) : field.value).includes(e.id)}
                            onChange={(vl) => {
                                let listValue = params.dataType === 'string' ? (field.value?.split(',') ?? []) : field.value
                                if (vl) listValue.push(e.id)
                                else listValue = listValue.filter((el: any) => el !== e.id)
                                listValue = params.dataType === 'string' ? listValue.join(',') : listValue
                                field.onChange(listValue)
                                if (params.onChange) params.onChange(listValue)
                            }}
                        />
                        <Text className="label-4" maxLine={1}>{e.name}</Text>
                    </label>
                })}
            </div>
        </div>}
    />
}

interface ColorPickerForm extends SimpleFormProps {
    onChange?: (v: string) => void,
    textFieldStyle?: CSSProperties
}

export const ColorPickerForm = (props: ColorPickerForm) => {
    const _covertErrors = useMemo(() => props.name ? convertErrors(props.methods.formState.errors, props.name) : undefined, [props.name, props.methods.formState.errors?.[props.name!]])
    const colorPickerRef = useRef<any>(null)
    const { t } = useTranslation()

    useEffect(() => {
        const propsValue = props.methods.watch(props.name)
        if (propsValue && colorPickerRef.current) {
            colorPickerRef.current.querySelector('input[type="color"]').value = propsValue.slice(0, 7)
            colorPickerRef.current.querySelector('input[type="text"]').value = propsValue.slice(0, 7)
            colorPickerRef.current.querySelector('input[type="number"]').value = Util.hexToPercent(propsValue.slice(7))
        } else if (colorPickerRef.current) {
            colorPickerRef.current.querySelector('input[type="color"]').value = '#000000'
            colorPickerRef.current.querySelector('input[type="text"]').value = ''
            colorPickerRef.current.querySelector('input[type="number"]').value = ''
        }
    }, [props.methods.watch(props.name)])

    return <Controller
        name={props.name}
        control={props.methods.control}
        render={({ field }) => {
            return <div ref={colorPickerRef} className={props.className ?? 'col'} style={{ gap: '0.8rem', overflow: 'visible', width: '100%', ...(props.style ?? {}) }}>
                {props.labelElement ?? (props.label ? <div className="row" style={{ gap: '0.4rem', minWidth: "16rem" }}>
                    <Text className={"label-3"}>{props.label}</Text>
                    {props.required ? <Text className="label-4" style={{ color: '#E14337' }}>*</Text> : null}
                </div> : null)}
                <TextField
                    className="body-3"
                    placeholder={props.placeholder ? props.placeholder : props.label ? `${t("input")} ${props.label.toLowerCase()}` : ''}
                    onComplete={(ev: any) => ev.target.blur()}
                    onFocus={(ev) => ev.target.select()}
                    disabled={props.disabled}
                    onBlur={(ev) => {
                        const newVl = ev.target.value.replace(/#/g, "").substring(0, 6);
                        const _opacityValue = colorPickerRef.current.querySelector('input[type="number"]');
                        const newValue = `#${newVl}${Util.percentToHex(parseInt(_opacityValue.value?.length ? _opacityValue.value : "100")).toLowerCase()}`
                        field.onChange(newValue);
                        if (props.onChange) props.onChange(newValue)
                    }}
                    style={{ flex: 1, width: "100%", ...(props.textFieldStyle ?? {}) }}
                    maxLength={7}
                    prefix={<label style={{ backgroundColor: props.methods.watch(props.name), borderRadius: "0.6rem", width: "2.2rem", height: "2.2rem", border: "1px solid var(--neutral-lighter-border-color,light-dark(#F4F4F5, #242428))" }}>
                        <input
                            type='color'
                            disabled={props.disabled}
                            style={{ visibility: 'hidden' }}
                            onChange={(ev) => {
                                const _opacityValue = colorPickerRef.current.querySelector('input[type="number"]');
                                const newValue = `${ev.target.value}${Util.percentToHex(parseInt(_opacityValue.value?.length ? _opacityValue.value : "100")).toLowerCase()}`
                                field.onChange(newValue);
                                if (props.onChange) props.onChange(newValue)
                            }} />
                    </label>}
                    suffix={<>
                        <input
                            type='number'
                            placeholder="opacity"
                            style={{ borderLeft: "1px solid var(--neutral-bolder-border-color,light-dark(#D7D7DB, #494950))", width: "10%", flex: "none", paddingLeft: "0.8rem", minWidth: "3.6rem" }}
                            onKeyDown={(ev: any) => ev.key.toLowerCase() === 'enter' && ev.target.blur()}
                            onFocus={(ev) => ev.target.select()}
                            disabled={props.disabled}
                            onBlur={(ev) => {
                                let _vl = parseInt(ev.target.value);
                                if (isNaN(_vl) || _vl > 100) _vl = 100;
                                else if (_vl < 0) _vl = 0;
                                const _colorValue = colorPickerRef.current?.querySelector('input[type="color"]').value;
                                const newValue = `${_colorValue}${Util.percentToHex(_vl).toLowerCase()}`
                                field.onChange(newValue);
                                if (props.onChange) props.onChange(newValue)
                            }} />
                        <Text className='regular1'>%</Text>
                    </>}
                    helperText={_covertErrors && (_covertErrors?.message?.length ? _covertErrors?.message : `${t("input")} ${(props.placeholder ? props.placeholder : props.label ? `${props.label}` : t("value")).toLowerCase()}`)} />
            </div>;
        }}
    />
}

const convertErrors = (errors: any, name: string) => {
    if (errors && Object.keys(errors).length) {
        const props = name.split(/[.\[\]]/).filter(e => e?.length > 0)
        var value = errors
        for (let p of props) {
            if (value)
                value = value[p]
        }
        return value
    }
    return undefined
}