export interface OpenAIResponse {
  role: string;
  content: string;
}

export const chatToBob = async (chatHistory: Array<OpenAIResponse | null>) => {
  console.log(chatHistory);
  const response = await fetch("https://sadbotai-production.up.railway.app/", {
    method: "POST",
    body: JSON.stringify({
      chat_history: chatHistory,
    }),
  })
    .then((res) => res.json())
    .then((data) => data);

  return response;
};
