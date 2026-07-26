
import '../styles/Home.css';
import background from '../assets/수심100.jpg';
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();
    return (
        <div className="App">
            <button
                className="guest-book-button"
                onClick={() => navigate("/guestbook")}
            >
                방명록
            </button>
            <header className="App-header">
                <p>
                    수심 100m
                </p>
                <a
                    className="App-link"
                    href="https://www.youtube.com/watch?v=Klh683_rUmw"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    더 깊은 곳으로
                </a>
            </header>
        </div>
    );
}

export default Home;
