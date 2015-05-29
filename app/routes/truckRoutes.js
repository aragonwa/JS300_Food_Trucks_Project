'use strict';
var express = require('express');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/foodTruckAPI');
var Truck = require('../models/truckModel');
var router = express.Router();

router.route('/')
  .get(function (request, response) {
    Truck.find(function(error, trucks) {
      if (error) {
        response.status(500).send(error);
      } else {
        response.json(trucks);
      }
    });
  })
  .post(function (request, response) {
    // the request.body is the new truck object
    var truck = new Truck(request.body);
    truck.save(function (error) {
      if (error) {
        response.status(500).send(error);
      }
      else {
        response.status(201).send(truck);
      }
    });
  });

router.route('/:truckId')
  .get(function (request, response) {
    Truck.findById(request.params.truckId, function (error, truck) {
      if (error) {
        response.status(500).send(error);
      } else {
        response.json(truck);
      }
    });
  })
  .put(function (request, response) {
    Truck.findById(request.params.id, function (error, truck) {
      if (error) {
        response.status(500).send(error);
      } else {
        truck.name = request.body.name;
        truck.foodType = request.body.foodType;
        truck.schedule = request.body.schedule;
        truck.payment = request.body.payment;
        truck.description = request.body.description;
        truck.website = request.body.website;
        truck.Facebook = request.body.Facebook;
        truck.Twitter = request.body.Twitter;
        truck.save(function (error) {
          if (error) {
            response.status(500).send(error);
          } else {
            response.send(truck);
          }
        });
      }
    });
  })
  .delete(function(request,response){
    // like the GET route, use the findById method on the mongoose model
    Truck.findById(request.params.truckId, function (error, truck) {
      if (error) {
        response.status(500).send(error);
      } else {
        truck.remove(function (error) {
          if (error) {
            response.status(500).send(error);
          } else {
            response.status(204).send('removed');
          }
        });
      }
    });
  });

module.exports = router;