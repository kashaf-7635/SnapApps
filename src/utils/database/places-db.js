import { enablePromise, openDatabase } from 'react-native-sqlite-storage';
import Place from '../../models/places';

const tableName = 'places';

enablePromise(true);

let dbInstance = null;

export const getDBConnection = async () => {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await openDatabase({ name: 'places.db', location: 'default' });
  return dbInstance;
};

export const closeDBConnection = async () => {
  if (dbInstance) {
    await dbInstance.close();
    dbInstance = null;
  }
};

export const init = async () => {
  const db = await getDBConnection();
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    imageUri TEXT NOT NULL,
    address TEXT NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL
  )`;

  return new Promise(async (resolve, reject) => {
    try {
      await db.executeSql(query);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const insertPlace = async place => {
  const db = await getDBConnection();
  const query = `INSERT INTO ${tableName}(title, imageUri, address, lat, lng) VALUES(?, ?, ?, ?, ?)`;

  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.executeSql(query, [
        place.title,
        place.imageUri,
        place.address,
        place.location.lat,
        place.location.lng,
      ]);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchPlaces = async () => {
  const db = await getDBConnection();
  const placeItems = [];
  const query = `SELECT * FROM ${tableName}`;

  return new Promise(async (resolve, reject) => {
    try {
      const results = await db.executeSql(query);
      results.forEach(result => {
        for (let i = 0; i < result.rows.length; i++) {
          const curr = result.rows.item(i);
          placeItems.push(
            new Place(
              curr.title,
              curr.imageUri,
              curr.address,
              {
                lat: curr.lat,
                lng: curr.lng,
              },
              curr.id,
            ),
          );
        }
      });

      resolve(placeItems);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchPlaceDetails = async id => {
  const db = await getDBConnection();
  const query = `SELECT * from ${tableName} WHERE id = ?`;

  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.executeSql(query, [id]);
      const item = res[0].rows.item(0);
      const place = new Place(
        item.title,
        item.imageUri,
        item.address,
        {
          lat: item.lat,
          lng: item.lng,
        },

        item.id,
      );
      resolve(place);
    } catch (error) {
      reject(error);
    }
  });
};

export const deletePlaceItem = async id => {
  const db = await getDBConnection();
  const query = `DELETE FROM ${tableName} WHERE id = ?`;

  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.executeSql(query, [id]);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};
