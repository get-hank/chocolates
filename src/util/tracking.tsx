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

  window._pending_segment_calls.map(
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
