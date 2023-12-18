import React, { useRef,  } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import './Slider.css'

const Slider = () => {
    const slideRef = useRef(null);
    const loadingProgress= 0;
    

    const handleClickNext = () => {
        let items = slideRef.current.querySelectorAll(".item");
        slideRef.current.appendChild(items[0]);
    };

    const handleClickPrev = () => {
        let items = slideRef.current.querySelectorAll(".item");
        slideRef.current.prepend(items[items.length - 1]);
    };

    const data = [
        {
            id: 1,
            imgUrl: "https://th.bing.com/th/id/OIP.GisLjjSEN7qm9oWUhMoo6gHaEK?pid=ImgDet&rs=1",
            desc: "LET THAT HAND BE YOURS",
            name: "THEY NEED A HELPING HAND",
            seemore:"https://www.indiaphilanthropyalliance.org/blog/whatweknowaboutpoverty"
        },
        {
            id: 2,
            imgUrl:
                "https://www.childfund.org.au/wp-content/uploads/2017/08/Myanmar-Appeal-Video-Image.jpg",
            desc: ".",
            name: "DONATE AND SAVE ",
        },
        {
            id: 3,
            imgUrl:
                "https://angelusnews.com/system/images/W1siZiIsIjIwMTcvMTAvMTIvN2czbHJpMjF1el9PcnBoYW5zX2luX0luZGlhX01pcmFjbGVfRm91bmRhdGlvbl9DcmVkaXRfTHlubmVfRG9ic29uX0NOQV8xLmpwZyJdLFsicCIsImNvYWxlc2NlIl0sWyJwIiwidGh1bWIiLCIxMjAweCJdLFsicCIsIm9wdGltaXplIl1d/image.jpg",
            desc: "",
            name: "let the smile keep glowing...",
        },
        {
            id: 5,
            imgUrl: "https://indianredcrosswestbengal.org/activities/blood_donation_camps3.jpg",
            desc: "",
            name: "Donate blood",
            seemore:"https://www.healthline.com/health/benefits-of-donating-blood"
        },
        {
            id: 6,
            imgUrl:
                "https://3.bp.blogspot.com/-Jx5TnryL0GU/TfzMGUKXNlI/AAAAAAAACDI/mD4aNByiMlw/s1600/education-in-india2.jpg",
            desc: "",
            name: "They deserve to study",
            seemore:"https://www.globalcitizen.org/en/content/poverty-education-satistics-facts/"
        },
    ];

    return (
        <>
            <div className="page slider-page">
                <div className="navBar">
                    <nav class="navbar navbar-expand-lg navbar-dark " >
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <a class="navbar-brand" href="/"> <img src="./appicon.jpeg" width="35" height="35" class="d-inline-block align-top" alt=""></img>  Caritas</a>
                            <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                                <li class="nav-item active">
                                    <a class="nav-link" href="/donorlogin"><button class="btn btn-outline-warning" type="button">Donor</button></a>
                                </li>
                                <li class="nav-item active">
                                    <a class="nav-link" href="/Organizationlogin"><button class="btn btn-outline-success" type="button">Organization</button></a>
                                </li>
                                <li class="nav-item active">
                                    <a class="nav-link" href="/About"><button class="btn btn-outline-info" type="button">About</button></a>
                                </li>
                                
                            </ul>
                        </div>
                    </nav>
                </div>


                <div className="container-fluid slider-container-fluid ">
                    <div className="loadbar" style={{ width: `${loadingProgress}%` }}></div>
                    <div id="slide" ref={slideRef}>
                        {data.map((item) => (
                            <div
                                key={item.id}
                                className="item"
                                style={{ backgroundImage: `url(${item.imgUrl})` }}
                            >
                                <div className="content">
                                    <div className="name">{item.name}</div>
                                    <div className="des">{item.desc}</div>
                                    <a href={item.seemore}><button>See more</button></a>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="buttons">
                        <button id="prev" onClick={handleClickPrev}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        <button id="next" onClick={handleClickNext}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Slider;