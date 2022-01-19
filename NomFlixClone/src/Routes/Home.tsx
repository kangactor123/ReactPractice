import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
    background: black;
`;

const Loader = styled.div`
    height:20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{bgPhoto:string}>`
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
    height:200px;
    color:red;
`;

const rowVariants = {
    hidden:{
        x: window.outerWidth + 5,
    },
    visible:{
        x: 0,
    },
    exit:{
        x:-window.outerWidth - 5,
    }
};

const offset = 6; //한번에 노출되는 영화의 개수


function Home() {
    //useQuery(식별자, fetcher) -> data와 isLoading을 리턴받음
    const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const increaseIndex = () => {
        if (data) {
            if (leaving) return;
            toggleLeaving();
            const totalMovie = data.results.length - 1;
            const maxIndex = Math.ceil(totalMovie/offset) - 1;
            setIndex((prev) => prev === maxIndex ? 0 : prev+1);
        }
    };
    const toggleLeaving = () => {
        setLeaving((prev) => !prev);
    };
    return (
        //key가 바뀌면서 react 에서는 새로운 컴퍼넌트라고 인식
        //onExitComplete = exit이 끝날때 실행
        <Wrapper>
            {isLoading ? <Loader>Loading...</Loader> : 
            <>
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
                        transition={{type:"tween", duration:1}}
                        key={index}
                        >
                            {data?.results.slice(1).slice(offset*index, offset*index+offset).map((movie) => 
                            <Box key={movie.id}>{movie.title}</Box>
                            )}
                        </Row>
                    </AnimatePresence>
                </Slider>
            </>}
        </Wrapper>

    );
}

export default Home;