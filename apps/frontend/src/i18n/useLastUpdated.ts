import React, { useCallback } from "react";

/**
 * Returns the previous value of the given value
 *
 * @see https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 */

const usePreviousValue = <T>(value: T) => {
  const ref = React.useRef<T>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export function useLastUpdated() {
  const [lastUpdated, setStateLastUpdated] = React.useState(() => new Date());
  const previusLastUpdated = usePreviousValue(lastUpdated);

  const setLastUpdated = useCallback(() => {
    setStateLastUpdated(new Date(Date.now()));
  }, [setStateLastUpdated]);

  return { lastUpdated, previusLastUpdated, setLastUpdated };
}
