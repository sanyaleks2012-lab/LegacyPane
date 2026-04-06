'use strict';

var LoadingScreen = ( function() {

	var cvars = [ 'mp_roundtime', 'mp_fraglimit', 'mp_maxrounds' ];
	var cvalues = [ '0', '0', '0' ];
	var _mapName = "";

	var _Init = function ()
	{
		$('#ProgressBar').value = 0;

		var elOverview = $('#LoadingScreenOverview');
		elOverview.SetHasClass( "loading-screen-content__overview--colored", false )
		$('#LoadingScreenOverviewIcons').RemoveAndDeleteChildren();

		$('#LoadingScreenContentsBottom').AddClass("hidden_no_info");

		$('#LoadingScreenMapName').text = "";
		$('#LoadingScreenGameMode').SetLocalizationString( "#SFUI_LOADING" );
		$('#LoadingScreenModeDesc').text = "";
		$('#LoadingScreenGameModeIcon').SetImage("");

		var elBackgroundImage = $.GetContextPanel().FindChildInLayoutFile('BackgroundMapImage');

		elBackgroundImage.SetImage("");

	    $('#LoadingScreenIcon').visible = false;
	}

	var _UpdateLoadingScreenInfo = function (mapName, prettyMapName, prettyGameModeNameWrong, gameType, gameModeLoaded, descriptionText)
	{
		_mapName = mapName
		for ( var j = 0; j < cvars.length; ++ j )
		{
			var val = GameInterfaceAPI.GetSettingString( cvars[j] );
			if ( val !== '0' )
			{
				cvalues[j] = val;
			}
		}

		for ( var j = 0; j < cvars.length; ++ j )
		{
			const regex = new RegExp( '\\${d:'+cvars[j]+'}', 'gi' );
			descriptionText = descriptionText.replace( regex, cvalues[j] );
			$.GetContextPanel().SetDialogVariable( cvars[j], cvalues[j] );
		}

		if( mapName )
		{
			var elBackgroundImage = $.GetContextPanel().FindChildInLayoutFile( 'BackgroundMapImage' );
			elBackgroundImage.SetImage( 'file://{images}/map_icons/screenshots/1080p/' + mapName +'.png' );


			var mapIconFailedToLoad = function () {
			    $('#LoadingScreenMapName').RemoveClass("loading-screen-content__info__text-title-short");
			    $('#LoadingScreenMapName').AddClass("loading-screen-content__info__text-title-long");
			    $('#LoadingScreenIcon').visible = false;
			}

			$('#LoadingScreenIcon').visible = true;
			$.RegisterEventHandler('ImageFailedLoad', $('#LoadingScreenIcon'), mapIconFailedToLoad.bind(undefined));
			$('#LoadingScreenMapName').RemoveClass("loading-screen-content__info__text-title-long");
			$('#LoadingScreenMapName').AddClass("loading-screen-content__info__text-title-short");
			$('#LoadingScreenIcon').SetImage('file://{images}/map_icons/map_icon_' + mapName + '.svg');

			$('#LoadingScreenContentsBottom').RemoveClass("hidden_no_info");

			var mapOverviewLoaded = function () {
			    $('#LoadingScreenOverview').visible = true;
			}
			$.RegisterEventHandler('ImageLoaded', $('#LoadingScreenOverview'), mapOverviewLoaded.bind(undefined));
			var mapOverviewFailed = function () {
				const overview = $('#LoadingScreenOverview')
				if (overview.visible) {
					$('#LoadingScreenOverview').visible = false;
					$('#LoadingScreenOverview').SetImage("file://{images}/overheadmaps/default2.png");
				}
			}
			$.RegisterEventHandler('ImageFailedLoad', $('#LoadingScreenOverview'), mapOverviewFailed.bind(undefined));

			var elOverview = $( '#LoadingScreenOverview' );

			if( mapName === "lobby_mapveto" )
			{
				elOverview.SetImage('file://{images}/overheadmaps/' + mapName +'.png');
			}
			else
			{
				elOverview.SetImage('file://{images_overviews}/' + mapName + '_radar.dds');
			}

			$( '#LoadingScreenIcon' ).AddClass('show');
			elBackgroundImage.AddClass('show');

			if ( prettyMapName != "" )
			    $( '#LoadingScreenMapName' ).SetProceduralTextThatIPromiseIsLocalizedAndEscaped( prettyMapName, false );
			else
			    $( '#LoadingScreenMapName' ).SetLocalizationString( GameStateAPI.GetMapDisplayNameToken( mapName ) );
		}

		var elInfoBlock = $('#LoadingScreenInfo' );

		if( gameModeLoaded )
		{
		    elInfoBlock.RemoveClass('hidden');
		    $( '#LoadingScreenGameMode' ).SetLocalizationString( '#sfui_gamemode_' + gameModeLoaded );

			if ( GameStateAPI.IsQueuedMatchmakingMode_Team() || mapName === 'lobby_mapveto' )
				$('#LoadingScreenGameModeIcon').SetImage( "file://{images}/icons/ui/competitive_teams.svg" );
			else
				$('#LoadingScreenGameModeIcon').SetImage('file://{images}/icons/ui/' + gameModeLoaded + '.svg');

			if ( descriptionText != "" )
			{
				$( '#LoadingScreenModeDesc' ).SetProceduralTextThatIPromiseIsLocalizedAndEscaped( descriptionText, false );
			}
			else
			    $( '#LoadingScreenModeDesc' ).SetLocalizationString( "" );
		}
		else
			elInfoBlock.AddClass( 'hidden' );
	}


	function CreateMapIcon( overviewKV, elParent, name )
	{
	    var X = overviewKV[ name+'_x' ];
	    var Y = overviewKV[ name+'_y' ];
	    if (X != null && Y != null && parseFloat(X) && parseFloat(Y))
		{
			var elIcon = $.CreatePanel( "Image", elParent, name );
			elIcon.style.position = Math.floor( X * 100 ).toString() + "% " + Math.floor( Y * 100 ).toString() + "% 0px;";
			return elIcon;
		}
	}

	function CreateBombSite( letter, overviewKV, elMapOverview )
	{
		const elImage = CreateMapIcon( overviewKV, elMapOverview, "bomb"+letter )
		if ( elImage )
		{
			elImage.SetImage( "file://{images}/hud/radar/icon-bomb-zone-"+letter+".svg" );
			elImage.AddClass( "bomb-zone" );
		}
	}

	var _OnMapConfigLoaded = function ( overviewKV )
	{

		var elMapOverview = $( '#LoadingScreenOverview' );
		var elMapOverviewIcons = $( '#LoadingScreenOverviewIcons' );

		if( elMapOverview )
		{
			var elImage;
			if ( elImage = CreateMapIcon( overviewKV, elMapOverviewIcons, "CTSpawn" ) )
			{
			    elImage.SetImage("file://{images}/hud/radar/RadarCTLogo.svg");
				elImage.AddClass("ct-spawn");
			}

			if ( elImage = CreateMapIcon( overviewKV, elMapOverviewIcons, "TSpawn" ) )
			{
			    elImage.SetImage("file://{images}/hud/radar/RadarTLogo.svg");
				elImage.AddClass( "t-spawn" );
			}

			CreateBombSite( "A", overviewKV, elMapOverviewIcons )
			CreateBombSite( "B", overviewKV, elMapOverviewIcons )

			for ( var i = 1; i <= 6; i++ )
			{
				if ( elImage = CreateMapIcon( overviewKV, elMapOverviewIcons, "Hostage"+i ) )
				{
				    elImage.SetImage("file://{images}/icons/ui/hostage_alive.svg");
					elImage.AddClass( "hostage-alive" );
				}
			}

			elMapOverview.SetHasClass( "loading-screen-content__overview--colored", !!overviewKV.colorable )
		}
	}


	return {
		Init					: _Init,
		UpdateLoadingScreenInfo	: _UpdateLoadingScreenInfo,
		OnMapConfigLoaded		: _OnMapConfigLoaded
	}
})();


( function() {
	$.RegisterForUnhandledEvent( 'PopulateLoadingScreen', LoadingScreen.UpdateLoadingScreenInfo );
	$.RegisterForUnhandledEvent( 'QueueConnectToServer', LoadingScreen.Init );
	$.RegisterForUnhandledEvent( 'OnMapConfigLoaded', LoadingScreen.OnMapConfigLoaded );
	$.RegisterForUnhandledEvent( 'UnloadLoadingScreenAndReinit', LoadingScreen.Init );



})();
