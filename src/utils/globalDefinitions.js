const definitions = {};

definitions['authToken'] = 'authToken';
definitions["timeFormat"] = "Do of MMM Y, HH:mm";

const GlobalDef = (key) => {
    return definitions[key];
}

export default GlobalDef;