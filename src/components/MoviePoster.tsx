import { View, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import { Movie } from '../interfaces/movieInterface'
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigation/Navigation';

interface Props {
    movie: Movie;
    height?: number;
    width?: number;
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParams, 'HomeScreen'>

export const MoviePoster = ({ movie, height = 450, width = 300 }: Props) => {

    const [isFinished, setIsFinished] = useState(false);

    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    const navigation = useNavigation<HomeScreenNavigationProp>();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('DetailScreen', movie)}
            activeOpacity={.8}
            style={{
                paddingTop: 5,
                width,
                height,
                marginHorizontal: 2,
                paddingBottom: 20,
                paddingHorizontal: 7,
            }}>

            <View style={{ ...styles.imageContainer, elevation: (isFinished ? 3 : 0) }}>
                <ActivityIndicator
                    style={{
                        flex: 1,
                        display: (isFinished ? 'none' : 'flex'),
                    }}
                    size='large'
                    color={'red'}
                />

                <Image
                    source={{ uri }}
                    onLoad={() => setIsFinished(true)}
                    style={[styles.image, { display: (isFinished ? 'flex' : 'none') }]}

                />
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    image: {
        flex: 1,
        borderRadius: 20,

    },
    imageContainer: {
        flex: 1,
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,


    }
});

