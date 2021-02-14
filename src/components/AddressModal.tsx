import React, { useMemo, useReducer, useState } from "react";
import { Container, Div, FormField, FieldEdit, Item, Modal } from "../ui";
import { request, useApiToken } from "../util/api";

type Address = {
  resourceId: string;
  userId?: string | null;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  zipcode: string;
  notes?: string | null;
  default: boolean;
};

type AddressModalProps = {
  apiBase: string;
  address?: Address;
  userId?: string;
  dismiss: () => any;
  modalProps?: Partial<React.ComponentProps<typeof Modal>>;
  states: {
    code: string;
    name: string;
  }[];
};

const AddressModal = ({
  apiBase,
  userId,
  address,
  dismiss,
  states,
  modalProps,
}: AddressModalProps) => {
  const apiToken = useApiToken(apiBase);

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [field: string]: string }>({});
  const [addressEdits, updateField] = useReducer(
    (prevUserEdits: object, { field, value }: FieldEdit) => ({
      ...prevUserEdits,
      [field]: value,
    }),
    {}
  );

  const stateOptions = useMemo(
    () => [
      { value: "", label: "Select one" },
      ...states.map((s) => ({ value: s.code, label: s.name })),
    ],
    [states]
  );

  const hasEdits = Object.keys(addressEdits).length > 0;

  const submit = async () => {
    if (submitting || !hasEdits) return;
    setSubmitting(true);

    const path = `/users/${address && address.userId ? address.userId : userId
      }/addresses`;

    const { body, error } = await request({
      apiBase,
      apiToken,
      path: address ? `${path}/${address.resourceId}` : path,
      method: address ? "put" : "post",
      body: addressEdits,
    });

    if (!error) {
      dismiss();
    } else {
      if (body && body.errors) {
        setErrors(body.errors as { [field: string]: string });
      } else {
        console.error(
          "Unexpected response updating address",
          body,
          error.message
        );
      }
    }

    setSubmitting(false);
  };

  return (
    <Modal
      open
      titleText={address ? "Edit address" : "Add address"}
      onCancel={dismiss}
      cancelText="Cancel"
      submitText="Save address"
      {...modalProps}
      onSubmit={submit}
      submitDisabled={submitting || !hasEdits}
    >
      <Div px={1} pb={2}>
        <Container>
          <Item cols={12} pr={1}>
            <FormField
              pb={3}
              field="line1"
              value={address ? address.line1 : null}
              placeholder="Ex: 123 Main St."
              label="Street address"
              onChange={updateField}
              autoComplete="address-line1"
              error={errors["line1"]}
            />
          </Item>
          <Item cols={12} pr={1}>
            <FormField
              pb={3}
              field="line2"
              value={address ? address.line2 : null}
              placeholder="Ex: Apt #5"
              label="Apt, suite. (optional)"
              onChange={updateField}
              autoComplete="address-line2"
              error={errors["line2"]}
            />
          </Item>
        </Container>
        <Container>
          <Item cols={6} mdCols={12} pr={1}>
            <FormField
              pb={3}
              field="city"
              value={address ? address.city : null}
              placeholder="Ex: New York"
              label="City"
              autoComplete="address-level2"
              onChange={updateField}
              error={errors["city"]}
            />
          </Item>
          <Item cols={6} mdCols={12} pr={1}>
            <FormField
              pb={3}
              field="state"
              value={address ? address.state : null}
              label="State"
              onChange={updateField}
              apiBase={apiBase}
              inputType="select"
              autoComplete="address-level1"
              options={stateOptions}
              error={errors["state"]}
            />
          </Item>
        </Container>
        <Container>
          <Item cols={6} mdCols={12} pr={1}>
            <FormField
              pb={3}
              field="zipcode"
              value={address ? address.zipcode : null}
              label="Zip code"
              placeholder="Ex: 12345"
              autoComplete="postal-code"
              onChange={updateField}
              error={errors["zipcode"]}
            />
          </Item>
          <Item cols={12} pr={1}>
            <FormField
              pb={3}
              field="notes"
              value={address ? address.notes : null}
              label="Delivery instructions"
              placeholder="Ex: Ring the bell after dropoff, leave next to the porch, etc."
              onChange={updateField}
              error={errors["notes"]}
              inputType="multiLineText"
            />
          </Item>
          <Item cols={12} pr={1}>
            <FormField
              field="default"
              value={address ? address.default : null}
              label='Set address as "Home"'
              onChange={updateField}
              inputType="checkbox"
              fillBg={true}
              error={errors["default"]}
            />
          </Item>
        </Container>
      </Div>
    </Modal>
  );
};

export default AddressModal;
