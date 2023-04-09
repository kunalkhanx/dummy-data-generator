function generateRandomAddress() {
    // Define arrays of possible values for different address components
    const streetNames = [
        "Main St",
        "Oak Ln",
        "Elm St",
        "Maple Ave",
        "Pine St",
        "Cedar Blvd",
        "Spruce St",
        "Birch Ln",
        "Willow Ave",
    ];
    const cityNames = [
        "Seattle",
        "Los Angeles",
        "New York",
        "Chicago",
        "San Francisco",
        "Boston",
        "Austin",
        "Denver",
        "Portland",
        "Miami",
    ];
    const stateCodes = [
        "CA",
        "NY",
        "IL",
        "WA",
        "TX",
        "FL",
        "OR",
        "CO",
        "MA",
        "NC",
    ];
    const zipCodes = [
        "98104",
        "90014",
        "10001",
        "60605",
        "94108",
        "02108",
        "78701",
        "80202",
        "97204",
        "33101",
    ];
    const countyCodes = [
        "033",
        "037",
        "061",
        "031",
        "075",
        "017",
        "227",
        "031",
        "051",
        "086",
    ];

    // Select random values from the arrays
    const streetName =
        streetNames[Math.floor(Math.random() * streetNames.length)];
    const buildingNumber = Math.floor(Math.random() * 1000) + 1;
    const city = cityNames[Math.floor(Math.random() * cityNames.length)];
    const state = stateCodes[Math.floor(Math.random() * stateCodes.length)];
    const zip = zipCodes[Math.floor(Math.random() * zipCodes.length)];
    const country = "US";
    const countyCode =
        countyCodes[Math.floor(Math.random() * countyCodes.length)];
    const latitude = (Math.random() * (49.3845 - 24.5208) + 24.5208).toFixed(4);
    const longitude = (
        Math.random() * (-66.9548 - -124.2819) +
        -124.2819
    ).toFixed(4);
    const street = `${buildingNumber} ${streetName}`;

    // Create and return the address object
    const address = {
        street,
        streetName,
        buildingNumber,
        city,
        state,
        zip,
        country,
        county_code: countyCode,
        latitude,
        longitude,
    };

    return address;
}

const createAddresses = (length = 25) => {
    const addresses = [];

    for (let i = 1; i <= length; i++) {
        addresses.push(generateRandomAddress());
    }

    return addresses;
};


module.exports = createAddresses