import z from 'zod';

const teamsToWin = [
    "Memphis",
    "Kansas St",
    "Indiana",
    "TCU",
    "Miami"
];


export function isWinning(gameScore: Score, opposingScore: number) {
    const teamICareAbout = teamsToWin.find(team => gameScore.name.startsWith(team))

    if (teamICareAbout) {
        return opposingScore < gameScore.score
    }

    return null;
}

const gamesSchema = z.array(
    z.object({
        completed: z.boolean(),
        scores: z.array(z.object({
            name: z.string(),
            score: z.coerce.number()
        })).nullable()
    })
)

export type Score = {
    name: string,
    score: number
};

export type Games = {
    completed: boolean,
    scores: [Score, Score];
}[];

export async function getGameScores() {
    if (!process.env.RAPID_API_KEY) {
        throw new Error('Invalid API Key')
    }
    const response = await fetch('https://odds.p.rapidapi.com/v4/sports/basketball_ncaab/scores?daysFrom=1', {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'odds.p.rapidapi.com'
        },
        // cache: 'no-store'
    });

    const result = await response.json();

    if (result.message) {
        throw new Error(result.message);
    }

    const parsedScores = gamesSchema.parse(result);

    return parsedScores.filter(score => score.scores !== null) as Games;
}
