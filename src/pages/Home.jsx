import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
    const navigate = useNavigate();
    const [depth, setDepth] = useState("100");
    const [moving, setMoving] = useState(false);
    const [arrived, setArrived] = useState(false);

    const goDeeper = () => {
        if (moving) return;

        setMoving(true);

        setTimeout(() => {

            setDepth("500");
            setArrived(true);
            /*    setMoving(false); */

        }, 2000);

    };



    return (

        <div className="App">


            <button
                className="guest-book-button"
                onClick={() => navigate("/guestbook")}
            >
                방명록
            </button>

            {depth === "100" && (
                <div
                    className={`screen depth100 ${moving ? "move-up" : ""
                        }`}
                >

                    <div className="content">
                        <p>수심 100m</p>
                        <button
                            className="App-link"
                            onClick={goDeeper}
                        >
                            더 깊은 곳으로
                        </button>
                    </div>
                </div>
            )}

            {(depth === "100" || depth === "500") && (
                <div
                    className={`screen depth500 ${moving || arrived ? "move-in" : ""
                        }`}
                >
                    <div className="content">
                        <p>수심 500m</p>
                        {(depth === "500" || moving) && (
                            <button
                                className="App-link"
                            >
                                아주 깊은 곳으로
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

}


export default Home;