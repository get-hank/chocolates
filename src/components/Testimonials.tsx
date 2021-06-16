import React from 'react'
import { Star } from '../icons'
import { Container, Item } from './grid'
import { P } from './typography'

const testimonialRows = [
  [
    {
      review:
        'I registered for my father and he’s been having Rachael clean his home every other week. He likes it, it’s going well. Overall it’s a good experience, she does a good job… Hank has been really good about taking care of it for us.',
      bio: 'Lea L, Clearwater, MN',
    },
    {
      review:
        'The drivers I’ve had have all been very good. I enjoy having the company because I live alone. I really appreciate all of the drivers and their attitudes, they were just great. I’d give Hank a good rating, they’re well worth calling and they’re very accommodating.',
      bio: 'Judi H, Lone Tree, CO',
    },
    {
      review:
        '[Hank has] been excellent. [The drivers] have been very prompt and professional. [They are] knowledgable, and also provide protection – the drivers always have their masks on. They assist with my portable walker… They are helpful as well.',
      bio: 'Jacqueline W, Jacksonville, NC',
    },
  ],
  [
    {
      review:
        "Hank is a real treat and an easy, easy benefit to my life. I didn't realize that making meals gets to be a burden. I'm 78 years old, and I'm tired of cooking and picking things up.",
      bio: 'Donna G, Chico, CA',
    },
    {
      review:
        'I was very pleased with to find a service that can allow me to ease some stressors for her, even though I’m not physically near. We will definitely be using Hank again!',
      bio: 'Caitlin T, Azle, TX',
    },
  ],
]

const TestimonialCards = () => (
  <div>
    {testimonialRows.map((row, rowIdx) => (
      <Container
        align="center"
        justify="center"
        hideUnder={rowIdx > 0 ? 'sm' : undefined}
        key={`row-${rowIdx}`}
      >
        {row.map((testimonial, idx) => (
          <Item
            key={`review-${idx}`}
            center
            direction="column"
            px={2.5}
            smPx={0}
            pb={5}
            style={{ maxWidth: '360px' }}
          >
            <Container center>
              {[...Array(5)].map((s) => (
                <Star key={`start-${s}`} />
              ))}
            </Container>
            <P py={2} lineHeight={150} center>
              {testimonial.review}
            </P>
            <P weight={700} center>
              {testimonial.bio}
            </P>
          </Item>
        ))}
      </Container>
    ))}
  </div>
)

export default TestimonialCards
