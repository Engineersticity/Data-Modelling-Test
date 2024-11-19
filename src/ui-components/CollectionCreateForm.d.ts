import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CollectionCreateFormInputValues = {
    tags?: string[];
    representativeId?: string;
};
export declare type CollectionCreateFormValidationValues = {
    tags?: ValidationFunction<string>;
    representativeId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CollectionCreateFormOverridesProps = {
    CollectionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    tags?: PrimitiveOverrideProps<TextFieldProps>;
    representativeId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CollectionCreateFormProps = React.PropsWithChildren<{
    overrides?: CollectionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CollectionCreateFormInputValues) => CollectionCreateFormInputValues;
    onSuccess?: (fields: CollectionCreateFormInputValues) => void;
    onError?: (fields: CollectionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CollectionCreateFormInputValues) => CollectionCreateFormInputValues;
    onValidate?: CollectionCreateFormValidationValues;
} & React.CSSProperties>;
export default function CollectionCreateForm(props: CollectionCreateFormProps): React.ReactElement;
