# i18n Quick Start Guide

## ✅ What's Already Done

Your portfolio now has a complete i18n implementation with English and French support!

### Installed
- ✅ `i18next` - Internationalization framework
- ✅ `react-i18next` - React bindings
- ✅ `i18next-browser-languagedetector` - Auto language detection

### Configured
- ✅ i18n initialization (`src/i18n/config.ts`)
- ✅ Language Context Provider (`src/shared/context/LanguageContext.tsx`)
- ✅ Translation files (English & French)
- ✅ Language Switcher in Header
- ✅ All main components integrated

## 🚀 Running the Project

```bash
# Install dependencies (if not done)
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🌐 How to Switch Languages

1. **Using the Language Switcher in Header**
   - Look for the globe icon 🌐 next to the theme toggle
   - Click to see language options
   - Select English or French
   - Your preference is saved automatically

2. **Programmatically in Code**
   ```tsx
   import { useTranslation } from 'react-i18next';
   
   const MyComponent = () => {
     const { i18n } = useTranslation();
     
     // Switch to French
     i18n.changeLanguage('fr');
     
     // Switch to English
     i18n.changeLanguage('en');
   };
   ```

## 📝 Adding Translations to a New Component

### 1. Add to Translation Files

**en.json:**
```json
{
  "myNewFeature": {
    "title": "My Feature",
    "description": "Feature description"
  }
}
```

**fr.json:**
```json
{
  "myNewFeature": {
    "title": "Ma Fonctionnalité",
    "description": "Description de la fonctionnalité"
  }
}
```

### 2. Use in Component

```tsx
import { useTranslation } from 'react-i18next';

export const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h2>{t('myNewFeature.title')}</h2>
      <p>{t('myNewFeature.description')}</p>
    </div>
  );
};
```

## 🔄 Common Translation Patterns

### Simple text
```tsx
<h1>{t('nav.home')}</h1>
```

### Arrays/Lists
```tsx
const titles = t('hero.titles', { returnObjects: true }) as string[];
```

### Interpolation (dynamic values)
```json
{
  "welcome": "Hello {{name}}"
}
```
```tsx
<p>{t('welcome', { name: 'John' })}</p>
```

## 🎯 Translated Components

Already integrated with i18n:
- ✅ Header (Navigation + Language Switcher)
- ✅ Hero Section
- ✅ Skills
- ✅ Awards
- ✅ Projects
- ✅ Experience
- ✅ Education
- ✅ Contact
- ✅ Footer

## 📂 Translation Files Location

```
src/
├── i18n/
│   ├── config.ts
│   └── locales/
│       ├── en.json (English)
│       └── fr.json (French)
```

## 🔍 Viewing Current Language

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { i18n } = useTranslation();
  
  console.log(i18n.language); // 'en' or 'fr'
};
```

## 💾 Language Persistence

Your language choice is automatically saved to the browser's localStorage. 
Delete with: `localStorage.removeItem('i18nextLng')`

## 🐛 Troubleshooting

**Issue: Translations not showing**
- Ensure the key exists in both `en.json` and `fr.json`
- Check the key path matches exactly

**Issue: Language not persisting**
- Check if localStorage is enabled in browser
- Try clearing browser cache

**Issue: Component not updating on language change**
- Make sure you're using `useTranslation()` hook
- Verify the component isn't memoized without proper dependencies

## 📖 Full Documentation

See `I18N_DOCUMENTATION.md` for comprehensive documentation.

## 🎓 Learn More

- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Guide](https://react.i18next.com/)

---

**You're all set!** The i18n system is ready to use. Start by adding translations for any new content you create. 🚀
