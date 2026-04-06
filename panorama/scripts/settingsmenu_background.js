'use strict';

var SettingsMenuBackground = ( function () {

    var m_backgrounds = {
        "custom": {
            "name": "Custom Background",
            "fallback": "background_16x9.png",
            "square": "background_4x3.png",
            "wide": "background_16x9.png",
            "ultrawide": "background_21x9.png"
        }
    };

    var _ResetOptions = function()
    {
        var ratio = GameInterfaceAPI.GetSettingString('ui_mainmenu_bkgnd_ratio');
        if(ratio != '' && ratio != 'square' && ratio != 'wide' && ratio != 'ultrawide')
            GameInterfaceAPI.SetSettingString('ui_mainmenu_bkgnd_ratio', '');

        var back = GameInterfaceAPI.GetSettingString('ui_mainmenu_bkgnd');
        var backKeys = Object.keys(m_backgrounds);

        if(back == 'random')
            return;

        for( var id of backKeys )
        {
            if(id == back)
                return;
        }

        GameInterfaceAPI.SetSettingString('ui_mainmenu_bkgnd', backKeys[0]);
    }

    var _Refresh = function()
    {
        $.Msg( '[SettingsBG] Refresh' );
        if (MainMenu && MainMenu.SetBackgroundMovie)
            MainMenu.SetBackgroundMovie();
    }

    var _Assign = function()
    {
        var elDropdown = $( '#MainMenuMovieDropdown' );
        $.Msg( '[SettingsBG] Assign, dropdown valid:', elDropdown && elDropdown.IsValid() );

        if ( !elDropdown || !elDropdown.IsValid() )
            return;

        for(var id in m_backgrounds)
        {
            elDropdown.AddOption($.CreatePanel( 'Label', elDropdown, 'mainmenu-bg-'+id, { text: m_backgrounds[id]['name'], value: id } ));
        }

        elDropdown.AddOption($.CreatePanel( 'Label', elDropdown, 'mainmenu-bg-random', { text: 'Random', value: "random" } ));
        $.Msg( '[SettingsBG] Options assigned' );
    }

    var _Init = function()
    {
        $.Msg( '[SettingsBG] Init called' );
        _ResetOptions();
        _Assign();
    }

    return {
        Init        : _Init,
        Refresh     : _Refresh,
    };
})();

(function()
{
    $.RegisterForUnhandledEvent( 'MainMenuGoToSettings', function() {
        $.Msg( '[SettingsBG] Settings opened' );
        SettingsMenuBackground.Init();
    });
})();
