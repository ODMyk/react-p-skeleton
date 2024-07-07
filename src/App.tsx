import { useEffect, useState } from "react";
import Game from "./types/Game";
import './main.scss';
import Skeleton from "./components/Skeleton";

export default function App() {
    const [loading, setLoading] = useState(true);
    const [fetchedData, setFetchedData] = useState<Game[]>([]);

    useEffect(() => {
        setTimeout(() => {
            fetch("https://jsonplaceholder.typicode.com/posts").then((res) => {
                if (!res.ok) {
                    throw res.statusText;
                }
                return res.json();
            }).then((data) => { data.length = 10; setFetchedData(data.map((x: { id: number, title: string, body: string }) => ({ id: x.id, title: x.title.split(' ', 3).join(' '), description: x.body.split(' ', 15).join(' '), image: "https://icon-library.com/images/minecraft-windows-10-icon/minecraft-windows-10-icon-28.jpg" }))); setLoading(false); }).catch(() => console.log("failed"));
        }, 1200)
    }, []);


    return (
        <div className="container">
            {loading && Array.from({ length: 8 }).map(() => <div className="skeletonCard">
                <Skeleton height="40%" width="100%" variant="text skeletonTitle" />
                <Skeleton height="70px" width="100%" variant="circle skeletonImage" />
                <Skeleton height="0.75rem" width="100%" variant="text skeletonDescription" />
                <Skeleton height="0.75rem" width="100%" variant="text skeletonDescription" />
                <Skeleton height="0.75rem" width="100%" variant="text skeletonDescription" />
            </div>)}
            {!loading && fetchedData.map(({ id, title, description, image }) => <div className="card" key={id}>
                <h3>{title}</h3>
                <p>{description}</p>
                <img src={image} alt={`An image of ${title} game`} />
            </div>)}
        </div>);
}