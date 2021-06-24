import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from './routes'

type Properties = { [key: string]: string | boolean | null }
type TrackArgs = {
  event: string
  properties?: Properties
}
type AnalyticsCallArgs = [
  analyticsFn: 'page' | 'track' | 'identify',
  arg1: string,
  props: Properties
]

declare global {
  var analytics:
    | {
        page: (pageName: string, props: Properties) => any
        track: (event: string, props: Properties) => any
        identify: (id: string, traits: Properties) => any
      }
    | null
    | undefined
  var _segment_identified: boolean | null | undefined
  var _pending_segment_calls: AnalyticsCallArgs[] | null | undefined
}

const flushPendingAnalyticsCalls = () => {
  if (
    !window._pending_segment_calls ||
    window._pending_segment_calls.length === 0
  )
    return
  if (!window.analytics) {
    setTimeout(flushPendingAnalyticsCalls, 10)
    return
  }

  const toCall = window._pending_segment_calls
  window._pending_segment_calls = []

  toCall.map(
    (args) => window.analytics && window.analytics[args[0]](args[1], args[2])
  )
}

const analyticsCall = (...args: AnalyticsCallArgs) => {
  if (!window.analytics) {
    if (!window._pending_segment_calls) window._pending_segment_calls = []
    window._pending_segment_calls.push(args)
    flushPendingAnalyticsCalls()
    return
  }

  window.analytics[args[0]](args[1], args[2])
}

export const trackVisit = (pageName: string, props: Properties) => {
  analyticsCall('page', pageName, props)
}

export const track = ({ event, properties = {} }: TrackArgs) => {
  analyticsCall('track', event, properties)
}

export const identify = (userId: string, traits: Properties) => {
  analyticsCall('identify', userId, traits)
}

export const VisitTrack: React.FC<{
  pageName: string
  getTraits?: (args: {
    query: URLSearchParams
    params: { [key: string]: string }
  }) => NonNullable<TrackArgs['properties']>
}> = ({ pageName, getTraits, children }) => {
  const query = useQuery()
  const params = useParams()

  useEffect(() => {
    const traits = getTraits ? getTraits({ query, params }) : {}
    trackVisit(pageName, traits)
  }, [query, params, pageName, getTraits])

  return <>{children}</>
}
