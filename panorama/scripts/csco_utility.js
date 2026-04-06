'use strict';

var CSCOUtil = ( function() {

    var _getAspectRatio = function()
    {
        var ctx = $.GetContextPanel();
        if ( !ctx ) return undefined;

        if ( ctx.BAscendantHasClass( 'AspectRatio21x9' ) ) return 'ultrawide';
        if ( ctx.BAscendantHasClass( 'AspectRatio32x9' ) ) return 'ultrawide';
        if ( ctx.BAscendantHasClass( 'AspectRatio16x10' ) ) return 'wide';
        if ( ctx.BAscendantHasClass( 'AspectRatio16x9' ) ) return 'wide';
        if ( ctx.BAscendantHasClass( 'AspectRatio5x4' ) ) return 'square';
        if ( ctx.BAscendantHasClass( 'AspectRatio4x3' ) ) return 'square';
        return undefined;
    };

    return {
        getAspectRatio : _getAspectRatio,
    };

})();
