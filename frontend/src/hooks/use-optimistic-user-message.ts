import { useQueryClient } from "@tanstack/react-query";

interface OptimisticUserMessage {
  message: string;
  timestamp: string;
}

export const useOptimisticUserMessage = () => {
  const queryKey = ["optimistic_user_message"] as const;
  const queryClient = useQueryClient();

  const setOptimisticUserMessage = (message: string, timestamp: string) => {
    queryClient.setQueryData<OptimisticUserMessage>(queryKey, { message, timestamp });
  };

  const getOptimisticUserMessage = () =>
    queryClient.getQueryData<OptimisticUserMessage>(queryKey);

  const removeOptimisticUserMessage = () => {
    queryClient.removeQueries({ queryKey });
  };

  return {
    setOptimisticUserMessage,
    getOptimisticUserMessage,
    removeOptimisticUserMessage,
  };
};
