"use strict";

/* ================================================================
   SCALEFORM WINPANEL — модификация экрана победы
   ================================================================ */

var ScaleformWinPanel = (function () {

	var IMG_BASE = "https://raw.githubusercontent.com/sanyaleks2012-lab/storage/main/";
	var m_pendingMvp = false;
	var m_installed = false;

	/* ---- Apply winpanel modifications ---- */
	function _ApplyWinPanel(ctx, team) {
		var isCt      = (team === 3);
		var textColor = isCt ? '#B4BBBE' : '#D6C8B5';
		var winBg     = isCt
			? "url(\"https://images2.imgbox.com/dd/a0/NGbPjmfs_o.png\")"
			: "url(\"https://images2.imgbox.com/2c/64/OQBzyOLT_o.png\")";

		var winFg = null;
		var winFgArr = ctx.FindChildrenWithClassTraverse('TeamFG');
		if (winFgArr.length > 0) winFg = winFgArr[0];

		// Background
		for (var wpBg of ctx.FindChildrenWithClassTraverse('TeamBG__MainBG')) {
			wpBg.style.marginTop     = '-42px';
			wpBg.style.width         = '815px';
			wpBg.style.height        = '155px';
			wpBg.style.backgroundImage = winBg;
			wpBg.style.backgroundSize = 'cover';
			wpBg.style.marginLeft    = '105px';
			wpBg.style.transitionProperty = 'brightness';
		}

		// FG panel
		if (winFg) {
			winFg.style.backgroundColor = '#ffffff00';
			winFg.style.marginTop       = '-42px';
			winFg.style.width           = '815px';
			winFg.style.height          = '155px';
			winFg.style.marginLeft      = '105px';
		}

		// Team title
		for (var tt of ctx.FindChildrenWithClassTraverse('TeamFG__Title')) {
			tt.style.marginTop   = '-45px';
			tt.style.color       = textColor;
			tt.style.fontSize    = '40px';
		}

		// MVP star
		var mvpStar = IMG_BASE + "star.svg";
		for (var star of ctx.FindChildrenWithClassTraverse('MVP__WinnerStar')) {
			if (m_pendingMvp) {
				star.style.visibility  = 'visible';
				star.style.marginTop   = "25%";
				star.style.marginLeft  = "-2px";
				star.SetImage(mvpStar);
				star.style.transform   = 'translateY(5px)';
				star.style.transition  = 'wash-color 0.15s linear 0.0s';
				star.style.washColor   = '#FFFFFF';
				$.Schedule(0.2, (function(s){return function(){
					s.style.transition = 'wash-color 0.30s linear 0.0s';
					s.style.washColor  = '#FFD856';
				};})(star));
			} else {
				star.style.visibility = 'collapse';
			}
		}

		// MVP panel
		for (var mvp of ctx.FindChildrenWithClassTraverse('MVP')) {
			mvp.style.visibility = m_pendingMvp ? 'visible' : 'collapse';
			if (m_pendingMvp) mvp.style.width = '815px';
		}

		// MVP player name
		for (var pn of ctx.FindChildrenWithClassTraverse('MVP__WinnerName')) {
			if (m_pendingMvp) {
				pn.style.visibility    = 'visible';
				pn.style.marginTop     = '8px';
				pn.style.color         = isCt ? '#717377' : '#8A7E6C';
				pn.style.marginLeft    = '-8px';
				pn.style.fontSize      = '17px';
				pn.style.fontWeight    = 'bold';
				pn.style.transform     = 'translateY(0px)';
				pn.style.whiteSpace    = 'normal';
				pn.style.textOverflow  = 'noclip';
				pn.style.width         = '400px';
				pn.style.maxWidth      = '500px';
				pn.style.horizontalAlign = 'center';
				pn.style.textAlign     = 'center';
				pn.style.flowChildren  = 'down';
			} else {
				pn.style.visibility = 'collapse';
			}
		}

		// MVP avatar
		for (var pa of ctx.FindChildrenWithClassTraverse('MVP__Avatar')) {
			if (m_pendingMvp) {
				pa.style.visibility    = 'visible';
				pa.style.zIndex        = "1000";
				pa.style.height        = "60px";
				pa.style.width         = "60px";
				pa.style.backgroundColor = "#00000000";
				pa.style.marginTop     = "19px";
				pa.style.paddingLeft   = "0px";
				pa.style.marginLeft    = "25px";
			} else {
				pa.style.visibility = 'collapse';
			}
		}
		for (var ai of ctx.FindChildrenWithClassTraverse('AvatarImage')) {
			ai.style.padding = '0px';
		}

		// FunFact text
		var funFact = ctx.FindChildTraverse('FunFactText');
		if (funFact) {
			funFact.style.width            = '813px';
			funFact.style.height           = '35px';
			funFact.style.x                = '107px';
			funFact.style.marginTop        = '60px';
			funFact.style.backgroundColor  = '#000000CC';
			funFact.style.verticalAlign    = 'center';
			funFact.style.textAlign        = 'center';
			funFact.style.paddingTop       = '10px';
			funFact.style.paddingLeft      = '0px';
			funFact.style.fontWeight       = 'normal';
			funFact.style.fontSize         = '16px';
		}

		// Hide decorative elements
		for (var h of ctx.FindChildrenWithClassTraverse('TeamBG__hrTop'))  { h.style.x = '0'; h.style.y = '0'; h.style.width = '0'; h.style.height = '0'; }
		for (var h of ctx.FindChildrenWithClassTraverse('TeamBG__hrMid'))  { h.style.x = '0'; h.style.y = '0'; h.style.width = '0'; h.style.height = '0'; }
		for (var h of ctx.FindChildrenWithClassTraverse('TeamBG__hrBot'))  { h.style.x = '0'; h.style.y = '0'; h.style.width = '0'; h.style.height = '0'; }
		for (var hi of ctx.FindChildrenWithClassTraverse('TeamBG__DefaultLogo')) { hi.style.visibility = 'collapse'; hi.style.opacity = '0'; }

		// Flash effect
		$.Schedule(0.2, function () {
			for (var s of ctx.FindChildrenWithClassTraverse('MVP__WinnerStar')) {
				s.style.transition = 'wash-color 0.15s linear 0.0s';
				s.style.washColor  = '#FFFFFF';
			}
			if (winFg) {
				winFg.style.transition     = 'background-color 0.15s linear 0.0s';
				winFg.style.backgroundColor = '#FFFFFF';
			}
		});
		$.Schedule(0.35, function () {
			for (var s of ctx.FindChildrenWithClassTraverse('MVP__WinnerStar')) {
				s.style.transition = 'wash-color 0.30s linear 0.0s';
				s.style.washColor  = '#FFD856';
			}
			if (winFg) {
				winFg.style.transition     = 'background-color 0.30s linear 0.0s';
				winFg.style.backgroundColor = 'transparent';
			}
		});

		m_pendingMvp = false;
	}

	/* ---- Install — hook into the game's own winpanel events ---- */
	function Install(ctx) {
		if (m_installed) return;
		m_installed = true;

		// MVP notification — this is a real Panorama event
		$.RegisterForUnhandledEvent('HudWinPanel_MVP', function (xuid) {
			m_pendingMvp = true;
		});

		// Round impact score report — fires when winpanel shows
		$.RegisterForUnhandledEvent('HudWinPanel_ShowRoundImpactScoreReport', function (msg) {
			if (!msg) return;
			$.Schedule(0.3, function () {
				var wp = ctx.FindChildTraverse('HudWinPanel');
				if (wp) {
					// Try to determine winner from the data
					var winner = 2; // default T
					if (msg && msg.init_conditions) {
						var todds = msg.init_conditions.terrorist_odds;
						winner = (todds >= 100) ? 2 : (todds <= 0) ? 3 : 2;
					}
					// Check if we can find final odds from events
					if (msg && msg.all_ris_event_data) {
						var events = Object.values(msg.all_ris_event_data);
						if (events.length > 0) {
							var last = events[events.length - 1];
							var final = last.terrorist_odds;
							winner = (final >= 100) ? 2 : (final <= 0) ? 3 : winner;
						}
					}
					_ApplyWinPanel(ctx, winner);
				}
			});
		});
	}

	return { Install: Install };

})();

/* ─── Auto-install ─────────────────────────────────────────────── */
(function () {
	var ctx = $.GetContextPanel();
	if (ctx)
		ScaleformWinPanel.Install(ctx);
})();
