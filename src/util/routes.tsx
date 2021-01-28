import { useHistory, useLocation } from "react-router-dom";

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

type queryArg = { [key: string]: string } | URLSearchParams;

export const toRelativeUrl = (path: string, query: queryArg) => {
  if (typeof query !== typeof URLSearchParams)
    query = new URLSearchParams(query);
  return `${path}?${query.toString()}`;
};

type MailTo = (email: string, opts?: { subject?: string }) => string;
export const mailTo: MailTo = (email, { subject } = {}) => {
  let link = `mailto:${email}`;
  if (subject) {
    link = `${link}?subject=${encodeURIComponent(subject)}`;
  }
  return link;
};

type MaybeString = string | null | undefined;
type ParamSetter = (p?: MaybeString) => any;
type URLGetter = (p?: MaybeString) => string;
export const useQueryParam = (
  paramName: string,
  render: (renderProps: {
    paramValue: MaybeString;
    setParam: ParamSetter;
  }) => React.ReactNode
) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const query = useQuery();
  const paramValue = query.get(paramName);
  const getUrl: URLGetter = (newVal) => {
    const newQuery = new URLSearchParams(query);
    newVal ? newQuery.set(paramName, newVal) : newQuery.delete(paramName);
    return toRelativeUrl(pathname, newQuery);
  };
  const setParam: ParamSetter = (newVal) => {
    history.push(getUrl(newVal));
  };

  return {
    setParam,
    getUrl,
    rendered: render({ paramValue, setParam }),
  };
};
