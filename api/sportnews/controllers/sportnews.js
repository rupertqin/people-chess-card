'use strict';
const { sanitizeEntity } = require('strapi-utils');
const omit = require('lodash/omit');

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.sportnews.search(ctx.query);
    } else {
      entities = await strapi.services.sportnews.find(ctx.query);
    }

    return entities.map(entity =>
      omit(sanitizeEntity(entity, { model: strapi.models.sportnews }), ['内容', 'content'])
    );
  },
};
