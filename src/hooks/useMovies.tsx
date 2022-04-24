import { useEffect, useState } from "react";
import movieDB from "../api/movieDB";
import { Movie, MovieDBNowResponse } from "../interfaces/movieInterface";


interface MoviesState {
    nowPlaying: Movie[];
    popular: Movie[];
    upcoming: Movie[];
    topRated: Movie[];
}

export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [moviesState, setMoviesState] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        upcoming: [],
        topRated: [],
        
    })


    const getMovies = async () => {
        const nowPlayingPromise = movieDB.get<MovieDBNowResponse>('/now_playing');
        const popularPromise = movieDB.get<MovieDBNowResponse>('/popular');
        const upComingPromise = movieDB.get<MovieDBNowResponse>('/upcoming');
        const topRatedPromise = movieDB.get<MovieDBNowResponse>('/top_rated');

        const response = await Promise.all([
            nowPlayingPromise,
            popularPromise,
            upComingPromise,
            topRatedPromise
        ]);


        setMoviesState({
            nowPlaying: response[0].data.results,
            popular:    response[1].data.results,
            upcoming:   response[2].data.results,
            topRated:   response[3].data.results
        })

        setIsLoading(false);
    }

    useEffect(() => {
        getMovies()
    }, [])


    return {
        ...moviesState,
        isLoading
    }
}
