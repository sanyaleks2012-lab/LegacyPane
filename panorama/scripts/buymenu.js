'use strict';

var BuyMenu = ( function() {


    var m_oldWeaponItemId;

    var _UpdateCharacter = function( team, weaponItemId, charItemId, bForceRefresh, bResetAgentAngles = false )
    {
        if ( ( weaponItemId == m_oldWeaponItemId ) && !bForceRefresh )
        {
            return;
        }

        var elPreviewPanel = $.GetContextPanel().FindChildTraverse( "id-buymenu-weapon" );
        if ( !elPreviewPanel )
            return;

        if ( !weaponItemId )
        {
            weaponItemId = MockAdapter.GetPlayerActiveWeaponItemId( MockAdapter.GetLocalPlayerXuid() );
        }

        if ( !weaponItemId )
        {
            return;
        }

        var modelPath = ItemInfo.GetModelPathFromJSONOrAPI( weaponItemId );

        if ( modelPath && modelPath !== "" )
        {
            elPreviewPanel.SetScene( "resource/ui/econ/ItemModelPanelCharWeaponInspect.res", modelPath, false );
            elPreviewPanel.SetCameraPreset( 2, false );
            elPreviewPanel.SetFlashlightAmount( 1 );
            elPreviewPanel.SetFlashlightAngle( 21.01, 161.45, 0.00 );
            elPreviewPanel.SetFlashlightPosition( 51.49, -13.39, 75.93 );
            elPreviewPanel.SetSceneOffset( 0, 0, 0 );
            elPreviewPanel.ResetAnimation( false );
        }

        m_oldWeaponItemId = weaponItemId;

    }


    return {

        UpdateCharacter: _UpdateCharacter
    };

} )();




(function ()
{
    $.RegisterForUnhandledEvent( "BuyMenu_UpdateCharacter", BuyMenu.UpdateCharacter );
})();
