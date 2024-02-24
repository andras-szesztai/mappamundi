import fs from 'fs';

const loadJson = (path) => {
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data);
};

const jsonData = loadJson('assets/custom.geo.json');

const formattedFeatures = jsonData.features.map((d) => {
  return {
    ...d,
    properties: {
      label_x: d.properties.label_x,
      label_y: d.properties.label_y,
      type: d.properties.type,
      name_long: d.properties.name_long,
      formal_en: d.properties.formal_en,
      adm0_iso: d.properties.adm0_iso,
      iso_n3: d.properties.iso_n3,
      iso_a2: d.properties.iso_a2,
      iso_a3: d.properties.iso_a3,
      continent: d.properties.continent,
      region_un: d.properties.region_un,
      subregion: d.properties.subregion,
      region_wb: d.properties.region_wb,
      wikidataid: d.properties.wikidataid,
    },
  };
});

fs.writeFileSync(
  './countries.json',
  JSON.stringify({ type: 'FeatureCollection', features: formattedFeatures })
);
