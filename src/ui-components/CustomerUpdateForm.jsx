/* eslint-disable */
"use client";
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getCustomer } from "./graphql/queries";
import { updateCustomer } from "./graphql/mutations";
const client = generateClient();
export default function CustomerUpdateForm(props) {
  const {
    customerId: customerIdProp,
    customer: customerModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    customerId: "",
    name: "",
    engagementStage: "",
  };
  const [customerId, setCustomerId] = React.useState(initialValues.customerId);
  const [name, setName] = React.useState(initialValues.name);
  const [engagementStage, setEngagementStage] = React.useState(
    initialValues.engagementStage
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = customerRecord
      ? { ...initialValues, ...customerRecord }
      : initialValues;
    setCustomerId(cleanValues.customerId);
    setName(cleanValues.name);
    setEngagementStage(cleanValues.engagementStage);
    setErrors({});
  };
  const [customerRecord, setCustomerRecord] = React.useState(customerModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = customerIdProp
        ? (
            await client.graphql({
              query: getCustomer.replaceAll("__typename", ""),
              variables: { customerId: customerIdProp },
            })
          )?.data?.getCustomer
        : customerModelProp;
      setCustomerRecord(record);
    };
    queryData();
  }, [customerIdProp, customerModelProp]);
  React.useEffect(resetStateValues, [customerRecord]);
  const validations = {
    customerId: [{ type: "Required" }],
    name: [],
    engagementStage: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          customerId,
          name: name ?? null,
          engagementStage: engagementStage ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateCustomer.replaceAll("__typename", ""),
            variables: {
              input: {
                customerId: customerRecord.customerId,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "CustomerUpdateForm")}
      {...rest}
    >
      <TextField
        label="Customer id"
        isRequired={true}
        isReadOnly={true}
        value={customerId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              customerId: value,
              name,
              engagementStage,
            };
            const result = onChange(modelFields);
            value = result?.customerId ?? value;
          }
          if (errors.customerId?.hasError) {
            runValidationTasks("customerId", value);
          }
          setCustomerId(value);
        }}
        onBlur={() => runValidationTasks("customerId", customerId)}
        errorMessage={errors.customerId?.errorMessage}
        hasError={errors.customerId?.hasError}
        {...getOverrideProps(overrides, "customerId")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              customerId,
              name: value,
              engagementStage,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <SelectField
        label="Engagement stage"
        placeholder="Please select an option"
        isDisabled={false}
        value={engagementStage}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              customerId,
              name,
              engagementStage: value,
            };
            const result = onChange(modelFields);
            value = result?.engagementStage ?? value;
          }
          if (errors.engagementStage?.hasError) {
            runValidationTasks("engagementStage", value);
          }
          setEngagementStage(value);
        }}
        onBlur={() => runValidationTasks("engagementStage", engagementStage)}
        errorMessage={errors.engagementStage?.errorMessage}
        hasError={errors.engagementStage?.hasError}
        {...getOverrideProps(overrides, "engagementStage")}
      >
        <option
          children="Prospect"
          value="PROSPECT"
          {...getOverrideProps(overrides, "engagementStageoption0")}
        ></option>
        <option
          children="Interested"
          value="INTERESTED"
          {...getOverrideProps(overrides, "engagementStageoption1")}
        ></option>
        <option
          children="Purchased"
          value="PURCHASED"
          {...getOverrideProps(overrides, "engagementStageoption2")}
        ></option>
      </SelectField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(customerIdProp || customerModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(customerIdProp || customerModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
