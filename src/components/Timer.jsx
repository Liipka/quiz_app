import { useState, useEffect, useRef } from "react"

const Timer = ({duration, onTimeEnd, questionIndex}) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const hasRun = useRef(false);
    
    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if(prev === 0) {
                    clearInterval(timer);
                    onTimeEnd();
                    return 0;
                }

                return prev - 1
            })
        }, 1000)

        return () => {
            clearInterval(timer);
            hasRun.current = false;
          };
    }, [onTimeEnd, questionIndex])

    return <p>{timeLeft}</p>;
}
export default Timer
