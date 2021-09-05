/*
  Copyright 2018, 2019, 2020, 2021 David Healey

  This file is part of Waistline.

  Waistline is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  Waistline is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Waistline.  If not, see <http://www.gnu.org/licenses/>.
*/

const app = {
  mode: "release",
  data: {}, // App wide object that can be used to store stuff
  strings: {}, // Localization strings
  standardUnits: ["ug", "μg", "mg", "g", "kg", "ul", "μl", "ml", "dl", "dL", "cl", "cL", "l", "L"],
  nutriments: ["calories", "kilojoules", "proteins", "carbohydrates", "fat", "saturated-fat", "monounsaturated-fat", "polyunsaturated-fat", "trans-fat", "omega-3-fat", "cholesterol", "sugars", "fiber", "sodium", "salt", "potassium", "vitamin-a", "vitamin-d", "vitamin-e", "vitamin-k", "vitamin-c", "vitamin-b1", "vitamin-b2", "vitamin-b6", "vitamin-b9", "vitamin-b12", "chloride", "calcium", "iron", "magnesium", "zinc", "caffeine", "alcohol", "sucrose", "glucose", "fructose", "lactose"],
  nutrimentUnits: {
    "calories": "kcal",
    "kilojoules": "kJ",
    "proteins": "g",
    "carbohydrates": "g",
    "fat": "g",
    "saturated-fat": "g",
    "cholesterol": "mg",
    "sugars": "g",
    "fiber": "g",
    "salt": "g",
    "sodium": "mg",
    "potassium": "mg",
    "calcium": "mg",
    "iron": "mg",
    "magnesium": "mg",
    "zinc": "mg",
    "caffeine": "g",
    "alcohol": "%",
    "vitamin-a": "µg",
    "vitamin-d": "µg",
    "vitamin-e": "mg",
    "vitamin-k": "µg",
    "vitamin-c": "mg",
    "vitamin-b1": "mg",
    "vitamin-b2": "mg",
    "vitamin-b6": "g",
    "vitamin-b9": "µg",
    "vitamin-b12": "µg"
  },

  localize: function() {
    let lang = app.Settings.get("theme", "locale");

    if (lang == undefined || lang == "auto") {
      lang = navigator.language.replace(/_/, '-').toLowerCase();

      if (lang.length > 3)
        lang = lang.substring(0, 3) + lang.substring(3, 5).toUpperCase();
    }

    //Get default/fallback locale data
    if (Object.keys(app.strings).length == 0) {
      $.getJSON("assets/locales/locale-en.json", function(data) {
        app.strings = data;
      });
    }

    $("[data-localize]").localize("assets/locales/locale", {
      language: lang,
      skipLanguage: /^en/,
      callback: function(data, defaultCallback) {

        // Get localized strings
        let locale = $.localize.data["assets/locales/locale"];

        // Merge the default strings with the locale in case there are any missing values
        app.strings = Object.assign(app.strings, locale);
        defaultCallback(data);
      }
    });
  },

  f7: new Framework7({
    // App root element
    root: "#app",
    // App Name
    name: "Waistline",
    // App id
    id: "com.waist.line",
    version: "2.9.2",
    // Enable swipe panel
    panel: {
      swipe: "left",
      swipeActiveArea: 30,
    },
    calendar: {
      url: 'calendar/',
      dateFormat: 'dd.mm.yyyy',
    },
    touch: {
      tapHold: true, //enable tap hold events
      disableContextMenu: false
    },
    // Add default routes
    routes: [{
        name: "Statistics",
        path: "/statistics/",
        url: "activities/statistics/views/statistics.html"
      },
      {
        name: "Diary",
        path: "/diary/",
        url: "activities/diary/views/diary.html",
        routes: [{
          name: "Chart",
          path: "/chart/",
          url: "activities/diary/views/diary-chart.html",
          options: {
            transition: "f7-parallax"
          }
        }]
      },
      {
        name: "Foods, Meals, Recipes",
        path: "/foods-meals-recipes/",
        url: "activities/foods-meals-recipes/views/foods-meals-recipes.html",
        tabs: [{
            path: '/',
            id: 'foodlist',
            url: 'activities/foodlist/views/foodlist.html',
          },
          {
            path: '/recipes/',
            id: 'recipes',
            url: 'activities/recipes/views/recipes.html'
          },
          {
            path: '/meals/',
            id: 'meals',
            url: 'activities/meals/views/meals.html'
          }
        ],
        routes: [{
            name: "Food Editor",
            path: "/food-editor/",
            url: "activities/foods-meals-recipes/views/food-editor.html",
            options: {
              transition: "f7-parallax"
            }
          },
          {
            name: "Meal Editor",
            path: "/meal-editor/",
            url: "activities/meals/views/meal-editor.html",
            options: {
              transition: "f7-parallax"
            }
          },
          {
            name: "Recipe Editor",
            path: "/recipe-editor/",
            url: "activities/recipes/views/recipe-editor.html",
            options: {
              transition: "f7-parallax"
            }
          }
        ]
      },
      {
        name: "Settings",
        path: "/settings/",
        url: "activities/settings/views/settings.html",
        routes: [{
            path: "theme/",
            url: "activities/settings/views/theme.html",
            options: {
              transition: "f7-parallax"
            }
          },
          {
            path: "statistics/",
            url: "activities/settings/views/statistics.html",
            options: {
              transition: "f7-parallax"
            }
          },
          {
            path: "diary/",
            url: "activities/settings/views/diary.html",
            options: {
              transition: "f7-parallax"
            },
            routes: [{
              path: "meal-names/",
              url: "activities/settings/views/diary-meal-names.html",
              options: {
                transition: "f7-parallax"
              },
            }]
          },
          {
            path: "foods/",
            url: "activities/settings/views/foods.html",
            options: {
              transition: "f7-parallax"
            }
          },
          {
            path: "units/",
            url: "activities/settings/views/units.html",
            options: {
              transition: "f7-parallax"
            }
          },
          {
            path: "nutriments/",
            url: "activities/settings/views/nutriments.html",
            options: {
              transition: "f7-parallax"
            }
          },
          {
            path: "integration/",
            url: "activities/settings/views/integration.html",
            options: {
              transition: "f7-parallax"
            }
          },
          {
            path: "import-export/",
            url: "activities/settings/views/import-export.html",
            options: {
              transition: "f7-parallax"
            }
          }
        ]
      },
      {
        name: "Goals",
        path: "/goals/",
        url: "activities/goals/views/goals.html",
        routes: [{
          name: "Goal Editor",
          path: "/goal-editor/",
          url: "activities/goals/views/goal-editor.html",
          options: {
            transition: "f7-parallax"
          }
        }]
      },
      {
        name: "Image To Calories",
        path: "/imgtocal/",
        url: "activities/imgtocal/views/imgtocal.html"
      },
      {
        name: "About",
        path: "/about/",
        url: "activities/about/views/about.html"
      },
    ]
  })
};

// Create main view
let animate = true;
let settings = JSON.parse(window.localStorage.getItem("settings"));

if (settings != undefined && settings.theme !== undefined && settings.theme.animations !== undefined)
  animate = settings.theme.animations;

let viewOptions = {
  animate: animate
};

const mainView = app.f7.views.create("#main-view", viewOptions);

document.addEventListener("page:init", function(event) {
  let page = event.detail;

  //Close panel when switching pages
  let panelLeft = app.f7.panel.get('.panel-left');
  if (panelLeft)
    panelLeft.close(animate);

  let pageName = app.f7.views.main.router.currentRoute.name;

  if (pageName !== undefined && pageName.includes("Editor"))
    panelLeft.disableSwipe();
  else
    panelLeft.enableSwipe();
});

document.addEventListener("page:reinit", function(event) {
  let panelLeft = app.f7.panel.get('.panel-left');
  let pageName = app.f7.views.main.router.currentRoute.name;

  if (pageName !== undefined && pageName.includes("Editor"))
    panelLeft.disableSwipe();
  else
    panelLeft.enableSwipe();
});

app.f7.on("init", async function(event) {});

document.addEventListener("page:beforein", (e) => {
  app.localize();
});

document.addEventListener('deviceready', async function() {

  app.localize();

  //Database setup
  await dbHandler.initializeDb();

  if (settings == undefined || settings.firstTimeSetup == undefined) {
    app.Settings.firstTimeSetup();
    app.f7.views.main.router.navigate("/settings/");
  } else {
    app.Settings.changeTheme(settings.theme["dark-mode"], settings.theme.theme);
    app.f7.views.main.router.navigate(settings.theme["start-page"]);
  }

  // Backup database 
  setTimeout(async () => {

    let autoBackup = app.Settings.get("import-export", "auto-backup");

    if (settings != undefined && settings.firstTimeSetup != undefined && autoBackup == true && device.platform !== "browser") {
      let data = await dbHandler.export();
      let filename = "waistline_auto_backup.json";
      let path = await app.Utils.writeFile(data, filename);
    }
  }, 2000);
}, false);

//Prevent chrome displaying context menu on long click
window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

// Android back button 
document.addEventListener("backbutton", (e) => {

  let dialogs = document.getElementsByClassName("dialog");

  if (dialogs.length) {
    app.f7.dialog.close(".dialog");
    e.preventDefault();
    return false;
  }

  let activeSearch = document.getElementsByClassName("searchbar-focused");

  if (activeSearch.length) {
    app.f7.searchbar.clear(".searchbar-focused");
    return false;
  }

  if (app.f7.views.main.history.length > 1)
    app.f7.views.main.router.back();
});