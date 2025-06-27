import { useState, useEffect } from "react"

const Timer = ({duration, onTimeEnd, questionIndex}) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if(prev === 1) {
                    clearInterval(timer);
                    onTimeEnd();
                    return 0;
                }

                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [onTimeEnd])

    return <p>{timeLeft}</p>;
}
export default Timer

// Muszę naprawić timer,zeby podczas zmiany pytania na następne, timer resetował się do 30 