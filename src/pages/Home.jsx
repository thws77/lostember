import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { smoothScroll } from "../utils/smoothScroll";
import { FaMusic } from "react-icons/fa";
import { CiPause1 } from "react-icons/ci";

function Home({ playing, toggleMusic }) {
    const navigate = useNavigate();

    const appRef = useRef(null);
    const [fading, setFading] = useState(false);

    useEffect(() => {

        const app = appRef.current;

        if (!app) return;

        const stopScroll = (e) => {
            e.preventDefault();
        };

        const stopKey = (e) => {
            const keys = [
                "ArrowUp",
                "ArrowDown",
                "PageUp",
                "PageDown",
                "Home",
                "End",
                " ",
                "Spacebar"
            ];
            if (keys.includes(e.key)) {
                e.preventDefault();
            }
        };

        app.addEventListener("wheel", stopScroll, {
            passive: false,
        });

        app.addEventListener("touchmove", stopScroll, {
            passive: false,
        });

        window.addEventListener("keydown", stopKey);

        return () => {

            app.removeEventListener("wheel", stopScroll);

            app.removeEventListener("touchmove", stopScroll);

            window.removeEventListener("keydown", stopKey);

        };

    }, []);


    const depth100 = useRef(null);
    const depth500 = useRef(null);
    const depth1000 = useRef(null);
    const depth5000 = useRef(null);
    const depthBottom = useRef(null);

    const moveTo = async (target, duration) => {

        setFading(true);

        await new Promise(resolve => setTimeout(resolve, 800));

        await smoothScroll(
            appRef.current,
            target,
            duration
        );

        setFading(false);
    }
    const go100 = () => {
        moveTo(depth100.current, 200);
    };

    const go500 = () => {
        moveTo(depth500.current, 200);
    };

    const go1000 = () => {
        moveTo(depth1000.current, 700);
    };


    const go5000 = () => {
        moveTo(depth5000.current, 1200);
    };

    const goBottom = () => {
        moveTo(depthBottom.current, 1700);
    };

    return (
        <div className="App"
            ref={appRef}>
            <div className={`fade-overlay ${fading ? "active" : ""}`}>
                <div className="bubble bubble1"></div>
                <div className="bubble bubble2"></div>
                <div className="bubble bubble3"></div>
                <div className="bubble bubble4"></div>
                <div className="bubble bubble5"></div>
                <div className="bubble bubble6"></div>
                <div className="bubble bubble7"></div>
                <div className="bubble bubble8"></div>
                <div className="bubble bubble9"></div>
                <div className="bubble bubble10"></div>
                <div className="bubble bubble11"></div>
                <div className="bubble bubble12"></div>
                <div className="bubble bubble13"></div>
                <div className="bubble bubble14"></div>
                <div className="bubble bubble15"></div>
                <div className="bubble bubble16"></div>
            </div>
            <div className="top-buttons">
                <button
                    className="guest-book-button"
                    onClick={() => navigate("/guestbook")}
                >
                    방명록
                </button>
                <button
                    className="bgm-button"
                    onClick={() => {
                        if (playing) {
                            toggleMusic();
                            return;
                        }
                        if (window.confirm("BGM을 재생하시겠습니까?")) {
                            toggleMusic();
                        }
                    }}>
                    {playing ? <CiPause1 /> : <FaMusic />}
                </button>
            </div>

            <section
                ref={depth100}
                className="screen depth100"
            >
                <div className="content">
                    <p>수심 100m</p>
                    <button
                        className="App-link"
                        onClick={go500}
                    >
                        더 깊은 곳으로
                    </button>
                </div>
            </section>

            <section
                ref={depth500}
                className="screen depth500">
                <div className="content">
                    <p>수심 500m</p>
                    <button
                        className="up-button"
                        onClick={go100}
                    >
                        다시 수면 위로
                    </button>

                    <button
                        className="App-link"
                        onClick={go1000}
                    >
                        아주 깊은 곳으로
                    </button>
                </div>
            </section>

            <section
                ref={depth1000}
                className="screen depth1000">
                <div className="content">
                    <p>수심 1000m</p>
                    <button
                        className="up-button"
                        onClick={go500}
                    >
                        다시 수면 위로
                    </button>

                    <button
                        className="App-link"
                        onClick={go5000}
                    >
                        점점 더 낮은 곳으로
                    </button>
                </div>
            </section>

            <section
                ref={depth5000}
                className="screen depth5000">
                <div className="content">
                    <p>수심 5000m</p>
                    <button
                        className="up-button"
                        onClick={go1000}
                    >
                        다시 수면 위로
                    </button>

                    <button
                        className="App-link"
                        onClick={goBottom}
                    >
                        알 수 없는 곳으로
                    </button>
                </div>
            </section>
            <section
                ref={depthBottom}
                className="screen depth-bottom">
                <div className="content">
                    <p>심해저</p>
                    <button
                        className="up-button"
                        onClick={go5000}
                    >
                        다시 수면 위로
                    </button>
                </div>
            </section>
        </div >
    );
}

export default Home;