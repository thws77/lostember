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
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const [showPopup3, setShowPopup3] = useState(false);

    const [name, setName] = useState("");
    const [state, setState] = useState("");
    const [reason, setReason] = useState("");
    const [need, setNeed] = useState("");
    const [letter, setLetter] = useState("");

    const [needMessage, setNeedMessage] = useState("");
    const [needParticle2, setNeedParticle2] = useState("");

    const makeLetter = () => {
        let needParticle = "";
        let stateMessage = "";

        if (need === "위로" || need === "용기") {
            needParticle = "가";
        } else {
            needParticle = "이";
        }

        if (need === "위로" || need === "용기") {
            setNeedParticle2("를");
        } else {
            setNeedParticle2("을");
        }

        if (!name) {
            alert("비석에 충분히 글을 새기지 않은 것 같다.")
            return;
        }
        if (!state) {
            alert("비석에 충분히 글을 새기지 않은 것 같다.")
            return;
        }
        if (!reason) {
            alert("비석에 충분히 글을 새기지 않은 것 같다.")
            return;
        }
        if (!need) {
            alert("비석에 충분히 글을 새기지 않은 것 같다.")
            return;
        }

        if (state === "멀쩡") {
            stateMessage = "하하, 깊이 내려왔는데도 쌩쌩하네?";
        }

        if (state === "지침") {
            stateMessage = "조금 지친 것 같네. 어깨가 축 처졌어.";
        }

        if (state === "힘듦") {
            stateMessage = "많이 지친 모양이야. 힘들었지?";
        }

        if (state === "만신창이") {
            stateMessage = "만신창이가 되었구나, 가엾게도...";
        }

        if (need === "위로") {
            setNeedMessage("https://www.youtube.com/watch?v=COBqmxYaXks");
        }

        if (need === "용기") {
            setNeedMessage("https://www.youtube.com/watch?v=rx0CBt56bFc");
        }

        if (need === "휴식") {
            setNeedMessage("https://www.youtube.com/watch?v=Z7ZVro-9vhE");
        }

        const firstLines = [
            "여기까지 오느라 고생 많았어.",
            "결국 이곳에 도달했구나.",
            "오랫동안 너를 기다렸어."
        ]

        const secondLines = [
            "고래가 사는 바다를 지나, 해파리와 춤을 추고, 동굴 속으로 몸을 던지기까지...",
            "숨을 크게 들이쉬고 더욱 더 깊은 곳으로 뛰어들어서...",
            "빛이 사라지는 것을 느끼며 점점 더 산소가 희박한 곳으로..."
        ]

        const thirdLines = [
            "정말 깊이 왔네, 그렇지?",
            "어마어마한 대장정이었네, 그렇지?",
            "긴 여정이었네, 그렇지?"
        ]

        const randomFirst =
            firstLines[Math.floor(Math.random() * firstLines.length)];

        const randomSecond =
            secondLines[Math.floor(Math.random() * secondLines.length)];


        const randomThird =
            thirdLines[Math.floor(Math.random() * thirdLines.length)];


        const newLetter = `${name}!
        ${randomFirst}
        ${stateMessage}
        실은, 아주 멀리서 너의 활약을 지켜보고 있었어.
        ${randomSecond}
        ${randomThird}
        어디보자, 너는...
        ${reason}... 그래서 이곳까지 온 거구나.
        어때? 목표는 달성했어?
        괜찮아.
        원하는 걸 찾았어도, 그렇지 못했어도,
        여기까지 온 것만으로도 박수 받을 일이니까...
        고생했어.
        마지막으로, ${need}${needParticle} 필요한 너에게 노래 한 곡을 들려줄게.`;

        setLetter(newLetter);
        setShowPopup2(false);
        setShowPopup3(true);
    };

    useEffect(() => {

        const app = appRef.current;

        if (!app) return;

        const stopScroll = (e) => {

            if (
                e.target.closest(".popup-box2") ||
                e.target.closest(".popup-box3")
            ) {
                return;
            }

            e.preventDefault();
        };

        const stopKey = (e) => {

            if (
                e.target.closest(".popup-box2") ||
                e.target.closest(".popup-box3")
            ) {
                return;
            }

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

    useEffect(() => {

        const app = appRef.current;

        if (!app) return;

        const popupOpen = showPopup || showPopup2 || showPopup3;

        if (popupOpen) {

            app.style.overflowY = "hidden";

            document.body.style.overflow = "hidden";

            document.documentElement.style.overflow = "hidden";

        } else {

            app.style.overflowY = "scroll";

            document.body.style.overflow = "";

            document.documentElement.style.overflow = "";

        }

        return () => {

            app.style.overflowY = "scroll";

            document.body.style.overflow = "";

            document.documentElement.style.overflow = "";

        };

    }, [showPopup, showPopup2, showPopup3]);


    const depth100 = useRef(null);
    const depth500 = useRef(null);
    const depth1000 = useRef(null);
    const depth5000 = useRef(null);
    const depthBottom = useRef(null);
    const depthNerea = useRef(null);


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

    const goNerea = () => {
        moveTo(depthNerea.current, 2000);
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
            </section >

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
                    <button
                        className="App-link"
                        onClick={() => {
                            if (window.confirm("내려갈까요? 다시 올라올 수 없습니다.")) {
                                goNerea();
                            }
                        }}>
                        잠깐... 뭔가 있는 것 같은데.
                    </button>
                </div>
            </section>
            <section
                ref={depthNerea}
                className="screen depth-Nerea">
                <div className="content">
                    <p style={{
                        marginBottom: "1px",
                        marginTop: "1px"
                    }}>Nerea</p>
                    <p style={{
                        marginTop: "1px",
                        fontSize: "calc(20px + 2vmin)"
                    }}>잊혀진 마을</p>
                    <button className="check-button"
                        onClick={() => setShowPopup(true)}>
                        조사하기
                    </button>
                </div>

                {showPopup && (
                    <div className="popup">
                        <div className="popup-box">
                            <h2>신비로운 비석</h2>
                            <p>어딘가 낡았지만 정교하게 조각된 비석. 따뜻한 기운이 흘러나온다.</p>
                            <button
                                className="X-button"
                                onClick={() => setShowPopup(false)}>
                                X
                            </button>
                            <button className="App-link"
                                onClick={() => {
                                    setShowPopup(false);
                                    setShowPopup2(true);
                                }}>
                                비석에 무언가를 새겨볼까?
                            </button>
                        </div>
                    </div>
                )}

                {showPopup2 && (
                    <div className="popup">
                        <div className="popup-box2">
                            <h2>신비로운 비석</h2>
                            <button
                                className="X-button"
                                onClick={() => setShowPopup2(false)}>
                                X
                            </button>
                            <p>당신의 이름을 알려주세요.</p>
                            <input
                                className="name-input"
                                type="text"
                                placeholder="ex)고길동"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <p>당신이 여기까지 온 이유는 무엇인가요?</p>
                            <input
                                className="name-input"
                                type="text"
                                placeholder="ex)자유를 찾아서"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />

                            <p>여기까지 온 당신은...</p>

                            <button
                                className={state === "멀쩡" ? "choice-button-on" : "choice-button"}
                                onClick={() => setState("멀쩡")}>
                                멀쩡해요!
                            </button>

                            <button
                                className={state === "지침" ? "choice-button-on" : "choice-button"}
                                onClick={() => setState("지침")}>
                                조금 지쳤어요.
                            </button>

                            <button
                                className={state === "힘듦" ? "choice-button-on" : "choice-button"}
                                onClick={() => setState("힘듦")}>
                                많이 힘들어요.
                            </button>

                            <button
                                className={state === "만신창이" ? "choice-button-on" : "choice-button"}
                                onClick={() => setState("만신창이")}>
                                만신창이가 되었어요...
                            </button>

                            <p>지금 당신에게는 어떤 것이 필요한가요?</p>

                            <button
                                className={need === "위로" ? "choice-button-on" : "choice-button"}
                                onClick={() => setNeed("위로")}>
                                위로를 받고 싶어요.
                            </button>

                            <button
                                className={need === "용기" ? "choice-button-on" : "choice-button"}
                                onClick={() => setNeed("용기")}>
                                용기를 내고 싶어요.
                            </button>

                            <button
                                className={need === "휴식" ? "choice-button-on" : "choice-button"}
                                onClick={() => setNeed("휴식")}>
                                휴식이 필요해요.
                            </button>

                            <button
                                className="letter-button"
                                onClick={() => {
                                    makeLetter();
                                }}>
                                비석에 충분히 글을 새겼다.
                            </button>
                        </div>
                    </div>
                )}
                {showPopup3 && (
                    <div className="popup">
                        <div className="popup-box3">
                            <h2>신비로운 비석</h2>

                            <div className="letter">
                                <p>{letter}</p>
                                <a
                                    href={needMessage}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {need}{needParticle2} 위해...
                                </a>
                            </div>

                            <button
                                className="X-button"
                                onClick={() => setShowPopup3(false)}
                            >
                                X
                            </button>
                        </div>
                    </div>
                )}
            </section >
        </div >
    );
}

export default Home;