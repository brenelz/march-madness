import { Inter } from 'next/font/google'
import { getGameScores } from "./utils/scores"
import GameScore from './GameScore';

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  const gameScores = await getGameScores();

  return (
    <div style={{ padding: '20px', maxWidth: "600px", margin: '0 auto' }}>
      <h1 className={inter.className}>March Madness Picks - Brenley</h1>

      <h2 className={inter.className} style={{ margin: "50px 0 20px" }}> Live Games</h2>
      {gameScores.filter(gameScore => !gameScore.completed).map((gameScore, index) => (
        <GameScore gameScore={gameScore} key={index} />
      ))}

      <h2 className={inter.className} style={{ margin: "50px 0 20px" }}>Completed Games</h2>
      {gameScores.filter(gameScore => gameScore.completed).map((gameScore, index) => (
        <GameScore gameScore={gameScore} key={index} />
      ))}
    </div >
  )
}
