import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    doRegister() {
      console.log('attempted register');
    }
  },
  model() {
    return this.store.createRecord('user');
  }
});
