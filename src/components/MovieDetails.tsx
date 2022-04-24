import React from 'react'
import { View, Text, FlatList } from 'react-native'
import currencyFormatter from 'currency-formatter'
import { MovieFull } from '../interfaces/movieInterface';
import { Cast } from '../interfaces/creditsInterface';
import Icon from 'react-native-vector-icons/Ionicons';
import { CastItem } from './CastItem';

interface Props {
  movieFull: MovieFull;
  cast: Cast[];
}

export const MovieDetails = ({ movieFull, cast }: Props) => {
  return (
    <>

      <View style={{ marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            name="star-outline"
            color="grey"
            size={16}
          />

          <Text style={{ color: 'black'}}> {movieFull.vote_average}</Text>

          <Text style={{ color: 'black', marginLeft: 5 }}>
            - {movieFull.genres.map(genre => genre.name).join(', ')}
          </Text>

        </View>


        <Text style={{ color: 'black', fontSize: 25, marginTop: 10, fontWeight: 'bold' }}>
          Historia
        </Text>

        <Text style={{ color: 'black', fontSize: 16 }}>
          {movieFull.overview}
        </Text>

        <Text style={{color: 'black', fontSize: 25, marginTop: 10, fontWeight: 'bold' }}>
          Presupuesto
        </Text>

        <Text style={{ color: 'black', fontSize: 18 }}>
          {currencyFormatter.format(movieFull.budget, { code: 'USD' })}
        </Text>

      </View>


      <View style={{ marginTop: 10, marginBottom:50 }}>

        <Text style={{color: 'black', fontSize: 25, marginTop: 10, fontWeight: 'bold', marginHorizontal:20 }}>
          Actores
        </Text>

        <FlatList

          data={cast}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <CastItem actor={item} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            marginTop: 10,
            height: 70,
          }}

        />
       
      </View>


    </>
  )
}

