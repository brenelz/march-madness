import { Inter } from 'next/font/google'
import { Games, Score, isWinning } from './utils/scores';

const inter = Inter({ subsets: ['latin'] })

function getGameScoreStyle(teamScore: Score, opposingScore: number) {
    const winning = isWinning(teamScore, opposingScore);

    if (winning === null) {
        return undefined;
    }

    return winning ? { color: '#C7C7A6' } : { color: '#C7C7A6', textDecoration: 'line-through' };
}

function getGameScoreIcon(teamScore: Score, opposingScore: number) {
    const winning = isWinning(teamScore, opposingScore);

    if (winning === null) {
        return undefined;
    }

    return winning ? '😀' : '😡';
}


export default function GameScore({ gameScore }: { gameScore: Games[number] }) {
    return (
        <div style={{ margin: '25px 0' }}>
            <h3 className={`${inter.className}`} style={getGameScoreStyle(gameScore.scores[0], gameScore.scores[1].score)}>
                {gameScore.scores[0].name} ({gameScore.scores[0].score}) {getGameScoreIcon(gameScore.scores[0], gameScore.scores[1].score)}
            </h3>
            <h3 className={inter.className} style={getGameScoreStyle(gameScore.scores[1], gameScore.scores[0].score)}>
                {gameScore.scores[1].name} ({gameScore.scores[1].score}) {getGameScoreIcon(gameScore.scores[1], gameScore.scores[0].score)}
            </h3>
        </div>
    )
}
