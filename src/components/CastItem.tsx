import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react'
import { Cast } from '../interfaces/creditsInterface';

interface Props {
    actor: Cast;

}

export const CastItem = ({ actor }: Props) => {

    const uri = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;
    return (
        <View style={styles.container}>
            {
                actor.profile_path &&
                <Image
                    source={{ uri }}
                    style={{ width: 50, height: 50, borderRadius: 10 }}

                />

            }
            <View style={styles.actorInfo}>
                <Text style={{ color: 'black',fontSize: 18, fontWeight: 'bold' }}>
                    {actor.name}
                </Text>
                <Text style={{ color: 'black', fontSize: 16, opacity: .7 }}>
                    {actor.character}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 50,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginHorizontal: 30,
        paddingRight: 15,
        
    },

    actorInfo: {
        marginTop:4,
        marginLeft: 10,
    }
});

