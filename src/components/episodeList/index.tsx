import styles from "./styles.module.scss"
import { EpisodeType } from "@/services/courseService"

interface props {
    episode: EpisodeType
}

const EpisodeList = ({ episode }: props) => {
    const handleSecondsToMin = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60

        function toString(num: number) {
            return num.toString().padStart(2, '0')
        }

        const result = `${toString(minutes)}:${toString(seconds)}`

        return result
    }

    return (
        <>
            <div className={styles.episodeCard}>
                <div className={styles.episodeOrderTime}>
                    <p className={styles.episodeOrder}>Episódio N° {episode.order}</p>
                    <p className={styles.episodeTime}>{handleSecondsToMin(episode.secondsLong)}</p>
                </div>
                <div className={styles.episodeTitleDescription}>
                    <p className={styles.episodeTitle}>{episode.name}</p>
                    <p className={styles.episodeDescription}>{episode.synopsis}</p>
                </div>
            </div>
        </>
    )
}

export default EpisodeList