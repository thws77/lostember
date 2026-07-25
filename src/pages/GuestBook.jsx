import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

import { db } from "../firebase";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

function GuestBook() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [guestbooks, setguestbooks] = useState([]);

    const addGuestBook = async () => {
        if (!name || !content) {
            alert("이름과 내용을 모두 입력해주세요.");
            return;
        }

        await addDoc(collection(db, "guestbook"), {
            name: name,
            content: content,
            createdAt: new Date()
        });

        alert("등록되었습니다.")

        await loadGuestBooks();

        setName("");
        setContent("");
    };

    const loadGuestBooks = async () => {

        const q = query(
            collection(db, "guestbook"),
            orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);

        const list = [];

        querySnapshot.forEach((doc) => {

            list.push({
                id: doc.id,
                ...doc.data()
            });
        });

        setguestbooks(list);

    };

    useEffect(() => {
        loadGuestBooks();

    }, []);

    return (
        <div className="guestbook-page">
            <button
                className="back-button"
                onClick={() => navigate("/")}
            >
                다시 심해로
            </button>

            <h1 className="guestbook-title">
                방명록
            </h1>

            <div className="guestbook-form">
                <input
                    type="text"
                    placeholder="이름을 입력하세요."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <textarea
                    placeholder="내용을 입력하세요."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}>
                </textarea>

                <button className="submit-button"
                    onClick={addGuestBook}>
                    등록
                </button>
            </div>

            <div className="guestbook-list">
                {guestbooks.map((guestbook) => (

                    <div
                        key={guestbook.id}
                        className="guestbook-item"
                    >

                        <h3>{guestbook.name}</h3>

                        <p>{guestbook.content}</p>

                    </div>
                ))}

            </div>
        </div>
    );
}

export default GuestBook;