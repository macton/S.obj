var S = require('s');

var obj = {
  keys: function( obj ) {
    return Object.keys( obj );
  },
  create: function( obj ) {
    return Object.create( Object.prototype, obj );
  },
  fromList: S.curry( function( key, value, list ) {
    return list.reduce( function( obj, element ) {
      obj[ S.cv( key, element ) ] = S.cv( value, element );
      return obj;
    }, {} );
  }),
  max: S.curry( function( fn, obj ) {
    return Object.keys( obj ).reduce( function( max, key ) {
      var value = S.cv( fn, obj[key] ) ;
      return value > max ? value : max;
    }, 0);
  }),
  merge: S.curry( function( a, b ) {
    var obj = {};
    Object.keys( a ).forEach( function( key ) {
      obj[ key ] = a[ key ];
    });
    Object.keys( b ).forEach( function( key ) {
      obj[ key ] = b[ key ];
    });
    return obj;
  }),
  def: {
    lazy: function(fn) {
      var value;
      return {
        enumerable: true,
        configurable: false,
        get: function() {
          if (value === void 0) {
            value = fn.call(this);
          }
          return value;
        }
      };
    },
  },
};

exports = module.exports = obj;
