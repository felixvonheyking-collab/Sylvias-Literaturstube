const { useState, useEffect, useRef, useMemo } = React;
const TAGS = ["Leben", "Liebe", "Vertrauen", "Gl\xFCck", "Verlust", "Natur", "Erinnerung", "Heimat", "Humor", "Alter", "Hoffnung"];
const AUTHORS = [
  {
    id: "kaleko",
    name: "Mascha Kal\xE9ko",
    era: "Moderne / Exil",
    born: 1907,
    died: 1975,
    pd: false,
    bio: [
      "Mascha Kal\xE9ko wurde 1907 in Galizien geboren und wuchs sp\xE4ter in Berlin auf, wo sie in den 1920er- und fr\xFChen 1930er-Jahren zu einer der eigenst\xE4ndigsten Stimmen der literarischen Moderne wurde.",
      "Ihre Gedichte sprechen mit leichtem Ton \xFCber schwere Dinge \u2014 Gro\xDFstadtleben, Liebe, Heimatlosigkeit. 1938 floh sie vor dem NS-Regime \xFCber Prag in die USA, sp\xE4ter lebte sie in Jerusalem.",
      "Bis heute geh\xF6rt sie zu den meistgelesenen deutschsprachigen Lyrikerinnen des 20. Jahrhunderts."
    ],
    quotes: [
      { text: "Man muss so wenig brauchen und so viel geben k\xF6nnen.", cite: "zugeschrieben, sinngem\xE4\xDF nach Kal\xE9ko", theme: "Gl\xFCck" },
      { text: "Es ist, was es ist, sagt die Liebe.", cite: "aus \u201EChor der Kriegerwaisen\u201C (Zeile, sinngem\xE4\xDF)", theme: "Liebe" }
    ],
    links: [
      { label: "dtv Verlag", url: "https://www.dtv.de" },
      { label: "Lyrikline", url: "https://www.lyrikline.org" }
    ]
  },
  {
    id: "goethe",
    name: "Johann Wolfgang von Goethe",
    era: "Klassik",
    born: 1749,
    died: 1832,
    pd: true,
    bio: [
      "Goethe war Dichter, Naturforscher und Staatsmann und pr\xE4gte mit Werken wie \u201EFaust\u201C und dem \u201EWest-\xF6stlichen Divan\u201C die deutsche Literatur wie kaum ein Zweiter.",
      "Seine Naturlyrik verbindet genaue Beobachtung mit stiller, oft meditativer Tiefe."
    ],
    poems: [
      {
        title: "Wandrers Nachtlied",
        theme: "Leben",
        text: "\xDCber allen Gipfeln\nIst Ruh,\nIn allen Wipfeln\nSp\xFCrest du\nKaum einen Hauch;\nDie V\xF6gelein schweigen im Walde.\nWarte nur, balde\nRuhest du auch."
      }
    ],
    links: [{ label: "Deutsches Textarchiv", url: "https://www.deutschestextarchiv.de" }]
  },
  {
    id: "schiller",
    name: "Friedrich Schiller",
    era: "Klassik",
    born: 1759,
    died: 1805,
    pd: true,
    bio: [
      "Schiller war Dichter, Dramatiker und Philosoph, eng befreundet mit Goethe. Seine Balladen und die \u201EOde an die Freude\u201C z\xE4hlen zu den bekanntesten Texten der deutschen Sprache.",
      "In seinen Werken verbindet er gro\xDFe moralische Fragen mit klarer, kraftvoller Form."
    ],
    quotes: [
      { text: "Der Mensch ist frei, und w\xE4r er in Ketten geboren.", cite: "aus \u201EDie Worte des Glaubens\u201C", theme: "Leben" },
      { text: "Freundschaft ist der Freundschaft einzger Preis.", cite: "aus \u201EDie B\xFCrgschaft\u201C (sinngem\xE4\xDF)", theme: "Vertrauen" }
    ],
    links: [{ label: "Zeno.org", url: "https://www.zeno.org" }, { label: "Projekt Gutenberg-DE", url: "https://www.projekt-gutenberg.org" }]
  },
  {
    id: "heine",
    name: "Heinrich Heine",
    era: "Romantik / Vorm\xE4rz",
    born: 1797,
    died: 1856,
    pd: true,
    bio: [
      "Heine gilt als einer der letzten gro\xDFen Dichter der Romantik und zugleich als ihr sch\xE4rfster Kritiker. Seine Lieder wurden von Schubert, Schumann und vielen anderen vertont.",
      "Sein Witz und seine Melancholie liegen oft in ein und demselben Vers."
    ],
    poems: [
      {
        title: "Die Lorelei (erste Strophe)",
        theme: "Liebe",
        text: "Ich wei\xDF nicht, was soll es bedeuten,\nDa\xDF ich so traurig bin;\nEin M\xE4rchen aus alten Zeiten,\nDas kommt mir nicht aus dem Sinn."
      }
    ],
    links: [{ label: "Deutsches Textarchiv", url: "https://www.deutschestextarchiv.de" }]
  },
  {
    id: "rilke",
    name: "Rainer Maria Rilke",
    era: "Moderne",
    born: 1875,
    died: 1926,
    pd: true,
    bio: [
      "Rilke z\xE4hlt zu den bedeutendsten deutschsprachigen Lyrikern der Moderne. Seine \u201EDuineser Elegien\u201C und \u201ESonette an Orpheus\u201C gelten als H\xF6hepunkte der Lyrik des 20. Jahrhunderts.",
      "Seine Sprache kreist immer wieder um Verg\xE4nglichkeit, Innerlichkeit und das genaue Sehen der Dinge."
    ],
    quotes: [
      { text: "Wer spricht von Siegen? \xDCberstehn ist alles.", cite: "aus \u201ERequiem f\xFCr Wolf Graf von Kalckreuth\u201C", theme: "Leben" }
    ],
    links: [{ label: "Zeno.org", url: "https://www.zeno.org" }]
  },
  {
    id: "mann",
    name: "Thomas Mann",
    era: "Moderne",
    born: 1875,
    died: 1955,
    pd: true,
    bio: [
      "Thomas Mann, Nobelpreistr\xE4ger von 1929, geh\xF6rt mit Werken wie \u201EBuddenbrooks\u201C und \u201EDer Zauberberg\u201C zu den pr\xE4gendsten Erz\xE4hlern der deutschen Literatur.",
      "1933 emigrierte er vor dem NS-Regime, sp\xE4ter lebte er in den USA und der Schweiz.",
      "Seit Anfang 2026 sind seine Werke in Deutschland gemeinfrei \u2014 70 Jahre nach seinem Tod 1955."
    ],
    quotes: [
      { text: "Alles Vollkommene ist ein Wunder.", cite: "aus \u201EBuddenbrooks\u201C", theme: "Gl\xFCck" }
    ],
    links: [{ label: "Deutsches Textarchiv", url: "https://www.deutschestextarchiv.de" }, { label: "S. Fischer Verlag", url: "https://www.fischerverlage.de" }]
  },
  {
    id: "lasker-schueler",
    name: "Else Lasker-Sch\xFCler",
    era: "Expressionismus",
    born: 1869,
    died: 1945,
    pd: true,
    bio: [
      "Else Lasker-Sch\xFCler war eine der eigenwilligsten Stimmen des Expressionismus \u2014 Dichterin, Zeichnerin, Grenzg\xE4ngerin zwischen den K\xFCnsten.",
      "1933 floh sie ins Exil, zun\xE4chst in die Schweiz, sp\xE4ter nach Jerusalem, wo sie 1945 starb."
    ],
    quotes: [
      { text: "Ich wei\xDF, da\xDF ich bald sterben mu\xDF. Es bl\xFChen doch die Sommerfluten schon.", cite: "aus \u201EEin alter Tibetteppich\u201C", theme: "Leben" },
      { text: "Mein Herz liegt weltverloren, / Doch immer klopft es dir.", cite: "sinngem\xE4\xDF nach Lasker-Sch\xFCler", theme: "Liebe" }
    ],
    links: [{ label: "Zeno.org", url: "https://www.zeno.org" }]
  },
  {
    id: "auslaender",
    name: "Rose Ausl\xE4nder",
    era: "Moderne / Exil",
    born: 1901,
    died: 1988,
    pd: false,
    bio: [
      "Rose Ausl\xE4nder wurde in Czernowitz geboren, einem Zentrum deutschsprachiger j\xFCdischer Kultur. Sie \xFCberlebte den Holocaust im Ghetto ihrer Heimatstadt und emigrierte sp\xE4ter in die USA.",
      "Ihre Gedichte sind knapp, klar und oft von gro\xDFer sprachlicher Z\xE4rtlichkeit \u2014 ein Werk, das Erinnerung und Sprache selbst zum Thema macht."
    ],
    quotes: [
      { text: "Noch bist du da / wirf deine Angst / in die Luft.", cite: "zugeschrieben, sinngem\xE4\xDF nach Ausl\xE4nder", theme: "Hoffnung" }
    ],
    links: [{ label: "S. Fischer Verlag", url: "https://www.fischerverlage.de" }]
  },
  {
    id: "droste",
    name: "Annette von Droste-H\xFClshoff",
    era: "Romantik / Realismus",
    born: 1797,
    died: 1848,
    pd: true,
    bio: [
      "Annette von Droste-H\xFClshoff gilt als eine der bedeutendsten deutschsprachigen Dichterinnen des 19. Jahrhunderts. Sie schrieb in einer Zeit, in der Frauen kaum als Autorinnen ernst genommen wurden.",
      "Ihre Naturlyrik ist von genauer Beobachtung und leiser innerer Spannung gepr\xE4gt, oft mit Blick auf das Westf\xE4lische Land ihrer Herkunft."
    ],
    quotes: [
      { text: "Es ist nicht drau\xDFen, wo du suchst; es ist in dir.", cite: "sinngem\xE4\xDF nach Droste-H\xFClshoff", theme: "Leben" }
    ],
    links: [{ label: "Deutsches Textarchiv", url: "https://www.deutschestextarchiv.de" }, { label: "Zeno.org", url: "https://www.zeno.org" }]
  },
  {
    id: "guenderrode",
    name: "Karoline von G\xFCnderrode",
    era: "Romantik",
    born: 1780,
    died: 1806,
    pd: true,
    bio: [
      "Karoline von G\xFCnderrode war eine der markantesten Stimmen der Fr\xFChromantik. Sie verkehrte im Kreis um Clemens Brentano und Bettina von Arnim und schrieb unter m\xE4nnlichem Pseudonym, um geh\xF6rt zu werden.",
      "Ihre Gedichte kreisen um Sehnsucht, Liebe und die Frage nach einem selbstbestimmten Leben."
    ],
    quotes: [
      { text: "Der Liebe Leben ist ein ewig Werden.", cite: "sinngem\xE4\xDF nach G\xFCnderrode", theme: "Liebe" }
    ],
    links: [{ label: "Zeno.org", url: "https://www.zeno.org" }]
  },
  {
    id: "huch",
    name: "Ricarda Huch",
    era: "Moderne",
    born: 1864,
    died: 1947,
    pd: true,
    bio: [
      "Ricarda Huch war Lyrikerin, Erz\xE4hlerin und Historikerin \u2014 eine der ersten Frauen, die in der Schweiz promovierten. 1933 legte sie aus Protest gegen das NS-Regime ihr Amt in der Preu\xDFischen Akademie der K\xFCnste nieder.",
      "Ihr lyrisches Werk verbindet klassische Form mit einer sehr eigenen, unabh\xE4ngigen Stimme."
    ],
    quotes: [
      { text: "Vertrauen ist der Mut, sich zu zeigen, wie man ist.", cite: "sinngem\xE4\xDF nach Huch", theme: "Vertrauen" }
    ],
    links: [{ label: "Zeno.org", url: "https://www.zeno.org" }]
  },
  {
    id: "kolmar",
    name: "Gertrud Kolmar",
    era: "Moderne / Expressionismus",
    born: 1894,
    died: 1943,
    pd: true,
    bio: [
      "Gertrud Kolmar war eine der eigenst\xE4ndigsten deutschen Lyrikerinnen des 20. Jahrhunderts. Als J\xFCdin wurde sie 1943 deportiert und ermordet \u2014 ihr Werk \xFCberlebte nur durch die Sorgfalt ihrer Familie.",
      "Ihre Gedichte sind bildm\xE4chtig, oft mythisch aufgeladen und von gro\xDFer sprachlicher Kraft."
    ],
    quotes: [
      { text: "Ich bin in mir wie in einem verschlossenen Haus.", cite: "sinngem\xE4\xDF nach Kolmar", theme: "Leben" }
    ],
    links: [{ label: "Deutsches Textarchiv", url: "https://www.deutschestextarchiv.de" }]
  },
  {
    id: "eichendorff",
    name: "Joseph von Eichendorff",
    era: "Romantik",
    born: 1788,
    died: 1857,
    pd: true,
    bio: [
      "Eichendorff gilt als einer der bedeutendsten Dichter der deutschen Romantik. Seine Gedichte \xFCber Wald, Wanderschaft und Sehnsucht wurden hundertfach vertont.",
      "In seiner Sprache verbinden sich Naturbild und Seelenzustand fast untrennbar."
    ],
    poems: [
      {
        title: "Mondnacht (erste Strophe)",
        theme: "Leben",
        text: "Es war, als h\xE4tt der Himmel\nDie Erde still gek\xFC\xDFt,\nDa\xDF sie im Bl\xFCtenschimmer\nVon ihm nun tr\xE4umen m\xFC\xDFt."
      }
    ],
    links: [{ label: "Deutsches Textarchiv", url: "https://www.deutschestextarchiv.de" }]
  },
  {
    id: "claudius",
    name: "Matthias Claudius",
    era: "Aufkl\xE4rung / Empfindsamkeit",
    born: 1740,
    died: 1815,
    pd: true,
    bio: [
      "Matthias Claudius schrieb schlichte, warmherzige Verse, die bis heute als Lieder gesungen werden. Sein bekanntestes Gedicht wurde zum vertrauten Abendlied ganzer Generationen.",
      "Seine Sprache ist bewusst einfach \u2014 Trost und Geborgenheit ohne gro\xDFe Geste."
    ],
    poems: [
      {
        title: "Abendlied (erste Strophe)",
        theme: "Vertrauen",
        text: "Der Mond ist aufgegangen,\nDie goldnen Sternlein prangen\nAm Himmel hell und klar;\nDer Wald steht schwarz und schweiget,\nUnd aus den Wiesen steiget\nDer wei\xDFe Nebel wunderbar."
      }
    ],
    links: [{ label: "Zeno.org", url: "https://www.zeno.org" }]
  },
  {
    id: "morgenstern",
    name: "Christian Morgenstern",
    era: "Moderne",
    born: 1871,
    died: 1914,
    pd: true,
    bio: [
      "Christian Morgenstern ist bekannt f\xFCr seine Sprachspiele und seinen ganz eigenen Humor \u2014 die \u201EGalgenlieder\u201C z\xE4hlen zu den originellsten Gedichten der deutschen Sprache.",
      "Hinter dem Wortwitz liegt oft eine leise, nachdenkliche Note."
    ],
    poems: [
      {
        title: "M\xF6wenlied",
        theme: "Humor",
        text: "Die M\xF6wen sehen alle aus,\nals ob sie Emma hie\xDFen.\nSie tragen einen wei\xDFen Flaus\nund sind mit Schrift zu gr\xFC\xDFen."
      }
    ],
    links: [{ label: "Zeno.org", url: "https://www.zeno.org" }]
  },
  {
    id: "hoelderlin",
    name: "Friedrich H\xF6lderlin",
    era: "Klassik / Romantik",
    born: 1770,
    died: 1843,
    pd: true,
    bio: [
      "H\xF6lderlin geh\xF6rt zu den sprachm\xE4chtigsten deutschen Dichtern \xFCberhaupt. Sein Werk verbindet antike Formstrenge mit einer ganz eigenen, hymnischen Innigkeit.",
      "Nach Jahren psychischer Krankheit verbrachte er die zweite H\xE4lfte seines Lebens zur\xFCckgezogen in T\xFCbingen."
    ],
    quotes: [
      { text: "Was bleibet aber, stiften die Dichter.", cite: "aus \u201EAndenken\u201C", theme: "Leben" }
    ],
    links: [{ label: "Deutsches Textarchiv", url: "https://www.deutschestextarchiv.de" }]
  },
  {
    id: "bachmann",
    name: "Ingeborg Bachmann",
    era: "Nachkriegsmoderne",
    born: 1926,
    died: 1973,
    pd: false,
    bio: [
      "Ingeborg Bachmann war eine der einflussreichsten deutschsprachigen Autorinnen der Nachkriegszeit \u2014 Lyrikerin, Essayistin, Erz\xE4hlerin. Ihr Gedichtband \u201EDie gestundete Zeit\u201C machte sie ber\xFChmt.",
      "Ihre Sprache sucht immer wieder die Grenze zwischen dem Sagbaren und dem Schweigen."
    ],
    quotes: [
      { text: "Es kommen h\xE4rtere Tage. Die auf Widerruf gestundete Zeit wird sichtbar am Horizont.", cite: "aus \u201EDie gestundete Zeit\u201C", theme: "Leben" }
    ],
    links: [{ label: "Piper Verlag", url: "https://www.piper.de" }, { label: "Lyrikline", url: "https://www.lyrikline.org" }]
  },
  {
    id: "domin",
    name: "Hilde Domin",
    era: "Nachkriegsmoderne / Exil",
    born: 1912,
    died: 2006,
    pd: false,
    bio: [
      "Hilde Domin floh 1932 vor dem NS-Regime und lebte 22 Jahre im Exil, bevor sie nach Deutschland zur\xFCckkehrte. Ihre Gedichte gelten als literarische Antwort auf Heimatlosigkeit und Neuanfang.",
      "Zentrale Themen ihres Werks sind Vertrauen, Wurzeln schlagen und die Kraft des Wortes."
    ],
    quotes: [
      { text: "Wer den Regenbogen sehen will, muss den Regen ertragen.", cite: "zugeschrieben, sinngem\xE4\xDF nach Domin", theme: "Hoffnung" }
    ],
    links: [{ label: "S. Fischer Verlag", url: "https://www.fischerverlage.de" }, { label: "Lyrikline", url: "https://www.lyrikline.org" }]
  },
  {
    id: "kaschnitz",
    name: "Marie Luise Kaschnitz",
    era: "Nachkriegsmoderne",
    born: 1901,
    died: 1974,
    pd: false,
    bio: [
      "Marie Luise Kaschnitz z\xE4hlt zu den bedeutendsten deutschen Lyrikerinnen des 20. Jahrhunderts. Ihre sp\xE4ten Gedichte verbinden Alltagsbeobachtung mit existenzieller Tiefe.",
      "Sie schrieb offen \xFCber Alter, Verlust und die leisen Kr\xE4fte, die einen Menschen tragen."
    ],
    quotes: [
      { text: "Nicht resignieren / sondern weiter das Wunder erwarten.", cite: "sinngem\xE4\xDF nach Kaschnitz", theme: "Hoffnung" }
    ],
    links: [{ label: "Lyrikline", url: "https://www.lyrikline.org" }]
  },
  {
    id: "sachs",
    name: "Nelly Sachs",
    era: "Moderne / Exil",
    born: 1891,
    died: 1970,
    pd: false,
    bio: [
      "Nelly Sachs floh 1940 nach Schweden und erhielt 1966 den Nobelpreis f\xFCr Literatur. Ihr Werk verarbeitet Flucht, Verlust und die Suche nach Trost in der Sprache selbst.",
      "Ihre Gedichte sind knapp, oft hymnisch und von gro\xDFer stiller Kraft."
    ],
    quotes: [
      { text: "Wer daheim ist, kann die Lampe entz\xFCnden.", cite: "sinngem\xE4\xDF nach Sachs", theme: "Heimat" }
    ],
    links: [{ label: "Suhrkamp Verlag", url: "https://www.suhrkamp.de" }]
  },
  {
    id: "hesse",
    name: "Hermann Hesse",
    era: "Moderne",
    born: 1877,
    died: 1962,
    pd: false,
    bio: [
      "Hermann Hesse, Nobelpreistr\xE4ger von 1946, ist vor allem f\xFCr seine Romane bekannt \u2014 doch auch sein lyrisches Werk begleitete ihn ein Leben lang, oft nachdenklich und von leiser Zuversicht getragen.",
      "Wenige Verse der deutschen Sprache werden so h\xE4ufig zitiert wie seine Gedanken \xFCber Anfang und Wandel."
    ],
    quotes: [
      { text: "Und jedem Anfang wohnt ein Zauber inne.", cite: "aus \u201EStufen\u201C", theme: "Hoffnung" }
    ],
    links: [{ label: "Suhrkamp Verlag", url: "https://www.suhrkamp.de" }]
  },
  {
    id: "kaestner",
    name: "Erich K\xE4stner",
    era: "Moderne / Neue Sachlichkeit",
    born: 1899,
    died: 1974,
    pd: false,
    bio: [
      "Erich K\xE4stner ist vor allem als Kinderbuchautor bekannt, war aber auch ein scharfsinniger, oft humorvoller Lyriker der Neuen Sachlichkeit.",
      "Seine Gedichte blicken mit Witz und W\xE4rme zugleich auf das Leben \u2014 nie ohne einen leisen Ernst darunter."
    ],
    quotes: [
      { text: "Es gibt nichts Gutes, au\xDFer man tut es.", cite: "zugeschrieben, sinngem\xE4\xDF nach K\xE4stner", theme: "Leben" }
    ],
    links: [{ label: "dtv Verlag", url: "https://www.dtv.de" }]
  },
  {
    id: "lichtenberg",
    name: "Georg Christoph Lichtenberg",
    era: "Aufkl\xE4rung",
    born: 1742,
    died: 1799,
    pd: true,
    bio: [
      "Lichtenberg war Physiker und Schriftsteller \u2014 und gilt als Begr\xFCnder der deutschen Aphoristik. Seine \u201ESudelb\xFCcher\u201C, private Notizhefte voller Gedankensplitter, wurden erst nach seinem Tod ber\xFChmt.",
      "Seine kurzen, oft ironischen S\xE4tze z\xE4hlen bis heute zum Kl\xFCgsten und Witzigsten, was die deutsche Sprache hervorgebracht hat."
    ],
    quotes: [
      { text: "Ich wei\xDF nicht, ob es besser wird, wenn es anders wird; aber es mu\xDF anders werden, wenn es gut werden soll.", cite: "aus den \u201ESudelb\xFCchern\u201C", theme: "Hoffnung" }
    ],
    links: [{ label: "Zeno.org", url: "https://www.zeno.org" }, { label: "Projekt Gutenberg-DE", url: "https://www.projekt-gutenberg.org" }]
  },
  {
    id: "nietzsche",
    name: "Friedrich Nietzsche",
    era: "Moderne / Philosophie",
    born: 1844,
    died: 1900,
    pd: true,
    bio: [
      "Nietzsche war Philosoph und einer der stilistisch eigenwilligsten Denker der deutschen Sprache. Werke wie \u201EAlso sprach Zarathustra\u201C sind voller kurzer, zugespitzter Sentenzen.",
      "Seine Aphorismen provozieren bis heute \u2014 mal trotzig, mal von gro\xDFer Z\xE4rtlichkeit f\xFCrs Leben."
    ],
    quotes: [
      { text: "Was mich nicht umbringt, macht mich st\xE4rker.", cite: "aus \u201EG\xF6tzen-D\xE4mmerung\u201C", theme: "Leben" }
    ],
    links: [{ label: "Zeno.org", url: "https://www.zeno.org" }, { label: "Projekt Gutenberg-DE", url: "https://www.projekt-gutenberg.org" }]
  },
  {
    id: "schopenhauer",
    name: "Arthur Schopenhauer",
    era: "Philosophie",
    born: 1788,
    died: 1860,
    pd: true,
    bio: [
      "Schopenhauer z\xE4hlt zu den einflussreichsten Philosophen des 19. Jahrhunderts. Seine \u201EAphorismen zur Lebensweisheit\u201C sind bis heute vielgelesen \u2014 klar, unbestechlich, oft von leiser Skepsis getragen.",
      "Er schrieb ungew\xF6hnlich klar f\xFCr einen Philosophen \u2014 ein Grund, warum seine S\xE4tze so oft zitiert werden."
    ],
    quotes: [
      { text: "Der Wechsel allein ist das Best\xE4ndige.", cite: "aus \u201EParerga und Paralipomena\u201C", theme: "Leben" }
    ],
    links: [{ label: "Zeno.org", url: "https://www.zeno.org" }, { label: "Projekt Gutenberg-DE", url: "https://www.projekt-gutenberg.org" }]
  },
  {
    id: "ebner-eschenbach",
    name: "Marie von Ebner-Eschenbach",
    era: "Realismus",
    born: 1830,
    died: 1916,
    pd: true,
    bio: [
      "Die \xF6sterreichische Schriftstellerin Marie von Ebner-Eschenbach war eine der bedeutendsten deutschsprachigen Autorinnen des 19. Jahrhunderts \u2014 und eine der wenigen Frauen, deren Aphorismen zu Klassikern wurden.",
      "Ihre \u201EAphorismen\u201C (1880) sind klug, warmherzig und oft \xFCberraschend modern in ihrer Beobachtung des Alltags."
    ],
    quotes: [
      { text: "Wer f\xFCr alles offen ist, kann nicht ganz dicht sein.", cite: "aus \u201EAphorismen\u201C", theme: "Humor" },
      { text: "Auch das Gl\xFCck will gelernt sein.", cite: "aus \u201EAphorismen\u201C", theme: "Gl\xFCck" }
    ],
    links: [{ label: "Zeno.org", url: "https://www.zeno.org" }, { label: "Projekt Gutenberg-DE", url: "https://www.projekt-gutenberg.org" }]
  },
  {
    id: "kraus",
    name: "Karl Kraus",
    era: "Moderne / Satire",
    born: 1874,
    died: 1936,
    pd: true,
    bio: [
      "Karl Kraus war Publizist, Satiriker und einer der sch\xE4rfsten Sprachkritiker seiner Zeit. Mit seiner Zeitschrift \u201EDie Fackel\u201C pr\xE4gte er Generationen von Lesern.",
      "Seine Aphorismen sind messerscharf zugespitzt \u2014 Sprachwitz als Waffe und als Kunst zugleich."
    ],
    quotes: [
      { text: "Wer den Splitter im Auge des Nachbarn sieht, dem gebe ich meine Brille.", cite: "aus \u201ESpr\xFCche und Widerspr\xFCche\u201C", theme: "Humor" }
    ],
    links: [{ label: "Zeno.org", url: "https://www.zeno.org" }]
  },
  {
    id: "tucholsky",
    name: "Kurt Tucholsky",
    era: "Moderne / Neue Sachlichkeit",
    born: 1890,
    died: 1935,
    pd: true,
    bio: [
      "Kurt Tucholsky war Satiriker, Journalist und Lyriker der Weimarer Republik \u2014 scharfz\xFCngig, hellsichtig und oft \xFCberraschend z\xE4rtlich in seinen leiseren Gedichten.",
      "1933 emigrierte er nach Schweden, wo er 1935 starb. Seine Werke wurden von den Nationalsozialisten verbrannt."
    ],
    quotes: [
      { text: "Was man nicht mit Humor ansehen kann, muss man mit Ruhe ansehen.", cite: "zugeschrieben, sinngem\xE4\xDF nach Tucholsky", theme: "Humor" }
    ],
    links: [{ label: "Zeno.org", url: "https://www.zeno.org" }]
  },
  {
    id: "fontane",
    name: "Theodor Fontane",
    era: "Realismus",
    born: 1819,
    died: 1898,
    pd: true,
    bio: [
      "Fontane gilt als bedeutendster deutscher Erz\xE4hler des Realismus \u2014 bekannt f\xFCr Romane wie \u201EEffi Briest\u201C, aber auch f\xFCr schlichte, klare Balladen und Gedichte.",
      "Seine Sprache verbindet norddeutsche N\xFCchternheit mit stiller W\xE4rme."
    ],
    quotes: [
      { text: "Ein weites Feld.", cite: "Schlusssatz aus \u201EEffi Briest\u201C", theme: "Leben" }
    ],
    links: [{ label: "Deutsches Textarchiv", url: "https://www.deutschestextarchiv.de" }, { label: "Projekt Gutenberg-DE", url: "https://www.projekt-gutenberg.org" }]
  },
  {
    id: "busch",
    name: "Wilhelm Busch",
    era: "Realismus / Humor",
    born: 1832,
    died: 1908,
    pd: true,
    bio: [
      "Wilhelm Busch, Sch\xF6pfer von \u201EMax und Moritz\u201C, war ein Meister der komischen Verserz\xE4hlung. Seine Reime sind bis heute sprichw\xF6rtlich \u2014 pointiert, musikalisch, oft mit einem moralischen Augenzwinkern.",
      "Er gilt vielen als Vorl\xE4ufer des modernen Comics."
    ],
    quotes: [
      { text: "Es ist ein Brauch von alters her: Wer Sorgen hat, hat auch Lik\xF6r.", cite: "aus \u201EDie fromme Helene\u201C", theme: "Humor" }
    ],
    links: [{ label: "Zeno.org", url: "https://www.zeno.org" }, { label: "Projekt Gutenberg-DE", url: "https://www.projekt-gutenberg.org" }]
  },
  {
    id: "george",
    name: "Stefan George",
    era: "Symbolismus",
    born: 1868,
    died: 1933,
    pd: true,
    bio: [
      "Stefan George war Lyriker und Kopf eines eigenen literarischen Kreises. Seine Gedichte sind streng geformt, oft hymnisch, mit ganz eigener, archaisierender Sprachmelodie.",
      "Er gilt als einer der einflussreichsten deutschen Dichter um 1900."
    ],
    quotes: [
      { text: "Entrinnen wolltest du der welt der reue.", cite: "sinngem\xE4\xDF nach George", theme: "Leben" }
    ],
    links: [{ label: "Zeno.org", url: "https://www.zeno.org" }]
  },
  {
    id: "trakl",
    name: "Georg Trakl",
    era: "Expressionismus",
    born: 1887,
    died: 1914,
    pd: true,
    bio: [
      "Georg Trakl war einer der bedeutendsten Lyriker des Expressionismus. Seine Gedichte sind bildstark und dunkel get\xF6nt, gepr\xE4gt von Naturbildern und tiefer Melancholie.",
      "Er starb jung, 1914, kurz nach Ausbruch des Ersten Weltkriegs."
    ],
    quotes: [
      { text: "Es ist ein Licht, das der Wind ausgel\xF6scht hat.", cite: "sinngem\xE4\xDF nach Trakl", theme: "Verlust" }
    ],
    links: [{ label: "Zeno.org", url: "https://www.zeno.org" }]
  },
  {
    id: "meyer",
    name: "Conrad Ferdinand Meyer",
    era: "Realismus",
    born: 1825,
    died: 1898,
    pd: true,
    bio: [
      "Der Schweizer Dichter Conrad Ferdinand Meyer schrieb formstrenge, oft von historischen Stoffen inspirierte Gedichte und Novellen.",
      "Seine Lyrik zeichnet sich durch Klarheit und mei\xDFelhafte Genauigkeit aus."
    ],
    quotes: [
      { text: "Was du auch tust, du tust es nur f\xFCr dich.", cite: "sinngem\xE4\xDF nach Meyer", theme: "Leben" }
    ],
    links: [{ label: "Zeno.org", url: "https://www.zeno.org" }, { label: "Projekt Gutenberg-DE", url: "https://www.projekt-gutenberg.org" }]
  },
  {
    id: "storm",
    name: "Theodor Storm",
    era: "Realismus",
    born: 1817,
    died: 1888,
    pd: true,
    bio: [
      "Theodor Storm, norddeutscher Erz\xE4hler und Lyriker, ist bekannt f\xFCr seine stimmungsvolle Novelle \u201EDer Schimmelreiter\u201C und f\xFCr Gedichte voller stiller Naturbeobachtung.",
      "Seine Sprache ist schlicht, seine Bilder sind von gro\xDFer Genauigkeit."
    ],
    poems: [
      {
        title: "Oktoberlied (erste Strophe)",
        theme: "Natur",
        text: "Der Nebel steigt, es f\xE4llt das Laub;\nSchenk ein den Wein, den holden!\nWir wollen uns den grauen Tag\nVergolden, ja vergolden!"
      }
    ],
    links: [{ label: "Zeno.org", url: "https://www.zeno.org" }, { label: "Projekt Gutenberg-DE", url: "https://www.projekt-gutenberg.org" }]
  },
  {
    id: "kafka",
    name: "Franz Kafka",
    era: "Moderne",
    born: 1883,
    died: 1924,
    pd: true,
    bio: [
      "Franz Kafka ist vor allem f\xFCr seine Romane und Erz\xE4hlungen bekannt \u2014 doch seine \u201EZ\xFCrauer Aphorismen\u201C z\xE4hlen zu den dichtesten philosophischen Kurztexten der deutschen Sprache.",
      "Seit 1994 (70 Jahre nach seinem Tod) sind seine Werke gemeinfrei."
    ],
    quotes: [
      { text: "Der Sinn des Lebens ist, da\xDF es aufh\xF6rt.", cite: "aus den Tageb\xFCchern", theme: "Leben" },
      { text: "Wege entstehen dadurch, dass man sie geht.", cite: "zugeschrieben, sinngem\xE4\xDF nach Kafka", theme: "Hoffnung" }
    ],
    links: [{ label: "Zeno.org", url: "https://www.zeno.org" }, { label: "Projekt Gutenberg-DE", url: "https://www.projekt-gutenberg.org" }]
  },
  {
    id: "jeanpaul",
    name: "Jean Paul",
    era: "Romantik",
    born: 1763,
    died: 1825,
    pd: true,
    bio: [
      "Jean Paul (eigentlich Johann Paul Friedrich Richter) war einer der eigenwilligsten Erz\xE4hler der deutschen Romantik \u2014 bekannt f\xFCr seinen verschlungenen, bildreichen Stil und seinen Humor.",
      "Seine Sentenzen \xFCber das Leben und die Liebe waren zu seiner Zeit vielzitiert."
    ],
    quotes: [
      { text: "Die Erinnerung ist das einzige Paradies, aus dem wir nicht vertrieben werden k\xF6nnen.", cite: "zugeschrieben, sinngem\xE4\xDF nach Jean Paul", theme: "Erinnerung" }
    ],
    links: [{ label: "Zeno.org", url: "https://www.zeno.org" }, { label: "Projekt Gutenberg-DE", url: "https://www.projekt-gutenberg.org" }]
  },
  {
    id: "arnim",
    name: "Bettina von Arnim",
    era: "Romantik",
    born: 1785,
    died: 1859,
    pd: true,
    bio: [
      "Bettina von Arnim war Schriftstellerin, Komponistin und eine der eigenst\xE4ndigsten Frauenfiguren der deutschen Romantik \u2014 eng befreundet mit Goethe und Beethoven, politisch engagiert f\xFCr soziale Gerechtigkeit.",
      "Ihre Briefromane verbinden literarische Fantasie mit sehr pers\xF6nlicher, direkter Sprache."
    ],
    quotes: [
      { text: "Wir sollen der Wahrheit nicht ausweichen, um des Friedens willen.", cite: "sinngem\xE4\xDF nach Bettina von Arnim", theme: "Vertrauen" }
    ],
    links: [{ label: "Zeno.org", url: "https://www.zeno.org" }]
  }
];
const APHORISMEN = [
  { text: "Man muss das Leben nicht verstehen, man muss es leben.", author: "Rainer Maria Rilke", theme: "Leben" },
  { text: "Was du auch tust, tu es mit ganzem Herzen.", author: "Marie von Ebner-Eschenbach", theme: "Leben" },
  { text: "Auch das Gl\xFCck will gelernt sein.", author: "Marie von Ebner-Eschenbach", theme: "Gl\xFCck" },
  { text: "Wer f\xFCr alles offen ist, kann nicht ganz dicht sein.", author: "Marie von Ebner-Eschenbach", theme: "Humor" },
  { text: "Was mich nicht umbringt, macht mich st\xE4rker.", author: "Friedrich Nietzsche", theme: "Leben" },
  { text: "Wer ein Warum zum Leben hat, ertr\xE4gt fast jedes Wie.", author: "Friedrich Nietzsche", theme: "Hoffnung" },
  { text: "Man muss noch Chaos in sich haben, um einen tanzenden Stern geb\xE4ren zu k\xF6nnen.", author: "Friedrich Nietzsche", theme: "Leben" },
  { text: "Der Wechsel allein ist das Best\xE4ndige.", author: "Arthur Schopenhauer", theme: "Leben" },
  { text: "Gesundheit ist nicht alles, aber ohne Gesundheit ist alles nichts.", author: "Arthur Schopenhauer", theme: "Alter" },
  { text: "Ich wei\xDF nicht, ob es besser wird, wenn es anders wird; aber es muss anders werden, wenn es gut werden soll.", author: "Georg Christoph Lichtenberg", theme: "Hoffnung" },
  { text: "Man sieht nur, was man wei\xDF.", author: "Johann Wolfgang von Goethe", theme: "Leben" },
  { text: "Es ist nicht genug zu wissen, man muss auch anwenden.", author: "Johann Wolfgang von Goethe", theme: "Leben" },
  { text: "Man muss so wenig brauchen und so viel geben k\xF6nnen.", author: "Mascha Kal\xE9ko", theme: "Gl\xFCck" },
  { text: "Der Mensch ist frei, und w\xE4r er in Ketten geboren.", author: "Friedrich Schiller", theme: "Leben" },
  { text: "Freundschaft ist der Freundschaft einzger Preis.", author: "Friedrich Schiller", theme: "Vertrauen" },
  { text: "Wer den Splitter im Auge des Nachbarn sieht, dem gebe ich meine Brille.", author: "Karl Kraus", theme: "Humor" },
  { text: "Was man nicht mit Humor ansehen kann, muss man mit Ruhe ansehen.", author: "Kurt Tucholsky", theme: "Humor" },
  { text: "Ein weites Feld.", author: "Theodor Fontane", theme: "Leben" },
  { text: "Es ist ein Brauch von alters her: Wer Sorgen hat, hat auch Lik\xF6r.", author: "Wilhelm Busch", theme: "Humor" },
  { text: "Wer den Regenbogen sehen will, muss den Regen ertragen.", author: "Hilde Domin", theme: "Hoffnung" },
  { text: "Und jedem Anfang wohnt ein Zauber inne.", author: "Hermann Hesse", theme: "Hoffnung" },
  { text: "Es gibt nichts Gutes, au\xDFer man tut es.", author: "Erich K\xE4stner", theme: "Leben" },
  { text: "Der Sinn des Lebens ist, dass es aufh\xF6rt.", author: "Franz Kafka", theme: "Leben" },
  { text: "Wege entstehen dadurch, dass man sie geht.", author: "Franz Kafka", theme: "Hoffnung" },
  { text: "Die Erinnerung ist das einzige Paradies, aus dem wir nicht vertrieben werden k\xF6nnen.", author: "Jean Paul", theme: "Erinnerung" },
  { text: "Wir sollen der Wahrheit nicht ausweichen, um des Friedens willen.", author: "Bettina von Arnim", theme: "Vertrauen" },
  { text: "Alles Vollkommene ist ein Wunder.", author: "Thomas Mann", theme: "Gl\xFCck" },
  { text: "Was bleibet aber, stiften die Dichter.", author: "Friedrich H\xF6lderlin", theme: "Leben" },
  { text: "Wer spricht von Siegen? \xDCberstehn ist alles.", author: "Rainer Maria Rilke", theme: "Leben" },
  { text: "Noch bist du da \u2014 wirf deine Angst in die Luft.", author: "Rose Ausl\xE4nder", theme: "Hoffnung" },
  { text: "Nicht resignieren, sondern weiter das Wunder erwarten.", author: "Marie Luise Kaschnitz", theme: "Hoffnung" },
  { text: "Wer daheim ist, kann die Lampe entz\xFCnden.", author: "Nelly Sachs", theme: "Heimat" },
  { text: "Vertrauen ist der Mut, sich zu zeigen, wie man ist.", author: "Ricarda Huch", theme: "Vertrauen" },
  { text: "Der Liebe Leben ist ein ewig Werden.", author: "Karoline von G\xFCnderrode", theme: "Liebe" },
  { text: "Ich bin in mir wie in einem verschlossenen Haus.", author: "Gertrud Kolmar", theme: "Leben" },
  { text: "Es ist nicht drau\xDFen, wo du suchst; es ist in dir.", author: "Annette von Droste-H\xFClshoff", theme: "Leben" },
  { text: "Es ist, was es ist, sagt die Liebe.", author: "Mascha Kal\xE9ko", theme: "Liebe" },
  { text: "Trau, schau, wem.", author: "deutsches Sprichwort", theme: "Vertrauen" },
  { text: "Was du heute kannst besorgen, das verschiebe nicht auf morgen.", author: "deutsches Sprichwort", theme: "Leben" },
  { text: "Geduld ist eine Pflanze, die nicht in jedem Garten w\xE4chst.", author: "deutsches Sprichwort", theme: "Vertrauen" },
  { text: "Steter Tropfen h\xF6hlt den Stein.", author: "lateinisches Sprichwort, deutsch gel\xE4ufig", theme: "Hoffnung" },
  { text: "Alter sch\xFCtzt vor Torheit nicht.", author: "deutsches Sprichwort", theme: "Alter" },
  { text: "Wer nichts als Chemie versteht, versteht auch die nicht recht.", author: "Georg Christoph Lichtenberg", theme: "Leben" },
  { text: "Vertrauen kommt zu Fu\xDF und geht zu Pferde.", author: "deutsches Sprichwort", theme: "Vertrauen" },
  { text: "Wo Liebe hinf\xE4llt, da w\xE4chst kein Gras.", author: "deutsches Sprichwort", theme: "Liebe" },
  { text: "Alles Verg\xE4ngliche ist nur ein Gleichnis.", author: "Johann Wolfgang von Goethe", theme: "Leben" },
  { text: "Es irrt der Mensch, so lang er strebt.", author: "Johann Wolfgang von Goethe", theme: "Leben" },
  { text: "In der Beschr\xE4nkung zeigt sich erst der Meister.", author: "Johann Wolfgang von Goethe", theme: "Leben" },
  { text: "Ohne Hast, aber ohne Rast.", author: "Johann Wolfgang von Goethe", theme: "Leben" },
  { text: "Nur wer die Sehnsucht kennt, wei\xDF, was ich leide.", author: "Johann Wolfgang von Goethe", theme: "Liebe" },
  { text: "Drum pr\xFCfe, wer sich ewig bindet, ob sich das Herz zum Herzen findet.", author: "Friedrich Schiller", theme: "Liebe" },
  { text: "Der Starke ist am m\xE4chtigsten allein.", author: "Friedrich Schiller", theme: "Leben" },
  { text: "Denk ich an Deutschland in der Nacht, dann bin ich um den Schlaf gebracht.", author: "Heinrich Heine", theme: "Heimat" },
  { text: "Wo man B\xFCcher verbrennt, verbrennt man am Ende auch Menschen.", author: "Heinrich Heine", theme: "Leben" },
  { text: "Habe Mut, dich deines eigenen Verstandes zu bedienen.", author: "Immanuel Kant", theme: "Hoffnung" },
  { text: "Der bestirnte Himmel \xFCber mir und das moralische Gesetz in mir.", author: "Immanuel Kant", theme: "Vertrauen" },
  { text: "Ohne Musik w\xE4re das Leben ein Irrtum.", author: "Friedrich Nietzsche", theme: "Gl\xFCck" },
  { text: "Was aus Liebe getan wird, geschieht immer jenseits von Gut und B\xF6se.", author: "Friedrich Nietzsche", theme: "Liebe" },
  { text: "Talent trifft ein Ziel, das keiner erreichen kann; Genie trifft ein Ziel, das keiner sehen kann.", author: "Arthur Schopenhauer", theme: "Leben" },
  { text: "Die Grenzen unserer Sinne sind die Grenzen unserer Welt.", author: "Arthur Schopenhauer", theme: "Leben" },
  { text: "Wer keinen Charakter hat, ist kein Mensch, sondern ein Ereignis.", author: "Marie von Ebner-Eschenbach", theme: "Leben" },
  { text: "Wo man nicht offen streiten darf, muss man schweigen k\xF6nnen.", author: "Marie von Ebner-Eschenbach", theme: "Vertrauen" },
  { text: "Ein Aphorismus muss nicht ganz wahr sein, aber er soll den Nagel auf den Kopf treffen.", author: "Karl Kraus", theme: "Humor" },
  { text: "Wenn die Sonne der Kultur niedrig steht, werfen selbst Zwerge lange Schatten.", author: "Karl Kraus", theme: "Humor" },
  { text: "Ein K\xE4fig ging einen Vogel suchen.", author: "Franz Kafka", theme: "Leben" },
  { text: "Erstens kommt es anders, und zweitens, als man denkt.", author: "Wilhelm Busch", theme: "Humor" },
  { text: "Die einzige Reise ist die Reise nach innen.", author: "zugeschrieben nach Rilke", theme: "Leben" },
  { text: "\xDCbung macht den Meister.", author: "deutsches Sprichwort", theme: "Leben" },
  { text: "Aller Anfang ist schwer.", author: "deutsches Sprichwort", theme: "Hoffnung" },
  { text: "Was sich liebt, das neckt sich.", author: "deutsches Sprichwort", theme: "Liebe" },
  { text: "Liebe geht durch den Magen.", author: "deutsches Sprichwort", theme: "Liebe" },
  { text: "Man soll den Tag nicht vor dem Abend loben.", author: "deutsches Sprichwort", theme: "Leben" },
  { text: "Wer rastet, der rostet.", author: "deutsches Sprichwort", theme: "Alter" },
  { text: "Wo ein Wille ist, ist auch ein Weg.", author: "deutsches Sprichwort", theme: "Hoffnung" },
  { text: "Kleine Geschenke erhalten die Freundschaft.", author: "deutsches Sprichwort", theme: "Vertrauen" },
  { text: "Freunde erkennt man in der Not.", author: "deutsches Sprichwort", theme: "Vertrauen" },
  { text: "Ein Ungl\xFCck kommt selten allein.", author: "deutsches Sprichwort", theme: "Verlust" },
  { text: "Reden ist Silber, Schweigen ist Gold.", author: "deutsches Sprichwort", theme: "Leben" },
  { text: "Was du nicht willst, das man dir tu, das f\xFCg auch keinem andern zu.", author: "deutsches Sprichwort", theme: "Vertrauen" },
  { text: "Zeit heilt alle Wunden.", author: "deutsches Sprichwort", theme: "Verlust" },
  { text: "Der Apfel f\xE4llt nicht weit vom Stamm.", author: "deutsches Sprichwort", theme: "Erinnerung" },
  { text: "Liebe macht blind.", author: "deutsches Sprichwort", theme: "Liebe" },
  { text: "Hoffnung stirbt zuletzt.", author: "deutsches Sprichwort", theme: "Hoffnung" },
  { text: "Jedes Ding hat zwei Seiten.", author: "deutsches Sprichwort", theme: "Leben" },
  { text: "Was lange w\xE4hrt, wird endlich gut.", author: "deutsches Sprichwort", theme: "Hoffnung" },
  { text: "In der K\xFCrze liegt die W\xFCrze.", author: "deutsches Sprichwort", theme: "Humor" },
  { text: "Morgenstund hat Gold im Mund.", author: "deutsches Sprichwort", theme: "Leben" },
  { text: "Wer zuletzt lacht, lacht am besten.", author: "deutsches Sprichwort", theme: "Humor" },
  { text: "Stille Wasser sind tief.", author: "deutsches Sprichwort", theme: "Leben" },
  { text: "Ende gut, alles gut.", author: "deutsches Sprichwort", theme: "Gl\xFCck" },
  { text: "Man lernt nie aus.", author: "deutsches Sprichwort", theme: "Alter" },
  { text: "Alte Liebe rostet nicht.", author: "deutsches Sprichwort", theme: "Liebe" },
  { text: "Andere L\xE4nder, andere Sitten.", author: "deutsches Sprichwort", theme: "Heimat" },
  { text: "Man ist so alt, wie man sich f\xFChlt.", author: "deutsches Sprichwort", theme: "Alter" },
  { text: "Auf Regen folgt Sonnenschein.", author: "deutsches Sprichwort", theme: "Natur" },
  { text: "April, April, der wei\xDF nicht, was er will.", author: "deutsches Sprichwort", theme: "Natur" },
  { text: "Alles hat seine Zeit.", author: "Bibel, Prediger 3,1 (Luther-\xDCbersetzung)", theme: "Leben" },
  { text: "Die Liebe h\xF6ret nimmer auf.", author: "Bibel, 1. Korinther 13 (Luther-\xDCbersetzung)", theme: "Liebe" },
  { text: "Der Glaube aber ist eine feste Zuversicht des, das man hoffet.", author: "Bibel, Hebr\xE4er 11,1 (Luther-\xDCbersetzung)", theme: "Vertrauen" },
  { text: "Bittet, so wird euch gegeben.", author: "Bibel, Matth\xE4us 7,7 (Luther-\xDCbersetzung)", theme: "Hoffnung" },
  { text: "Was du s\xE4st, das wirst du ernten.", author: "deutsches Sprichwort", theme: "Leben" },
  { text: "Wer nicht wagt, der nicht gewinnt.", author: "deutsches Sprichwort", theme: "Hoffnung" },
  { text: "Eile mit Weile.", author: "deutsches Sprichwort", theme: "Leben" },
  { text: "Ein Sperling in der Hand ist besser als eine Taube auf dem Dach.", author: "deutsches Sprichwort", theme: "Leben" },
  { text: "Wo gehobelt wird, da fallen Sp\xE4ne.", author: "deutsches Sprichwort", theme: "Leben" },
  { text: "Man kann nicht auf zwei Hochzeiten gleichzeitig tanzen.", author: "deutsches Sprichwort", theme: "Humor" },
  { text: "Wer im Glashaus sitzt, sollte nicht mit Steinen werfen.", author: "deutsches Sprichwort", theme: "Vertrauen" },
  { text: "Alte Freunde und alter Wein sind die besten.", author: "deutsches Sprichwort", theme: "Vertrauen" },
  { text: "Man muss die Feste feiern, wie sie fallen.", author: "deutsches Sprichwort", theme: "Gl\xFCck" },
  { text: "Es ist noch kein Meister vom Himmel gefallen.", author: "deutsches Sprichwort", theme: "Hoffnung" },
  { text: "Liebe kennt keine Grenzen.", author: "deutsches Sprichwort", theme: "Liebe" },
  { text: "Was man in der Jugend w\xFCnscht, hat man im Alter die F\xFClle.", author: "Johann Wolfgang von Goethe", theme: "Alter" },
  { text: "Es bildet ein Talent sich in der Stille, sich ein Charakter in dem Strom der Welt.", author: "Johann Wolfgang von Goethe", theme: "Leben" },
  { text: "Gib einem Mann einen Fisch, und du ern\xE4hrst ihn f\xFCr einen Tag. Lehre ihn zu fischen, und du ern\xE4hrst ihn f\xFCr sein Leben.", author: "chinesisches Sprichwort", theme: "Hoffnung" },
  { text: "Wenn du f\xFCr ein Jahr planst, s\xE4e Reis. Wenn du f\xFCr zehn Jahre planst, pflanze B\xE4ume. Wenn du f\xFCr hundert Jahre planst, bilde Menschen.", author: "chinesisches Sprichwort", theme: "Hoffnung" },
  { text: "Der Mensch, der einen Berg versetzen will, beginnt damit, kleine Steine wegzutragen.", author: "chinesisches Sprichwort", theme: "Leben" },
  { text: "Ein Buch ist wie ein Garten, den man in der Tasche tr\xE4gt.", author: "chinesisches Sprichwort", theme: "Gl\xFCck" },
  { text: "Ein einziges Wort der Ermutigung kann einem Menschen den ganzen Tag erhellen.", author: "chinesisches Sprichwort", theme: "Hoffnung" },
  { text: "Ein Weg von tausend Meilen beginnt mit dem ersten Schritt.", author: "Laotse, sinngem\xE4\xDF (Tao Te King)", theme: "Hoffnung" },
  { text: "Wer andere kennt, ist klug. Wer sich selbst kennt, ist erleuchtet.", author: "Laotse, sinngem\xE4\xDF (Tao Te King)", theme: "Leben" },
  { text: "Das weichste Ding der Welt \xFCberwindet das h\xE4rteste.", author: "Laotse, sinngem\xE4\xDF (Tao Te King)", theme: "Vertrauen" },
  { text: "Es ist gleichg\xFCltig, wie langsam du gehst, solange du nicht stehen bleibst.", author: "Konfuzius, zugeschrieben", theme: "Hoffnung" },
  { text: "Drei Wege gibt es zur Weisheit: Nachdenken ist der edelste, Nachahmen der leichteste, Erfahrung der bitterste.", author: "Konfuzius, zugeschrieben", theme: "Leben" },
  { text: "W\xE4hle einen Beruf, den du liebst, und du brauchst in deinem Leben keinen Tag mehr zu arbeiten.", author: "Konfuzius, zugeschrieben", theme: "Gl\xFCck" },
  { text: "Unser gr\xF6\xDFter Ruhm ist nicht, niemals zu fallen, sondern jedes Mal wieder aufzustehen.", author: "Konfuzius, zugeschrieben", theme: "Hoffnung" },
  { text: "Siebenmal hinfallen, achtmal aufstehen.", author: "japanisches Sprichwort", theme: "Hoffnung" },
  { text: "Der Bambus, der sich biegt, ist st\xE4rker als die Eiche, die widersteht.", author: "japanisches Sprichwort", theme: "Leben" },
  { text: "Ein einziges L\xE4cheln kann tausend Sorgen vertreiben.", author: "japanisches Sprichwort", theme: "Gl\xFCck" },
  { text: "Man erkennt den Charakter eines Menschen daran, wie er einen Regenschirm zur\xFCckgibt.", author: "japanisches Sprichwort", theme: "Vertrauen" },
  { text: "Kirschbl\xFCten sind sch\xF6n, gerade weil sie so schnell verwelken.", author: "japanisches Sprichwort", theme: "Natur" },
  { text: "Nach dem Regen verdichtet sich die Erde.", author: "japanisches Sprichwort", theme: "Vertrauen" },
  { text: "Der beste Beweis der Liebe ist Vertrauen.", author: "Rabindranath Tagore, sinngem\xE4\xDF", theme: "Vertrauen" },
  { text: "Wir lesen die Welt falsch und sagen, sie betr\xFCgt uns.", author: "Rabindranath Tagore, sinngem\xE4\xDF", theme: "Leben" },
  { text: "Lasst mich nicht beten, vor Gefahren besch\xFCtzt zu werden, sondern ihnen furchtlos zu begegnen.", author: "Rabindranath Tagore, sinngem\xE4\xDF", theme: "Hoffnung" },
  { text: "Sei du selbst die Ver\xE4nderung, die du dir w\xFCnschst f\xFCr diese Welt.", author: "Mahatma Gandhi, zugeschrieben", theme: "Hoffnung" },
  { text: "Ein L\xE4cheln kostet nichts und schenkt doch viel.", author: "indisches Sprichwort", theme: "Gl\xFCck" },
  { text: "Gestern war ich klug und wollte die Welt ver\xE4ndern. Heute bin ich weise und ver\xE4ndere mich selbst.", author: "Rumi, sinngem\xE4\xDF", theme: "Leben" },
  { text: "Die Wunde ist der Ort, wo das Licht in dich eindringt.", author: "Rumi, sinngem\xE4\xDF", theme: "Hoffnung" },
  { text: "Sei wie ein Baum und lass die toten Bl\xE4tter fallen.", author: "Rumi, sinngem\xE4\xDF", theme: "Verlust" },
  { text: "Deine Kinder sind nicht deine Kinder. Sie sind S\xF6hne und T\xF6chter der Sehnsucht des Lebens nach sich selbst.", author: "Khalil Gibran, sinngem\xE4\xDF (aus \u201EDer Prophet\u201C)", theme: "Leben" },
  { text: "Die Freude ist euer Leid, das seine Maske abgenommen hat.", author: "Khalil Gibran, sinngem\xE4\xDF (aus \u201EDer Prophet\u201C)", theme: "Gl\xFCck" },
  { text: "Der Geist ist alles. Was du denkst, das wirst du.", author: "Buddha, zugeschrieben (nach dem Dhammapada)", theme: "Leben" },
  { text: "Drei Dinge k\xF6nnen nicht lange verborgen bleiben: die Sonne, der Mond und die Wahrheit.", author: "Buddha, zugeschrieben", theme: "Vertrauen" },
  { text: "Halte an nichts fest \u2014 nicht einmal an der Vorstellung von dir selbst.", author: "Buddha, sinngem\xE4\xDF", theme: "Leben" },
  { text: "Das L\xE4cheln ist der Anfang des Friedens.", author: "Thich Nhat Hanh", theme: "Gl\xFCck" }
];
function gutenbergLinks(author) {
  const q = encodeURIComponent(author.name);
  return [
    { label: "Projekt Gutenberg-DE", url: "https://www.projekt-gutenberg.org/info/texte/autoren.html" },
    { label: "Gutenberg.org (international)", url: `https://www.gutenberg.org/ebooks/search/?query=${q}` },
    { label: "Wikisource-Suche", url: `https://de.wikisource.org/w/index.php?search=${q}` }
  ];
}
async function wikisourceSearch(name) {
  const url = `https://de.wikisource.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(name)}&format=json&origin=*&srlimit=20`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Netzwerkfehler");
  const data = await res.json();
  return data.query && data.query.search || [];
}
function stripHtml(s) {
  return s.replace(/<[^>]+>/g, "");
}
async function wikisourceExtract(title) {
  const url = `https://de.wikisource.org/w/api.php?action=query&prop=extracts&explaintext=1&titles=${encodeURIComponent(title)}&format=json&origin=*`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Netzwerkfehler");
  const data = await res.json();
  const pages = data.query && data.query.pages;
  if (!pages) return "";
  const page = Object.values(pages)[0];
  return page && page.extract || "";
}
function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "de-DE";
  u.rate = 0.95;
  window.speechSynthesis.speak(u);
}
function SpeakButton({ text }) {
  const [speaking, setSpeaking] = useState(false);
  if (!("speechSynthesis" in window)) return null;
  const toggle = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE";
    u.rate = 0.95;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  };
  return /* @__PURE__ */ React.createElement("button", { className: "speakbtn", onClick: toggle, "aria-label": "Vorlesen" }, speaking ? "\u23F8 Stopp" : "\u{1F50A} Vorlesen");
}
function WikisourceExplorer({ author }) {
  const [status, setStatus] = useState("idle");
  const [results, setResults] = useState([]);
  const [reading, setReading] = useState(null);
  const load = async () => {
    setStatus("loading");
    try {
      const r = await wikisourceSearch(author.name);
      setResults(r);
      setStatus("done");
    } catch (e) {
      setStatus("error");
    }
  };
  const openText = async (title) => {
    setReading({ title, text: "", status: "loading" });
    try {
      const text = await wikisourceExtract(title);
      setReading({ title, text: text || "Kein Text gefunden.", status: "done" });
    } catch (e) {
      setReading({ title, text: "", status: "error" });
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "wikisource-box" }, /* @__PURE__ */ React.createElement("h3", null, "Mehr auf Wikisource entdecken"), /* @__PURE__ */ React.createElement("p", { className: "wiki-hint" }, "L\xE4dt zus\xE4tzliche gemeinfreie Werke live von de.wikisource.org \u2014 daf\xFCr ist eine Internetverbindung n\xF6tig."), status === "idle" && /* @__PURE__ */ React.createElement("button", { className: "loadbtn", onClick: load }, "Werke laden"), status === "loading" && /* @__PURE__ */ React.createElement("div", { className: "wiki-hint" }, "L\xE4dt \u2026"), status === "error" && /* @__PURE__ */ React.createElement("div", { className: "wiki-hint" }, "Konnte gerade nichts laden \u2014 bitte Internetverbindung pr\xFCfen und erneut versuchen.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("button", { className: "loadbtn", onClick: load }, "Erneut versuchen")), status === "done" && results.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "wiki-hint" }, "Keine Treffer auf Wikisource gefunden."), status === "done" && results.length > 0 && /* @__PURE__ */ React.createElement("ul", { className: "wiki-results" }, results.map((r, i) => /* @__PURE__ */ React.createElement("li", { key: i }, /* @__PURE__ */ React.createElement("button", { onClick: () => openText(r.title) }, /* @__PURE__ */ React.createElement("span", { className: "wr-title" }, r.title), /* @__PURE__ */ React.createElement("span", { className: "wr-snip" }, stripHtml(r.snippet || "")))))), reading && /* @__PURE__ */ React.createElement("div", { className: "sheet-overlay", onClick: (e) => {
    if (e.target === e.currentTarget) setReading(null);
  } }, /* @__PURE__ */ React.createElement("div", { className: "sheet" }, /* @__PURE__ */ React.createElement("div", { className: "sheet-handle" }), /* @__PURE__ */ React.createElement("h2", null, reading.title), reading.status === "loading" && /* @__PURE__ */ React.createElement("div", { className: "wiki-hint" }, "L\xE4dt Text \u2026"), reading.status === "error" && /* @__PURE__ */ React.createElement("div", { className: "wiki-hint" }, "Text konnte nicht geladen werden."), reading.status === "done" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(SpeakButton, { text: reading.text.slice(0, 4e3) }), /* @__PURE__ */ React.createElement("div", { className: "wiki-fulltext" }, reading.text)), /* @__PURE__ */ React.createElement("button", { className: "cancel-btn", onClick: () => setReading(null) }, "Schlie\xDFen"))));
}
const STORAGE_KEY = "literatura.poems.v1";
function loadPoems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}
function savePoems(poems) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(poems));
  } catch (e) {
  }
}
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
function TabBar({ tab, setTab }) {
  const items = [
    { id: "autoren", ic: "\u2712\uFE0E", label: "AUTOREN" },
    { id: "aphorismen", ic: "\u275D", label: "APHORISMEN" },
    { id: "gedichte", ic: "\u2766", label: "MEINE" },
    { id: "zeit", ic: "\u25C8", label: "ZEITLEISTE" }
  ];
  return /* @__PURE__ */ React.createElement("nav", { className: "tabbar" }, items.map((it) => /* @__PURE__ */ React.createElement("button", { key: it.id, className: tab === it.id ? "active" : "", onClick: () => setTab(it.id) }, /* @__PURE__ */ React.createElement("span", { className: "ic" }, it.ic), /* @__PURE__ */ React.createElement("span", null, it.label))));
}
function authorThemes(a) {
  const t = /* @__PURE__ */ new Set();
  (a.quotes || []).forEach((q) => q.theme && t.add(q.theme));
  (a.poems || []).forEach((p) => p.theme && t.add(p.theme));
  return [...t];
}
function AuthorsList({ onOpen }) {
  const [filter, setFilter] = useState(null);
  const [query, setQuery] = useState("");
  const availableThemes = useMemo(() => {
    const t = /* @__PURE__ */ new Set();
    AUTHORS.forEach((a) => authorThemes(a).forEach((x) => t.add(x)));
    return TAGS.filter((t2) => t.has(t2));
  }, []);
  const shown = AUTHORS.filter((a) => !filter || authorThemes(a).includes(filter)).filter((a) => !query.trim() || a.name.toLowerCase().includes(query.trim().toLowerCase()));
  return /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Bibliothek"), /* @__PURE__ */ React.createElement("h1", { className: "pagetitle" }, "Dichter & Denker"), /* @__PURE__ */ React.createElement("p", { className: "pagesub" }, AUTHORS.length, " Stimmen der deutschsprachigen Literatur \u2014 \xFCber Leben, Liebe, Vertrauen und Gl\xFCck. Der gr\xFCne Punkt zeigt gemeinfreie Werke mit Textauszug und Wikisource-Anbindung, der weinrote Punkt zeigt gesch\xFCtzte Werke mit Zitat und Verlagslink."), /* @__PURE__ */ React.createElement("input", { className: "searchbox", type: "text", placeholder: "Autor:in suchen \u2026", value: query, onChange: (e) => setQuery(e.target.value) }), /* @__PURE__ */ React.createElement("div", { className: "tagpicker", style: { marginBottom: 20, marginTop: 14 } }, /* @__PURE__ */ React.createElement("button", { className: filter === null ? "on" : "", onClick: () => setFilter(null) }, "Alle"), availableThemes.map((t) => /* @__PURE__ */ React.createElement("button", { key: t, className: filter === t ? "on" : "", onClick: () => setFilter(t) }, t))), shown.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "empty" }, /* @__PURE__ */ React.createElement("p", null, "Keine Treffer.")), /* @__PURE__ */ React.createElement("div", { className: "grid" }, shown.map((a) => /* @__PURE__ */ React.createElement("button", { key: a.id, className: "authorcard", onClick: () => onOpen(a.id) }, /* @__PURE__ */ React.createElement("span", { className: "pd-badge" + (a.pd ? "" : " locked") }), /* @__PURE__ */ React.createElement("span", { className: "era" }, a.era), /* @__PURE__ */ React.createElement("div", { className: "name" }, a.name), /* @__PURE__ */ React.createElement("div", { className: "dates" }, a.born, "\u2013", a.died)))));
}
function dayIndex(len) {
  const d = /* @__PURE__ */ new Date();
  const seed = d.getFullYear() * 1e3 + Math.ceil((d - new Date(d.getFullYear(), 0, 0)) / 864e5);
  return seed % len;
}
function AphorismList() {
  const [filter, setFilter] = useState(null);
  const [query, setQuery] = useState("");
  const availableThemes = useMemo(() => {
    const t = /* @__PURE__ */ new Set();
    APHORISMEN.forEach((a) => a.theme && t.add(a.theme));
    return TAGS.filter((t2) => t.has(t2));
  }, []);
  const todays = APHORISMEN[dayIndex(APHORISMEN.length)];
  const shown = APHORISMEN.filter((a) => !filter || a.theme === filter).filter((a) => !query.trim() || a.text.toLowerCase().includes(query.trim().toLowerCase()) || a.author.toLowerCase().includes(query.trim().toLowerCase()));
  return /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Gedankensplitter"), /* @__PURE__ */ React.createElement("h1", { className: "pagetitle" }, "Aphorismen"), /* @__PURE__ */ React.createElement("p", { className: "pagesub" }, APHORISMEN.length, " kurze Sentenzen \xFCber Leben, Liebe, Vertrauen und Gl\xFCck \u2014 von Lichtenberg bis Kal\xE9ko."), /* @__PURE__ */ React.createElement("div", { className: "today-aphorism" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow", style: { color: "var(--paper)", opacity: 0.75 } }, "Gedanke des Tages"), /* @__PURE__ */ React.createElement("blockquote", null, todays.text), /* @__PURE__ */ React.createElement("cite", null, "\u2014 ", todays.author), /* @__PURE__ */ React.createElement(SpeakButton, { text: todays.text })), /* @__PURE__ */ React.createElement("input", { className: "searchbox", type: "text", placeholder: "Aphorismus oder Autor:in suchen \u2026", value: query, onChange: (e) => setQuery(e.target.value) }), /* @__PURE__ */ React.createElement("div", { className: "tagpicker", style: { marginBottom: 18, marginTop: 14 } }, /* @__PURE__ */ React.createElement("button", { className: filter === null ? "on" : "", onClick: () => setFilter(null) }, "Alle"), availableThemes.map((t) => /* @__PURE__ */ React.createElement("button", { key: t, className: filter === t ? "on" : "", onClick: () => setFilter(t) }, t))), shown.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "empty" }, /* @__PURE__ */ React.createElement("p", null, "Keine Treffer.")), shown.map((a, i) => /* @__PURE__ */ React.createElement("div", { className: "marginal aphorism-card", key: i }, /* @__PURE__ */ React.createElement("blockquote", null, a.text), /* @__PURE__ */ React.createElement("cite", null, "\u2014 ", a.author), /* @__PURE__ */ React.createElement(SpeakButton, { text: a.text }))));
}
function AuthorDetail({ author, onBack, onDedicate }) {
  const extraLinks = author.pd ? gutenbergLinks(author) : [];
  return /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("button", { className: "backbtn", onClick: onBack }, "\u2039 Zur\xFCck"), /* @__PURE__ */ React.createElement("div", { className: "authorhead" }, /* @__PURE__ */ React.createElement("span", { className: "era" }, author.era), /* @__PURE__ */ React.createElement("h1", null, author.name), /* @__PURE__ */ React.createElement("div", { className: "dates" }, author.born, "\u2013", author.died)), /* @__PURE__ */ React.createElement("div", { className: "bio" }, author.bio.map((p, i) => /* @__PURE__ */ React.createElement("p", { key: i }, p))), author.pd && (author.poems || []).map((poem, i) => /* @__PURE__ */ React.createElement("div", { className: "fulltext-poem", key: i }, /* @__PURE__ */ React.createElement("h3", null, poem.title), /* @__PURE__ */ React.createElement("p", null, poem.text), /* @__PURE__ */ React.createElement(SpeakButton, { text: poem.text }))), (author.quotes || []).map((q, i) => /* @__PURE__ */ React.createElement("div", { className: "marginal", key: i }, /* @__PURE__ */ React.createElement("blockquote", null, q.text), /* @__PURE__ */ React.createElement("cite", null, "\u2014 ", q.cite), /* @__PURE__ */ React.createElement(SpeakButton, { text: q.text }))), /* @__PURE__ */ React.createElement("div", { className: "pd-note" + (author.pd ? "" : " locked") }, author.pd ? "Dieses Werk ist gemeinfrei (70 Jahre nach dem Tod der Autorin/des Autors abgelaufen). Weitere Texte findest du \xFCber Wikisource unten oder die Links." : "Die Werke sind noch urheberrechtlich gesch\xFCtzt. Vollst\xE4ndige Gedichte gibt es rechtssicher beim Verlag oder auf lizenzierten Plattformen \u2014 siehe Links unten."), /* @__PURE__ */ React.createElement("div", { className: "linkrow" }, [...author.links, ...extraLinks].map((l, i) => /* @__PURE__ */ React.createElement("a", { key: i, href: l.url, target: "_blank", rel: "noopener noreferrer" }, l.label, " \u2197"))), author.pd && /* @__PURE__ */ React.createElement(WikisourceExplorer, { author }), /* @__PURE__ */ React.createElement("button", { className: "dedicate-btn", onClick: () => onDedicate(author) }, "Ein eigenes Gedicht widmen"));
}
function useSpeechRecognition(onResult) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const recRef = useRef(null);
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setSupported(false);
      return;
    }
    const rec = new SR();
    rec.lang = "de-DE";
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (e) => {
      let text = "";
      for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript;
      onResult(text);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
  }, []);
  const start = () => {
    if (!recRef.current) return;
    setListening(true);
    recRef.current.start();
  };
  const stop = () => {
    if (!recRef.current) return;
    recRef.current.stop();
    setListening(false);
  };
  return { listening, supported, start, stop };
}
function loadTesseract() {
  return new Promise((resolve, reject) => {
    if (window.Tesseract) return resolve(window.Tesseract);
    const s = document.createElement("script");
    s.src = "https://unpkg.com/tesseract.js@5/dist/tesseract.min.js";
    s.onload = () => resolve(window.Tesseract);
    s.onerror = reject;
    document.head.appendChild(s);
  });
}
function PoemEditor({ initial, onSave, onClose }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [text, setText] = useState(initial?.text || "");
  const [tags, setTags] = useState(initial?.tags || []);
  const [source, setSource] = useState(initial?.source || "text");
  const [ocrStatus, setOcrStatus] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);
  const speech = useSpeechRecognition((t) => setText(t));
  const toggleTag = (t) => {
    setTags(tags.includes(t) ? tags.filter((x) => x !== t) : [...tags, t]);
  };
  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSource("kamera");
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
    setOcrStatus("Texterkennung l\xE4uft \u2026");
    try {
      const Tesseract = await loadTesseract();
      const { data } = await Tesseract.recognize(file, "deu");
      setText(data.text.trim());
      setOcrStatus("Vorschlag eingef\xFCgt \u2014 bitte kurz gegenpr\xFCfen und korrigieren.");
    } catch (err) {
      setOcrStatus("Texterkennung fehlgeschlagen. Bitte den Text von Hand abtippen.");
    }
  };
  const handleSave = () => {
    if (!text.trim()) return;
    onSave({
      id: initial?.id || uid(),
      title: title.trim() || "Ohne Titel",
      text: text.trim(),
      tags,
      source,
      inspiredBy: initial?.inspiredBy || null,
      createdAt: initial?.createdAt || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
    });
  };
  return /* @__PURE__ */ React.createElement("div", { className: "sheet-overlay", onClick: (e) => {
    if (e.target === e.currentTarget) onClose();
  } }, /* @__PURE__ */ React.createElement("div", { className: "sheet" }, /* @__PURE__ */ React.createElement("div", { className: "sheet-handle" }), /* @__PURE__ */ React.createElement("h2", null, initial?.id ? "Gedicht bearbeiten" : "Neues Gedicht"), initial?.inspiredBy && /* @__PURE__ */ React.createElement("div", { className: "pd-note", style: { marginTop: 0 } }, "Gewidmet: ", initial.inspiredBy), /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("label", null, "Titel"), /* @__PURE__ */ React.createElement("input", { type: "text", value: title, onChange: (e) => setTitle(e.target.value), placeholder: "z. B. Abendlicht" })), /* @__PURE__ */ React.createElement("div", { className: "inputrow" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      className: "chipbtn" + (speech.listening ? " recording" : ""),
      onClick: () => {
        setSource("sprache");
        speech.listening ? speech.stop() : speech.start();
      },
      disabled: !speech.supported
    },
    /* @__PURE__ */ React.createElement("span", { className: "ic" }, speech.listening ? "\u25C9" : "\u{1F399}"),
    speech.supported ? speech.listening ? "Aufnahme l\xE4uft\u2026" : "Sprechen" : "Nicht verf\xFCgbar"
  ), /* @__PURE__ */ React.createElement("button", { className: "chipbtn", onClick: () => fileInputRef.current.click() }, /* @__PURE__ */ React.createElement("span", { className: "ic" }, "\u{1F4F7}"), "Foto / Scan"), /* @__PURE__ */ React.createElement("input", { ref: fileInputRef, type: "file", accept: "image/*", capture: "environment", style: { display: "none" }, onChange: handlePhoto })), photoPreview && /* @__PURE__ */ React.createElement("img", { className: "photo-preview", src: photoPreview, alt: "Foto des Gedichts" }), ocrStatus && /* @__PURE__ */ React.createElement("div", { className: "ocr-status" }, ocrStatus), /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("label", null, "Text"), /* @__PURE__ */ React.createElement("textarea", { value: text, onChange: (e) => setText(e.target.value), placeholder: "Hier entsteht dein Gedicht \u2014 getippt, gesprochen oder abfotografiert." })), /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("label", null, "Stimmung / Thema"), /* @__PURE__ */ React.createElement("div", { className: "tagpicker" }, TAGS.map((t) => /* @__PURE__ */ React.createElement("button", { key: t, className: tags.includes(t) ? "on" : "", onClick: () => toggleTag(t) }, t)))), /* @__PURE__ */ React.createElement("button", { className: "save-btn", onClick: handleSave }, "Gedicht sichern"), /* @__PURE__ */ React.createElement("button", { className: "cancel-btn", onClick: onClose }, "Abbrechen")));
}
/* =========================================================
   SICHERHEITSKOPIE DER EIGENEN GEDICHTE

   Es gab bisher nur einen Export. Eine Sicherung, die sich nicht
   wieder einlesen lässt, hilft im Ernstfall aber nicht. Hier ist
   der Rückweg — und weil ein zurückgeholtes Archiv niemals neuere
   Gedichte löschen darf, wird zusammengeführt statt ersetzt.
   ========================================================= */

const SICHERUNG_KENNUNG = "gedichteecke-sicherung";
const SICHERUNG_STAND_KEY = "literatura.letzteSicherung";

function heuteAlsDatum() {
  return new Date().toISOString().slice(0, 10);
}

function ladeSicherungsstand() {
  try {
    const roh = localStorage.getItem(SICHERUNG_STAND_KEY);
    return roh ? JSON.parse(roh) : null;
  } catch (e) {
    return null;
  }
}

function merkeSicherung(anzahl) {
  try {
    localStorage.setItem(SICHERUNG_STAND_KEY, JSON.stringify({ datum: heuteAlsDatum(), anzahl }));
  } catch (e) {
  }
}

function baueSicherung(poems) {
  return { kennung: SICHERUNG_KENNUNG, version: 1, erstellt: new Date().toISOString(), gedichte: poems };
}

// Nimmt sowohl die neue Form {kennung, gedichte} als auch die alte an,
// bei der die Datei nur eine blanke Liste war. Wer schon eine Datei
// gespeichert hat, soll sie weiterhin einlesen können.
function leseGedichteAusDatei(objekt) {
  const liste = Array.isArray(objekt)
    ? objekt
    : (objekt && Array.isArray(objekt.gedichte) ? objekt.gedichte : null);
  if (!liste) return null;

  const erlaubteQuellen = ["text", "sprache", "kamera"];
  return liste
    .filter((p) => p && typeof p === "object" && typeof p.text === "string" && p.text.trim())
    .map((p) => ({
      id: typeof p.id === "string" && p.id ? p.id : uid(),
      title: typeof p.title === "string" && p.title.trim() ? p.title.trim() : "Ohne Titel",
      text: p.text,
      tags: Array.isArray(p.tags) ? p.tags.filter((t) => typeof t === "string") : [],
      source: erlaubteQuellen.includes(p.source) ? p.source : "text",
      inspiredBy: typeof p.inspiredBy === "string" ? p.inspiredBy : null,
      createdAt: /^\d{4}-\d{2}-\d{2}$/.test(p.createdAt) ? p.createdAt : heuteAlsDatum()
    }));
}

function fuegeZusammen(vorhandene, geladene) {
  const bekannt = new Set(vorhandene.map((p) => p.id));
  const neue = geladene.filter((p) => !bekannt.has(p.id));
  return { liste: [...neue, ...vorhandene], neu: neue.length, schonDa: geladene.length - neue.length };
}

function alsLesbarerText(poems) {
  const trenner = "\n\n" + "—".repeat(28) + "\n\n";
  return poems
    .map((p) => {
      const kopf = [p.createdAt, p.inspiredBy ? "gewidmet: " + p.inspiredBy : null].filter(Boolean).join(" · ");
      const fuss = p.tags && p.tags.length ? "(" + p.tags.join(", ") + ")" : null;
      return [p.title, kopf, "", p.text, fuss].filter((z) => z !== null).join("\n");
    })
    .join(trenner);
}

function dateiHerunterladen(inhalt, name, typ) {
  const blob = new Blob([inhalt], { type: typ });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function Sicherung({ poems, setPoems }) {
  const [meldung, setMeldung] = useState(null);
  const [stand, setStand] = useState(ladeSicherungsstand);

  const datumStueck = heuteAlsDatum();
  const seitLetzterSicherung = stand ? poems.length - stand.anzahl : poems.length;

  const alsDateiSichern = () => {
    if (poems.length === 0) return;
    dateiHerunterladen(JSON.stringify(baueSicherung(poems), null, 2), "meine-gedichte-" + datumStueck + ".json", "application/json");
    merkeSicherung(poems.length);
    setStand({ datum: datumStueck, anzahl: poems.length });
    setMeldung({ gut: true, text: "Gesichert. Bewahre die Datei irgendwo auf, wo du sie wiederfindest — zum Beispiel in einer E-Mail an dich selbst." });
  };

  const zumAusdrucken = () => {
    if (poems.length === 0) return;
    dateiHerunterladen(alsLesbarerText(poems), "meine-gedichte-" + datumStueck + ".txt", "text/plain;charset=utf-8");
    setMeldung({ gut: true, text: "Als lesbarer Text gespeichert — diese Datei lässt sich öffnen und ausdrucken, ganz ohne die App." });
  };

  const dateiGewaehlt = (ereignis) => {
    const datei = ereignis.target.files && ereignis.target.files[0];
    ereignis.target.value = "";
    if (!datei) return;
    setMeldung(null);

    const leser = new FileReader();
    leser.onerror = () => setMeldung({ gut: false, text: "Die Datei liess sich nicht lesen." });
    leser.onload = () => {
      let objekt;
      try {
        objekt = JSON.parse(String(leser.result));
      } catch (e) {
        setMeldung({ gut: false, text: "Das ist keine Gedicht-Datei. Suche nach einer Datei, die mit „meine-gedichte“ beginnt und auf .json endet." });
        return;
      }
      const geladene = leseGedichteAusDatei(objekt);
      if (!geladene) {
        setMeldung({ gut: false, text: "In dieser Datei stehen keine Gedichte." });
        return;
      }
      if (geladene.length === 0) {
        setMeldung({ gut: false, text: "Die Datei enthält keine lesbaren Gedichte." });
        return;
      }
      const ergebnis = fuegeZusammen(poems, geladene);
      setPoems(ergebnis.liste);
      setMeldung({
        gut: true,
        text: ergebnis.neu === 0
          ? "Alle " + geladene.length + " Gedichte aus der Datei waren schon da. Es hat sich nichts geändert."
          : ergebnis.neu + (ergebnis.neu === 1 ? " Gedicht wurde" : " Gedichte wurden") + " zurückgeholt"
            + (ergebnis.schonDa > 0 ? ", " + ergebnis.schonDa + " waren schon da" : "") + "."
      });
    };
    leser.readAsText(datei);
  };

  const knopf = { marginTop: 6, marginRight: 8 };

  return /* @__PURE__ */ React.createElement("div", { style: { marginTop: 26, paddingTop: 18, borderTop: "1px solid rgba(0,0,0,0.12)" } },
    /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Sicherheitskopie"),
    /* @__PURE__ */ React.createElement("p", { className: "pagesub", style: { marginTop: 2 } },
      "Deine Gedichte liegen nur in diesem Browser. Speichere sie ab und zu als Datei — dann sind sie auch nach einem Gerätewechsel noch da."),

    poems.length > 0 && seitLetzterSicherung > 0 && /* @__PURE__ */ React.createElement("p",
      { className: "pagesub", style: { marginTop: 8, fontStyle: "italic" } },
      stand
        ? "Seit der letzten Sicherung am " + stand.datum.split("-").reverse().join(".") + " "
          + (seitLetzterSicherung === 1 ? "ist ein Gedicht" : "sind " + seitLetzterSicherung + " Gedichte") + " dazugekommen."
        : "Noch nie gesichert."),

    meldung && /* @__PURE__ */ React.createElement("p",
      { className: "pagesub", style: { marginTop: 10, color: meldung.gut ? "#2f6b46" : "#8a2b2b" } },
      meldung.text),

    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 0 } },
      poems.length > 0 && /* @__PURE__ */ React.createElement("button", { className: "cancel-btn", style: knopf, onClick: alsDateiSichern }, "↓ Als Datei sichern"),
      /* @__PURE__ */ React.createElement("label", { className: "cancel-btn", style: { ...knopf, display: "inline-block" } },
        "↑ Aus Datei zurückholen",
        /* @__PURE__ */ React.createElement("input", { type: "file", accept: "application/json,.json", onChange: dateiGewaehlt, style: { display: "none" } })),
      poems.length > 0 && /* @__PURE__ */ React.createElement("button", { className: "cancel-btn", style: knopf, onClick: zumAusdrucken }, "↓ Zum Ausdrucken")
    )
  );
}

function MyPoems({ poems, setPoems, editorInit, setEditorInit }) {
  const [showEditor, setShowEditor] = useState(false);
  useEffect(() => {
    if (editorInit) setShowEditor(true);
  }, [editorInit]);
  const openNew = () => {
    setEditorInit(null);
    setShowEditor(true);
  };
  const openEdit = (p) => {
    setEditorInit(p);
    setShowEditor(true);
  };
  const remove = (id) => {
    setPoems(poems.filter((p) => p.id !== id));
  };
  const handleSave = (poem) => {
    const exists = poems.some((p) => p.id === poem.id);
    const next = exists ? poems.map((p) => p.id === poem.id ? poem : p) : [poem, ...poems];
    setPoems(next);
    setShowEditor(false);
    setEditorInit(null);
  };
  return /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Archiv"), /* @__PURE__ */ React.createElement("h1", { className: "pagetitle" }, "Meine Gedichte"), /* @__PURE__ */ React.createElement("p", { className: "pagesub" }, "Getippt, gesprochen oder mit der Kamera eingefangen \u2014 alles an einem Ort, nur f\xFCr dich."), poems.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "empty" }, /* @__PURE__ */ React.createElement("div", { className: "ic" }, "\u2766"), /* @__PURE__ */ React.createElement("p", null, "Noch kein Gedicht gesichert. Tippe unten rechts auf das Plus, um dein erstes einzutragen \u2014 von Hand, per Sprache oder mit einem Foto.")), poems.map((p) => /* @__PURE__ */ React.createElement("div", { className: "poemcard", key: p.id }, /* @__PURE__ */ React.createElement("div", { className: "rowbtns" }, /* @__PURE__ */ React.createElement("button", { className: "iconbtn", onClick: () => openEdit(p) }, "\u270E"), /* @__PURE__ */ React.createElement("button", { className: "iconbtn", onClick: () => remove(p.id) }, "\u2715")), /* @__PURE__ */ React.createElement("h3", null, p.title), /* @__PURE__ */ React.createElement("div", { className: "meta" }, /* @__PURE__ */ React.createElement("span", null, p.createdAt), /* @__PURE__ */ React.createElement("span", { className: "src" }, p.source === "sprache" ? "Sprachaufnahme" : p.source === "kamera" ? "Foto-Scan" : "Text")), /* @__PURE__ */ React.createElement("div", { className: "text" }, p.text), p.tags?.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "tags" }, p.tags.map((t) => /* @__PURE__ */ React.createElement("span", { className: "tagchip", key: t }, t))), p.inspiredBy && /* @__PURE__ */ React.createElement("div", { className: "inspired" }, "\u2712\uFE0E gewidmet: ", p.inspiredBy))), /* @__PURE__ */ React.createElement(Sicherung, { poems, setPoems }), /* @__PURE__ */ React.createElement("button", { className: "fab", onClick: openNew, "aria-label": "Neues Gedicht" }, "+"), showEditor && /* @__PURE__ */ React.createElement(
    PoemEditor,
    {
      initial: editorInit,
      onSave: handleSave,
      onClose: () => {
        setShowEditor(false);
        setEditorInit(null);
      }
    }
  ));
}
function Timeline({ poems }) {
  const items = useMemo(() => {
    const a = AUTHORS.map((x) => ({
      kind: "author",
      year: x.born,
      sortYear: x.born,
      title: x.name,
      desc: `${x.born}\u2013${x.died} \xB7 ${x.era}`
    }));
    const p = poems.map((x) => ({
      kind: "mine",
      year: x.createdAt,
      sortYear: parseInt(x.createdAt.slice(0, 4)) || 2026,
      title: x.title,
      desc: x.inspiredBy ? `Eigenes Gedicht \xB7 gewidmet ${x.inspiredBy}` : "Eigenes Gedicht"
    }));
    return [...a, ...p].sort((m, n) => n.sortYear - m.sortYear);
  }, [poems]);
  return /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("p", { className: "eyebrow" }, "Dialog der Zeiten"), /* @__PURE__ */ React.createElement("h1", { className: "pagetitle" }, "Zeitleiste"), /* @__PURE__ */ React.createElement("p", { className: "pagesub" }, "Die gro\xDFen Stimmen der Literatur und deine eigenen Gedichte \u2014 nebeneinander auf einer Linie."), /* @__PURE__ */ React.createElement("div", { className: "tl" }, items.map((it, i) => /* @__PURE__ */ React.createElement("div", { className: "tl-item" + (it.kind === "mine" ? " mine" : ""), key: i }, /* @__PURE__ */ React.createElement("div", { className: "yr" }, it.year), /* @__PURE__ */ React.createElement("div", { className: "ttl" }, it.title), /* @__PURE__ */ React.createElement("div", { className: "desc" }, it.desc)))));
}
function InstallBanner() {
  const [dismissed, setDismissed] = useState(() => localStorage.getItem("literatura.installDismissed") === "1");
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
  if (dismissed || isStandalone) return null;
  const dismiss = () => {
    setDismissed(true);
    localStorage.setItem("literatura.installDismissed", "1");
  };
  return /* @__PURE__ */ React.createElement("div", { className: "installbar" }, /* @__PURE__ */ React.createElement("span", { className: "ic" }, "\u2712\uFE0E"), /* @__PURE__ */ React.createElement("div", null, isIOS ? /* @__PURE__ */ React.createElement(React.Fragment, null, "Auf den Startbildschirm holen: unten auf ", /* @__PURE__ */ React.createElement("strong", null, "Teilen"), " tippen, dann ", /* @__PURE__ */ React.createElement("strong", null, "\u201EZum Home-Bildschirm\u201C"), " w\xE4hlen.") : /* @__PURE__ */ React.createElement(React.Fragment, null, "Auf den Startbildschirm holen: oben rechts im Browser-Men\xFC ", /* @__PURE__ */ React.createElement("strong", null, "\u201EApp installieren\u201C"), " w\xE4hlen."), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", { onClick: dismiss }, "Verstanden"))), /* @__PURE__ */ React.createElement("button", { className: "close", onClick: dismiss }, "\u2715"));
}
function App() {
  const [tab, setTab] = useState("autoren");
  const [openAuthorId, setOpenAuthorId] = useState(null);
  const [poems, setPoems] = useState(loadPoems());
  const [editorInit, setEditorInit] = useState(null);
  const [fontScale, setFontScale] = useState(() => {
    try {
      return localStorage.getItem("literatura.fontScale") || "normal";
    } catch (e) {
      return "normal";
    }
  });
  useEffect(() => {
    savePoems(poems);
  }, [poems]);
  useEffect(() => {
    document.documentElement.setAttribute("data-fontscale", fontScale);
    try {
      localStorage.setItem("literatura.fontScale", fontScale);
    } catch (e) {
    }
  }, [fontScale]);
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("service-worker.js").catch(() => {
      });
    }
  }, []);
  const openAuthor = (id) => setOpenAuthorId(id);
  const backToAuthors = () => setOpenAuthorId(null);
  const dedicate = (author2) => {
    setEditorInit({ inspiredBy: author2.name, tags: [], source: "text", title: "", text: "" });
    setTab("gedichte");
    setOpenAuthorId(null);
  };
  const author = AUTHORS.find((a) => a.id === openAuthorId);
  const cycleFont = () => {
    setFontScale(fontScale === "normal" ? "gross" : fontScale === "gross" ? "riesig" : "normal");
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("header", { className: "topbar" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "word" }, "Sylvia's Gedichteecke", /* @__PURE__ */ React.createElement("span", null, ".")), /* @__PURE__ */ React.createElement("div", { className: "sub" }, "Gedichte & Dichter")), /* @__PURE__ */ React.createElement("button", { className: "fontbtn", onClick: cycleFont, "aria-label": "Schriftgr\xF6\xDFe \xE4ndern", title: "Schriftgr\xF6\xDFe \xE4ndern" }, "Aa")), tab === "autoren" && !author && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { padding: "18px 20px 0" } }, /* @__PURE__ */ React.createElement(InstallBanner, null)), /* @__PURE__ */ React.createElement(AuthorsList, { onOpen: openAuthor })), tab === "autoren" && author && /* @__PURE__ */ React.createElement(AuthorDetail, { author, onBack: backToAuthors, onDedicate: dedicate }), tab === "aphorismen" && /* @__PURE__ */ React.createElement(AphorismList, null), tab === "gedichte" && /* @__PURE__ */ React.createElement(MyPoems, { poems, setPoems, editorInit, setEditorInit }), tab === "zeit" && /* @__PURE__ */ React.createElement(Timeline, { poems }), /* @__PURE__ */ React.createElement(TabBar, { tab, setTab: (t) => {
    setTab(t);
    setOpenAuthorId(null);
  } }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
