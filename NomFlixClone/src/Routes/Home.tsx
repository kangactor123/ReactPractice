import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
    background: black;
    padding-bottom:200px;
`;

const Loader = styled.div`
    height:20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
    height:100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding:60px;
    background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8)) , url(${(props) => props.bgPhoto});
    background-size: cover;
`;

const Title = styled.h2`
    font-size: 58px;
    margin-bottom: 20px;
`;
const Overview = styled.p`
    font-size: 28px;
    width: 50%;
`;

const Slider = styled.div`
    position:relative;
    top:-100px;
`;

const Row = styled(motion.div)`
    display: grid;
    gap:5px;
    grid-template-columns: repeat(6, 1fr);
    position:absolute;
    width:100%;
`;

const Box = styled(motion.div)`
    background-color: white;
    height:100%;
    cursor: pointer;
    &:first-child {
      transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
`;

const Info = styled(motion.div)`
    margin-top: -5px;
    display:none;
    height:20%;
    h4 {
        text-align: center;
        font-size: 18px;
    }
    background-color: ${(props) => props.theme.black.lighter};
`;

const Overlay = styled(motion.div)`
    position: fixed;
    top:0;
    width:100%;
    height:100%;
    background-color: rgba(0,0,0,0.5);
    opacity: 0;
`;

const BigMovie = styled(motion.div)`
    position:absolute;
    width:40vw;
    height:80vh;
    left:0;
    right:0;
    margin:0 auto;
    border-radius: 15px;
    overflow: hidden;
    background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
    background-size: cover;
    background-position: center center;
    width:100%;
    height:300px;
`;

const BigTitle = styled.h3`
    color:${(props) => props.theme.white.lighter};
    padding:10px;
    font-size: 46px;
    position:relative;
    top:-80px;
`;

const BigOverview = styled.p`
    position: relative;
    top:-80px;
    padding:20px;
    color:${(props) => props.theme.white.lighter};

`;

const Img = styled(motion.img)`
    margin: 0;
    width:100%;
    height:100%;
`;

const rowVariants = {
    hidden: {
        x: window.outerWidth + 5,
    },
    visible: {
        x: 0,
    },
    exit: {
        x: -window.outerWidth - 5,
    }
};

const boxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: -50,
        transition: {
            delay: 0.3,
            duration: 0.3,
            type: "tween"
        }
    }
};

const infoVariants = {
    normal:{
        display:"none",
    },
    hover: {
        display:"block",
        transition: {
            delay: 0.3,
            duration: 0.3,
            type: "tween"
        }
    }
};

const offset = 6; //한번에 노출되는 영화의 개수


function Home() {
    //useQuery(식별자, fetcher) -> data와 isLoading을 리턴받음
    const history = useHistory(); //url을 왔다 갔다 할 수 있음
    const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
    const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
    const { scrollY } = useViewportScroll();
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const increaseIndex = () => {
        if (data) {
            if (leaving) return;
            toggleLeaving();
            const totalMovie = data.results.length - 1;
            const maxIndex = Math.floor(totalMovie / offset) - 1;
            setIndex((prev) => prev === maxIndex ? 0 : prev + 1);
        }
    };
    const toggleLeaving = () => {
        setLeaving((prev) => !prev);
    };
    const onBoxClicked = (movieId: number) => {
        history.push(`/movies/${movieId}`);
    };
    const onOverlayClicked = () => {
        history.goBack();
    }
    const clickMovie = bigMovieMatch?.params.movieId && data?.results.find(movie => String(movie.id)    === bigMovieMatch.params.movieId);
    console.log(clickMovie);
    return (
        //key가 바뀌면서 react 에서는 새로운 컴퍼넌트라고 인식
        //onExitComplete = exit이 끝날때 실행
        //부모 컴퍼넌트에 variants가 있다면 자동으로 자식 components에 props들이 상속됨. 
        //자식 variants에 동일한 이름의 variants가 있다면 저절로 실행
        <Wrapper>
            {isLoading ? <Loader>Loading...</Loader> :
                (<>
                    <Banner onClick={increaseIndex} bgPhoto={makeImagePath(data?.results[1].backdrop_path || "")}>
                        <Title>{data?.results[1].title}</Title>
                        <Overview>{data?.results[1].overview}</Overview>
                    </Banner>
                    <Slider>
                        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                            <Row
                                variants={rowVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ type: "tween", duration: 1 }}
                                key={index}
                            >
                                {data?.results.slice(1).slice(offset * index, offset * index + offset).map((movie) =>
                                    <Box
                                        layoutId={movie.id + ""}
                                        key={movie.id}
                                        variants={boxVariants}
                                        initial="normal"
                                        whileHover="hover"
                                        transition={{ type: "tween" }}
                                        onClick={() => { onBoxClicked(movie.id) }}
                                    >   
                                        <Img src={makeImagePath(movie.backdrop_path, "w300")}/>
                                        <Info variants={infoVariants}>
                                            <h4>{movie.title.length > 20 ? movie.title.slice(0, 20) + "..." : movie.title}</h4>
                                        </Info>
                                    </Box>
                                )}
                            </Row>
                        </AnimatePresence>
                    </Slider>
                    <AnimatePresence>
                        {bigMovieMatch ?
                            <>
                                <Overlay onClick={onOverlayClicked} exit={{ opacity: 0 }} animate={{ opacity: 1 }} />
                                <BigMovie
                                    style={{top: scrollY.get() + 100}}
                                    layoutId={bigMovieMatch.params.movieId}
                                >
                                    {clickMovie && <>
                                        <BigCover style={{backgroundImage:`linear-gradient(to top, black, transparent), url(${makeImagePath(clickMovie.backdrop_path, "w500")}`}}/>
                                        <BigTitle>{clickMovie.title}</BigTitle>
                                        <BigOverview>{clickMovie.overview}</BigOverview>
                                    </>}
                                </BigMovie>
                            </>
                            : null}
                    </AnimatePresence>
                </>)}
        </Wrapper>

    );
}

export default Home;
