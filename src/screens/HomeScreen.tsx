import React, { useContext } from 'react'
import { View, ActivityIndicator, LogBox, Dimensions, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';
import Carousel from 'react-native-snap-carousel';
import { Movie } from '../interfaces/movieInterface';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { getImageColors } from '../helpers/getColors';
import { GradientContext } from '../context/GradientContext';
import { useEffect } from 'react';


LogBox.ignoreLogs(["ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",]);
const { width: windowWidth } = Dimensions.get('window');



export const HomeScreen = () => {


  const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
  const { top } = useSafeAreaInsets();

  const { setMainColors } = useContext(GradientContext);


  const getPostersColors = async (index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const [primary = 'green', secondary = 'orange'] = await getImageColors(uri)

    setMainColors({ primary, secondary })
  }

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPostersColors(0);
    }
  }, [nowPlaying])




  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator color='red' size={100} />
      </View>
    )
  }


  return (

    <GradientBackground >

      <ScrollView>
        <View style={{ marginTop: top + 20 }}>

          {/* Carousel Principal */}
          <View style={{ height: 480 }}>
            <Carousel
              data={nowPlaying}
              renderItem={(item: { item: Movie }) => <MoviePoster movie={item.item} />}
              sliderWidth={windowWidth}
              itemWidth={300}
              inactiveSlideShift={0}
              inactiveSlideOpacity={0.9}
              onSnapToItem={getPostersColors}
              pagingEnabled={false}
              showsHorizontalScrollIndicator={false}
              

            />
          </View>

          {/* Peliculas Populares */}
          {/* <HorizontalSlider title='En cine' movies={peliculasEnCine} /> */}
          <HorizontalSlider title='Popular' movies={popular} />
          <HorizontalSlider title='Top Rated' movies={topRated} />
          <HorizontalSlider title='Upcoming' movies={upcoming} />



        </View>
      </ScrollView>
    </GradientBackground>
  )
}

