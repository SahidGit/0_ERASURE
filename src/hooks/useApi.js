import { useEffect, useState } from 'react';

export function useApi(path, fallback) {
  const [data, setData] = useState(fallback);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let active = true;

    fetch(path)
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        if (!active) return;
        setData(payload);
        setStatus('ready');
      })
      .catch(() => {
        if (!active) return;
        setData(fallback);
        setStatus('fallback');
      });

    return () => {
      active = false;
    };
  }, [fallback, path]);

  return { data, status };
}
