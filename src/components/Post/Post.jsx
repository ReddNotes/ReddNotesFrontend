// ! modules
import { Link } from 'react-router-dom';
import { useState } from 'react';

// ? styles
import s from './Post.module.css';

// ? assets
import fire_empty from './../../assets/icon/fire_empty.svg';
import fire_full from './../../assets/icon/fire_full.svg';
import star_empty from './../../assets/icon/star_empty.svg';
import star_full from './../../assets/icon/star_full.svg';
import comment from './../../assets/icon/comment.svg';

export default function Post() {
    const [fire, setFire] = useState(false);
    const [star, setStar] = useState(false);

    function toggleFire() {
        fire ? setFire(false) : setFire(true);
    }

    function toggleStar() {
        star ? setStar(false) : setStar(true);
    }

    return (
        <div className={s.main}>
            <div className={s.top_container}>
                <div className={s.top_container_left}>
                    <Link className={`${s.zozo} link`}><img src="data:image/jpeg;base64,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" alt="User picture" /></Link>
                    <h1>Space-X is the best and here info why</h1>
                </div>
                <div className={s.top_container_time}>
                    <p>12/02/2024</p>
                    <p>23:45</p>
                </div>
            </div>
            <div className={s.middle_container}>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years</p>
            </div>
            <div className={s.bottom_container}>
                <div className={s.bottom_container_left}>
                    <button onClick={toggleFire}><img src={fire ? fire_full : fire_empty} alt="Fire Logo" /></button>
                    <button className={s.bottom_btn}><img src={comment} alt="Comment Logo" /></button>
                </div>
                <button onClick={toggleStar}><img src={star ? star_full : star_empty} alt="Star Logo" /></button>
            </div>
        </div>
    )
}