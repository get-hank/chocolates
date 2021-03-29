import React, { useState } from 'react'
import styled from 'styled-components'
import { H2, P } from './typography'
import { Container, Item, LayoutWrapper } from './grid'
import { space } from '../util/layout'

const questions = [
  {
    q: 'How can I contact you?',
    a:
      'You can contact us by email at <a href="mailto:hello@gethank.com">hello@gethank.com</a> or by phone at <a href="tel:+18559164265">855-916-4265</a> Monday-Friday from 10 AM - 5 PM EST. We would love to hear from you!',
  },
  {
    q: 'What do I get by signing up for Hank?',
    a:
      'Included with all Hank subscriptions is a personalized Care Plan. A Care Plan is a monthly schedule of all of the meal deliveries, groceries, rides, and daily activities that your loved one needs to enjoy themselves day-to-day. Care Plans allow you to schedule tasks for Hank to do, as well as to plan out activities and reminders for your loved one such as exercise classes, meal reminders, and more.',
  },
  {
    q: 'How much does Hank cost?',
    a:
      'Hank costs $19.99 per month per family to use. Additional costs apply for any services that Hank schedules on your loved one’s behalf (such as meal delivery or transportation), and you have complete control over how much is spent on services.',
  },
  {
    q: 'Which areas do you serve?',
    a:
      'We are in all 50 states. We will confirm that we service your area before you sign up.',
  },
  {
    q: 'Is Hank safe to use during the Covid-19 pandemic?',
    a:
      'Yes, we use contactless delivery for all our orders, so your loved one can maintain a safe distance from your delivery person. If you would like, you can also pick up your food from your restaurant to ensure that you are the only one carrying it back to your home.',
  },
  {
    q: 'How does my loved one place an order?',
    a:
      'They can call or text <a href="tel:+18559164265">855-916-4265</a> to place an order. They can also create an account at gethank.com if they prefer to order online.',
  },
  {
    q: 'Does my loved one need a smartphone or computer to order?',
    a:
      'No, anyone can place an order by calling or texting <a href="tel:+18559164265">855-916-4265</a>.',
  },
  {
    q: 'Can I request services for someone other than myself?',
    a:
      'Yes, Hank is designed to allow anyone to schedule services on behalf of their loved one, or for their loved one to order things for themselves.',
  },
  {
    q: 'Can I set an order schedule in advance?',
    a:
      'Yes, you can set a recurring schedule for your loved one ahead of time so that you won’t have to worry placing an order every day.',
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

const FAQ = ({ title = 'Frequently asked questions' }: { title?: string }) => {
  return (
    <LayoutWrapper pb={8}>
      <Container center direction="column">
        <H2 center pt={15} pb={8} weight={700}>
          {title}
        </H2>
        {questions.map((question, idx) => (
          <FAQItem
            key={`faq-${idx}`}
            question={question.q}
            answer={question.a}
            num={idx + 1}
          />
        ))}
      </Container>
    </LayoutWrapper>
  )
}

export default FAQ
