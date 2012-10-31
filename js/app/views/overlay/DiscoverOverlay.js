/*
 * Copyright 2012 buddycloud
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define(function(require) {
  var Backbone = require('backbone');
  var avatarFallback = require('util/avatarFallback');
  var MostActiveDiscover = require('models/MostActiveDiscover');
  var template = require('text!templates/overlay/discover.html');

  var DiscoverOverlay = Backbone.View.extend({

    initialize: function() {
      this.model = new MostActiveDiscover();
      this.model.doDiscover({max: 10});
      this.model.bind('sync', this.render, this);
    },

    render: function() {
      // FIXME popular must show the channels with biggest number of followers
      var mostActive = this.model.models.slice(0, 5);
      var popular = this.model.models.slice(5, 10);
      this.$el.html(_.template(template, {
        mostActive: mostActive,
        popular: popular
      }));
      avatarFallback(this.$('.avatar'), undefined, 50);
    }
  });

  return DiscoverOverlay;
});
