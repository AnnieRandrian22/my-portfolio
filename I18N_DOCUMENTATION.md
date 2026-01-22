# i18n Implementation Documentation

## Overview

This portfolio now features a professional and clean i18n (internationalization) architecture supporting English and French languages using **i18next** and **react-i18next**.

## Architecture

### 📁 Directory Structure

```
src/
├── i18n/
│   ├── config.ts                 # i18n configuration and initialization
│   └── locales/
│       ├── en.json              # English translations
│       └── fr.json              # French translations
├── shared/
│   └── context/
│       └── LanguageContext.tsx   # Language context provider
└── [other components...]
```

### 🔧 Core Components

#### 1. **i18n Configuration** (`src/i18n/config.ts`)
- Initializes i18next with react-i18next integration
- Configures language detection (browser language preference)
- Stores language preference in localStorage
- Sets fallback language to English

#### 2. **Language Context** (`src/shared/context/LanguageContext.tsx`)
- Provides global language state management
- Exposes `useLanguage()` hook for accessing current language
- Manages language switching functionality

#### 3. **Translation Files**
- **English** (`src/i18n/locales/en.json`)
- **French** (`src/i18n/locales/fr.json`)

Translation structure organized by feature:
```json
{
  "nav": { ... },
  "hero": { ... },
  "skills": { ... },
  "awards": { ... },
  "experience": { ... },
  "education": { ... },
  "projects": { ... },
  "contact": { ... },
  "footer": { ... },
  "common": { ... }
}
```

## Implementation Details

### ✅ Initialized Components

The following components have been integrated with i18n:

1. **Header Component** - Navigation items + Language Switcher
2. **Hero Component** - Dynamic titles and CTA buttons
3. **Skills Component** - Section title and subtitle
4. **Awards Component** - Awards section heading
5. **Projects Component** - Project titles and tab labels
6. **Experience Component** - Timeline section heading
7. **Education Component** - Timeline section heading
8. **Contact Component** - Form labels, placeholders, and messages
9. **Footer Component** - Navigation items and copyright text
10. **App Component** - LanguageProvider wrapper

### 🌐 Language Switcher

A beautiful language switcher is integrated into the Header:
- Located next to the theme switcher
- Shows current language flag (🇬🇧 for English, 🇫🇷 for French)
- Dropdown menu for language selection
- Persists language preference to localStorage
- Automatically detects browser language on first visit

**Usage:**
```tsx
import { LanguageSwitcher } from '../components/Header';
// Automatically included in Header component
```

## How to Use

### 1. Using Translations in Components

```tsx
import { useTranslation } from 'react-i18next';

export const MyComponent: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('nav.home')}</h1>
      <p>{t('hero.subtitle')}</p>
    </div>
  );
};
```

### 2. Accessing Language State

```tsx
import { useLanguage } from '../shared/context/LanguageContext';

const Component = () => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <button onClick={() => setLanguage('fr')}>
      Changer vers {language === 'en' ? 'Français' : 'English'}
    </button>
  );
};
```

### 3. Accessing Arrays from Translation Objects

```tsx
const { t } = useTranslation();

// For arrays in translation files
const titles = t('hero.titles', { returnObjects: true }) as string[];

// Use it
{titles.map(title => <span key={title}>{title}</span>)}
```

## Adding New Translations

### Step 1: Add to Translation Files

**src/i18n/locales/en.json:**
```json
{
  "myFeature": {
    "title": "My Title",
    "description": "My Description"
  }
}
```

**src/i18n/locales/fr.json:**
```json
{
  "myFeature": {
    "title": "Mon Titre",
    "description": "Ma Description"
  }
}
```

### Step 2: Use in Component

```tsx
import { useTranslation } from 'react-i18next';

export const MyFeature = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h2>{t('myFeature.title')}</h2>
      <p>{t('myFeature.description')}</p>
    </div>
  );
};
```

## Current Translation Keys

### Navigation (`nav.*)`)
- `home` - Accueil / Home
- `skills` - Compétences / Skills
- `awards` - Réalisations & Récompenses / Achievements & Awards
- `experience` - Expérience / Experience
- `education` - Formation / Education
- `contact` - Contact / Contact

### Hero Section (`hero.*`)
- `titles[]` - Dynamic job titles
- `subtitle` - Section subtitle
- `cta` - Call-to-action button text

### Skills (`skills.*`)
- `title` - Section title
- `subtitle` - Section subtitle
- `categories` - Skill categories

### Awards (`awards.*`)
- `title` - Section title
- `subtitle` - Section subtitle

### Experience (`experience.*`)
- `title` - Section title

### Education (`education.*`)
- `title` - Section title

### Projects (`projects.*`)
- `title` - Section title
- `subtitle` - Section subtitle
- `viewDetails` - View details button
- `viewCode` - View code button
- `liveDemo` - Live demo button
- `allProjects` - All projects tab
- `professional` - Professional projects tab
- `personal` - Personal projects tab
- `viewAll` - View all tab label

### Contact (`contact.*`)
- `title` - Section title
- `subtitle` - Section subtitle
- `stayInTouch` - Heading
- `description` - Description text
- `form.name` - Name field
- `form.email` - Email field
- `form.message` - Message field
- `form.submit` - Submit button
- `form.sending` - Sending state button
- `form.success` - Success message
- `form.error` - Error message

### Footer (`footer.*`)
- `copyright` - Copyright text

## Best Practices

### ✨ Do's
- ✅ Use namespaced keys (e.g., `feature.action`)
- ✅ Keep translations organized by component
- ✅ Use `returnObjects: true` for arrays
- ✅ Store language preference in localStorage
- ✅ Use language context for global state
- ✅ Provide clear translation key names

### ❌ Don'ts
- ❌ Don't hardcode text in components
- ❌ Don't use translation keys as IDs
- ❌ Don't forget to add translations for new features
- ❌ Don't use nested objects beyond 2 levels

## Browser Language Detection

The system automatically detects the user's browser language:
1. First checks localStorage for saved preference
2. Falls back to browser language (`navigator.language`)
3. Defaults to English if language not supported

To change this behavior, edit `src/i18n/config.ts`:

```tsx
detection: {
  order: ['localStorage', 'navigator'], // Change detection order
  caches: ['localStorage'], // Store in localStorage
},
```

## Language Persistence

Language preference is automatically saved to localStorage with key `i18nextLng`.

To clear saved preference:
```tsx
localStorage.removeItem('i18nextLng');
```

## Performance Considerations

- Translations are loaded at app initialization
- Language files are JSON files (lightweight)
- No runtime translation processing overhead
- Cached in browser memory after initialization

## Future Enhancements

Potential improvements:
1. Server-side rendering (SSR) support
2. Lazy loading for additional languages
3. Translation management dashboard
4. RTL (Right-to-Left) language support
5. Pluralization rules
6. Date/time locale formatting

## Troubleshooting

### Translations not updating?
- Ensure `useTranslation()` hook is called correctly
- Check that the key exists in both translation files
- Verify the namespace is correct

### Language not persisting?
- Check browser localStorage is enabled
- Ensure the i18n config includes `localStorage` in detection order

### Getting console warnings?
- Make sure all translation keys are defined in both `en.json` and `fr.json`
- Use consistent key naming conventions

## Resources

- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Guide](https://react.i18next.com/)
- [i18next Browser Language Detector](https://github.com/i18next/i18next-browser-languageDetector)

---

**Last Updated:** December 10, 2025
**Languages Supported:** English, French
**Framework:** React 19 + TypeScript + i18next
