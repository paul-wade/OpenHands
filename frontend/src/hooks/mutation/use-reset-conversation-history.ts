import { useMutation, useQueryClient } from "@tanstack/react-query";
import OpenHands from "#/api/open-hands";

export const useResetConversationHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { conversationId: string }) =>
      OpenHands.resetConversationHistory(variables.conversationId),
    onSuccess: (_, variables) => {
      // Invalidate the conversation query to refresh the UI
      queryClient.invalidateQueries({ 
        queryKey: ["conversation", variables.conversationId] 
      });
      // Also invalidate the user conversations list to update timestamps
      queryClient.invalidateQueries({ 
        queryKey: ["user", "conversations"] 
      });
    },
  });
};