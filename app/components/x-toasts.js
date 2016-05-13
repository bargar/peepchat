import Ember from 'ember';

const { inject, computed, Component } = Ember;

export default Component.extend({
  classNames: ['toasts'],
  flashMessages: inject.service(),

  // ember-cli-flash expects flash messages to be ordered from top to bottom
  // but toasts come up from the bottom so we'll reverse the order
  reversedFlashQueue: computed('flashMessages.arrangedQueue.[]', function() {
    return this.get('flashMessages.arrangedQueue').reverse();
  })
});
