import { beforeEach, describe, it, expect } from 'vitest'

export function translator_Tests({ Translator }: any) {
  const translations: any = {
    en: {
      pages: {
        404: {
          content: {
            header: '404',
            body: 'Sorry, Requested content could not be found'
          }
        },
        home: {
          section_1: {
            header: 'Section 1 Header Title',
            body: 'Some text here'
          }
        }
      },
      tools: {
        footerTitle: 'Footer Title',
        navbar: {
          title: 'Nav Title',
          btns: { login: 'Login', logout: 'Logout' }
        }
      }
    },
    fr: {
      pages: {
        404: {
          content: {
            header: '404',
            body: 'Désolé, le contenu demandé est introuvable'
          }
        },
        home: {
          section_1: {
            header: "Section 1 Titre de l'en-tête",
            body: 'Un peu de texte ici'
          }
        }
      },
      tools: {
        navbar: {
          title: 'Titre de navigation',
          btns: { login: 'Connexion', logout: 'Déconnexion' }
        }
      }
    }
  }

  describe('Translator', () => {
    let locales: string[] = Object.keys(translations),
      tr: any

    beforeEach(() => {
      tr = new Translator(translations, 'en')
      locales = tr.locales
    })

    it('should respect the provided fallback locale', () => {
      expect(tr.locale).toBe('en')
      expect(tr.fallback).toBe('en')
    })

    it('should respect the provided locales', () => {
      expect(tr.locales).toEqual(expect.arrayContaining(locales))
    })

    it("should use first locale as default if fallback isn't provided", () => {
      const tr = new Translator(translations)

      expect(tr.locale).toBe(Object.keys(translations)[0])
    })

    it('should switch locales when needed but maintain the fallback locale', () => {
      for (const locale of locales) {
        tr.setLocale(locale)

        expect(tr.locale).toBe(locale)
        expect(tr.fallback).toBe('en')
        expect(tr.locales).toEqual(expect.arrayContaining(locales))
      }
    })

    it('should return new locale when switching locales', () => {
      for (const locale of locales) expect(tr.setLocale(locale)).toBe(locale)
    })

    it('should not switch locales when provided unknown locale', () => {
      const invalidLocales = ['en-GB', 'en-US', 'de', 'fr-CA', 'fr-FR']

      for (const locale of locales) {
        tr.setLocale(locale)

        for (const invalidLocale of invalidLocales) {
          expect(tr.setLocale(invalidLocale)).toBe(undefined)
          expect(tr.locale).toBe(locale)
          expect(tr.fallback).toBe('en')
          expect(tr.locales).toEqual(expect.arrayContaining(locales))
        }
      }
    })

    it('should return the translated text in specified locale', () => {
      for (const locale of locales) {
        tr.setLocale(locale)

        expect(tr.translate('pages.404.content.body')).toBe(
          translations[locale].pages[404].content.body
        )
        expect(tr.translate('pages.404.content.header')).toBe(
          translations[locale].pages[404].content.header
        )
        expect(tr.translate('pages.home.section_1.body')).toBe(
          translations[locale].pages.home.section_1.body
        )
        expect(tr.translate('pages.home.section_1.header')).toBe(
          translations[locale].pages.home.section_1.header
        )
        expect(tr.translate('tools.navbar.title')).toBe(
          translations[locale].tools.navbar.title
        )
        expect(tr.translate('tools.navbar.btns.login')).toBe(
          translations[locale].tools.navbar.btns.login
        )
        expect(tr.translate('tools.navbar.btns.logout')).toBe(
          translations[locale].tools.navbar.btns.logout
        )
      }
    })

    it('should return the fallback text if specified locale does not have translation', () => {
      for (const locale of locales) {
        tr.setLocale(locale)

        expect(tr.translate('tools.footerTitle')).toBe(
          translations.en.tools.footerTitle
        )
      }
    })

    it('should return the last string if fallback does not have translation', () => {
      for (const locale of locales) {
        tr.setLocale(locale)

        expect(tr.translate('tools.footer.title')).toBe('title')
      }
    })

    it('should return the string in specified depth if fallback does not have translation', () => {
      for (const locale of locales) {
        tr.setLocale(locale)

        expect(tr.translate('tools.footer.title', 2)).toBe('footer')
      }
    })
  })
}
