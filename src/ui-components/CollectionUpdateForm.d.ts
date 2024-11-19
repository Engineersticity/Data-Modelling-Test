import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Collection } from "./graphql/types";
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
export declare type CollectionUpdateFormInputValues = {
    tags?: string[];
    representativeId?: string;
};
export declare type CollectionUpdateFormValidationValues = {
    tags?: ValidationFunction<string>;
    representativeId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CollectionUpdateFormOverridesProps = {
    CollectionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    tags?: PrimitiveOverrideProps<TextFieldProps>;
    representativeId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CollectionUpdateFormProps = React.PropsWithChildren<{
    overrides?: CollectionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    collection?: Collection;
    onSubmit?: (fields: CollectionUpdateFormInputValues) => CollectionUpdateFormInputValues;
    onSuccess?: (fields: CollectionUpdateFormInputValues) => void;
    onError?: (fields: CollectionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CollectionUpdateFormInputValues) => CollectionUpdateFormInputValues;
    onValidate?: CollectionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CollectionUpdateForm(props: CollectionUpdateFormProps): React.ReactElement;
