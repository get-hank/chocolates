import React, { useState } from 'react'
import styled from 'styled-components'
import { H2, P } from './typography'
import { Container, Item, LayoutWrapper } from './grid'
import { space } from '../util/layout'

const questions = [
  {
    q: 'Is Hank a retirement home?',
    a:
      'Hank is not a retirement home, but rather a new option for senior living. We empower people to grow older in the homes that they already love by providing the services that are typically found in retirement communities.',
  },
  {
    q: 'How can I contact you?',
    a:
      'You can contact us by email at <a href="mailto:hello@gethank.com">hello@gethank.com</a> or by phone at <a href="tel:+18559164265">855-916-4265</a> Monday-Friday from 10 AM - 5 PM EST. We would love to hear from you!',
  },
  {
    q: 'What do I get by signing up for Hank?',
    a:
      'Hank organizes and manages the services your loved one needs to grow older at home. You or your loved one can schedule all of the meal deliveries, groceries, rides, and daily activities that they need to enjoy at home. Hank makes it easy to manage different services all in one place and is designed for older adults to use.',
  },
  {
    q: 'Which areas do you serve?',
    a:
      'We provide service in all 50 states. Availability of specific services varies by region. Please sign up to check service availability in your area.',
  },
  {
    q: 'Who performs the tasks scheduled through Hank?',
    a:
      'We partner with a network of national service providers to ensure quality and safety no matter where you are.',
  },
  {
    q: 'Is Hank safe to use during the Covid-19 pandemic?',
    a:
      'Yes, we use contactless delivery for all our orders, so your loved one can maintain a safe distance from your delivery person. If you would like, you can also pick up your food from your restaurant to ensure that you are the only one carrying it back to your home.',
  },
  {
    q: 'How does my loved one place an order?',
    a:
      'They can call or text 855-916-4265 to place an order. They can also create an account at gethank.com if they prefer to order online.',
  },
  {
    q: 'Does my loved one need a smartphone or computer to order?',
    a:
      'No, anyone can place an order by calling or texting <a href="tel:+18559164265">855-916-4265</a>.',
  },

  {
    q: 'Can I request services for someone else?',
    a:
      'Yes, Hank is designed to allow anyone to schedule services on behalf of their loved one, or for their loved one to place orders for themselves.',
  },
  {
    q: 'Can I set an order schedule in advance?',
    a:
      'Yes, you can set your order on a recurring cadence so tasks are scheduled automatically and ahead of time.',
  },
  {
    q: 'What happens if I have a problem with an order?',
    a:
      'You can call or email us at any time and we will be able to assist you with your order.',
  },
]

const AccordionItemStyle = styled(Item)`
  &:not(:last-of-type) {
    border-bottom: 1px solid #dddddc;
  }
`

type AnimateProps = {
  expanded: boolean
}

const Animate = styled.div<AnimateProps>`
  transition: all 0.35s ease;
  overflow: hidden;
  line-height: ${({ expanded }) => (expanded ? 1.2 : 0)};
  padding-bottom: ${({ expanded }) => (expanded ? space(2) : 0)};
  opacity: ${({ expanded }) => (expanded ? 1 : 0)};
`

type ItemProps = {
  question: string
  answer: string
  num: number
}

const FAQItem = ({ question, answer, num }: ItemProps) => {
  const [expanded, toggleOpen] = useState(false)
  const toggle = () => toggleOpen(!expanded)
  return (
    <AccordionItemStyle cols={12}>
      <P
        weight={700}
        py={2}
        onClick={toggle}
        onKeyDown={toggle}
        role="button"
        style={{ cursor: 'pointer' }}
        name={`FAQ Item ${num}`}
      >
        {question}
      </P>
      <Animate expanded={expanded}>
        <P dangerouslySetInnerHTML={{ __html: answer }}></P>
      </Animate>
    </AccordionItemStyle>
  )
}

const FAQ = ({
  title = 'Frequently asked questions',
  questionsOnly = false,
}: {
  title?: string
  questionsOnly?: boolean
}) => {
  const inner = (
    <>
      {questions.map((question, idx) => (
        <FAQItem
          key={`faq-${idx}`}
          question={question.q}
          answer={question.a}
          num={idx + 1}
        />
      ))}
    </>
  )

  if (questionsOnly) return inner

  return (
    <LayoutWrapper pb={8}>
      <Container center direction="column">
        <H2 center pt={15} pb={8} weight={700}>
          {title}
        </H2>
        {inner}
      </Container>
    </LayoutWrapper>
  )
}

export default FAQ
