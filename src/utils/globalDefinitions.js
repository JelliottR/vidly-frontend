const definitions = {};

definitions['authToken'] = 'authToken';

const getValueFromKey = (key) => {
    return definitions[key];
}

export default getValueFromKey;