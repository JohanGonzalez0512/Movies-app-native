import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RootStackParams, Navigation } from '../navigation/Navigation';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';
const screenHeight = Dimensions.get('screen').height;


interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> { };



export const DetailScreen = ({ route, navigation }: Props) => {
  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const { isLoading, cast, movieFull } = useMovieDetails(movie.id);


  return (

    <ScrollView>

      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image
            source={{ uri }}
            style={styles.posterImage}
          />
        </View>

      </View>

      <View style={styles.marginContainer}>
        <Text style={styles.subtitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>

      {
        isLoading ?
          <ActivityIndicator size={35} color="grey" style={{ marginTop: 20 }} />
          : <MovieDetails cast={cast} movieFull={movieFull!} />

      }
      <View style={styles.backButton}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
        >

          <Icon
            name="arrow-back-outline"
            size={50}
            color={'#fff'}

          />

        </TouchableOpacity>
      </View>



    </ScrollView>

  )
}
const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: screenHeight * 0.7,


    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  posterImage: {
    flex: 1,
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
    color: 'black',
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 30,
    left: 5,
  }
});

