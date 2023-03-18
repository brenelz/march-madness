import { Inter } from 'next/font/google'
import { Score, getScores } from "./utils/scores"

const inter = Inter({ subsets: ['latin'] })

const teamsToWin = [
  "Memphis",
  "Kansas St",
  "Indiana",
  "TCU",
  "Miami"
];

function getGameScoreStyle(teamScore, opposingScore) {
  const teamICareAbout = teamsToWin.find(team => teamScore.name.startsWith(team))

  if (teamICareAbout) {
    return opposingScore < teamScore.score ? { color: '#C7C7A6' } : { color: '#C7C7A6', textDecoration: 'line-through' };
  }
}

export default async function Home() {
  const gameScores = await getScores();

  return (
    <div style={{ padding: '20px', width: "600px", margin: '0 auto' }}>
      <h1 className={inter.className}>March Madness Picks - Brenley</h1>
      {gameScores.map((gameScore, index) => (
        <div key={index} style={{ margin: "50px 0" }}>
          <h3 className={`${inter.className}`} style={getGameScoreStyle(gameScore[0], gameScore[1].score)}>{gameScore[0].name} ({gameScore[0].score})</h3>
          <h3 className={inter.className} style={getGameScoreStyle(gameScore[1], gameScore[0].score)}>{gameScore[1].name} ({gameScore[1].score})</h3>
        </div>
      ))}
    </div>
  )
}
