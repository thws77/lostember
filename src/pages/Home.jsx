import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { smoothScroll } from "../utils/smoothScroll";



function Home() {
    const navigate = useNavigate();

    const appRef = useRef(null);

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

    const go100 = () => {

        smoothScroll(
            appRef.current,
            depth100.current,

            2000
        );
    };

    const go500 = () => {

        smoothScroll(
            appRef.current,
            depth500.current,

            2000
        );
    };

    return (
        <div className="App"
            ref={appRef}>

            <button
                className="guest-book-button"
                onClick={() => navigate("/guestbook")}
            >
                방명록
            </button>

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
                    >
                        아주 깊은 곳으로
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Home;