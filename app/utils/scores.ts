import z from 'zod';

const scoresSchema = z.array(
    z.object({
        scores: z.array(z.object({
            name: z.string(),
            score: z.coerce.number()
        })).nullable()
    }).transform(val => val.scores)
)

export type Score = z.infer<typeof scoresSchema>;

export async function getScores() {
    if (!process.env.RAPID_API_KEY) {
        throw new Error('Invalid API Key')
    }
    const response = await fetch('https://odds.p.rapidapi.com/v4/sports/basketball_ncaab/scores', {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'odds.p.rapidapi.com'
        },
        cache: 'no-store'
    });


    const parsedScores = scoresSchema.parse(await response.json());

    return parsedScores.filter(score => score !== null)
}