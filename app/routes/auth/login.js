import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    doLogin() {
      console.log('login attempted');
    }
  }
});
