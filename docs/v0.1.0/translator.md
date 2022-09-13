# Translator

This is a class that helps you manage localizations for your application.

## Example with ReactJS

```js
// translations
const translations = {
  en: {
    pages: {
      404: {
        content: {
          header: "404",
          body: "Sorry, Requested content could not be found",
        },
      },
      home: {
        section_1: {
          header: "Section 1, Header Title",
          body: "Some text here",
        },
      },
    },
    tools: {
      footerTitle: "Footer Title",
      navbar: {
        title: "Nav Title",
        btns: { login: "Login", logout: "Logout" },
      },
    },
  },
  fr: {
    pages: {
      404: {
        content: {
          header: "404",
          body: "Désolé, le contenu demandé est introuvable",
        },
      },
      home: {
        section_1: {
          header: "Section 1, Titre de l'en-tête",
          body: "Un peu de texte ici",
        },
      },
    },
    tools: {
      navbar: {
        title: "Titre de navigation",
        btns: { login: "Connexion", logout: "Déconnexion" },
      },
    },
  },
};
```

Create the translation and specify `en` as fallback locale

```jsx
import { useState } from "react";
import { Translator } from "datafx";

const tr = new Translator(translations, "en");

export function Home() {
  const [_locale, _setLocate] = useState(tr.locale);

  function changeLocale(v) {
    if (tr.setLocale(v)) _setLocale(tr.locale);
  }

  return (
    <section>
      <h1>{tr.translate("pages.home.section_1.header")}</h1>
      <p>{tr.translate("pages.home.section_1.body")}</p>
      <Dropdown value={_locale} values={tr.locales} onChange={changeLocale} />
    </section>
  );
}
```

## Properties

- ### locale
  A string representing the current locale of the translator
- ### locales
  An array of all locales provided
- ### fallback
  A string representing the default locale. The translator will try to get the translation in this locale if the selected locale does not have the translated text. if this fails too, the translator will resolve to the [translation depth](#translate)
- ### setLocale
  The method used to change the locale. It accepts the new locale as only parameter and returns `the new locale` or `undefined` if provided an invalid locale
- ### translate

  The method used to get translated texts. The first parameter is the text to translate as seen in the example above. The second parameter is the depth with default value(1) and is used to determine the text to return if the translator cannot find any translations.

  Example:

```js
tr.translate("pages.about.section_1.body"); // body
tr.translate("pages.about.section_1.body", 2); // section_1
```
