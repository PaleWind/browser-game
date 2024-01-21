class Timer {
    static lastUpdateTime = Date.now();

    static get deltaTime() {
        const currentTime = Date.now();
        const timeDifference = currentTime - Timer.lastUpdateTime;
        Timer.lastUpdateTime = currentTime;
        return timeDifference;
    }
}

export default Timer