/* Helpers functions or configuration data to be
saved in a single file */

export const REMOTE_API_URL = "https://randomuser.me/api";
export const LOCAL_API_URL = "http://localhost:7000";

// calculate stats for a given set of data
export const statsCalculator = users => {
    const stats = [];
    for (let i = 0; i < users.data.length; i++) {
        let sumofAge = 0;
        let averageAge = 0;
        let youngest = {}, oldest = {};
        let mostNorthern = {}, mostSouthern = {};
        let tempMax = 0, maxLat = 0;
        let tempMin = 0, minLat = 0;

        for (const user of users.data[i]) {
            sumofAge += user.dob.age;
            if (user.dob.age > tempMax) {
                tempMax = user.dob.age;
                oldest.name = user.name;
                oldest.age = tempMax;
                if (tempMin === 0) {
                    tempMin = user.dob.age;
                    youngest.name = user.name;
                    youngest.age = tempMin;
                }
            } else if (user.dob.age < tempMin) {
                tempMin = user.dob.age;
                youngest.name = user.name;
                youngest.age = tempMin;
            }

            const location = findLocation(user, mostNorthern, mostSouthern, maxLat, minLat);
            maxLat = location.maxLat;
            minLat = location.minLat;
            mostNorthern = location.mostNorthern;
            mostSouthern = location.mostSouthern;

        }
        averageAge = (sumofAge / users.data[i].length).toFixed(2);
        stats.push({ averageAge, youngest, oldest, mostNorthern, mostSouthern });
    }
    return stats;
};

// find locattion of people whether most northern or southern
function findLocation(user, mostNorthern, mostSouthern, maxLat, minLat) {
    let latitude = user.location.coordinates.latitude;
    if (latitude > maxLat) {
        maxLat = latitude;
        mostNorthern.location = user.location.city;
        mostNorthern.name = user.name;
        if (minLat === 0) {
            minLat = latitude;
            mostSouthern.location = user.location.city;
            mostSouthern.name = user.name;
        }
    }
    else if (latitude < minLat) {
        minLat = latitude;
        mostSouthern.location = user.location.city;
        mostSouthern.name = user.name;
        if (maxLat === 0) {
            maxLat = latitude;
            mostNorthern.location = user.location.city;
            mostNorthern.name = user.name;
        }
    }
    return { mostNorthern, mostSouthern, maxLat, minLat };
}
