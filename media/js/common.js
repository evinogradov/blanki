$.fn.extend({

    /**
     * Работает аналогично jQuery.on, но позволяет передать контекст в обработчик события.
     * @example $('.button')._on('click', function(){ this.openMenu({ speed: 300 }) }, this)
     *
     * @param {string} eventName Имя события.
     * @param {function} handler Обработчик события.
     * @param {object} context Контекcт обработчика.
     */
    _on: function(eventName, handler, context){
        this.on(eventName, $.proxy(handler, context));
    }
});


Blanki.extend = function(parent){
    
    /**
     * Возвращает новый модуль, отнаследованный от родительского, сохранив все его методы.
     * @example var childModule = Blanki.extend(parentModule)
     * @param {function} parent Конструктор родительского модуля.
     */
    var child = function(){
        /** @constructor */
    };
    for ( var method in parent.prototype ) {
        child.prototype[method] = parent.prototype[method];
    }
    return child;
};


Blanki.Base = function(){
    /** @constructor */
};


Blanki.Base.prototype.getNodes = function(selectors){

    /**
     * Создает объекты jQuery из объекта с селекторами
     * @example this.els = this.getNodes(this.settings.selectors)
     * @param {object} selectors Объект с селекторами.
     */
    var nodes = {},
        iterateSelectors = function(obj, parent){
        for ( var key in obj ) {
            var value = obj[key];
            parent = parent || nodes;
            if ( typeof value === 'string' ) {
                parent[key] = $(value);
            }
            else {
                parent[key] = {};
                iterateSelectors(value, parent[key]);
            }
        }
    };
    iterateSelectors(selectors, nodes);
    return nodes;
};



/* Общие модули */

/**
 * Форма авторизации
 * @extends {Blanki.Base}
 */

Blanki.Auth = Blanki.extend(Blanki.Base);

Blanki.Auth.prototype.settings = {
    selectors: {
        body: '.body',
        container: '.auth',
        button: '.auth-button',
        dropdown: {
            login: '.auth-login',
            registration: '.auth-registration'
        },
        link: {
            login: '.auth-link__login',
            registration: '.auth-link__register'
        }
    },
    classes: {
        opened: 'auth_opened'
    }
};

Blanki.Auth.prototype.init = function(){

    this.els = this.getNodes(this.settings.selectors);

    this.els.button._on('click', function(){
        this.els.dropdown.login.addClass(this.settings.classes.opened);
    }, this);

    this.els.link.registration._on('click', function(){
        this.els.dropdown.login.removeClass(this.settings.classes.opened);
        this.els.dropdown.registration.addClass(this.settings.classes.opened);
    }, this);

    this.els.link.login._on('click', function(){
        this.els.dropdown.login.addClass(this.settings.classes.opened);
        this.els.dropdown.registration.removeClass(this.settings.classes.opened);
    }, this);

    this.els.body._on('click keydown', function(event){
        if ( !$(event.target).parents().is(this.settings.selectors.container) || event.which === 27 ) {
            this.els.dropdown.login.removeClass(this.settings.classes.opened);
            this.els.dropdown.registration.removeClass(this.settings.classes.opened);
        }
    }, this);
};


// todo: remove

$('.doc-sheet-field__input').each(function(i, e){
    var element = $(e);
    element.html($.trim(element.html()));
    e.contentEditable = true
    e.spellcheck = false
});