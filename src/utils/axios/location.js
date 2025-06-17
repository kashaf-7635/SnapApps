import {GOOGLE_MAP_API_KEY} from '@env';
import axios from 'axios';

export const getMapPreview = (lat, lng) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_MAP_API_KEY}`;
  return imagePreviewUrl;
};

export const getAddress = async (lat, lng) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAP_API_KEY}`;

  try {
    const res = await axios.get(url);
    const address = res.data.results[0].formatted_address;
    return address;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't fetch address, Please try again!");
  }
};
