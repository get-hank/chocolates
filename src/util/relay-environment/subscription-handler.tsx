// @ts-nocheck
import { Observable } from "relay-runtime";
import actionCable from "actioncable";

// essentially copied directly from
// https://github.com/rmosolgo/graphql-ruby/blob/74783afcdf9be9c575d961ffa3ccf9e9e5c84425/javascript_client/src/subscriptions/createActionCableHandler.ts
// to avoid webpack warnings from other files in that package
export const createSubscriptionHandler = (actionCableUrl: string) => {
  const cable = actionCable.createConsumer(actionCableUrl);

  // graphql-ruby-client assumed it would get wrapped in an observable, but that
  // changed as of
  // https://github.com/facebook/relay/commit/81ae045a2681ceda91f3bc9b05601e499102f307
  return (
    operation: { text: string; name: string },
    variables: object,
    cacheConfig: object
  ) =>
    Observable.create((observer: any) => {
      // unique-ish
      var channelId = Math.round(Date.now() + Math.random() * 100000).toString(
        16
      );
      // Register the subscription by subscribing to the channel
      var subscription = cable.subscriptions.create(
        {
          channel: "GraphqlChannel",
          channelId: channelId,
        },
        {
          connected: function() {
            var channelParams;
            // Once connected, send the GraphQL data over the channel
            // Use the stored operation alias if possible

            channelParams = {
              variables: variables,
              operationName: operation.name,
              query: operation.text,
            };

            this.perform("execute", channelParams);
          },
          // This result is sent back from ActionCable.
          received: function(payload) {
            // When we get a response, send the update to `observer`
            var result = payload.result;
            if (result && result.errors) {
              // What kind of error stuff belongs here?
              observer.error(result.errors);
            } else if (result) {
              observer.next({ data: result.data });
            }
            if (!payload.more) {
              // Subscription is finished
              observer.complete();
            }
          },
        }
      );

      // Return an object for Relay to unsubscribe with
      return {
        unsubscribe: function() {
          subscription.unsubscribe();
        },
      };
    });
};
