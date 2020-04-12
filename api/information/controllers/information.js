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
      entities = await strapi.services.information.search(ctx.query);
    } else {
      entities = await strapi.services.information.find(ctx.query);
    }

    return entities.map(entity =>
      omit(sanitizeEntity(entity, { model: strapi.models.information }), ['内容', 'content'])
    );
  },

  async update(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.information.update(ctx.params, data, {
        files,
      });
    } else {
      entity = await strapi.services.information.update(
        ctx.params,
        ctx.request.body
      );
    }

    return sanitizeEntity(entity, { model: strapi.models.information });
  },

  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.information.create(data, { files });
    } else {
      entity = await strapi.services.information.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.information });
  },
};
