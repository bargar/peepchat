import Ember from 'ember';

const { RSVP, inject } = Ember;

export default Ember.Route.extend({
  flashMessages: inject.service(),
  actions: {
    createRoom() {
      let data = this.get('currentModel.newRoom');
      // create an ember-data record
      let room = this.store.createRecord('room', { name: data.name });
      // clear any existing error messages
      this.set('currentModel.newRoom.errors', []);

      room.save().then(() => {
        this.get('flashMessages').success(`Created room: $[data.name}`);
        this.set('currentModel.newRoom.name', ''); // clear input
      }).catch(err => {
        // remove ember-data record from store
        this.store.unloadRecord(room);
        // pass any error messages (e.g. server-side validation) into the UI
        this.set('currentModel.newRoom.errors', (err.errors || []).mapBy('detail'));
        this.get('flashMessages').danger(`Problem creating room: ${data.name}`);
      });
    },
    removeRoom(room) {
      if (window.confirm('Are you sure?')) {
        room.destroyRecord().then(() => {
          this.get('flashMessages').success(`Deleted room: ${room.get('name')}`);
        }).catch(() => {
          this.get('flashMessages').success(`Problem deleting room: ${room.get('name')}`);
        });
      }
    }
  },
  model() {
    return RSVP.hash({
      // live array of all rooms
      rooms: this.store.findAll('room'),
      // object to use for creating a new room
      newRoom: {name: '', errors: []}
    });
  }
});
