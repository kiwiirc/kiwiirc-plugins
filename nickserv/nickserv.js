// Plugin Config #########################################################################

// NickServ Identify Regex
var IDString = "^Questo nick è registrato e protetto. Se questo è il tuo";
// NickServ Identify text
var IDText = "Il nick scelto risulta registrato, inserisci la password per autenticarti.";
// IDentify Button text
var IDButton = "IDENTIFICATI";
// Wrong password Regex
var WPString = "^Password errata";
// Wrong password text
var WPText = "Password errata!";
// Services enforce nick Regex
var ENString = "^Il tuo nick sarà cambiato in";
// Login success Regex
var LSString = "^Password accettata - adesso sei riconosciuto";
// Account confirmation request Regex
var ConfirmReqString = "^Il tuo indirizzo email non è stato confermato. Per confermarlo, segui le istruzioni contenute nella email che hai ricevuto quando ti sei registrato";
// Account confirmation text
var ConfirmReqText = "Inserisci il codice di conferma ricevuto per email per completare la registrazione dell\' account.";
// Invalid Confirmation code Regex
var InvalidConfirmString = "^Codice di attivazione non valido";
// Invalid Confirmation code text
var InvalidConfirmText = "Codice di attivazione non valido. Inserisci il codice di conferma ricevuto per email per completare la registrazione dell\' account.";
// A valid confirmation code has been entered
var ValidConfirmString = "^Il tuo indirizzo email per (.*) è stato confermato.";

// Confirm Button text
var ConfirmButton = "CONFERMA REGISTRAZIONE";
// End Plugin Config  ####################################################################

var IDRe = new RegExp(IDString ,"");
var WPRe = new RegExp(WPString ,"");
var ENRe = new RegExp(ENString ,"");
var LSRe = new RegExp(LSString ,"");
var ConfirmReqRe = new RegExp(ConfirmReqString ,"");
var InvalidConfirmRe = new RegExp(InvalidConfirmString ,"");
var ValidConfirmRe = new RegExp(ValidConfirmString ,"");

var link = document.createElement("link");
link.type = "text/css";
link.rel = "stylesheet";
link.href = "/plugins/nickserv.css";
document.head.appendChild(link);

kiwi.plugin('nickserv', function(kiwi) {

    var data = new kiwi.Vue({data: {themeName: ''}});
    data.themeName = kiwi.themes.currentTheme().name.toLowerCase();

    kiwi.on('theme.change', function(event) {
        data.themeName = kiwi.themes.currentTheme().name.toLowerCase();
        console.log(data.themeName);
        
    });

    var nsdialog = kiwi.Vue.extend({
    
        data: function data() {
            return {
            pwdInput: ''
            }
        },
    
        computed: { 
            themeName: function() { 
                return data.themeName;
            }
        },
    
        methods: {
          onIdentify: function () {  
            kiwi.state.$emit('input.raw', '/NS identify '+ this.pwdInput )
            }
        },
        
    	template: '<div :class="[\'kiwi-\' + themeName + \'-simple-nick\', \'input-text\', \'input-text--focus\', \'input-text--reveal-value\']" id="nickserv-form" title="NickServ" style="text-align:center;"><p :class="[\'kiwi-\' + themeName + \'-simple-error\', \'kiwi-ns-error\']" id="validate">' + IDText + '</p><input class="kiwi-ns-input" placeholder="Inserisci la password" type="password" v-model="pwdInput"><div class="input-text-underline"><div class="input-text-underline-active"></div></div><button :class="[\'u-button\', \'u-button-primary\', \'u-submit\', \'kiwi-\' + themeName + \'-simple-start\', \'kiwi-ns-button\']" v-on:click="onIdentify" >' + IDButton + '</button></div>',
    });
    
    var confirmdialog = kiwi.Vue.extend({
    
        data: function data() {
            return {
            codeInput: ''
           }
        },

        computed: { 
            themeName: function() { 
                return data.themeName; 
            }
        },
    
        methods: {
          onIdentify: function () {
            kiwi.state.$emit('input.raw', '/NS confirm '+ this.codeInput )
            }
        },
        
    	template: '<div :class="[\'kiwi-\' + themeName + \'-simple-nick\', \'input-text\', \'input-text--focus\', \'input-text--reveal-value\']" id="nickserv-form" title="NickServ" style="text-align:center;"><p :class="[\'kiwi-\' + themeName + \'-simple-error\', \'kiwi-ns-error\']" id="validate">' + ConfirmReqText + '</p><input class="kiwi-ns-input" placeholder="Inserisci il codice di conferma" type="text" v-model="codeInput"><div class="input-text-underline"><div class="input-text-underline-active"></div></div><button :class="[\'u-button\', \'u-button-primary\', \'u-submit\', \'kiwi-\' + themeName + \'-simple-start\', \'kiwi-ns-button\']" v-on:click="onIdentify" >' + ConfirmButton + '</button></div>',
    });
	
	kiwi.on('irc.notice', function(event) { 
    	
	if ((event.nick == 'NickServ') && (event.message.match(IDRe))) { 
			kiwi.state.$emit('mediaviewer.show', {component: nsdialog })
		}
	if ((event.nick == 'NickServ') && (event.message.match(WPRe))) {
			var el = document.getElementById("validate")
			el.innerHTML = WPText ;
		}
	if ((event.nick == 'NickServ') && (event.message.match(ConfirmReqRe))) {
			kiwi.state.$emit('mediaviewer.show', {component: confirmdialog })
		}

	if ((event.nick == 'NickServ') && (event.message.match(InvalidConfirmRe))) {
			var el = document.getElementById("validate")
			el.innerHTML = InvalidConfirmText ;
		}

	if ((event.nick == 'NickServ') && (event.message.match(ENRe))) {
			kiwi.state.$emit('mediaviewer.hide')
		}
		
	if ((event.nick == 'NickServ') && (event.message.match(LSRe))) {
			kiwi.state.$emit('mediaviewer.hide')
		}
		
	if ((event.nick == 'NickServ') && (event.message.match(ValidConfirmRe))) {
			kiwi.state.$emit('mediaviewer.hide')
		}

	 });
	 
	kiwi.on('input.command.nick', function(event) {
        kiwi.state.$emit('mediaviewer.hide')	 
    });

});
