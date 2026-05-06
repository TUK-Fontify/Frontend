import { useEffect, useState } from 'react';

type ApiResourceState<T> = {
  data: T;
  isLoading: boolean;
  error: string;
};

export function useApiResource<T>(
  fallbackData: T,
  loader: () => Promise<T>,
  dependencies: unknown[] = [],
) {
  const resourceKey = JSON.stringify(dependencies);
  const [state, setState] = useState<ApiResourceState<T>>({
    data: fallbackData,
    isLoading: false,
    error: '',
  });

  useEffect(() => {
    let isMounted = true;

    loader()
      .then((data) => {
        if (!isMounted) return;
        setState({ data, isLoading: false, error: '' });
      })
      .catch((error: unknown) => {
        if (!isMounted) return;
        const message = error instanceof Error ? error.message : 'API 요청에 실패했습니다.';
        setState({ data: fallbackData, isLoading: false, error: message });
      });

    return () => {
      isMounted = false;
    };
    // loader and fallbackData are intentionally controlled by the caller's dependency key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceKey]);

  return state;
}
