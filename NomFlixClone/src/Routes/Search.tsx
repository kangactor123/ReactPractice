import { useLocation } from "react-router-dom";
import { searchMovies } from "../api";

//URLSearchParams('params')
function Search() {
    const location = useLocation(); //location을 이용하면 지금 있는 곳의 정보를 얻을 수 있음
    const keyword = location.search.slice(9);
    const params = new URLSearchParams(location.search);
    const movie = searchMovies(keyword);
    console.log(movie);
    return (
    <>
        <h1>{params.get('keyword')}</h1>
    </>);
}

export default Search;
