const fetch = require("node-fetch");
const Chartscii = require("chartscii");

fetch("https://codestats.net/api/users/ardittristan")
  .then((res) => res.json())
  .then(
    /**
     * @param {{
     *  dates: {
     *    date:Number
     *  },
     *  languages: {
     *    '': {
     *      new_xps: Number,
     *      xps: Number
     *    }
     *  },
     *  machines:{
     *    '':{
     *      new_xps: Number,
     *      xps: Number
     *    }
     *  },
     *  new_xp: Number,
     *  total_xp: Number,
     *  user: String
     * }} json
     */
    function (json) {
      let languages = [];
      Object.keys(json.languages).forEach((key) => {
        let value = json.languages[key].xps;
        languages.push({
          label: `${key} | ${String(value).padStart(7, " ")}`,
          value: value,
        });
      });

      languages.sort((a, b) => b.value - a.value);

      languages = languages.slice(0, 7);

      const chart = new Chartscii(languages, {
        label: "",
        width: 150,
        sort: true,
        char: "■",
      });

      console.log("```\n" + chart.create() + "\n```");
    }
  );
