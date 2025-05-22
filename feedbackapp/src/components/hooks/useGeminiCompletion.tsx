import { useState } from 'react';

export function useGeminiCompletion(apiEndpoint: string, initial = '') {
  const [completion, setCompletion] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const complete = async () => {
    setIsLoading(true);
    setError(null);
    setCompletion('');

    try {
      const response = await fetch(apiEndpoint, { method: 'POST' });

      if (!response.body) throw new Error('No response body from Gemini API');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      // let result = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        // result += decoder.decode(value, { stream: true });
        setCompletion((prev) => prev + decoder.decode(value, { stream: true }));
      }
    } catch (err:unknown) {
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  };

  return {
    complete,
    completion,
    isLoading,
    error,
  };
}
