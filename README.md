# Czech Homework Calendar 📅

Moderní aplikace pro správu domácích úkolů a testů v češtině s automatickou synchronizací mezi zařízeními.

## ✨ Funkce

- 📱 **Responzivní design** - funguje na PC i telefonu
- 🔄 **Automatická synchronizace** - data sdílená mezi všemi zařízeními
- 👥 **Víceuživatelský systém** - admini, základní uživatelé, blokovaní uživatelé
- 📚 **Kategorie událostí** - domácí úkoly, testy, ostatní
- 🎓 **Výběr předmětů** - ICT, DĚJ, FYZ, ŠPJ, CJL, ANJ, BIO, MAT, ESW, ZSV, ZEM, UaK, BEN, CHEM
- 📎 **Přílohy souborů** - možnost přiložit soubory k událostem
- 🇨🇿 **Kompletně v češtině** - včetně názvů měsíců a dnů

## 🚀 Použití

Aplikace je dostupná na: **https://skibidiandulka.github.io/czech-homework-calendar/**

### Výchozí administrátorský účet
- **Username:** admin
- **Password:** asdf

## 💻 Technologie

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Hosting:** GitHub Pages
- **Databáze:** GitHub API + JSON soubory
- **Design:** Inspirováno Anthropic.com

## 🔧 Vývoj

```bash
# Klonování
git clone https://github.com/skibidiandulka/czech-homework-calendar.git
cd czech-homework-calendar

# Spuštění lokálního serveru
node server.js
# Aplikace bude dostupná na http://localhost:8888
```

## 📱 Mobilní použití

- Přejetím nahoru v seznamu dnů zobrazíte předchozí dny
- Sticky header s navigací
- Inteligentní tlačítko "dnes" pro rychlou navigaci
- Touch-optimalizované ovládání

## 🏗️ Architektura

- **Single-file aplikace** pro GitHub Pages kompatibilitu
- **GitHub Actions** pro automatické deploymenty
- **JSON API** pro sdílení dat mezi zařízeními
- **localStorage fallback** pro offline funkčnost

## 📄 Licence

Vytvořeno pro vzdělávací účely.