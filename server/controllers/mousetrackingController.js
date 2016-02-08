var model = require('../db/model');

// var MouseTracking = sequelize.define('mousetracking', {
//   id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   movement: { type: Sequelize.STRING, notNull: true, notEmpty: true },
//   clicks: { type: Sequelize.STRING, notNull: true },
//   urlchange: { type: Sequelize.STRING, notNull: true }
// }, { timestamps: false });

// input should be of the following format:
// { movement: 'abc', clicks: 'abc', urlchange: 'abc', userId: 123, imageId: 123 }
// output shall be of the following format:
// { id: 123, movement: 'abc', clicks: 'abc', urlchange: 'abc' }
var createMouseTracking = function (mouseTracking) {
  var params = {
    userId: mouseTracking.userId,
    imageId: mouseTracking.imageId,
    data: mouseTracking.data
  };

  console.log('!!!!mouse tracking controller..... params:', params)

  return model.MouseTracking.create(params)
    .then(function (mouseTracking) {
      return mouseTracking;
    });
};

// input should be of the following format:
// { userId: 123, imageId: 123 }
// output shall be of the following format:
// { id: 123, movement: 'abc', clicks: 'abc', urlchange: 'abc' }

var retrieveMouseTracking = function (mouseTracking) {
  return model.MouseTracking.findAll({
    where: { imageId: mouseTracking.imageId },
    include: [{
      model: model.User,
      where: { id: mouseTracking.userId },
      attributes: [ 'id', 'email' ],
      include: [{
        model: model.Project,
        include: [{
          model: model.Test,
          include: [{
            model: model.Image,
            where: { id: mouseTracking.imageId }
          }]
        }]
      }]
    }]
  })
  .then(function (result) {
    if (result === null) {
      throw (new Error ('Error! Mouse tracking does not exist!'));
    } else {
      return result;
    }
  });
};

// input should be of the following format:
// { id: 123, movement: 'abc', clicks: 'abc', urlchange: 'abc' }
// output shall be of the following format:
// { id: 123, movement: 'abc', clicks: 'abc', urlchange: 'abc' }
var updateMouseTracking = function (mouseTracking) {
  var params = { id: mouseTracking.mouseTrackingId };

  return model.Image.findOne({
    where: { id: mouseTracking.imageId },
    include: [{
      model: model.MouseTracking,
      where: params,
      include: [{
        model: model.User,
        where: { id: mouseTracking.userId },
        attributes: [ 'id', 'email' ],
        include: [{
          model: model.Project,
          include: [{
            model: model.Test,
            include: [{
              model: model.Image,
              where: { id: mouseTracking.imageId }
            }]
          }]
        }]
      }]
    }]
  })
  .then(function (result) {
    if (result.mousetrackings[0].user.projects[0].projectUser.get('role') === 'owner') {
      return model.MouseTracking.update(mouseTracking.update, {
        where: params
      })
      .spread(function (updated) {
        if (updated === 0) {
          throw (new Error ('Error! Mouse tracking update failed!'));
        } else {
          return updated;
        }
      });
    } else {
      throw (new Error ('Error! Insufficient permissions to modify this entry!'));
    }
  });
};

// input should be of the following format:
// { userId: 123, imageId: 123 }
// output shall be of the following format:
// 1
var deleteMouseTracking = function (mouseTracking) {
  var params = { id: mouseTracking.mouseTrackingId };

  return model.Image.findOne({
    where: { id: mouseTracking.imageId },
    include: [{
      model: model.MouseTracking,
      where: params,
      include: [{
        model: model.User,
        where: { id: mouseTracking.userId },
        attributes: [ 'id', 'email' ],
        include: [{
          model: model.Project,
          include: [{
            model: model.Test,
            include: [{
              model: model.Image,
              where: { id: mouseTracking.imageId }
            }]
          }]
        }]
      }]
    }]
  })
  .then(function (result) {
    if (result.mousetrackings[0].user.projects[0].projectUser.get('role') === 'owner') {
      return model.MouseTracking.destroy({
        where: params
      })
      .then(function (deleted) {
        if (deleted === 0) {
          throw (new Error ('Error! Mouse tracking delete failed!'));
        } else {
          return deleted;
        }
      });
    } else {
      throw (new Error ('Error! Insufficient permissions to modify this entry!'));
    }
  });
};

module.exports = {
  createMouseTracking: createMouseTracking,
  retrieveMouseTracking: retrieveMouseTracking,
  updateMouseTracking: updateMouseTracking,
  deleteMouseTracking: deleteMouseTracking
};
