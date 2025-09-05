import { useState } from 'react';
import { toast } from 'sonner';

// generic callback type
type AsyncCallback<TArgs extends unknown[], TResult> = (
  ...args: TArgs
) => Promise<TResult>;

function useFetch<TArgs extends unknown[], TResult>(
  cb: AsyncCallback<TArgs, TResult>
) {
  const [data, setData] = useState<TResult | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fn = async (...args: TArgs) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
        toast.error(err.message);
      } else {
        setError(new Error('Unknown error'));
        toast.error('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
}

export default useFetch;
