module.exports = class {

    constructor() {


		this.language = {
      no: "non",
      yes: "oui",

      NO_ENOUGH_PERMS: "<:false:744117500119351297> | Vous n'avez pas asser de permissions pour faire cela.",
      PLEASE_MENTION_USER: "<:false:744117500119351297> | Merci de mentionnner un utilisateur.",
      TARGET_BOT: "<:false:744117500119351297> | Cet utilisateur est un bot.",

      RELOAD_SUCCESS_COMMAND: (cmd) => `<:check:744117593128042606> | La commande **${cmd}** a bien été reload.`,
      RELOAD_ERROR_COMMAND_NOT_FOUND: `<:false:744117500119351297> | Je n'ai pas trouvé cette commande.`,
      RELOAD_COMMAND_SUCCESS_ALL: (nb) => `<:check:744117593128042606> | ${global.client.commands.size}/${nb} commandes ont été reload.`,
      RELOAD_LANGUAGE_SUCCESS: "<:check:744117593128042606> | Les fichiers de langues ont bien été reload.",

      SETPREFIX_NOT_SPECIFIED: "<:false:744117500119351297> | Merci de spécifier un nouveau préfixe.",
      SETPREFIX_NO_SPACE: "<:false:744117500119351297> | Le nouveau préfixe de doit pas contenir d'espace.",
      SETPREFIX_LIMIT: "<:false:744117500119351297> | Le nouveau préfixe ne doit pas dépasser 5 caractères.",
      SETPREFIX_SET_PROPER_PREFIX: "<:false:744117500119351297> | Merci de spéficier un préfixe sans sauter de lignes.",
      SETPREFIX_SUCCESS: (p) => `<:check:744117593128042606> | Le préfixe a bien été changé à: \`${p}\``,

      SETLANGUAGE_SAME: "<:false:744117500119351297> | Je parle déjà français.",
      SETLANGUAGE_CHOOSE_ONE: "<:false:744117500119351297> | Merci de choisir entre **français** et **english**.",
      
      LEADERBOARD_NOT_SPECIFIED: "<:false:744117500119351297> | Merci de choisir entre **reputation** et **money**.",

      DAILY_COOLDOWN: (user) => `<:false:744117500119351297> | Vous avez déjà pris votre salaire récemment. Vous pourrez reprendre votre salaire dans **${this.convertMs(user.cooldowns.daily - Date.now())}**`,
      DAILY_SUCCESS: "<:salary:744125185573257246> **100** credits ont été ajouté dans votre porte-feuille.",

      REPUTATION_COOLDOWN: (user) => `Vous avez déjà donner un point de réputation récemment. Vous pourrez donner un point de réputation dans **${this.convertMs(user.cooldowns.daily - Date.now())}**`,
      REPUTATION_SUCCESS: (target) => `Vous avez donné un point de réputation à <@${target.id}>.`,
      REPUTATION_NICE_TRY: "Vous ne pouvez pas donner un point de réputation à vous-même.",

	  NOT_OWNER: "<:false:744117500119351297> | Tu n'es pas l'owner de Xeed !",
      PING_LOAD: "Calcul en cours <:refresh:744122805087502407>",
      NO_ARGS: "<:false:744117500119351297> | Tu n'as pas préciser d'arguments !",
	  eval: {
          description: 'Permet d\'éxécuter un code en JS directement dans le salon.'
      },
      ping: {
          description: 'Permet d\'obtenir la latence du bot.'
      },
      reload: {
        description: 'Permet de redémarrer une commande.'
    },
    setlanguage: {
        description: 'Permet de changer la langue du serveur.'
    },
    setprefix: {
        description: 'Permet de changer le prefix du serveur.'
    },
    help: {
        description: 'Affiche toutes les commandes du bot.'
    },
        }
    }

     /**
     * The method to get language strings
     * @param {string} term The string or function to look up
     * @param {...*} args Any arguments to pass to the lookup
     * @returns {string|Function}
     */

    get(term, ...args) {
        const value = this.language[term];
        switch (typeof value) {
            case "function":
                return value(...args);
            default:
                return value;
        }
    }




    printDate(pdatee, isLongDate) {
        const monthNames = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
        let pdate = new Date(pdatee)
        let day = pdate.getDate(),
            monthIndex = pdate.getMonth(),
            year = pdate.getFullYear(),
            hour = pdate.getHours() < 10 ? "0" + pdate.getHours() : pdate.getHours(),
            minute = pdate.getMinutes() < 10 ? "0" + pdate.getMinutes() : pdate.getMinutes();

        let thedate = (isLongDate) ? day + " " + monthNames[monthIndex] + " " + year + " à " + hour + "h" + minute :
            day + " " + monthNames[monthIndex] + " " + year
        return thedate;
    }

    getDate(pdatee) {
        const moment_t = require("moment-timezone");
        let pdate = new Date(pdatee)
        let day = pdate.getDate();
        let year = pdate.getFullYear()
        let month = pdate.getMonth() + 1;
        if (month <= 9) month = `0${month}`
        if (day <= 9) day = `0${day}`
        const time = moment_t.tz(pdate, "Europe/Paris").format("HH:mm:ss");
        let pDate = `${day}/${month}/${year} ${time}`;
        return pDate;
    }

    /**
     * Parse ms and returns a string
     * @param {number} milliseconds The amount of milliseconds
     * @returns The parsed milliseconds
     */
  convertMs(milliseconds) {
    let roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;
		let days = roundTowardsZero(milliseconds / 86400000),
		hours = roundTowardsZero(milliseconds / 3600000) % 24,
		minutes = roundTowardsZero(milliseconds / 60000) % 60,
		seconds = roundTowardsZero(milliseconds / 1000) % 60;
		if(seconds === 0){
			seconds++;
		}
		let isDays = days > 0,
		isHours = hours > 0,
		isMinutes = minutes > 0;
		let pattern =
		(!isDays ? "" : (isMinutes || isHours) ? "{days} jours, " : "{days} jours et ")+
		(!isHours ? "" : (isMinutes) ? "{hours} heures, " : "{hours} heures et ")+
		(!isMinutes ? "" : "{minutes} minutes et ")+
		("{seconds} secondes");
		let sentence = pattern
			.replace("{duration}", pattern)
			.replace("{days}", days)
			.replace("{hours}", hours)
			.replace("{minutes}", minutes)
			.replace("{seconds}", seconds);
		return sentence;
    }
}
