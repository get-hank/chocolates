import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'
import styled, { ThemeContext } from 'styled-components'
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { loadStripe, Source } from '@stripe/stripe-js'
import Button from './Button'
import { FormField, FieldEdit } from './form'
import { Container, Item } from './grid'
import Modal from './Modal'
import Notice, { severities } from './Notice'
import { Div } from './spacing'
import { P } from './typography'
import { inputStyle } from './form/utils'
import { breakPoint, space } from '../util/layout'
import { Lock } from '../icons'

type StripeCardFormProps = {
  publishableKey: string
  onSuccess?: (source: Source) => void
  onCancel: () => void
  loading?: boolean
  error?: string | null
  modalProps?: Partial<React.ComponentProps<typeof Modal>>
  modal?: boolean
  scrollOnError?: boolean
  renderFooter?: (args: {
    submitDisabled: boolean
    submit: () => Promise<{ source?: Source; error?: Error }>
  }) => React.ReactNode
}

const StripeInputWrapper = styled.div`
  ${inputStyle}
`

const FieldWrapper = styled.div`
  max-width: 360px;
`

const PadRightMd = styled.div`
  @media (min-width: ${breakPoint('md')}px) {
    padding-right: ${space(2)};
  }
`

const StripeCardForm = ({
  onSuccess,
  onCancel,
  loading,
  modalProps,
  error: parentError,
  modal,
  renderFooter,
  scrollOnError,
}: Omit<StripeCardFormProps, 'publishableKey'>) => {
  const theme = useContext(ThemeContext)
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
  }

  const [cardEdits, updateField] = useReducer(
    (prevEdits: object, { field, value }: FieldEdit) => ({
      ...prevEdits,
      [field]: value,
    }),
    {}
  )
  const [submitting, setSubmitting] = useState(false)
  const [showMissingFields, setShowMissingFields] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useReducer(
    (
      errors: object,
      { field, message }: { field: string; message: string }
    ) => ({
      ...errors,
      [field]: message,
    }),
    {}
  )

  const stripe = useStripe()
  const elements = useElements()
  const allFieldsFilled =
    cardEdits.name &&
    cardEdits.zipcode &&
    cardEdits.card &&
    cardEdits.expiry &&
    cardEdits.cvv
  const canSubmit = stripe && !loading && elements && !submitting

  const onStripeChange = (field: string, e: any) => {
    if (e.error) {
      setErrors({ field, message: e.error.message })
    } else {
      setErrors({ field, message: null })
    }

    updateField({ field, value: e.complete })
  }

  const form = useRef<HTMLDivElement>()
  useEffect(() => {
    if (!scrollOnError || !form.current) return
    if (
      error ||
      Object.keys(errors).length > 0 ||
      (showMissingFields && !allFieldsFilled)
    ) {
      window.scrollTo(0, form.current.offsetTop - 20)
    }
  }, [form, showMissingFields, allFieldsFilled, scrollOnError, error, errors])

  const submit = async () => {
    if (!allFieldsFilled) {
      setShowMissingFields(true)
      return { error: new Error('Has invalid fields') }
    }
    if (!canSubmit) {
      return { error: new Error('Stripe not loaded') }
    }
    setSubmitting(true)

    const { error, source } = await stripe.createSource(
      elements.getElement(CardNumberElement),
      {
        type: 'card',
        currency: 'usd',
        owner: {
          name: cardEdits.name,
          address: {
            postal_code: cardEdits.zipcode,
          },
        },
      }
    )

    if (error) {
      setError(error.message)
      return { error: new Error(error.message) }
    }

    setShowMissingFields(false)
    setSubmitting(false)

    onSuccess && onSuccess(source)
    return { source }
  }

  const contents = (
    <div ref={form}>
      <Item cols={12} pb={3}>
        <FieldWrapper>
          <FormField
            label="Name on card"
            field="name"
            autoComplete="name"
            onChange={updateField}
            required
            error={
              showMissingFields && !cardEdits.name && 'This field is required'
            }
          />
        </FieldWrapper>
      </Item>
      <Item cols={12} pb={3}>
        <FieldWrapper>
          <FormField
            label="Card number"
            field="card"
            inputType="none"
            error={
              errors['card'] ||
              (showMissingFields && !cardEdits.card && 'This field is required')
            }
            required
          >
            <StripeInputWrapper>
              <CardNumberElement
                options={{
                  ...stripeElementOptions,
                  placeholder: '0000 0000 0000 0000',
                }}
                onChange={(e: any) => onStripeChange('card', e)}
              />
            </StripeInputWrapper>
          </FormField>
        </FieldWrapper>
      </Item>
      <Item cols={6} mdCols={12} pb={3}>
        <PadRightMd>
          <FieldWrapper>
            <FormField
              label="Exp. date"
              field="expiry"
              inputType="none"
              required
              error={
                errors['expiry'] ||
                (showMissingFields &&
                  !cardEdits.expiry &&
                  'This field is required')
              }
            >
              <StripeInputWrapper>
                <CardExpiryElement
                  options={stripeElementOptions}
                  onChange={(e: any) => onStripeChange('expiry', e)}
                />
              </StripeInputWrapper>
            </FormField>
          </FieldWrapper>
        </PadRightMd>
      </Item>
      <Item cols={6} mdCols={12} pb={3}>
        <FieldWrapper>
          <FormField
            label="CVV"
            field="cvv"
            inputType="none"
            placeholder="123"
            required
            error={
              errors['cvv'] ||
              (showMissingFields && !cardEdits.cvv && 'This field is required')
            }
          >
            <StripeInputWrapper>
              <CardCvcElement
                options={{ ...stripeElementOptions, placeholder: '123' }}
                onChange={(e: any) => onStripeChange('cvv', e)}
              />
            </StripeInputWrapper>
          </FormField>
        </FieldWrapper>
      </Item>

      <Item cols={6} mdCols={12} pb={3}>
        <PadRightMd>
          <FieldWrapper>
            <FormField
              label="ZIP code"
              field="zipcode"
              autoComplete="postal-code"
              onChange={updateField}
              placeholder="12345"
              inputMode="numeric"
              required
              error={
                errors['zipcode'] ||
                (showMissingFields &&
                  !cardEdits.zipcode &&
                  'This field is required')
              }
            />
          </FieldWrapper>
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
    </div>
  )

  const footer = (
    <>
      {!allFieldsFilled && showMissingFields && (
        <Div py={2}>
          <Notice severity={severities.WARN}>
            Please fill out the required fields above.
          </Notice>
        </Div>
      )}
      {renderFooter ? (
        renderFooter({ submitDisabled: !canSubmit, submit })
      ) : (
        <Container justify="flex-end">
          <Div pr={2}>
            <Button secondary onClick={onCancel}>
              Cancel
            </Button>
          </Div>
          <Button disabled={!canSubmit} onClick={submit}>
            Save card
          </Button>
        </Container>
      )}
    </>
  )

  if (modal)
    return (
      <Modal
        open={true}
        titleText="Add new card"
        onDismiss={onCancel}
        {...modalProps}
        renderFooter={() => footer}
      >
        <Container px={1} pb={4}>
          {contents}
        </Container>
      </Modal>
    )

  return (
    <>
      {contents}
      {footer}
    </>
  )
}

const StripeCardFormWithContext = ({
  publishableKey,
  ...rest
}: StripeCardFormProps) => {
  const [stripePromise, setStripePromise] = useState<any>(null)
  useEffect(
    () => setStripePromise(loadStripe(publishableKey)),
    [publishableKey]
  )

  return (
    <Elements stripe={stripePromise}>
      <StripeCardForm {...rest} />
    </Elements>
  )
}

export default StripeCardFormWithContext
