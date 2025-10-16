'use server';

/**
 * @fileOverview An AI agent that suggests a related article based on the sentiment of the current article.
 *
 * - suggestArticleBasedOnSentiment - A function that suggests a related article based on sentiment.
 * - SuggestedArticleBasedOnSentimentInput - The input type for the suggestArticleBasedOnSentiment function.
 * - SuggestedArticleBasedOnSentimentOutput - The return type for the suggestArticleBasedOnSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestedArticleBasedOnSentimentInputSchema = z.object({
  articleContent: z.string().describe('The content of the current blog article.'),
  availableArticles: z.array(z.string()).describe('A list of available article titles.'),
});

export type SuggestedArticleBasedOnSentimentInput = z.infer<typeof SuggestedArticleBasedOnSentimentInputSchema>;

const SuggestedArticleBasedOnSentimentOutputSchema = z.object({
  suggestedArticle: z.string().describe('The title of the suggested article based on sentiment.'),
  reasoning: z.string().describe('The AI reasoning for suggesting this article.'),
});

export type SuggestedArticleBasedOnSentimentOutput = z.infer<typeof SuggestedArticleBasedOnSentimentOutputSchema>;

export async function suggestArticleBasedOnSentiment(input: SuggestedArticleBasedOnSentimentInput): Promise<SuggestedArticleBasedOnSentimentOutput> {
  return suggestedArticleBasedOnSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestArticleBasedOnSentimentPrompt',
  input: {schema: SuggestedArticleBasedOnSentimentInputSchema},
  output: {schema: SuggestedArticleBasedOnSentimentOutputSchema},
  prompt: `You are a blog content curator. Your task is to recommend an article from a provided list based on the content of the current article.

You MUST choose one of the titles from the 'Available Articles' list. Do not create or suggest any article titles that are not on this list.

Current Article Content:
"{{{articleContent}}}"

Available Articles:
{{#each availableArticles}}
- {{{this}}}
{{/each}}

Analyze the sentiment and topic of the "Current Article Content". Then, select the most relevant article from the "Available Articles" list that a reader would likely be interested in next.

Provide your answer in the requested format, ensuring the 'suggestedArticle' field contains the exact title of the article you chose from the list. Explain your choice in the 'reasoning' field.`,
});

const suggestedArticleBasedOnSentimentFlow = ai.defineFlow(
  {
    name: 'suggestedArticleBasedOnSentimentFlow',
    inputSchema: SuggestedArticleBasedOnSentimentInputSchema,
    outputSchema: SuggestedArticleBasedOnSentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
