import React, { useEffect, useState } from 'react'
import Button from './Button'
import { Container } from './grid'
import { FormField } from './FormField'
import { P } from './typography'
import { colors } from '../util/colors'
import { NewCheck as Check } from '../icons'

const EmailForm = ({
  fieldProps,
  submitText,
  confirmationText,
  onSubmit,
  repeatable = false,
  wrap = false,
}: {
  fieldProps?: Partial<React.ComponentProps<typeof FormField>>
  submitText: string
  confirmationText: string
  onSubmit: (email: string) => Promise<Error | null>
  repeatable?: boolean
  wrap?: boolean
}) => {
  const [email, setEmail] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [wasSubmitted, setWasSubmitted] = useState(false)

  const submitForm = async () => {
    if (!email) {
      setError('Please enter an email address')
      return
    }

    if (!email.match(/\S+@\S+/)) {
      setError('Invalid email address entered')
      return
    }

    setSubmitting(true)

    const error = await onSubmit(email)

    if (error) {
      setError(error.message)
    } else {
      setSubmitted(true)
      setError(undefined)
      setEmail(undefined)
    }
    setSubmitting(false)
  }

  useEffect(() => {
    if (!repeatable) return
    if (!submitted && wasSubmitted)
      setTimeout(() => setWasSubmitted(false), 295)

    if (submitted && !wasSubmitted) {
      setTimeout(() => setWasSubmitted(true), 2)
      setTimeout(() => setSubmitted(false), 2000)
    }
  }, [repeatable, submitted, wasSubmitted, setWasSubmitted])

  return (
    <Container wrap={wrap}>
      {submitted || wasSubmitted ? (
        repeatable ? (
          <Container
            center
            p={1}
            style={{
              width: '100%',
              transition: 'opacity 0.3s',
              opacity: submitted && wasSubmitted ? 1 : 0,
              backgroundColor: colors.green50,
              borderRadius: '4px',
            }}
          >
            <Container
              center
              style={{
                height: '20px',
                width: '20px',
                backgroundColor: colors.green500,
                borderRadius: '100%',
              }}
            >
              <Check scale={0.75} color={colors.white} />
            </Container>
            <P pl={1} weight={500}>
              {confirmationText}
            </P>
          </Container>
        ) : (
          <>
            <Container
              center
              style={{
                height: '32px',
                width: '32px',
                backgroundColor: colors.primary500,
                borderRadius: '100%',
              }}
            >
              <Check color={colors.white} />
            </Container>
            <P pl={1} fontSize={1.25}>
              {confirmationText}
            </P>
          </>
        )
      ) : (
        <>
          <FormField
            field="email"
            onChange={({ value }) => setEmail(value)}
            error={error}
            pr={1.5}
            pb={wrap ? 2 : 0}
            {...fieldProps}
          />
          <div>
            <Button
              style={{ paddingTop: '10px', paddingBottom: '9px' }}
              disabled={submitting}
              onClick={() => submitForm()}
            >
              {submitText}
            </Button>
          </div>
        </>
      )}
    </Container>
  )
}

export default EmailForm
