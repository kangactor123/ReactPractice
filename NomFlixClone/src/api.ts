const API_KEY = "";
const BASE_PATH = "https://api.themoviedb.org/3"

interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
}

export interface IGetMoviesResult {
    dates: {
        minimun: string;
        maximun: string;
    };
    pages: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

//fetcher -> data를 받아오고 return 하는 함수다.
export function getMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(response => {
        return response.json();
    });
}
