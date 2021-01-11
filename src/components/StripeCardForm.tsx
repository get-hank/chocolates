import React, { useContext, useEffect, useReducer, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  Elements,
  ElementsConsumer,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe, Source } from "@stripe/stripe-js";
import { FormField, FieldEdit } from "./form";
import { Container, Item } from "./grid";
import Modal from "./Modal";
import { P } from "./typography";
import { inputStyle } from "./form/utils";
import { breakPoint, space } from "../util/layout";
import { Lock } from "../icons";

type StripeCardFormProps = {
  publishableKey: string;
  onSuccess: (source: Source) => any;
  onCancel: () => any;
  loading?: boolean;
  error?: string | null;
};

const StripeInputWrapper = styled.div`
  ${inputStyle}
`;

const PadRightMd = styled.div`
  @media (min-width: ${breakPoint("md")}px) {
    padding-right: ${space(2)};
  }
`;

const StripeCardForm = ({
  onSuccess,
  onCancel,
  loading,
  error: parentError,
}: Omit<StripeCardFormProps, "publishableKey">) => {
  const theme = useContext(ThemeContext);
  const stripeElementOptions = {
    style: {
      base: {
        fontSize: `${theme.typography.baseSize * 16}px`,
        color: theme.colors.text,
      },
      invalid: {
        color: theme.colors.error,
      },
    },
  };

  const [cardEdits, updateField] = useReducer(
    (prevEdits: object, { field, value }: FieldEdit) => ({
      ...prevEdits,
      [field]: value,
    }),
    {}
  );
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useReducer(
    (
      errors: object,
      { field, message }: { field: string; message: string }
    ) => ({
      ...errors,
      [field]: message,
    }),
    {}
  );

  const stripe = useStripe();
  const elements = useElements();
  const canSubmit =
    stripe &&
    !loading &&
    elements &&
    cardEdits.name &&
    cardEdits.zipcode &&
    cardEdits.card &&
    cardEdits.expiry &&
    cardEdits.cvv;

  const onStripeChange = (field: string, e: any) => {
    if (e.error) {
      setErrors({ field, message: e.error.message });
    } else {
      setErrors({ field, message: null });
    }

    updateField({ field, value: e.complete });
  };

  const submit = async () => {
    if (!canSubmit) {
      return;
    }
    const { error, source } = await stripe.createSource(
      elements.getElement(CardNumberElement),
      {
        type: "card",
        currency: "usd",
        owner: {
          name: cardEdits.name,
          address: {
            postal_code: cardEdits.zipcode,
          },
        },
      }
    );

    if (error) {
      setError(error.message);
      return;
    }

    onSuccess(source);
  };

  return (
    <Modal
      open={true}
      titleText="Add new card"
      submitText="Save card"
      cancelText="Cancel"
      onSubmit={submit}
      onCancel={onCancel}
      submitDisabled={!canSubmit}
    >
      <Container px={1} pb={4}>
        <Item cols={12} pb={3}>
          <FormField
            label="Name on card"
            field="name"
            autoComplete="name"
            onChange={updateField}
            placeholder="Jane Doe"
          />
        </Item>
        <Item cols={12} pb={3}>
          <FormField
            label="Card number"
            field="card"
            inputType="none"
            error={errors["card"]}
          >
            <StripeInputWrapper>
              <CardNumberElement
                options={stripeElementOptions}
                onChange={(e: any) => onStripeChange("card", e)}
              />
            </StripeInputWrapper>
          </FormField>
        </Item>
        <Item cols={6} mdCols={12} pb={3}>
          <PadRightMd>
            <FormField
              label="Exp. date"
              field="expiry"
              inputType="none"
              error={errors["expiry"]}
            >
              <StripeInputWrapper>
                <CardExpiryElement
                  options={stripeElementOptions}
                  onChange={(e: any) => onStripeChange("expiry", e)}
                />
              </StripeInputWrapper>
            </FormField>
          </PadRightMd>
        </Item>
        <Item cols={6} mdCols={12} pb={3}>
          <FormField
            label="CVV"
            field="cvv"
            inputType="none"
            error={errors["cvv"]}
          >
            <StripeInputWrapper>
              <CardCvcElement
                options={stripeElementOptions}
                onChange={(e: any) => onStripeChange("cvv", e)}
              />
            </StripeInputWrapper>
          </FormField>
        </Item>

        <Item cols={6} mdCols={12} pb={3}>
          <PadRightMd>
            <FormField
              label="Zipcode"
              field="zipcode"
              autoComplete="postal-code"
              onChange={updateField}
              placeholder="12345"
            />
          </PadRightMd>
        </Item>
        <Item cols={12} direction="row" align="center">
          <Lock />
          <P pl={1}>Your payment info will be stored securely</P>
        </Item>
        {error || parentError ? (
          <Item cols={12}>
            <P pt={2} error>
              {error || parentError}
            </P>
          </Item>
        ) : null}
      </Container>
    </Modal>
  );
};

const StripeCardFormWithContext = ({
  publishableKey,
  ...rest
}: StripeCardFormProps) => {
  const [stripePromise, setStripePromise] = useState<any>(null);
  useEffect(() => setStripePromise(loadStripe(publishableKey)), [
    publishableKey,
  ]);

  return (
    <Elements stripe={stripePromise}>
      <StripeCardForm {...rest} />
    </Elements>
  );
};

export default StripeCardFormWithContext;
