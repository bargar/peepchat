import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['navbar-fixed', 'x-nav'],
  didInsertElement() {
    this._super(...arguments);

    // add id of our side-nav UL as the data-activates property of the collapse
    // button
    this.$('a.button-collapse').attr('data-activates', this.get('_sideNavId'));

    // initialize side nav
    this.$('.button-collapse').sideNav({
      closeOnClick: true
    });

    // initialize all dropdown menus within the menu
    this.$('.dropdown-button').dropdown();
  },
  _setupChildComponent(childComponent) {
    if (childComponent.classNames.indexOf('side-nav') >= 0) {
      this.set('_sideNavId', childComponent.elementId);
    }
  }
});
