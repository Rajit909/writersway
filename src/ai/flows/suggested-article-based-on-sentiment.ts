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
  prompt: `You are a blog content curator. Given the content of the current blog article and a list of available articles, you will suggest the most relevant article based on the sentiment expressed in the current article.

Current Article Content: {{{articleContent}}}

Available Articles: {{#each availableArticles}}{{{this}}}\n{{/each}}

Consider the sentiment of the current article and suggest an article that aligns with the reader's interests and emotional connection to the current topic. Explain your reasoning for the suggestion in the reasoning field.

Suggested Article:`,
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
