import axios from 'axios';

type PlaceDetails = {
    result: {
        photos?: { photo_reference: string }[];
    };
};


export const getImgOfPlace = async (placeName: string) => {
    try{
        const placeSearchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(placeName)}&inputtype=textquery&fields=place_id&key=${process.env.GOOGLE_PLACES_API_KEY}`;
        const searchResponse = await axios.get(placeSearchUrl);
        const placeId = searchResponse.data.candidates[0]?.place_id

        if(!placeId) throw Error;

        const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${process.env.GOOGLE_PLACES_API_KEY}`;
        const detailsResponse = await axios.get<PlaceDetails>(placeDetailsUrl);
        const photoReference = detailsResponse.data.result.photos?.[0]?.photo_reference;

        if(!photoReference) throw Error;

        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.GOOGLE_PLACES_API_KEY}`;
        return photoUrl;
    }
    catch(e){
        return "https://travelbuddy-public-images.s3.ap-southeast-1.amazonaws.com/travelbuddy.jpg"
    }

}