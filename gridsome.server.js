const path = require('path')
const fs = require('fs-extra')
const yaml = require('js-yaml')

module.exports = function (api) {
  api.loadSource(async (store) => {
    // contributors
    const authorsPath = path.join(__dirname, 'content/contributors/contributors.yaml');
    const authorsRaw = await fs.readFile(authorsPath, 'utf8');
    const authorsJson = yaml.load(authorsRaw);
    const authors = store.addCollection('Contributor');

    authorsJson.forEach(({id, name:title,...fields }) => {
      authors.addNode({
        id,
        title,
        internal: {
          origin:authorsPath
        },
        ...fields
      });
    });

    // tagging
    const tagsPath = path.join(__dirname, 'content/tags/tags.yaml');
    const tagsRaw = await fs.readFile(tagsPath, 'utf8');
    const tagsJson = yaml.load(tagsRaw);
    const tags = store.addCollection('Tag');

    tagsJson.forEach(({id,...fields}) => {
      tags.addNode({
        id,
        ...fields
      });
    });

  });
};
